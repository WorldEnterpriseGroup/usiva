import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { tmpdir } from 'node:os';
import { auditProduction } from '../scripts/audit-production.mjs';

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => fs.rm(directory, { recursive: true, force: true })));
});

async function makeDirectory() {
  const directory = await fs.mkdtemp(path.join(tmpdir(), 'usiva-quality-'));
  temporaryDirectories.push(directory);
  return directory;
}

async function writeFixture(root, files) {
  for (const [relativeFile, content] of Object.entries(files)) {
    const absolute = path.join(root, relativeFile);
    await fs.mkdir(path.dirname(absolute), { recursive: true });
    await fs.writeFile(absolute, content);
  }
}

function page({ route, canonicalRoute = route, title, description, h1, href = '/about/', extra = '' }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="https://example.test${canonicalRoute}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://example.test/assets/hero.svg">
    <link rel="stylesheet" href="/assets/site.css">
  </head>
  <body>
    <a href="#main">Skip to content</a>
    <main id="main">
      <h1>${h1}</h1>
      <p>This production fixture contains enough authored content to exercise the rendered route quality checks.</p>
      <p><a href="${href}">Open the next route</a></p>
      ${extra}
    </main>
  </body>
</html>`;
}

const sharedDescription = 'A practical production fixture description with enough context for a meaningful search result and content audit.';

async function writeHealthyBuild(root) {
  await writeFixture(root, {
    'index.html': page({
      route: '/',
      canonicalRoute: '/index.html',
      title: 'Production home route | Example',
      description: sharedDescription,
      h1: 'A useful production home route',
      extra: '<img src="/assets/hero.svg" alt="A route audit illustration" width="1200" height="700">',
    }),
    'about/index.html': page({
      route: '/about/',
      title: 'About route | Example',
      description: 'This second route has a distinct description so duplicate SEO content is caught before release.',
      h1: 'A distinct about route',
      href: '/',
    }),
    'file-route.html': page({
      route: '/file-route.html',
      title: 'File route | Example',
      description: 'A direct file-format route keeps the Astro production output mapping explicit in the route ledger.',
      h1: 'A direct file-format route',
      href: '/',
    }),
    'assets/site.css': 'body { margin: 0; } .hero { background: url("/assets/hero.svg"); }',
    'assets/hero.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><title>Fixture</title></svg>',
    'sitemap.xml': `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.test/</loc></url><url><loc>https://example.test/about/</loc></url><url><loc>https://example.test/file-route.html</loc></url></urlset>`,
    'robots.txt': 'User-agent: *\nAllow: /\nSitemap: https://example.test/sitemap.xml\n',
  });
}

test('audits every nested production route and emits a passing ledger for healthy output', async () => {
  const buildRoot = await makeDirectory();
  await writeHealthyBuild(buildRoot);

  const report = await auditProduction({
    buildRoot,
    site: 'https://example.test',
    legacyManifest: {},
  });

  assert.equal(report.ok, true);
  assert.deepEqual(report.routes.map((route) => route.route), ['/', '/about/', '/file-route.html']);
  assert.equal(report.ledger.routeCount, 3);
  assert.equal(report.ledger.routes[1].file, 'about/index.html');
  assert.equal(report.summary.errors, 0);
});

test('fails broken links, duplicate SEO, placeholder content, missing alt, sitemap gaps, and overflow hooks', async () => {
  const buildRoot = await makeDirectory();
  const brokenPage = page({
    route: '/',
    title: 'Duplicate route title | Example',
    description: sharedDescription,
    h1: 'Duplicate route heading',
    extra: '<img src="/assets/hero.svg"><a href="/missing/">Broken destination</a><a href="#missing">Broken fragment</a><a href="#">Placeholder link</a><p>lorem ipsum temporary copy</p>',
  });
  const duplicatePage = page({
    route: '/about/',
    canonicalRoute: '/',
    title: 'Duplicate route title | Example',
    description: sharedDescription,
    h1: 'Duplicate route heading',
    href: '/',
  });
  await writeFixture(buildRoot, {
    'index.html': brokenPage,
    'about/index.html': duplicatePage,
    'contact/index.html': page({
      route: '/contact/',
      title: 'Contact route | Example',
      description: 'A third route keeps the sitemap coverage assertion independent from the duplicate canonical assertion.',
      h1: 'A third distinct route',
      href: '/',
    }),
    'assets/site.css': '.wide { width: 100vw; white-space: nowrap; }',
    'assets/hero.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>',
    'sitemap.xml': '<urlset><url><loc>https://example.test/</loc></url></urlset>',
  });

  const report = await auditProduction({
    buildRoot,
    site: 'https://example.test',
    strict: true,
    legacyManifest: {},
  });
  const codes = new Set(report.issues.map((issue) => issue.code));

  assert.equal(report.ok, false);
  for (const code of [
    'broken-reference',
    'broken-fragment',
    'placeholder-url',
    'placeholder-copy',
    'image-alt',
    'duplicate-title',
    'duplicate-description',
    'duplicate-h1',
    'duplicate-canonical',
    'route-missing-from-sitemap',
    'viewport-width-hook',
    'nowrap-hook',
    'missing-robots',
  ]) {
    assert.equal(codes.has(code), true, `expected ${code} in ${[...codes].join(', ')}`);
  }
});

test('fails known legacy source, asset, and copy fingerprints in both source and build trees', async () => {
  const fixtureRoot = await makeDirectory();
  const buildRoot = path.join(fixtureRoot, 'dist');
  const sourceRoot = path.join(fixtureRoot, 'source');
  await writeHealthyBuild(buildRoot);
  await writeFixture(buildRoot, {
    'legacy-copy.txt': 'Old legacy copy remains here.',
    'old.avif': Buffer.from([1, 2, 3, 4]),
  });
  await writeFixture(sourceRoot, {
    'legacy.html': 'Old legacy copy remains here.',
    'old.avif': Buffer.from([1, 2, 3, 4]),
  });

  const report = await auditProduction({
    buildRoot,
    sourceRoot,
    site: 'https://example.test',
    legacyManifest: {
      legacySourcePaths: ['legacy.html'],
      legacyAssetNames: ['old.avif'],
      legacyCopy: ['Old legacy copy remains here.'],
    },
  });
  const codes = new Set(report.issues.map((issue) => issue.code));

  assert.equal(report.ok, false);
  assert.equal(codes.has('legacy-source-path'), true);
  assert.equal(codes.has('legacy-asset-name'), true);
  assert.equal(codes.has('legacy-copy'), true);
});

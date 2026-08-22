# Production route quality audit

`scripts/audit-production.mjs` is a dependency-free gate for the rendered Astro production output. It discovers every `.html` file under the supplied output directory, so the route list cannot silently omit a dynamic or nested route. It does not inspect only source components and it does not make network requests to third-party URLs.

## Release command

Run the repository's existing Astro production build first, then run:

```sh
node scripts/audit-production.mjs \
  --build dist \
  --source . \
  --site https://usiva.org \
  --base / \
  --ledger docs/quality/route-ledger.json \
  --json /tmp/usiva-production-audit.json \
  --require-robots \
  --strict
```

The command exits non-zero on any error. `--strict` also makes review-level warnings—such as missing image dimensions or static overflow-risk hooks—fail the gate. The generated route ledger is a build review artifact; regenerate it after every route/content change rather than hand-editing it.

When the site is deployed below a path, pass the same Astro `base` value with `--base`. When the configured site origin differs, pass that origin with `--site` so canonical, same-site absolute links, sitemap membership, and robots.txt are checked against the deployment policy.

## Checks performed

- discovers all rendered HTML routes and maps `index.html` files to their directory routes;
- checks every internal anchor, stylesheet, script, image, source, media poster, form action, Open Graph image, CSS `url()`, and same-site absolute reference;
- validates local fragment targets and reports missing generated files without fetching external sites;
- rejects empty, JavaScript, example, localhost, temporary, and other placeholder URLs;
- requires one language attribute, `main`, title, description, canonical, primary `h1`, and social title/description/image per route;
- rejects duplicate title, description, canonical, or `h1` values across generated routes;
- checks visible content is not empty/thin, links have accessible names, heading jumps, duplicate IDs, image `alt`, intrinsic dimensions, iframe titles, and media controls/captions;
- checks sitemap membership for every indexable generated route and rejects extra, duplicate, or noindex sitemap entries;
- checks robots.txt sitemap advertising and warns when the entire site is disallowed;
- reports obvious CSS horizontal-overflow hooks such as direct `100vw` widths, fixed widths of at least 1000px, `nowrap`, and global overflow suppression;
- scans the new source tree and production output for the known legacy HTML/assets/copy fingerprints in `legacy-cutover.json`.

The audit intentionally treats the cutover as destructive compatibility-wise: a legacy page, asset, or known legacy copy marker in the new source or build is an error. The manifest is a quality-control fingerprint list, not a compatibility allowlist. Update it only when the old baseline is deliberately redefined and record that decision in the handoff.

## Current repository baseline

The audit is independent of the Astro source layout, but the intended target is always a fresh `dist/` produced by the repository's Astro build. If `dist/` is absent, the command fails rather than silently auditing source files as if they were production output. Running it against the repository root is only a diagnostic of the legacy static baseline and is expected to fail the cutover checks; the repository root is not an Astro production output.

The audit itself can be checked without installing dependencies:

```sh
pnpm exec astro check
node --test tests/audit-production.test.mjs
node --check scripts/audit-production.mjs
```

The audit adds no runtime dependency. Browser-level accessibility, real rendered overflow, and screenshot checks for this cutover are recorded in [`browser-acceptance.md`](browser-acceptance.md); repeat that acceptance after a material layout, component, or accessibility change. External government links remain intentionally subject to their issuing authorities’ current instructions.

## Route ledger fields

`--ledger` writes a deterministic JSON ledger containing `route`, emitted `file`, `indexable`, title, description, canonical, primary `h1`, link count, media/alt/dimension counts, and route-local issue count. The ledger is derived from the production output, not from `src/pages`, so it is also a coverage record for generated dynamic routes.

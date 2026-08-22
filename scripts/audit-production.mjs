#!/usr/bin/env node

/**
 * Dependency-free audit for a prerendered Astro output directory.
 *
 * The audit deliberately reads rendered HTML and emitted assets rather than
 * source components. It can therefore be used after `astro build` without
 * requiring an Astro integration, a browser, or a package.json change.
 */

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIR, '..');
const DEFAULT_BUILD_ROOT = 'dist';
const DEFAULT_LEGACY_MANIFEST = path.join(REPOSITORY_ROOT, 'docs/quality/legacy-cutover.json');

const TEXT_EXTENSIONS = new Set([
  '.astro', '.css', '.html', '.js', '.json', '.jsx', '.md', '.mdx', '.mjs',
  '.rss', '.svg', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml',
]);

const ROUTE_EXTENSIONS = new Set(['.html']);

const PLACEHOLDER_COPY_PATTERNS = [
  /lorem\s+ipsum/i,
  /\bplaceholder\b/i,
  /\b(?:todo|tbd|fixme)\b/i,
  /coming\s+soon/i,
  /sample\s+(?:text|copy|content)/i,
  /your\s+(?:text|copy|content)\s+here/i,
  /replace\s+me/i,
  /\b(?:insert|add)\s+(?:text|copy|content)\b/i,
];

const PLACEHOLDER_URL_PATTERN = /(?:example\.(?:com|org|net)|localhost|127\.0\.0\.1|0\.0\.0\.0|test\.invalid|your[-_. ]?(?:domain|site)|replace[-_. ]?me|(?:^|[/_.-])(?:tmp|temp|todo|tbd|placeholder)(?:[/_.?#-]|$))/i;

const GENERIC_LINK_TEXT = /^(?:click\s+here|here|learn\s+more|read\s+more|more|details)$/i;

function normalizeRelativePath(value) {
  return value.split(path.sep).join('/').replace(/^\.\//, '');
}

function normalizeBasePath(value = '/') {
  let base = String(value || '/').trim();
  if (!base.startsWith('/')) base = `/${base}`;
  base = base.replace(/\/+/g, '/').replace(/\/+$/, '');
  return base || '/';
}

function decodeHtml(value) {
  const decodeCodePoint = (raw, radix) => {
    const codePoint = Number.parseInt(raw, radix);
    return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
      ? String.fromCodePoint(codePoint)
      : `&#${radix === 16 ? `x${raw}` : raw};`;
  };
  return String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => decodeCodePoint(code, 16))
    .replace(/&#([0-9]+);/g, (_, code) => decodeCodePoint(code, 10))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'");
}

function normalizeText(value) {
  return decodeHtml(String(value || '').replace(/\s+/g, ' ')).trim();
}

function normalizeComparableText(value) {
  return normalizeText(value).toLocaleLowerCase('en-US');
}

function stripComments(value) {
  return value.replace(/<!--([\s\S]*?)-->/g, ' ');
}

function stripNonContent(value) {
  return normalizeText(
    stripComments(value)
      .replace(/<(script|style|template|noscript|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(/<[^>]*>/g, ' '),
  );
}

function parseAttributes(source) {
  const attributes = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const name = match[1].toLowerCase();
    if (name === 'doctype') continue;
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    if (!(name in attributes)) attributes[name] = decodeHtml(value);
  }
  return attributes;
}

function extractOpeningTags(html, tagName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  return [...html.matchAll(pattern)].map((match) => ({
    raw: match[0],
    attributes: parseAttributes(match[0].slice(tagName.length + 1, -1)),
    index: match.index ?? 0,
  }));
}

function extractPairedElements(html, tagName) {
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}\\s*>`, 'gi');
  return [...html.matchAll(pattern)].map((match) => ({
    raw: match[0],
    attributes: parseAttributes(match[1]),
    inner: match[2],
    index: match.index ?? 0,
  }));
}

function getMetaContent(metas, attribute, value) {
  const wanted = String(value).toLowerCase();
  const meta = metas.find((item) => item.attributes[attribute]?.toLowerCase() === wanted);
  return meta?.attributes.content ?? '';
}

function relContains(attributes, token) {
  return (attributes.rel || '').toLowerCase().split(/\s+/).includes(token);
}

function routePathForFile(relativeFile) {
  const file = normalizeRelativePath(relativeFile);
  if (file === 'index.html') return '/';
  if (file.endsWith('/index.html')) return `/${file.slice(0, -'/index.html'.length)}/`;
  return `/${file}`;
}

function isErrorRoute(relativeFile) {
  return /(?:^|\/)404\.html$/i.test(normalizeRelativePath(relativeFile))
    || /(?:^|\/)5(?:00|01|02|03)\.html$/i.test(normalizeRelativePath(relativeFile));
}

async function walkFiles(root, { skipDirectories = new Set() } = {}) {
  const files = [];

  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      if (entry.isDirectory() && skipDirectories.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute);
      } else if (entry.isFile()) {
        files.push(absolute);
      }
    }
  }

  await visit(root);
  return files;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function isLikelyTextFile(relativeFile) {
  return TEXT_EXTENSIONS.has(path.posix.extname(normalizeRelativePath(relativeFile)).toLowerCase());
}

function extractDocument(html) {
  const htmlOpening = extractOpeningTags(html, 'html')[0];
  const metas = extractOpeningTags(html, 'meta');
  const links = extractOpeningTags(html, 'link');
  const images = extractOpeningTags(html, 'img');
  const videos = extractOpeningTags(html, 'video');
  const audios = extractOpeningTags(html, 'audio');
  const iframes = extractOpeningTags(html, 'iframe');
  const sources = extractOpeningTags(html, 'source');
  const tracks = extractOpeningTags(html, 'track');
  const scripts = extractOpeningTags(html, 'script');
  const anchors = extractPairedElements(html, 'a');
  const areas = extractOpeningTags(html, 'area');
  const forms = extractOpeningTags(html, 'form');
  const mainElements = extractPairedElements(html, 'main');
  const h1s = extractPairedElements(html, 'h1');
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h[1-6]\s*>/gi)]
    .map((match) => ({ level: Number(match[1]), text: stripNonContent(match[2]) }));
  const titleElements = extractPairedElements(html, 'title');
  const ids = new Map();
  const allOpeningTags = [...html.matchAll(/<([a-z][a-z0-9:-]*)\b[^>]*>/gi)];
  for (const match of allOpeningTags) {
    const attributes = parseAttributes(match[0].slice(match[1].length + 1, -1));
    for (const key of ['id', 'name']) {
      const value = attributes[key];
      if (!value) continue;
      ids.set(value, (ids.get(value) || 0) + 1);
    }
  }

  return {
    html,
    lang: htmlOpening?.attributes.lang || '',
    metas,
    links,
    images,
    videos,
    audios,
    iframes,
    sources,
    tracks,
    scripts,
    anchors,
    areas,
    forms,
    mainElements,
    mainText: mainElements[0] ? stripNonContent(mainElements[0].inner) : '',
    visibleText: stripNonContent(html),
    h1s,
    h1Text: h1s[0] ? stripNonContent(h1s[0].inner) : '',
    headings,
    titleElements,
    title: titleElements[0] ? stripNonContent(titleElements[0].inner) : '',
    ids,
    canonicalLinks: links.filter((item) => relContains(item.attributes, 'canonical')),
    descriptionMetas: metas.filter((item) => item.attributes.name?.toLowerCase() === 'description'),
    description: getMetaContent(metas, 'name', 'description'),
    robots: getMetaContent(metas, 'name', 'robots'),
    ogTitle: getMetaContent(metas, 'property', 'og:title'),
    ogDescription: getMetaContent(metas, 'property', 'og:description'),
    ogImage: getMetaContent(metas, 'property', 'og:image') || getMetaContent(metas, 'name', 'twitter:image'),
  };
}

function addIssue(report, severity, code, message, context = {}) {
  report.issues.push({ severity, code, message, ...context });
}

function issueContext(route, file, extra = {}) {
  return {
    ...(route ? { route } : {}),
    ...(file ? { file: normalizeRelativePath(file) } : {}),
    ...extra,
  };
}

function isPlaceholderUrl(value) {
  const raw = String(value || '').trim();
  return raw === '#'
    || /^javascript:\s*(?:void\s*\(\s*0\s*\)|false)/i.test(raw)
    || PLACEHOLDER_URL_PATTERN.test(raw);
}

function splitReference(value) {
  const raw = String(value || '').trim();
  const hashIndex = raw.indexOf('#');
  const withoutHash = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
  const fragment = hashIndex >= 0 ? raw.slice(hashIndex + 1) : '';
  const queryIndex = withoutHash.indexOf('?');
  return {
    path: queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash,
    query: queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : '',
    fragment,
  };
}

function parseSite(site) {
  if (!site) return null;
  const parsed = new URL(site);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`--site must use http or https: ${site}`);
  }
  parsed.hash = '';
  parsed.search = '';
  if (!parsed.pathname.endsWith('/')) parsed.pathname += '/';
  return parsed;
}

function stripBaseFromUrlPath(urlPath, basePath) {
  const base = normalizeBasePath(basePath);
  let normalized = urlPath || '/';
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  if (base !== '/' && (normalized === base || normalized.startsWith(`${base}/`))) {
    normalized = normalized.slice(base.length) || '/';
  }
  normalized = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return normalized === '/index.html' ? '/' : normalized;
}

function urlKey(value, { site, basePath = '/' } = {}) {
  let parsed;
  try {
    parsed = new URL(value, site || 'https://quality.invalid/');
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) return null;
  if (site && parsed.origin !== site.origin) return null;
  return `${stripBaseFromUrlPath(parsed.pathname, basePath)}${parsed.search}`;
}

function expectedCanonical(site, route, basePath = '/') {
  if (!site) return null;
  const base = new URL(site.href);
  base.pathname = normalizeBasePath(basePath) === '/' ? '/' : `${normalizeBasePath(basePath)}/`;
  return new URL(route.replace(/^\//, ''), base).href;
}

function isExternalProtocol(value) {
  return /^(?:mailto:|tel:|sms:|data:|blob:|javascript:)/i.test(String(value || '').trim());
}

function candidateRelativeFiles(referencePath, ownerFile, basePath) {
  let decoded;
  try {
    decoded = decodeURIComponent(referencePath || '');
  } catch {
    return { invalidEncoding: true, candidates: [] };
  }
  if (decoded.includes('\0')) return { invalidEncoding: true, candidates: [] };

  const isRootRelative = decoded.startsWith('/');
  const sitePath = isRootRelative ? stripBaseFromUrlPath(decoded, basePath).replace(/^\//, '') : decoded;
  const ownerDirectory = path.posix.dirname(normalizeRelativePath(ownerFile));
  const joined = isRootRelative ? path.posix.normalize(sitePath) : path.posix.normalize(path.posix.join(ownerDirectory, sitePath));
  if (joined === '..' || joined.startsWith('../')) return { invalidEncoding: false, candidates: [] };

  const relative = joined === '.' ? '' : joined.replace(/^\.\//, '');
  const candidates = [];
  const add = (value) => {
    const normalized = value.replace(/^\.\//, '').replace(/^\/+/, '');
    if (!candidates.includes(normalized)) candidates.push(normalized);
  };

  add(relative);
  if (!relative || relative.endsWith('/')) add(`${relative}index.html`);
  if (relative && !relative.endsWith('/')) {
    const extension = path.posix.extname(relative);
    if (!extension) {
      add(`${relative}/index.html`);
      add(`${relative}.html`);
    }
  }
  return { invalidEncoding: false, candidates };
}

function classifyReference(rawValue, { site } = {}) {
  const raw = String(rawValue || '').trim();
  if (!raw) return { kind: 'empty', raw };
  if (isPlaceholderUrl(raw)) return { kind: 'placeholder', raw };
  if (raw.startsWith('#')) {
    if (raw === '#') return { kind: 'placeholder', raw };
    return { kind: 'local', raw, path: '', fragment: raw.slice(1) };
  }
  if (isExternalProtocol(raw)) {
    if (/^javascript:/i.test(raw)) return { kind: 'placeholder', raw };
    return { kind: 'ignored', raw };
  }
  if (raw.startsWith('//')) return { kind: 'ignored', raw };

  if (/^[a-z][a-z\d+.-]*:/i.test(raw)) {
    let parsed;
    try {
      parsed = new URL(raw);
    } catch {
      return { kind: 'invalid', raw };
    }
    if (!['http:', 'https:'].includes(parsed.protocol)) return { kind: 'ignored', raw };
    if (!site || parsed.origin !== site.origin) return { kind: 'ignored', raw };
    return {
      kind: 'local',
      raw,
      path: parsed.pathname,
      fragment: parsed.hash.slice(1),
    };
  }

  const parts = splitReference(raw);
  return { kind: 'local', raw, path: parts.path, fragment: parts.fragment };
}

function collectDocumentReferences(document, relativeFile) {
  const references = [];
  const seen = new Set();
  const add = (raw, kind, source) => {
    if (raw === undefined || raw === null) return;
    const value = String(raw).trim();
    const key = `${kind}|${value}|${source}`;
    if (seen.has(key)) return;
    seen.add(key);
    references.push({ raw: value, kind, source, ownerFile: relativeFile });
  };

  for (const anchor of document.anchors) add(anchor.attributes.href, 'anchor', 'a');
  for (const area of document.areas) add(area.attributes.href, 'anchor', 'area');
  for (const link of document.links) add(link.attributes.href, 'resource', `link:${link.attributes.rel || ''}`);
  for (const image of document.images) {
    add(image.attributes.src, 'resource', 'img');
    addSrcset(image.attributes.srcset, add, 'img');
  }
  for (const source of document.sources) {
    add(source.attributes.src, 'resource', 'source');
    addSrcset(source.attributes.srcset, add, 'source');
  }
  for (const script of document.scripts) add(script.attributes.src, 'resource', 'script');
  for (const video of document.videos) {
    add(video.attributes.src, 'resource', 'video');
    add(video.attributes.poster, 'resource', 'video-poster');
  }
  for (const audio of document.audios) add(audio.attributes.src, 'resource', 'audio');
  for (const iframe of document.iframes) add(iframe.attributes.src, 'resource', 'iframe');
  for (const track of document.tracks) add(track.attributes.src, 'resource', 'track');
  for (const form of document.forms) add(form.attributes.action, 'form', 'form');

  if (document.ogImage) add(document.ogImage, 'resource', 'og:image');
  return references;
}

function addSrcset(value, add, source) {
  if (!value) return;
  for (const candidate of String(value).split(',')) {
    const url = candidate.trim().split(/\s+/)[0];
    if (url) add(url, 'resource', `${source}:srcset`);
  }
}

function collectCssReferences(css, relativeFile) {
  const references = [];
  const pattern = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi;
  let match;
  while ((match = pattern.exec(css)) !== null) {
    const raw = (match[1] ?? match[2] ?? match[3] ?? '').trim();
    if (raw && !raw.startsWith('#')) references.push({ raw, kind: 'resource', source: 'css:url', ownerFile: relativeFile });
  }
  return references;
}

function getTargetFile(reference, ownerFile, fileSet, basePath) {
  const resolved = candidateRelativeFiles(reference.path, ownerFile, basePath);
  if (resolved.invalidEncoding) return { invalidEncoding: true, file: null };
  const file = resolved.candidates.find((candidate) => fileSet.has(candidate));
  return { invalidEncoding: false, file: file || null };
}

function getFragmentTarget(document, fragment) {
  if (!fragment) return true;
  let decoded;
  try {
    decoded = decodeURIComponent(fragment);
  } catch {
    return false;
  }
  return (document.ids.get(decoded) || 0) > 0;
}

function checkReference(report, reference, ownerDocument, documents, fileSet, options) {
  const { site, basePath } = options;
  const context = issueContext(ownerDocument.route, ownerDocument.file, { source: reference.source, value: reference.raw });
  if (!reference.raw) {
    addIssue(report, 'error', 'empty-reference', `Empty ${reference.kind} reference.`, context);
    return;
  }

  const classified = classifyReference(reference.raw, { site });
  if (classified.kind === 'placeholder') {
    addIssue(report, 'error', 'placeholder-url', `Placeholder or temporary URL: ${reference.raw}`, context);
    return;
  }
  if (classified.kind === 'invalid') {
    addIssue(report, 'error', 'invalid-reference', `Invalid URL or path: ${reference.raw}`, context);
    return;
  }
  if (classified.kind === 'ignored') return;

  if (classified.kind === 'local' && !classified.path && classified.fragment) {
    if (!getFragmentTarget(ownerDocument.document, classified.fragment)) {
      addIssue(report, 'error', 'broken-fragment', `Missing fragment #${classified.fragment} in ${ownerDocument.file}.`, context);
    }
    return;
  }

  const target = getTargetFile(classified, reference.ownerFile, fileSet, basePath);
  if (target.invalidEncoding) {
    addIssue(report, 'error', 'invalid-reference', `URL contains invalid encoding: ${reference.raw}`, context);
    return;
  }
  if (!target.file) {
    addIssue(report, 'error', 'broken-reference', `Missing generated target for ${reference.raw}.`, context);
    return;
  }

  if (classified.fragment && path.posix.extname(target.file).toLowerCase() === '.html') {
    const targetDocument = documents.get(target.file);
    if (targetDocument && !getFragmentTarget(targetDocument.document, classified.fragment)) {
      addIssue(report, 'error', 'broken-fragment', `Missing fragment #${classified.fragment} in ${target.file}.`, context);
    }
  }
}

function lineNumberAt(value, index) {
  return value.slice(0, index).split('\n').length;
}

function checkDocument(report, routeInfo, documents, fileSet, options) {
  const { document, file, route } = routeInfo;
  const context = issueContext(route, file);

  if (!document.lang.trim()) addIssue(report, 'error', 'missing-language', 'The html element needs a non-empty lang attribute.', context);
  if (document.mainElements.length !== 1) {
    addIssue(report, 'error', 'main-landmark-count', `Expected exactly one main landmark; found ${document.mainElements.length}.`, context);
  }
  if (document.mainText.length < 40) {
    addIssue(report, 'error', 'thin-content', 'The rendered main landmark has less than 40 characters of text.', context);
  }
  if (document.titleElements.length !== 1 || !document.title) {
    addIssue(report, 'error', 'title-count', `Expected exactly one non-empty title; found ${document.titleElements.length}.`, context);
  }
  if (document.descriptionMetas.length !== 1 || document.description.trim() === '') {
    addIssue(report, 'error', 'description-count', `Expected exactly one non-empty meta name="description"; found ${document.descriptionMetas.length}.`, context);
  }
  if (document.description.trim().length < 50 || document.description.trim().length > 170) {
    addIssue(report, 'warning', 'description-length', 'Meta description is outside the practical 50–170 character range.', context);
  }
  if (document.title.length < 10 || document.title.length > 70) {
    addIssue(report, 'warning', 'title-length', 'Title is outside the practical 10–70 character range.', context);
  }
  if (document.canonicalLinks.length !== 1) {
    addIssue(report, 'error', 'canonical-count', `Expected exactly one canonical link; found ${document.canonicalLinks.length}.`, context);
  }
  const canonical = document.canonicalLinks[0]?.attributes.href || '';
  if (canonical) {
    let parsed;
    try {
      parsed = new URL(canonical);
    } catch {
      addIssue(report, 'error', 'canonical-url', `Canonical must be an absolute HTTP(S) URL: ${canonical}`, context);
    }
    if (parsed && !['http:', 'https:'].includes(parsed.protocol)) {
      addIssue(report, 'error', 'canonical-url', `Canonical must be an absolute HTTP(S) URL: ${canonical}`, context);
    }
    if (parsed?.hash || parsed?.search) {
      addIssue(report, 'error', 'canonical-url', 'Canonical URLs must not contain a query string or fragment.', context);
    }
    const expected = expectedCanonical(options.site, route, options.basePath);
    if (expected && parsed && urlKey(parsed.href, options) !== urlKey(expected, options)) {
      addIssue(report, 'error', 'canonical-route-mismatch', `Canonical ${parsed.href} does not match generated route ${expected}.`, context);
    }
  }
  if (document.h1s.length !== 1 || !document.h1Text) {
    addIssue(report, 'error', 'h1-count', `Expected exactly one non-empty h1; found ${document.h1s.length}.`, context);
  }
  if (!document.ogTitle || !document.ogDescription || !document.ogImage) {
    addIssue(report, 'error', 'social-metadata', 'Each generated route needs og:title, og:description, and an image (og:image or twitter:image).', context);
  }
  const mainId = document.mainElements[0]?.attributes.id;
  const skipPattern = mainId ? new RegExp(`<a\\b[^>]*href\\s*=\\s*["']#${mainId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i') : null;
  if (!skipPattern || !skipPattern.test(document.html)) {
    addIssue(report, 'warning', 'skip-link', 'No skip link targeting the primary main landmark was found.', context);
  }

  const seenIds = [...document.ids.entries()].filter(([, count]) => count > 1);
  for (const [id] of seenIds) addIssue(report, 'error', 'duplicate-id', `Duplicate fragment id/name: ${id}`, context);

  let previousHeading = 0;
  for (const heading of document.headings) {
    if (previousHeading && heading.level > previousHeading + 1) {
      addIssue(report, 'warning', 'heading-order', `Heading level h${heading.level} follows h${previousHeading} without an intervening level.`, context);
    }
    previousHeading = heading.level;
  }

  for (const image of document.images) {
    const imageContext = issueContext(route, file, { source: 'img', value: image.attributes.src || '' });
    if (!('alt' in image.attributes)) {
      addIssue(report, 'error', 'image-alt', 'Every img element needs an alt attribute; use alt="" only for decorative media.', imageContext);
    }
    if (!image.attributes.src) addIssue(report, 'error', 'image-src', 'Every img element needs a non-empty src.', imageContext);
    if (!image.attributes.width || !image.attributes.height) {
      addIssue(report, 'warning', 'image-dimensions', 'Image is missing intrinsic width and/or height attributes.', imageContext);
    }
  }
  for (const iframe of document.iframes) {
    if (!iframe.attributes.title?.trim()) addIssue(report, 'error', 'iframe-title', 'Every iframe needs a non-empty title.', issueContext(route, file, { source: 'iframe' }));
  }
  for (const video of document.videos) {
    if (!('controls' in video.attributes)) addIssue(report, 'warning', 'video-controls', 'Video media should expose native controls or a documented accessible alternative.', issueContext(route, file, { source: 'video' }));
  }
  for (const audio of document.audios) {
    if (!('controls' in audio.attributes)) addIssue(report, 'warning', 'audio-controls', 'Audio media should expose native controls or a documented accessible alternative.', issueContext(route, file, { source: 'audio' }));
  }
  if (document.videos.length && !document.tracks.some((track) => (track.attributes.kind || '').toLowerCase() === 'captions')) {
    addIssue(report, 'warning', 'video-captions', 'Video route has no captions track.', issueContext(route, file, { source: 'video' }));
  }

  for (const anchor of document.anchors) {
    const anchorContext = issueContext(route, file, { source: 'a', value: anchor.attributes.href || '' });
    if (!anchor.attributes.href) {
      addIssue(report, 'warning', 'anchor-without-href', 'Anchor without href is not a usable link.', anchorContext);
    }
    const text = stripNonContent(anchor.inner) || anchor.attributes['aria-label'] || anchor.attributes.title || '';
    if (!text.trim()) addIssue(report, 'error', 'link-name', 'Every link needs visible text or an accessible name.', anchorContext);
    if (GENERIC_LINK_TEXT.test(text.trim())) addIssue(report, 'warning', 'generic-link-text', `Link text is not descriptive: ${text.trim()}`, anchorContext);
  }

  const contentValues = [
    document.visibleText,
    document.title,
    document.description,
    document.ogTitle,
    document.ogDescription,
    document.h1Text,
    ...document.images.map((image) => image.attributes.alt || ''),
    ...document.anchors.map((anchor) => anchor.attributes['aria-label'] || anchor.attributes.title || ''),
  ];
  for (const pattern of PLACEHOLDER_COPY_PATTERNS) {
    if (contentValues.some((value) => pattern.test(value))) {
      addIssue(report, 'error', 'placeholder-copy', `Placeholder copy matched ${pattern}:`, context);
    }
  }

  const renderedUrls = [...document.html.matchAll(/(?:https?:)?\/\/[^\s"'<>]+/gi)].map((match) => match[0]);
  for (const value of renderedUrls) {
    if (isPlaceholderUrl(value)) addIssue(report, 'error', 'placeholder-url', `Placeholder or temporary URL in rendered HTML: ${value}`, issueContext(route, file, { source: 'rendered-html', value }));
  }

  const references = collectDocumentReferences(document, file);
  for (const reference of references) checkReference(report, reference, routeInfo, documents, fileSet, options);
  return references;
}

function addCssIssues(report, css, relativeFile) {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const patterns = [
    {
      code: 'viewport-width-hook',
      pattern: /\b(?:width|min-width)\s*:\s*(?:100vw|calc\([^;{}]*100vw[^;{}]*\))/gi,
      message: 'CSS uses a viewport width directly; verify it cannot create horizontal overflow at narrow widths.',
    },
    {
      code: 'fixed-wide-element',
      pattern: /\b(?:width|min-width)\s*:\s*\d{4,}px\b/gi,
      message: 'CSS contains a fixed width of at least 1000px, which is an obvious narrow-viewport overflow risk.',
    },
    {
      code: 'nowrap-hook',
      pattern: /\bwhite-space\s*:\s*nowrap\b/gi,
      message: 'CSS uses nowrap; verify the content can wrap or scroll intentionally on mobile.',
    },
  ];
  for (const item of patterns) {
    let match;
    while ((match = item.pattern.exec(withoutComments)) !== null) {
      addIssue(report, 'warning', item.code, item.message, {
        file: relativeFile,
        line: lineNumberAt(withoutComments, match.index),
      });
    }
  }

  if (/(?:^|[,\s])(?:html|body)[^{]*\{[^}]*\boverflow-x\s*:\s*hidden\b/i.test(withoutComments)) {
    addIssue(report, 'warning', 'overflow-suppression', 'Global overflow-x:hidden can conceal a real layout defect; verify the page at narrow widths.', { file: relativeFile });
  }
}

function buildRouteLedger(routeInfos, report) {
  return {
    schemaVersion: 1,
    routeCount: routeInfos.length,
    routes: routeInfos.map((routeInfo) => {
      const { document, file, route } = routeInfo;
      const routeIssues = report.issues.filter((issue) => issue.route === route);
      return {
        route,
        file: normalizeRelativePath(file),
        indexable: routeInfo.indexable,
        title: document.title,
        description: normalizeText(document.description),
        canonical: document.canonicalLinks[0]?.attributes.href || null,
        h1: document.h1Text,
        links: {
          total: routeInfo.references.filter((reference) => reference.kind === 'anchor').length,
          internal: routeIssues.filter((issue) => issue.code === 'broken-reference' && issue.source === 'a').length === 0,
        },
        media: {
          images: document.images.length,
          imagesMissingAlt: routeIssues.filter((issue) => issue.code === 'image-alt').length,
          imagesMissingDimensions: routeIssues.filter((issue) => issue.code === 'image-dimensions').length,
        },
        issueCount: routeIssues.length,
      };
    }),
  };
}

async function readManifest(manifestPath) {
  if (!manifestPath) return null;
  try {
    const content = await fs.readFile(manifestPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw new Error(`Unable to read legacy manifest ${manifestPath}: ${error.message}`);
  }
}

function pathMatchesSet(relativeFile, values = []) {
  const normalized = normalizeRelativePath(relativeFile);
  return values.map(normalizeRelativePath).includes(normalized);
}

function basenameMatchesSet(relativeFile, values = []) {
  const basename = path.posix.basename(normalizeRelativePath(relativeFile));
  return values.includes(basename);
}

async function auditLegacyTree(report, root, manifest, stage, { skipDirectories = new Set() } = {}) {
  if (!root || !manifest) return;
  const files = await walkFiles(root, { skipDirectories });
  const sourcePaths = manifest.legacySourcePaths || [];
  const assetNames = manifest.legacyAssetNames || [];
  const assetHashes = new Set(Object.values(manifest.legacyAssetHashes || {}));
  const htmlHashes = new Set(manifest.legacyHtmlHashes || []);
  const copyMarkers = (manifest.legacyCopy || []).map(normalizeComparableText).filter(Boolean);

  for (const absolute of files) {
    const relativeFile = normalizeRelativePath(path.relative(root, absolute));
    let buffer;
    try {
      buffer = await fs.readFile(absolute);
    } catch (error) {
      if (error.code === 'ENOENT') {
        addIssue(report, 'error', 'audit-race', `File disappeared while auditing the ${stage}: ${relativeFile}`, { file: relativeFile });
        continue;
      }
      throw error;
    }
    const hash = sha256(buffer);
    if (stage === 'source' && pathMatchesSet(relativeFile, sourcePaths)) {
      addIssue(report, 'error', 'legacy-source-path', `Legacy source artifact remains after cutover: ${relativeFile}`, { file: relativeFile });
    }
    if (basenameMatchesSet(relativeFile, assetNames)) {
      addIssue(report, 'error', 'legacy-asset-name', `Legacy asset filename remains after cutover: ${relativeFile}`, { file: relativeFile });
    }
    if (assetHashes.has(hash)) {
      addIssue(report, 'error', 'legacy-asset-hash', `A legacy asset was copied or renamed into the ${stage}: ${relativeFile}`, { file: relativeFile });
    }
    if (htmlHashes.has(hash)) {
      addIssue(report, 'error', 'legacy-html-hash', `A legacy HTML document was copied into the ${stage}: ${relativeFile}`, { file: relativeFile });
    }
    if (!isLikelyTextFile(relativeFile)) continue;
    let text;
    try {
      text = await fs.readFile(absolute, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        addIssue(report, 'error', 'audit-race', `File disappeared while auditing the ${stage}: ${relativeFile}`, { file: relativeFile });
        continue;
      }
      throw error;
    }
    const comparable = normalizeComparableText(text);
    for (const marker of copyMarkers) {
      if (comparable.includes(marker)) {
        addIssue(report, 'error', 'legacy-copy', `Known legacy copy remains in ${stage}: ${relativeFile}`, { file: relativeFile, marker });
      }
    }
  }
}

async function auditSitemap(report, routeInfos, fileSet, buildRoot, options) {
  if (!options.requireSitemap) return;
  const sitemapCandidates = ['sitemap.xml', 'sitemap-index.xml'].filter((file) => fileSet.has(file));
  if (!sitemapCandidates.length) {
    addIssue(report, 'error', 'missing-sitemap', 'No sitemap.xml or sitemap-index.xml was emitted with the production build.');
    return;
  }

  const visited = new Set();
  const locations = [];
  const queue = [...sitemapCandidates];
  while (queue.length) {
    const relativeFile = queue.shift();
    if (visited.has(relativeFile)) continue;
    visited.add(relativeFile);
    let content;
    try {
      content = await fs.readFile(path.join(buildRoot, relativeFile), 'utf8');
    } catch (error) {
      addIssue(report, 'error', 'sitemap-read', `Unable to read ${relativeFile}: ${error.message}`, { file: relativeFile });
      continue;
    }
    const locs = [...content.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => decodeHtml(match[1].trim()));
    if (/<sitemapindex\b/i.test(content)) {
      for (const loc of locs) {
        const parsed = classifyReference(loc, options);
        if (parsed.kind === 'local') {
          const target = getTargetFile(parsed, relativeFile, fileSet, options.basePath);
          if (target.file && target.file.endsWith('.xml')) queue.push(target.file);
          else addIssue(report, 'error', 'sitemap-reference', `Sitemap index references missing child sitemap: ${loc}`, { file: relativeFile });
        } else {
          addIssue(report, 'error', 'sitemap-reference', `Sitemap index references an external child sitemap: ${loc}`, { file: relativeFile });
        }
      }
    } else {
      locations.push(...locs);
    }
  }

  const canonicalMap = new Map();
  for (const routeInfo of routeInfos) {
    const canonical = routeInfo.document.canonicalLinks[0]?.attributes.href;
    const key = canonical ? urlKey(canonical, options) : null;
    if (key) canonicalMap.set(key, routeInfo);
  }
  const sitemapKeys = new Map();
  for (const location of locations) {
    const key = urlKey(location, options);
    if (!key) {
      addIssue(report, 'error', 'sitemap-host', `Sitemap URL is not on the configured site: ${location}`);
      continue;
    }
    if (sitemapKeys.has(key)) addIssue(report, 'error', 'sitemap-duplicate', `Duplicate sitemap URL: ${location}`);
    sitemapKeys.set(key, location);
    if (!canonicalMap.has(key)) addIssue(report, 'error', 'sitemap-extra-route', `Sitemap URL has no matching generated route: ${location}`);
    else if (!canonicalMap.get(key).indexable) addIssue(report, 'error', 'sitemap-noindex', `Noindex/error route is included in the sitemap: ${location}`);
  }
  for (const [key, routeInfo] of canonicalMap) {
    if (routeInfo.indexable && !sitemapKeys.has(key)) {
      addIssue(report, 'error', 'route-missing-from-sitemap', `Generated route ${routeInfo.route} is absent from the sitemap.`);
    }
  }
}

async function auditRobots(report, fileSet, buildRoot, options) {
  const robotsFile = [...fileSet].find((file) => file === 'robots.txt');
  if (!robotsFile) {
    if (options.requireRobots) addIssue(report, 'error', 'missing-robots', 'No robots.txt was emitted with the production build.');
    else addIssue(report, 'warning', 'missing-robots', 'No robots.txt was emitted with the production build.');
    return;
  }
  const content = await fs.readFile(path.join(buildRoot, robotsFile), 'utf8');
  const sitemapLines = [...content.matchAll(/^\s*sitemap\s*:\s*(\S+)\s*$/gim)].map((match) => match[1]);
  if (options.requireSitemap && !sitemapLines.length) addIssue(report, 'error', 'robots-sitemap', 'robots.txt does not advertise a sitemap URL.', { file: robotsFile });
  for (const sitemap of sitemapLines) {
    if (isPlaceholderUrl(sitemap)) addIssue(report, 'error', 'placeholder-url', `robots.txt contains a placeholder sitemap URL: ${sitemap}`, { file: robotsFile });
    const key = urlKey(sitemap, options);
    if (key && !key.endsWith('/sitemap.xml') && !key.endsWith('/sitemap-index.xml')) {
      addIssue(report, 'warning', 'robots-sitemap-path', `robots.txt points at an unexpected sitemap path: ${sitemap}`, { file: robotsFile });
    }
  }
  if (/^\s*disallow\s*:\s*\/\s*$/im.test(content)) addIssue(report, 'warning', 'robots-block-all', 'robots.txt disallows the entire site; confirm this is intentional for production.', { file: robotsFile });
}

function parseRouteInfo(relativeFile, html) {
  const document = extractDocument(html);
  const robots = document.robots.toLowerCase();
  return {
    file: relativeFile,
    route: routePathForFile(relativeFile),
    document,
    indexable: !isErrorRoute(relativeFile) && !robots.includes('noindex'),
    references: [],
  };
}

function compareRouteInfos(left, right) {
  if (left.route === '/') return right.route === '/' ? 0 : -1;
  if (right.route === '/') return 1;
  return left.route.localeCompare(right.route);
}

export async function auditProduction({
  buildRoot = DEFAULT_BUILD_ROOT,
  sourceRoot = null,
  site = null,
  basePath = '/',
  strict = false,
  requireSitemap = true,
  requireRobots = false,
  legacyManifest = null,
} = {}) {
  const resolvedBuildRoot = path.resolve(buildRoot);
  const report = {
    buildRoot: resolvedBuildRoot,
    sourceRoot: sourceRoot ? path.resolve(sourceRoot) : null,
    strict,
    issues: [],
    routes: [],
    ledger: null,
  };

  let siteUrl;
  try {
    siteUrl = parseSite(site);
  } catch (error) {
    addIssue(report, 'error', 'site-option', error.message);
    return finalizeReport(report);
  }
  const options = { site: siteUrl, basePath: normalizeBasePath(basePath), requireSitemap, requireRobots };

  let buildStat;
  try {
    buildStat = await fs.stat(resolvedBuildRoot);
  } catch {
    addIssue(report, 'error', 'build-missing', `Production build directory does not exist: ${resolvedBuildRoot}`);
    return finalizeReport(report);
  }
  if (!buildStat.isDirectory()) {
    addIssue(report, 'error', 'build-root', `Production build path is not a directory: ${resolvedBuildRoot}`);
    return finalizeReport(report);
  }

  const buildFiles = await walkFiles(resolvedBuildRoot, { skipDirectories: new Set(['.git', 'node_modules']) });
  const relativeBuildFiles = buildFiles.map((file) => normalizeRelativePath(path.relative(resolvedBuildRoot, file)));
  const fileSet = new Set(relativeBuildFiles);
  const htmlFiles = relativeBuildFiles.filter((file) => ROUTE_EXTENSIONS.has(path.posix.extname(file).toLowerCase()));
  if (!htmlFiles.length) addIssue(report, 'error', 'no-routes', 'No generated .html routes were found in the production build.');

  const documents = new Map();
  const routeInfos = [];
  for (const relativeFile of htmlFiles.sort()) {
    const html = await fs.readFile(path.join(resolvedBuildRoot, relativeFile), 'utf8');
    const routeInfo = parseRouteInfo(relativeFile, html);
    routeInfos.push(routeInfo);
    documents.set(relativeFile, routeInfo);
  }
  routeInfos.sort(compareRouteInfos);
  report.routes = routeInfos.map(({ route, file }) => ({ route, file }));

  if (legacyManifest) {
    await auditLegacyTree(report, resolvedBuildRoot, legacyManifest, 'build');
    if (sourceRoot) {
      const resolvedSourceRoot = path.resolve(sourceRoot);
      try {
        await fs.stat(resolvedSourceRoot);
        await auditLegacyTree(report, resolvedSourceRoot, legacyManifest, 'source', {
          skipDirectories: new Set(['.git', 'node_modules', 'dist', 'build', 'docs', 'tests', 'scripts']),
        });
      } catch (error) {
        addIssue(report, 'error', 'source-missing', `Source root could not be audited: ${error.message}`);
      }
    }
  }

  for (const routeInfo of routeInfos) {
    routeInfo.references = checkDocument(report, routeInfo, documents, fileSet, options);
  }

  const uniqueness = [
    ['title', (routeInfo) => normalizeComparableText(routeInfo.document.title)],
    ['description', (routeInfo) => normalizeComparableText(routeInfo.document.description)],
    ['h1', (routeInfo) => normalizeComparableText(routeInfo.document.h1Text)],
    ['canonical', (routeInfo) => {
      const value = routeInfo.document.canonicalLinks[0]?.attributes.href;
      return value ? urlKey(value, options) || normalizeComparableText(value) : '';
    }],
  ];
  for (const [name, getter] of uniqueness) {
    const seen = new Map();
    for (const routeInfo of routeInfos) {
      const value = getter(routeInfo);
      if (!value) continue;
      if (seen.has(value)) {
        addIssue(report, 'error', `duplicate-${name}`, `${name} is duplicated by ${seen.get(value)} and ${routeInfo.route}.`, issueContext(routeInfo.route, routeInfo.file));
      } else {
        seen.set(value, routeInfo.route);
      }
    }
  }

  for (const absolute of buildFiles) {
    const relativeFile = normalizeRelativePath(path.relative(resolvedBuildRoot, absolute));
    if (path.posix.extname(relativeFile).toLowerCase() !== '.css') continue;
    const css = await fs.readFile(absolute, 'utf8');
    addCssIssues(report, css, relativeFile);
    for (const reference of collectCssReferences(css, relativeFile)) {
      checkReference(report, reference, { route: '(stylesheet)', file: relativeFile }, documents, fileSet, options);
    }
  }

  await auditSitemap(report, routeInfos, fileSet, resolvedBuildRoot, options);
  await auditRobots(report, fileSet, resolvedBuildRoot, options);

  report.ledger = buildRouteLedger(routeInfos, report);
  return finalizeReport(report);
}

function finalizeReport(report) {
  report.summary = {
    routes: report.routes.length,
    errors: report.issues.filter((issue) => issue.severity === 'error').length,
    warnings: report.issues.filter((issue) => issue.severity === 'warning').length,
  };
  report.ok = report.summary.errors === 0 && (!report.strict || report.summary.warnings === 0);
  return report;
}

function printUsage() {
  console.log(`Usage: node scripts/audit-production.mjs [options]

Audit a prerendered Astro output directory (default: dist).

Options:
  --build <dir>             Production output directory (default: dist)
  --source <dir>            Source tree to scan for known legacy artifacts/copy
  --site <url>              Site origin/base used for canonical and sitemap checks
  --base <path>             Astro base path (default: /)
  --legacy-manifest <file>  Cutover markers (default: docs/quality/legacy-cutover.json)
  --ledger <file>           Write the discovered route ledger as JSON
  --json <file>             Write the full audit report as JSON
  --no-sitemap              Skip sitemap coverage checks
  --require-robots          Make a missing robots.txt an error (otherwise warning)
  --strict                  Treat warnings as failures
  --help                    Show this help
`);
}

function parseArgs(argv) {
  const options = {
    buildRoot: DEFAULT_BUILD_ROOT,
    sourceRoot: null,
    site: null,
    basePath: '/',
    strict: false,
    requireSitemap: true,
    requireRobots: false,
    legacyManifestPath: DEFAULT_LEGACY_MANIFEST,
    ledgerPath: null,
    jsonPath: null,
    help: false,
  };
  let positionalBuild = false;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const next = () => {
      if (index + 1 >= argv.length) throw new Error(`Missing value for ${argument}`);
      index += 1;
      return argv[index];
    };
    if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument === '--build') options.buildRoot = next();
    else if (argument === '--source') options.sourceRoot = next();
    else if (argument === '--site') options.site = next();
    else if (argument === '--base') options.basePath = next();
    else if (argument === '--legacy-manifest') options.legacyManifestPath = next();
    else if (argument === '--ledger') options.ledgerPath = next();
    else if (argument === '--json') options.jsonPath = next();
    else if (argument === '--no-sitemap') options.requireSitemap = false;
    else if (argument === '--require-robots') options.requireRobots = true;
    else if (argument === '--strict') options.strict = true;
    else if (argument.startsWith('-')) throw new Error(`Unknown option: ${argument}`);
    else if (!positionalBuild) {
      options.buildRoot = argument;
      positionalBuild = true;
    } else {
      throw new Error(`Unexpected positional argument: ${argument}`);
    }
  }
  return options;
}

async function writeJson(file, value) {
  const resolved = path.resolve(file);
  await fs.mkdir(path.dirname(resolved), { recursive: true });
  await fs.writeFile(resolved, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function printReport(report) {
  console.log(`Production route audit: ${report.buildRoot}`);
  console.log(`Generated HTML routes: ${report.summary.routes}`);
  if (report.routes.length) console.log(`Routes: ${report.routes.map((route) => route.route).join(', ')}`);
  for (const issue of report.issues) {
    const location = issue.file ? ` (${issue.file}${issue.line ? `:${issue.line}` : ''})` : '';
    const route = issue.route ? ` [${issue.route}]` : '';
    console.log(`${issue.severity.toUpperCase()} ${issue.code}${route}${location}: ${issue.message}`);
  }
  const status = report.ok ? 'PASS' : 'FAIL';
  console.log(`${status}: ${report.summary.errors} error(s), ${report.summary.warnings} warning(s).`);
}

export async function runCli(argv = process.argv.slice(2)) {
  let options;
  try {
    options = parseArgs(argv);
  } catch (error) {
    console.error(`Argument error: ${error.message}`);
    printUsage();
    return 2;
  }
  if (options.help) {
    printUsage();
    return 0;
  }

  let legacyManifest = null;
  if (options.legacyManifestPath && options.legacyManifestPath !== 'none') {
    try {
      legacyManifest = await readManifest(path.resolve(options.legacyManifestPath));
      if (!legacyManifest) {
        console.error(`Legacy cutover manifest is required but was not found: ${options.legacyManifestPath}`);
        return 2;
      }
    } catch (error) {
      console.error(error.message);
      return 2;
    }
  }

  let report;
  try {
    report = await auditProduction({ ...options, legacyManifest });
  } catch (error) {
    console.error(`Audit error: ${error.stack || error.message}`);
    return 2;
  }
  if (options.ledgerPath && report.ledger) await writeJson(options.ledgerPath, report.ledger);
  if (options.jsonPath) await writeJson(options.jsonPath, report);
  printReport(report);
  return report.ok ? 0 : 1;
}

const invokedScript = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (invokedScript === path.resolve(fileURLToPath(import.meta.url))) {
  const exitCode = await runCli();
  process.exitCode = exitCode;
}

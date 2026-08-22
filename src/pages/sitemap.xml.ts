import {
  allVisaCategories,
  allVisaFamilies,
  categoryPath,
  familyPath,
} from '../data/visa-categories';

export const prerender = true;

const staticRoutes = [
  '/',
  '/about.html',
  '/articles.html',
  '/blog.html',
  '/briefs.html',
  '/contacts.html',
  '/e-verify.html',
  '/employers.html',
  '/guides/evidence-checklists.html',
  '/guides/f-1-readiness.html',
  '/guides/opt.html',
  '/guides/stem-opt.html',
  '/international-rd-scholars.html',
  '/media-gallery.html',
  '/official-tools.html',
  '/other-pages.html',
  '/pricing.html',
  '/services.html',
  '/tips-faq.html',
  '/visa.html',
  '/visa-categories.html',
  '/visa/immigrant.html',
  '/visa/nonimmigrant.html',
] as const;

const xmlEscape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function GET() {
  const routes = [
    ...staticRoutes,
    ...allVisaFamilies.map(familyPath),
    ...allVisaCategories.map(categoryPath),
  ];
  const uniqueRoutes = [...new Set(routes)].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueRoutes.map((route) => `  <url><loc>${xmlEscape(new URL(route, 'https://usiva.org').href)}</loc></url>`),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

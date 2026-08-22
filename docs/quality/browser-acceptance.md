# Browser acceptance record

This record captures the browser-level acceptance performed for the aggressive Astro 7 cutover on 2026-08-22. The release owner is the USIVA repository integration owner.

## Production output checked

- Static output: `dist/` from the locked Astro 7.2.4 build.
- Browser: Chromium 145 through Playwright 1.58.0.
- Accessibility: axe-core 4.13.0 with the WCAG 2 A and AA rule sets.
- Viewports: 390 × 844 and 1440 × 844.
- Routes: the public route sample plus generated visa families/categories; the static build currently emits 163 HTML routes.

## Acceptance results

- Every route returned HTTP 200 from a local static server.
- Every route had exactly one `main` landmark and one `h1`.
- The custom `/404.html` route also returned successfully and passed the same landmark, overflow, console, and axe checks.
- No console errors or failed local asset requests were observed.
- No horizontal overflow was observed at either viewport.
- axe reported no WCAG 2 A or AA violations on any route.
- The strict rendered-output audit passed with zero errors and zero warnings.
- The home, visa-category, service, FAQ, media-gallery, and employer routes were visually inspected at desktop and mobile widths. Generated project photography, captions, compact headings, mega-menu shell, route cards, and official-source rails remain legible.

This is a release evidence record, not a runtime dependency. The source and production gates run in both deployment jobs; repeat this browser acceptance after a material layout, component, or accessibility change.

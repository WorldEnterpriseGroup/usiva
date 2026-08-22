# Browser acceptance record

This record captures the integrated USIVA Astro redesign review performed on 2026-08-22. It covers the fresh static output after the compact-header, identity, color, accessibility, and editorial changes.

## Production output checked

- Static output: `dist/` from the locked Astro 7.2.4 build.
- Browser: Chromium-compatible system browser driven through Playwright.
- Viewports: 390 × 844 and 1440 × 900; a 320px narrow-width sample was also checked.
- Routes: every emitted HTML route — 163 total, including 162 indexable routes and `/404.html`.

## Acceptance results

- Every route returned HTTP 200 from a local static server.
- Every route had exactly one `main` landmark and one `h1`, with a working skip-link target.
- No page or console errors appeared in the normal mobile and desktop sweep.
- No horizontal overflow appeared at 390px or 1440px; the 320px sample also remained within the viewport.
- The restored SVG identity rendered in the shared header and footer.
- Family index routes were rechecked after reducing their heading scale and top spacing; their first useful content now enters the initial desktop viewport.
- The strict rendered-output audit passed with zero errors and zero warnings.
- `pnpm check`, `pnpm test`, and `pnpm build` passed; the build emitted all 163 routes.

This record documents browser and static-output checks. An executable axe-core harness is not configured in this repository, so no axe result is claimed here; add the automated assistive-technology pass before treating this as a complete WCAG release gate.

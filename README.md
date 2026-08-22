# USIVA — U.S. Immigration and Visa Association

USIVA is the US Council visa-readiness and compliance-planning companion to US Fellows. Its content is informational planning content. It does not guarantee admission, employment, funding, visa issuance, or government approval, and it does not replace individualized legal advice.

Source of truth: [US-Council/usiva on GitHub](https://github.com/US-Council/usiva). `main` is the only source branch for the public site. The public site is GitHub Pages at the configured `usiva.org` custom domain; this checkout does not claim that a deployment or DNS change has been completed.

## Branch and deployment model

| Branch | Role | Deployment |
| --- | --- | --- |
| `main` | Astro source, content, configuration, and tests | Builds the public artifact; it is not a GitLab Pages artifact |
| `demo` | Reviewed Astro source for internal preview | GitLab Pages only, with access control enabled by the project administrator |
| `gh-pages` | Generated static artifact | The only public GitHub Pages source, published from `/(root)` |

The GitLab pipeline runs only for `demo`; `main` is never treated as the GitLab demo artifact. The GitHub Actions workflow runs from `main`, builds the Astro site, writes `CNAME` and `.nojekyll`, verifies that assets are under `assets/` rather than `_astro/`, and replaces `gh-pages` with only `dist/`. Legacy HTML, PHP, assets, and mirror branches are not inputs to either deployment.

See the [deployment runbook](docs/deployment/README.md) for the exact artifact contract, rollback procedure, and DNS checklist.

## Astro development

Use Node.js 22.13.0, pnpm 11.22.0, and the committed pnpm lockfile. From a clean checkout:

```bash
corepack enable
corepack install --global pnpm@11.22.0
pnpm install --frozen-lockfile --config.allowBuilds.esbuild=true
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
```

`pnpm run build` must produce a static `dist/` directory. Before merging deployment changes, confirm that `dist/index.html` exists, `dist/assets/` exists, and `dist/_astro/` does not. Do not run an unfrozen install for routine setup because it can rewrite the lockfile.

## Authoring routes and content

- Add file-based routes under `src/pages/`. The file path is the URL contract; preserve the existing trailing-slash and canonical URL policy. Dynamic routes such as `src/pages/articles/[slug].astro` must enumerate every publishable entry with `getStaticPaths()` and exclude drafts.
- Add editorial entries under the appropriate `src/content/` collection. Keep collection schemas and required metadata in `src/content.config.ts`; use validated fields for title, description, publication state, dates, authors, relationships, canonical URLs, and image alt text.
- Put processable editorial media in `src/assets/` and use Astro's asset pipeline. Use `public/` only for exact-copy files such as favicons, manifests, verification files, or downloads. The Astro configuration must keep generated assets in `assets/`, not the underscore-prefixed `_astro/` directory.
- Keep page files thin: select typed content and compose existing layouts/components. Add a component only when the semantic pattern is reused; add client hydration only when a real interaction requires it.
- For every new route or collection entry, run `pnpm run check`, `pnpm run build`, and the relevant route/accessibility tests. Inspect the built route rather than relying only on source compilation.

Do not put secrets, tokens, private URLs, or DNS credentials in content, source, workflow files, or documentation.

## Rollback and DNS

To roll back a public change, revert the approved bad commit on `main` and let the public workflow rebuild `gh-pages`:

```bash
git switch main
git pull --ff-only https://github.com/US-Council/usiva.git main
git revert <bad-main-commit>
git push https://github.com/US-Council/usiva.git main
# Update the GitLab source mirror as well when the rollback is complete.
git push https://git.developerdojo.org/US-Council/usiva.git main
```

Do not restore legacy files or manually edit `gh-pages`. Configure GitHub Pages to deploy `gh-pages` from the repository root and set its custom domain to `usiva.org`; use the DNS provider targets shown by GitHub for the apex domain and point any `www` CNAME directly to the organization's GitHub Pages host. Keep the internal GitLab Pages URL out of public DNS. See the [deployment runbook](docs/deployment/README.md) for verification steps and the distinction between source configuration, a successful workflow, and a verified live site.

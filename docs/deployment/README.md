# Deployment runbook

USIVA's source of truth is the [US-Council/usiva repository](https://github.com/US-Council/usiva). The repository has one Astro source branch and two deliberately different deployment targets:

| Branch | Purpose | Visibility | Contents |
| --- | --- | --- | --- |
| `main` | Reviewable source of truth | Source access only | Astro source, content, configuration, and tests |
| `demo` | Internal GitLab Pages preview | Private/internal | The Astro source used for the demo build; GitLab publishes only this branch |
| `gh-pages` | Public GitHub Pages artifact | Public | Generated `dist/` contents only |

The old static site, legacy branch contents, and repository mirrors are not deployment inputs. Neither deployment job copies root-level legacy HTML, PHP, or unrelated assets. There is no public GitLab Pages artifact.

## Artifact contract

Both deployment jobs run the same locked build contract:

1. Require `package.json` and `pnpm-lock.yaml`.
2. Use Node.js `22.13.0` and install pnpm `11.22.0`.
3. Run `pnpm install --frozen-lockfile --config.allowBuilds.esbuild=true`; this explicitly permits only Astro's esbuild dependency to run its build step.
4. Run `pnpm run build`, `pnpm run check`, `pnpm test`, `pnpm run audit`, and `pnpm audit --prod`.
5. Require `dist/index.html` and `dist/assets/`.
6. Fail if Astro emits `_astro/`; `astro.config.*` must set `build.assets` to the non-underscore directory `assets`.
7. Publish only the resulting static output.

The public GitHub artifact then writes exactly `usiva.org` to its root `CNAME` and an empty root `.nojekyll`. The internal GitLab demo artifact removes any `CNAME` copied from source and writes only `.nojekyll`, so the public domain cannot be routed to the internal Pages site.

The GitHub workflow creates an orphan `gh-pages` commit from this directory and force-replaces that branch. This is intentional: the branch is an artifact, not a second source tree, and it must not retain legacy files. The workflow uses only the repository-provided `GITHUB_TOKEN`; no long-lived token or DNS credential is stored in the repository.

## GitLab demo deployment

`.gitlab-ci.yml` has an explicit `demo` rule at both pipeline and job level. A push to `main` cannot create the GitLab Pages deployment, and a push to another branch cannot publish it. The `deploy-demo-pages` job exposes the internal Pages URL without presenting it as the public site.

The GitLab project administrator must enable Pages access control and set the project visibility/access level to the intended private or internal audience. The CI file also makes the demo artifact `noindex`, disallows crawling, and removes its sitemap as defense in depth; it cannot replace the GitLab instance and project access-control settings. See [GitLab Pages access control](https://docs.gitlab.com/user/project/pages/pages_access_control/).

To promote a reviewed source revision to the demo branch, update `demo` with the Astro source revision that should be previewed and let the `deploy-demo-pages` job finish. Do not copy the generated `dist/` directory into source control and do not point `usiva.org` at this URL.

## Public GitHub Pages deployment

The workflow at [`.github/workflows/publish-pages.yml`](../../.github/workflows/publish-pages.yml) runs on pushes to `main` and on a manual run started from `main`. It checks out `main`, builds the Astro site, validates the artifact contract, and replaces `gh-pages` with only the sealed output.

Configure the GitHub repository's Pages settings once:

1. Open Settings → Pages for [US-Council/usiva](https://github.com/US-Council/usiva).
2. Select **Deploy from a branch**.
3. Select branch `gh-pages` and folder `/(root)`.
4. Set the custom domain to `usiva.org` and enable HTTPS after DNS is correct.
5. Do not select `main`, `demo`, or a GitHub Actions Pages artifact as the publishing source.

GitHub's branch-based Pages configuration is documented in [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). The workflow's `GITHUB_TOKEN` push does not trigger itself because it publishes only `gh-pages`; subsequent public publication is handled by the branch-based Pages setting.

Do not edit `gh-pages` by hand. A successful `main` workflow is the only supported way to replace the public artifact. A failed build leaves the previous `gh-pages` commit in place; it does not fall back to a legacy site.

## Rollback

The preferred rollback is a reviewed revert on `main`:

```bash
git switch main
git pull --ff-only https://github.com/US-Council/usiva.git main
git revert <bad-main-commit>
git push https://github.com/US-Council/usiva.git main
git push https://git.developerdojo.org/US-Council/usiva.git main
```

The public workflow then rebuilds the reverted source with the lockfile and replaces `gh-pages`. If a workflow failed before publishing, fix or revert `main` and rerun it from the `main` branch. Never restore the public site by copying files from an old branch or mirror.

If the source rollback itself is not yet approved, stop the public workflow and preserve the current `gh-pages` artifact while the change is reviewed. Record the relevant workflow run and commit SHA in the release ticket; do not put credentials or private deployment data in this repository.

## DNS and custom domain

`usiva.org` is the only domain written into the public artifact. Configure the domain in GitHub Pages before changing registrar records. For the apex domain, use the `ALIAS`, `ANAME`, or `A` targets shown by GitHub; if a `www` variant is needed, point its CNAME directly to the organization's GitHub Pages host, not to a repository path. Keep GitLab's internal Pages URL separate from public DNS.

DNS changes can take time to propagate. Verify DNS resolution, the GitHub Pages custom-domain setting, the HTTPS certificate, and representative `index.html`, CSS, and media responses after publication. This repository change does not verify a live deployment or DNS state.

See [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the current provider-specific target guidance.

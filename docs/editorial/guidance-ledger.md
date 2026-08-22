# USIVA content and source ledger

This is the editorial contract for the current USIVA site. It describes public orientation content; it is not a government approval, an eligibility engine, or a legal-service record.

**Review date:** 2026-08-22
**Cutover mode:** aggressive
**Build:** Astro 7.2.4, static output

## Public boundary

USIVA is not a law firm. The site provides informational planning, document organization, source navigation, employer-process orientation, and responsible handoff prompts. It does not provide legal advice or representation, decide eligibility, submit applications, collect passwords or case records, or guarantee admission, employment, funding, work authorization, visa issuance, or government approval.

Current USCIS, Department of State, DHS, school, sponsor, employer, consular, and qualified-counsel instructions control whenever they differ from a USIVA page.

## Route architecture

| Surface | Source of truth | Reader job |
| --- | --- | --- |
| `/visa.html` and `/visa-categories.html` | [`src/data/visa-categories.ts`](../../src/data/visa-categories.ts) | Start with travel purpose, compare temporary/permanent tracks, and follow the official source. |
| `/visa/nonimmigrant/*.html` | Typed nonimmigrant catalog + `getStaticPaths()` | One page for each published temporary route, including A-1/A-2/A-3, derivatives, NATO, TN, and other variants. |
| `/visa/immigrant/*.html` | Typed immigrant catalog + `getStaticPaths()` | One page for family, employment, adoption, special immigrant, diversity, K, returning-resident, and related routes. |
| `/official-tools.html` | [`src/data/official-resources.ts`](../../src/data/official-resources.ts) | Hand off live case, account, processing-time, visa, and employer questions to the responsible official system. |
| `/employers.html` and `/e-verify.html` | Official USCIS, E-Verify, and DOJ IER links | Separate Form I-9, E-Verify, and individualized immigration questions. |
| `/briefs.html` and `/articles.html` | [`src/data/briefs.ts`](../../src/data/briefs.ts) | Publish source-led explanations with a review date and visible limitations. |
| `/guides/*.html` | Focused F-1/OPT/STEM/evidence guides | Keep the useful student/work-planning material as a contained subset of the all-category site. |

The current build materializes 106 typed visa category records, 33 family indexes, and 163 HTML routes. The generated sitemap is emitted by [`src/pages/sitemap.xml.ts`](../../src/pages/sitemap.xml.ts) from the same typed route model so new categories cannot silently fall out of sitemap coverage.

## Official-source policy

Every category record carries an official source, review date, official next step, planning topics, and a non-legal scope note. The current source rail includes:

- [U.S. Department of State: Directory of Visa Categories](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html)
- [U.S. Department of State: Visa Wizard](https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wizard.html)
- [U.S. Department of State: Visa Bulletin](https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html)
- [USCIS Case Status Online](https://www.uscis.gov/casestatus) and [myUSCIS](https://my.uscis.gov/)
- [USCIS Case Status API documentation](https://developer.uscis.gov/api/case-status)
- [USCIS I-9 Central](https://www.uscis.gov/i-9-central)
- [E-Verify employer resources](https://www.e-verify.gov/employers)
- [DHS Office of Homeland Security Statistics Yearbook](https://ohss.dhs.gov/topics/immigration/yearbook)
- [Data.gov](https://data.gov/)

The site does not copy live visa-bulletin dates, processing estimates, case results, or private datasets into static content. Source-led articles explain how to read official publications and send readers back to the live authority.

## USCIS API boundary

The static site includes an API-ready contract and official handoffs in [`src/components/USCISStatusPanel.astro`](../../src/components/USCISStatusPanel.astro). The Case Status API uses OAuth 2.0 client credentials and approved access; keys must stay server-side. This repository contains no client secret, receipt-number input, proxy endpoint, or fake live result. A future backend may implement the documented contract only after USCIS access, privacy, authorization, rate limiting, and secure secret storage are in place.

## Media policy

Project photography is documented in [`src/data/media-manifest.ts`](../../src/data/media-manifest.ts). The six current images were generated for this project on 2026-08-22, reviewed for readable text/logos/PII, assigned accurate alt text and dimensions, and used only where the image clarifies a planning context. The old repository’s stock archive is not a production input because its provenance and licensing trail is incomplete.

## Editorial QA

Before publishing a material content change:

- keep one primary `h1`, useful headings, descriptive link labels, and a visible planning boundary;
- link time-sensitive claims to the official source that owns them and preserve the review date;
- do not infer personal eligibility, work authorization, admissibility, approval, or timing from a checklist or aggregate statistic;
- do not ask users to submit passwords, receipt numbers, identity documents, or private case records through this static site;
- keep US Fellows as a contained program reference rather than the USIVA identity; and
- run `pnpm run check`, `pnpm run build`, `pnpm run audit`, and `pnpm test`, then inspect representative desktop/mobile routes.

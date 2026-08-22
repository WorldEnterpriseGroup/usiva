# USIVA guidance cutover ledger

This human-readable ledger accompanies the typed machine-readable record in [`src/data/guidance-ledger.ts`](../../src/data/guidance-ledger.ts). It is the editorial contract for the new guidance family, not a record that a government agency, school, or lawyer has approved an individual case.

**Review date:** 2026-08-22

**Cutover mode:** aggressive

**Scope:** four new planning guides under `/guides/`

**Media policy:** no route-specific media is assigned until provenance, permission, alt text, dimensions, and editorial purpose are documented.

## Editorial boundary

USIVA guidance is informational planning content. It is not legal advice and does not guarantee admission, employment, funding, visa issuance, work authorization, or government approval. It does not replace individualized advice from qualified immigration counsel or a school’s designated school official (DSO). Agency, consulate, employer, and school instructions control when they differ from this content.

The guides organize questions and evidence. They do not provide an application service, collect personal documents, calculate a case-specific filing date, or decide eligibility.

## Route inventory

| Route | File | Reader job | Ready-reader next action | Early-reader next action | Media | Visual modes |
| --- | --- | --- | --- | --- | --- | --- |
| `/guides/f-1-readiness.html` | [`f-1-readiness.md`](../../src/pages/guides/f-1-readiness.md) | Organize school, identity, academic, funding, and authorization questions before relying on an F-1 plan. | Ask the admitted school’s DSO for current school-specific instructions; escalate personal history to qualified counsel. | Start a private evidence inventory and mark items that need primary-source or school confirmation. | None assigned. | Orientation thesis; four-question readiness sequence; evidence inventory table; escalation/source rail. |
| `/guides/opt.html` | [`opt.md`](../../src/pages/guides/opt.md) | Connect the proposed role, field of study, authorization record, and reporting record. | Bring the role description, academic record, dates, and questions to the DSO; verify live USCIS instructions. | Distinguish a possible field-related role from a general opportunity and record the missing evidence. | None assigned. | Decision thesis; field-and-timing record; student/school/employer evidence map; stop-and-verify/source rail. |
| `/guides/stem-opt.html` | [`stem-opt.md`](../../src/pages/guides/stem-opt.md) | Align degree/CIP, employer, training plan, supervision, and reporting facts. | Compare degree, employer, and training-plan facts with the DSO and current official STEM OPT resources. | Collect the degree record and written role description; identify unresolved employer/training facts. | None assigned. | Three-party thesis; alignment map; evidence ownership table; change-trigger/source rail. |
| `/guides/evidence-checklists.html` | [`evidence-checklists.md`](../../src/pages/guides/evidence-checklists.md) | Make records traceable by source, date, owner, and open question without calling the file a filing packet. | Review the inventory with the relevant DSO, school office, employer, agency, or qualified counsel. | Create a private index with record, source, checked date, owner, and next verification question. | None assigned. | Evidence thesis/privacy boundary; cross-stage inventory; ownership ledger; escalation/source rail. |

Each route has at least three meaningful visual modes recorded for the incoming page composition. The modes describe content geometry and reading behavior; they are not permission to invent metrics, decorative charts, or unsupported claims.

## Source basis

### Current target copy and repository context

| ID | Source | What it contributes | Treatment |
| --- | --- | --- | --- |
| `target-home-copy` | `index.html` | USIVA’s identity, documentation-first planning, F-1/assistantship/OPT/STEM OPT themes, and the high-stakes boundary. | Used as current target copy. |
| `target-rd-scholars-copy` | `international-rd-scholars.html` | Readiness packet categories, DSO coordination, work-authorization distinctions, role clarity, and existing primary-reference pattern. | Used as current target copy; rewritten into four distinct guide jobs. |
| `registry-description` | `README.md` repository description | Describes the site as a static USIVA visa-readiness and compliance-planning companion to US Fellows. No separate registry record is present in this checkout. | Context only; it does not establish eligibility, legal advice, or an application service. |
| `program-us-fellows` | [US Fellows International R&D Scholars Program](https://usfellows.org/international-rd-scholars.html) | Confirms the current target copy’s distinction between a research pathway and USIVA’s compliance-planning role. | Context only; no application steps or program promises are reproduced. |

### Official source rail

These links are visibly labeled as official government resources in the pages. The review date is the date the source was checked for route planning; live agency, consular, school, and employer instructions remain controlling.

| ID | Official source | Route use |
| --- | --- | --- |
| `official-state-student-visa` | [U.S. Department of State: Student Visa](https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html) | F-1 sequence, school/SEVIS/Form I-20 context, documentation, interview, admission boundary, and OPT orientation. |
| `official-dhs-school-search` | [DHS Study in the States: School Search](https://studyinthestates.dhs.gov/school-search) | F-1 school and program certification check. |
| `official-dhs-maintain-status` | [DHS Study in the States: Maintain Your Status](https://studyinthestates.dhs.gov/students/maintain-your-status) | Status-maintenance source for F-1 planning and escalation. |
| `official-dhs-working` | [DHS Study in the States: Working in the United States](https://studyinthestates.dhs.gov/students/resources/working) | Limited F-1 employment orientation and DSO-first boundary. |
| `official-ice-employment` | [ICE: Employment](https://www.ice.gov/sevis/employment) | DSO coordination and employment/status context. |
| `official-uscis-opt` | [USCIS: Optional Practical Training (OPT) for F-1 Students](https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students) | Live OPT eligibility, authorization, and filing source. |
| `official-ice-practical-training` | [ICE: Practical Training](https://www.ice.gov/sevis/practical-training) | CPT/OPT orientation and SEVP practical-training source cross-check. |
| `official-dhs-stem-hub` | [DHS Study in the States: STEM OPT Hub](https://studyinthestates.dhs.gov/stem-opt-hub) | Live STEM OPT eligibility, employer, training-plan, and reporting source rail. |
| `official-dhs-form-i983` | [DHS Study in the States: Form I-983 Overview](https://studyinthestates.dhs.gov/form-i-983-overview) | Training-plan relationship, goals, supervision, resources, and evaluations. |
| `official-dhs-stem-list` | [DHS/ICE: STEM Designated Degree Program List](https://www.ice.gov/sites/default/files/documents/stem-list.pdf) | Current CIP-code verification prompt for STEM OPT discussions. |
| `official-uscis-i765-instructions` | [USCIS: Form I-765 Instructions](https://www.uscis.gov/sites/default/files/document/forms/i-765instr.pdf) | Live form instructions only; the guides link out and do not reproduce a filing workflow. |

## Media inventory

| ID | Asset | Status | Assigned routes | Provenance/license | Editorial decision |
| --- | --- | --- | --- | --- | --- |
| `existing-rd-hero` | `assets/photos/usiva-rd-scholar-hero.avif` | Not assigned | None | Photographer, source, and license are not recorded in the checkout. | Keep out of the new guidance routes until permission, provenance, alt text, dimensions, and route-specific purpose are documented. |

The new guides use text, tables, checklists, and official-source rails as their evidence media. No stock image, generated illustration, fake interface, chart, or diagram is introduced to fill space. If a future route needs a visual, add a typed media record before assigning it in page frontmatter.

## Internal link graph

| From | To | Link label | Purpose |
| --- | --- | --- | --- |
| F-1 readiness | Evidence & checklists | Build the evidence file | Move from orientation to a dated inventory. |
| F-1 readiness | OPT | Plan the post-completion question | Continue from study foundation to post-completion planning. |
| OPT | F-1 readiness | Review the F-1 foundation | Reconnect authorization questions to the underlying student record. |
| OPT | STEM OPT | Assess the STEM OPT extension | Introduce the additional degree/employer/training-plan layer. |
| OPT | Evidence & checklists | Organize the supporting record | Capture field relationship, authorization, employer, and reporting records. |
| STEM OPT | OPT | Start with the OPT foundation | Preserve the dependency between OPT and the extension discussion. |
| STEM OPT | Evidence & checklists | Track the three-party record | Capture degree, employer, training-plan, and reporting evidence. |
| Evidence & checklists | F-1 readiness | Prepare for F-1 study | Return to the school, funding, and status foundation. |
| Evidence & checklists | OPT | Organize an OPT record | Apply the evidence method to a proposed OPT role. |
| Evidence & checklists | STEM OPT | Organize a STEM OPT record | Apply the evidence method to the three-party extension plan. |

The machine-readable link graph is `guidanceLedger.internalLinkGraph` in [`guidance-ledger.ts`](../../src/data/guidance-ledger.ts). No legacy route, application endpoint, intake form, or generic “apply” destination is part of this graph.

## Explicit cutover exclusions

The following material was reviewed for scope control and is intentionally not ported into the new guidance family:

- `notes/meetings/H3 Visa Information.md` — legacy H-3 application-oriented notes and non-official research.
- `notes/meetings/J-1 Visa and Franchise Guides.md` — legacy J-1 sponsorship and process notes.
- `guides/opt.md @ 3229de3` — older OPT guide content.
- `guides/eb2.md @ 3229de3` — older EB-2 guide content outside the four-route plan.
- `apply-opt.html @ b566bc1 / 3229de3` — historical OPT application/intake workflow, including an Azure-connected revision.
- `guides/ICE Form I-983 page 3.png @ 3229de3` — legacy instructional media not assigned to the new route family.

The exclusions are represented as `legacy-excluded` source records in the typed ledger so a later content pass does not silently reintroduce old workflows.

## Editorial QA before integration

For each route, the integrating page owner should confirm:

- the frontmatter route, title, description, review date, source IDs, and empty media assignment match the typed ledger;
- the page has one primary H1, descriptive headings, readable tables, and meaningful link labels;
- every legal or eligibility boundary remains visible near the start and in the source rail;
- official links remain visibly labeled and are checked again before publication;
- no page claims that a checklist proves eligibility, receipt, approval, or work authorization;
- no personal data is collected, uploaded, or sent by these static guides;
- cross-links resolve to the four routes in the internal graph; and
- no legacy application route or old guide is added as a hidden CTA.

To add a new guide, first add its route, source IDs, media decision, page job, visual modes, and link relationships to `src/data/guidance-ledger.ts`, then author the page under `src/pages/guides/`, then update this human-readable ledger in the same change.

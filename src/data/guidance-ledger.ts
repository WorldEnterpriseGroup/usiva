/**
 * Editorial cutover ledger for the USIVA guidance route family.
 *
 * This file is intentionally independent of the page renderer. It gives the
 * route owner a typed record of audience, source basis, internal links, media
 * decisions, and high-stakes boundaries before the routes are wired into the
 * site shell.
 */

export const guidanceReviewDate = "2026-08-22" as const;

export type SourceKind =
  | "current-target-copy"
  | "registry-description"
  | "official-government"
  | "program-reference"
  | "legacy-excluded";

export type SourceStatus = "used" | "context-only" | "excluded";

export type MediaStatus = "not-assigned";

export type RouteStatus = "new-editorial-plan";

export interface SourceRecord {
  id: string;
  kind: SourceKind;
  title: string;
  location: string;
  url?: string;
  publisher?: string;
  basis: string;
  usage: string;
  status: SourceStatus;
  checkedOn?: string;
}

export interface MediaRecord {
  id: string;
  path: string;
  role: string;
  status: MediaStatus;
  assignedRoutes: readonly string[];
  altDecision: string;
  provenance: string;
  license: string;
  reviewNote: string;
}

export interface RouteRecord {
  id: string;
  path: string;
  file: string;
  status: RouteStatus;
  title: string;
  audience: string;
  readerQuestion: string;
  distinctAnswer: string;
  readyReaderAction: string;
  earlyReaderAction: string;
  sourceIds: readonly string[];
  mediaIds: readonly string[];
  visualModes: readonly string[];
  internalLinks: readonly string[];
  externalSourceIds: readonly string[];
  boundary: string;
}

export interface LinkRecord {
  from: string;
  to: string;
  kind: "related-guide";
  label: string;
}

export interface GuidanceLedger {
  schemaVersion: "1.0";
  reviewedOn: string;
  cutover: {
    mode: "aggressive";
    description: string;
    excludedMaterial: string;
  };
  boundary: string;
  sources: readonly SourceRecord[];
  media: readonly MediaRecord[];
  routes: readonly RouteRecord[];
  internalLinkGraph: readonly LinkRecord[];
}

const informationalBoundary =
  "Informational planning content only. It is not legal advice, does not replace individualized advice from qualified counsel or a school DSO, and does not guarantee admission, employment, funding, visa issuance, work authorization, or government approval.";

export const guidanceLedger = {
  schemaVersion: "1.0",
  reviewedOn: guidanceReviewDate,
  cutover: {
    mode: "aggressive",
    description:
      "The guidance family is a new editorial plan for four planning guides: F-1 readiness, OPT, STEM OPT, and evidence/checklists.",
    excludedMaterial:
      "Legacy visa guides, legacy OPT application pages, intake forms, Azure-connected workflows, and other application or service flows are not ported into this route family.",
  },
  boundary: informationalBoundary,
  sources: [
    {
      id: "target-home-copy",
      kind: "current-target-copy",
      title: "USIVA home page target copy",
      location: "index.html",
      basis:
        "Current target copy frames USIVA as visa-readiness and compliance planning for international scholars and research pathways.",
      usage:
        "Identity, documentation-first planning, authorization boundaries, and the informational/legal boundary.",
      status: "used",
    },
    {
      id: "target-rd-scholars-copy",
      kind: "current-target-copy",
      title: "International R&D Scholars visa-planning target copy",
      location: "international-rd-scholars.html",
      basis:
        "Current target copy names F-1 preparation, assistantship boundaries, OPT/STEM OPT planning, readiness evidence, DSO coordination, and primary references.",
      usage:
        "Guide distinctions, evidence categories, research-partner boundaries, and cross-guide relationships.",
      status: "used",
    },
    {
      id: "registry-description",
      kind: "registry-description",
      title: "USIVA repository description",
      location: "README.md (repository description; no separate registry record is present in this checkout)",
      basis:
        "The repository describes USIVA as a static public site and a US Council visa-readiness and compliance-planning companion to US Fellows.",
      usage:
        "Context for the site's identity and planning role; it does not establish eligibility, legal advice, or an application service.",
      status: "context-only",
    },
    {
      id: "program-us-fellows",
      kind: "program-reference",
      title: "US Fellows International R&D Scholars Program",
      location: "External program page linked from the current target copy",
      url: "https://usfellows.org/international-rd-scholars.html",
      publisher: "US Fellows",
      basis:
        "The current target copy distinguishes the US Fellows research pathway from USIVA's compliance-planning role.",
      usage:
        "Context only. The new guides do not reproduce program application steps or make program promises.",
      status: "context-only",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-state-student-visa",
      kind: "official-government",
      title: "Student Visa",
      location: "travel.state.gov",
      url: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
      publisher: "U.S. Department of State",
      basis:
        "Official student-visa overview covering school acceptance, SEVIS, Form I-20, visa documentation, interview context, admission boundaries, and OPT orientation.",
      usage: "F-1 readiness and evidence/checklist verification points.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-school-search",
      kind: "official-government",
      title: "School Search",
      location: "studyinthestates.dhs.gov",
      url: "https://studyinthestates.dhs.gov/school-search",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official search tool for schools and programs certified to enroll F-1 and M-1 students.",
      usage: "F-1 readiness verification of school certification.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-maintain-status",
      kind: "official-government",
      title: "Maintain Your Status",
      location: "studyinthestates.dhs.gov",
      url: "https://studyinthestates.dhs.gov/students/maintain-your-status",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official student-status resource linked from the State Department student-visa page.",
      usage:
        "F-1 readiness, evidence/checklist, and escalation language about status maintenance.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-working",
      kind: "official-government",
      title: "Working in the United States",
      location: "studyinthestates.dhs.gov",
      url: "https://studyinthestates.dhs.gov/students/resources/working",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official overview of limited F-1 employment opportunities and the need to speak with a DSO before working.",
      usage:
        "F-1 work-boundary, OPT planning, and evidence/checklist verification points.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-ice-employment",
      kind: "official-government",
      title: "Employment",
      location: "ice.gov/sevis",
      url: "https://www.ice.gov/sevis/employment",
      publisher: "U.S. Immigration and Customs Enforcement",
      basis:
        "Official SEVIS employment resource describing DSO coordination, on-campus and off-campus work distinctions, and status implications.",
      usage: "F-1 work-boundary and evidence/checklist verification points.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-uscis-opt",
      kind: "official-government",
      title: "Optional Practical Training (OPT) for F-1 Students",
      location: "uscis.gov",
      url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students",
      publisher: "U.S. Citizenship and Immigration Services",
      basis:
        "Official USCIS OPT reference for eligibility, filing, employment authorization, and current case-specific instructions.",
      usage:
        "OPT guide and evidence/checklist source rail; readers are directed to verify live instructions there.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-ice-practical-training",
      kind: "official-government",
      title: "Practical Training",
      location: "ice.gov/sevis",
      url: "https://www.ice.gov/sevis/practical-training",
      publisher: "U.S. Immigration and Customs Enforcement",
      basis:
        "Official SEVP overview of practical training, including CPT/OPT distinctions and related student resources.",
      usage: "OPT and STEM OPT orientation and source cross-check.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-stem-hub",
      kind: "official-government",
      title: "STEM OPT Hub",
      location: "studyinthestates.dhs.gov",
      url: "https://studyinthestates.dhs.gov/stem-opt-hub",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official hub for STEM OPT eligibility, employer, training-plan, reporting, and student/DSO resources.",
      usage: "STEM OPT guide and evidence/checklist source rail.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-form-i983",
      kind: "official-government",
      title: "Form I-983 Overview",
      location: "studyinthestates.dhs.gov",
      url: "https://studyinthestates.dhs.gov/form-i-983-overview",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official explanation of the STEM OPT training-plan relationship, goals, supervision, evaluation, and employer resources.",
      usage: "STEM OPT guide's training-plan and evidence sections.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-dhs-stem-list",
      kind: "official-government",
      title: "DHS STEM Designated Degree Program List",
      location: "ice.gov",
      url: "https://www.ice.gov/sites/default/files/documents/stem-list.pdf",
      publisher: "U.S. Department of Homeland Security",
      basis:
        "Official list used to verify whether a degree's CIP code appears in the designated STEM field list.",
      usage: "STEM OPT degree and CIP-code verification prompt.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "official-uscis-i765-instructions",
      kind: "official-government",
      title: "Form I-765 Instructions",
      location: "uscis.gov",
      url: "https://www.uscis.gov/sites/default/files/document/forms/i-765instr.pdf",
      publisher: "U.S. Citizenship and Immigration Services",
      basis:
        "Official form instructions for live filing requirements; the guides do not reproduce the filing workflow.",
      usage: "STEM OPT and OPT source rail for readers verifying current filing instructions.",
      status: "used",
      checkedOn: guidanceReviewDate,
    },
    {
      id: "legacy-h3-notes",
      kind: "legacy-excluded",
      title: "H-3 visa meeting notes",
      location: "notes/meetings/H3 Visa Information.md",
      basis: "Legacy H-3 application-oriented notes and non-official research.",
      usage: "Excluded from the new editorial plan.",
      status: "excluded",
    },
    {
      id: "legacy-j1-notes",
      kind: "legacy-excluded",
      title: "J-1 visa and franchise meeting notes",
      location: "notes/meetings/J-1 Visa and Franchise Guides.md",
      basis: "Legacy J-1 sponsorship and process notes.",
      usage: "Excluded from the new editorial plan.",
      status: "excluded",
    },
    {
      id: "legacy-opt-guide",
      kind: "legacy-excluded",
      title: "Legacy OPT guide",
      location: "guides/opt.md @ 3229de3",
      basis: "Older guide material from the pre-cutover site history.",
      usage: "Not ported; new OPT copy is authored against current target copy and official sources.",
      status: "excluded",
    },
    {
      id: "legacy-eb2-guide",
      kind: "legacy-excluded",
      title: "Legacy EB-2 guide",
      location: "guides/eb2.md @ 3229de3",
      basis: "Older guide material outside the four-route editorial plan.",
      usage: "Excluded from the new editorial plan.",
      status: "excluded",
    },
    {
      id: "legacy-opt-application",
      kind: "legacy-excluded",
      title: "Legacy OPT application workflow",
      location: "apply-opt.html @ b566bc1 / 3229de3",
      basis: "Legacy application and intake workflow, including a later Azure-connected revision.",
      usage: "Excluded; no application form, intake endpoint, or workflow is reproduced here.",
      status: "excluded",
    },
  ],
  media: [
    {
      id: "existing-rd-hero",
      path: "assets/photos/usiva-rd-scholar-hero.avif",
      role: "Existing legacy R&D Scholars landing-page hero",
      status: "not-assigned",
      assignedRoutes: [],
      altDecision:
        "Not assigned to the new guidance routes; a future assignment would require a route-specific alt decision.",
      provenance: "No photographer, source, or provenance record is present in this checkout.",
      license: "No license record is present in this checkout.",
      reviewNote:
        "Do not promote this asset into a guidance route until provenance, permission, and editorial fit are documented.",
    },
  ],
  routes: [
    {
      id: "f1-readiness",
      path: "/guides/f-1-readiness.html",
      file: "src/pages/guides/f-1-readiness.md",
      status: "new-editorial-plan",
      title: "F-1 readiness",
      audience: "Prospective international students and research scholars preparing for an F-1 study pathway.",
      readerQuestion:
        "What should I organize and verify before I rely on an F-1 study plan?",
      distinctAnswer:
        "Readiness is a coordinated record of school, identity, academic, funding, and authorization questions—not a promise that a visa or admission outcome will follow.",
      readyReaderAction:
        "Ask the admitted school's DSO for its current, school-specific instructions and escalate personal history or status questions to qualified counsel.",
      earlyReaderAction:
        "Start a private evidence inventory and mark every item that still needs a primary-source or school-level confirmation.",
      sourceIds: [
        "target-home-copy",
        "target-rd-scholars-copy",
        "official-state-student-visa",
        "official-dhs-school-search",
        "official-dhs-maintain-status",
        "official-dhs-working",
        "official-ice-employment",
      ],
      mediaIds: [],
      visualModes: [
        "Orientation thesis and boundary callout",
        "Four-question readiness sequence",
        "Evidence inventory table",
        "Escalation panel and official-source rail",
      ],
      internalLinks: [
        "/guides/evidence-checklists.html",
        "/guides/opt.html",
      ],
      externalSourceIds: [
        "official-state-student-visa",
        "official-dhs-school-search",
        "official-dhs-maintain-status",
        "official-dhs-working",
        "official-ice-employment",
      ],
      boundary: informationalBoundary,
    },
    {
      id: "opt",
      path: "/guides/opt.html",
      file: "src/pages/guides/opt.md",
      status: "new-editorial-plan",
      title: "Optional Practical Training (OPT)",
      audience: "F-1 students and recent graduates evaluating whether an OPT plan is ready for DSO and official-source review.",
      readerQuestion:
        "What should I verify before treating a post-completion job or research role as an OPT plan?",
      distinctAnswer:
        "OPT planning centers on the relationship between the eligible course of study, the proposed activity, authorization timing, and continuing reporting responsibilities.",
      readyReaderAction:
        "Bring the role description, academic record, dates, and questions to the DSO, then use the current USCIS instructions for any filing decision.",
      earlyReaderAction:
        "Separate a possible field-related role from a general opportunity and record what evidence would let the DSO assess the relationship.",
      sourceIds: [
        "target-home-copy",
        "target-rd-scholars-copy",
        "official-uscis-opt",
        "official-ice-practical-training",
        "official-dhs-working",
        "official-state-student-visa",
        "official-uscis-i765-instructions",
      ],
      mediaIds: [],
      visualModes: [
        "Decision thesis and authorization warning",
        "Field-and-timing decision record",
        "Evidence map for student, school, and employer records",
        "Stop-and-verify risk panel and official-source rail",
      ],
      internalLinks: [
        "/guides/f-1-readiness.html",
        "/guides/stem-opt.html",
        "/guides/evidence-checklists.html",
      ],
      externalSourceIds: [
        "official-uscis-opt",
        "official-ice-practical-training",
        "official-dhs-working",
        "official-state-student-visa",
        "official-uscis-i765-instructions",
      ],
      boundary: informationalBoundary,
    },
    {
      id: "stem-opt",
      path: "/guides/stem-opt.html",
      file: "src/pages/guides/stem-opt.md",
      status: "new-editorial-plan",
      title: "STEM OPT",
      audience: "F-1 students and employers evaluating the documentation and coordination needed for a STEM OPT extension discussion.",
      readerQuestion:
        "What must be aligned among the degree, employer, training plan, and reporting record?",
      distinctAnswer:
        "STEM OPT is a coordinated student-employer-school compliance plan; a STEM-sounding job or degree label alone is not the complete analysis.",
      readyReaderAction:
        "Compare the degree's current CIP information, the employer's facts, and the proposed training plan with the DSO and official STEM OPT resources.",
      earlyReaderAction:
        "Collect the degree record and a written role description, then identify which employer or training-plan facts are still unknown.",
      sourceIds: [
        "target-home-copy",
        "target-rd-scholars-copy",
        "official-dhs-stem-hub",
        "official-dhs-form-i983",
        "official-dhs-stem-list",
        "official-ice-practical-training",
        "official-uscis-i765-instructions",
      ],
      mediaIds: [],
      visualModes: [
        "Three-party compliance thesis",
        "Degree, employer, and training-plan alignment map",
        "Evidence ownership table",
        "Change-trigger callout and official-source rail",
      ],
      internalLinks: [
        "/guides/opt.html",
        "/guides/evidence-checklists.html",
      ],
      externalSourceIds: [
        "official-dhs-stem-hub",
        "official-dhs-form-i983",
        "official-dhs-stem-list",
        "official-ice-practical-training",
        "official-uscis-i765-instructions",
      ],
      boundary: informationalBoundary,
    },
    {
      id: "evidence-checklists",
      path: "/guides/evidence-checklists.html",
      file: "src/pages/guides/evidence-checklists.md",
      status: "new-editorial-plan",
      title: "Evidence and checklists",
      audience: "International students, scholars, and support teams who need a disciplined record of documents, owners, dates, and open questions.",
      readerQuestion:
        "How do I keep a useful evidence file without confusing preparation with approval?",
      distinctAnswer:
        "A strong evidence file makes claims traceable, dates visible, and unresolved questions easy to escalate; it is not a universal filing packet.",
      readyReaderAction:
        "Review the inventory with the relevant DSO, school office, employer, agency, or qualified counsel before relying on it for a case decision.",
      earlyReaderAction:
        "Create a private index with the document name, source, date checked, owner, and next verification question.",
      sourceIds: [
        "target-home-copy",
        "target-rd-scholars-copy",
        "official-state-student-visa",
        "official-dhs-maintain-status",
        "official-dhs-working",
        "official-ice-employment",
        "official-uscis-opt",
        "official-dhs-stem-hub",
        "official-dhs-form-i983",
      ],
      mediaIds: [],
      visualModes: [
        "Evidence thesis and privacy boundary",
        "Cross-stage document inventory",
        "Ownership and verification ledger",
        "Escalation matrix and official-source rail",
      ],
      internalLinks: [
        "/guides/f-1-readiness.html",
        "/guides/opt.html",
        "/guides/stem-opt.html",
      ],
      externalSourceIds: [
        "official-state-student-visa",
        "official-dhs-maintain-status",
        "official-dhs-working",
        "official-ice-employment",
        "official-uscis-opt",
        "official-dhs-stem-hub",
        "official-dhs-form-i983",
      ],
      boundary: informationalBoundary,
    },
  ],
  internalLinkGraph: [
    {
      from: "/guides/f-1-readiness.html",
      to: "/guides/evidence-checklists.html",
      kind: "related-guide",
      label: "Build the evidence file",
    },
    {
      from: "/guides/f-1-readiness.html",
      to: "/guides/opt.html",
      kind: "related-guide",
      label: "Plan the post-completion question",
    },
    {
      from: "/guides/opt.html",
      to: "/guides/f-1-readiness.html",
      kind: "related-guide",
      label: "Review the F-1 foundation",
    },
    {
      from: "/guides/opt.html",
      to: "/guides/stem-opt.html",
      kind: "related-guide",
      label: "Assess the STEM OPT extension",
    },
    {
      from: "/guides/opt.html",
      to: "/guides/evidence-checklists.html",
      kind: "related-guide",
      label: "Organize the supporting record",
    },
    {
      from: "/guides/stem-opt.html",
      to: "/guides/opt.html",
      kind: "related-guide",
      label: "Start with the OPT foundation",
    },
    {
      from: "/guides/stem-opt.html",
      to: "/guides/evidence-checklists.html",
      kind: "related-guide",
      label: "Track the three-party record",
    },
    {
      from: "/guides/evidence-checklists.html",
      to: "/guides/f-1-readiness.html",
      kind: "related-guide",
      label: "Prepare for F-1 study",
    },
    {
      from: "/guides/evidence-checklists.html",
      to: "/guides/opt.html",
      kind: "related-guide",
      label: "Organize an OPT record",
    },
    {
      from: "/guides/evidence-checklists.html",
      to: "/guides/stem-opt.html",
      kind: "related-guide",
      label: "Organize a STEM OPT record",
    },
  ],
} satisfies GuidanceLedger;

export type GuidanceRoutePath = (typeof guidanceLedger.routes)[number]["path"];
export type GuidanceSourceId = (typeof guidanceLedger.sources)[number]["id"];
export type GuidanceMediaId = (typeof guidanceLedger.media)[number]["id"];

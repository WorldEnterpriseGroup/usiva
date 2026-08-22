/**
 * Source-led editorial briefs for the USIVA research desk.
 *
 * The content is intentionally modeled as planning material rather than as a
 * filing workflow. Official pages remain the source of truth because forms,
 * fees, processing instructions, and agency tools can change after a brief is
 * published.
 */

export const briefsLastChecked = '2026-08-22' as const;

export const editorialBoundary =
  'USIVA provides informational visa and immigration planning content. These briefs organize questions, sources, dates, and handoffs; legal advice, admission, visa, status, employment authorization, immigration-benefit, and government decisions belong to the relevant official agency, school, sponsor, employer, consular post, or qualified immigration attorney.';

export interface BriefSource {
  id: string;
  label: string;
  publisher: string;
  url: string;
  why: string;
  lastChecked: typeof briefsLastChecked;
}

export interface BriefParagraph {
  text: string;
  sourceIds?: readonly string[];
}

export interface BriefStep {
  label: string;
  text: string;
}

export interface BriefTable {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}

export interface BriefSection {
  id: string;
  heading: string;
  intro?: string;
  paragraphs?: readonly BriefParagraph[];
  bullets?: readonly string[];
  steps?: readonly BriefStep[];
  table?: BriefTable;
  note?: string;
  sourceIds?: readonly string[];
}

export interface ImmigrationBrief {
  slug: string;
  number: string;
  label: string;
  title: string;
  deck: string;
  audience: string;
  thesis: string;
  takeaway: string;
  sections: readonly BriefSection[];
  sourceIds: readonly string[];
  relatedSlugs: readonly string[];
}

export const briefSources: readonly BriefSource[] = [
  {
    id: 'state-visa-categories',
    label: 'Directory of Visa Categories',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html',
    why: 'Explains that purpose of intended travel and other facts determine the visa category, and lists immigrant and nonimmigrant categories.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-us-visas',
    label: 'U.S. Visas — overview and Visa Wizard',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas.html',
    why: 'Provides the official visa navigation, category overview, and links to current forms, posts, and visa tools.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-basics',
    label: 'About Visas — The Basics',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/frequently-asked-questions/about-basics.html',
    why: 'Distinguishes temporary visitor visas from immigrant visas and explains why purpose of travel controls the category question.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-visitor',
    label: 'Visitor Visa',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
    why: 'Gives the State Department’s current visitor-visa orientation for temporary business and pleasure travel.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-student',
    label: 'Student Visa',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
    why: 'Provides official study-visa orientation, including school acceptance, SEVIS/Form I-20 context, and document prompts.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-immigrate',
    label: 'Immigrate to the United States',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate.html',
    why: 'Maps family, employment, adoption, special immigrant, and diversity immigrant visa families and names the agencies involved.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-nvc',
    label: 'National Visa Center',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/national-visa-center.html',
    why: 'Describes the NVC handoff after USCIS petition approval for certain immigrant visa cases and the documents/interview preparation stage.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-visa-statistics',
    label: 'Visa Statistics',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics.html',
    why: 'Links current monthly and annual immigrant/nonimmigrant visa issuance reports and states that preliminary data can change.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'state-visa-annual-reports',
    label: 'Report of the Visa Office — annual reports',
    publisher: 'U.S. Department of State',
    url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/annual-reports.html',
    why: 'Provides annual issuance tables and explains which adjustment-of-status and other categories are outside the report’s scope.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-about',
    label: 'About USCIS',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/about-us',
    why: 'Official USCIS starting point for the agency’s mission, programs, policies, and service resources.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-policy-manual',
    label: 'USCIS Policy Manual',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/policy-manual',
    why: 'Centralized USCIS policy source for benefit-adjudication guidance; pair it with case-specific legal analysis when personal facts matter.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-green-card-process',
    label: 'Green Card Processes and Procedures',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/green-card/green-card-processes-and-procedures',
    why: 'Provides the current USCIS starting point for permanent-residence processes, including the distinction between adjustment and consular processing paths.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-case-status',
    label: 'Checking Your Case Status Online',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/tools/checking-your-case-status-online',
    why: 'Official instructions for checking a USCIS case status and understanding the role of the receipt number and account tools.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-online-account',
    label: 'USCIS online account',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://my.uscis.gov/',
    why: 'Official account entry point for eligible USCIS filings, case history, notices, messages, and selected self-service tools.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-contact-center',
    label: 'USCIS Contact Center',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/contactcenter',
    why: 'Routes readers to official case status, processing-time, address-change, e-Request, and contact options.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-processing-times',
    label: 'Check Case Processing Times',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://egov.uscis.gov/processing-times/',
    why: 'Dynamic USCIS tool for a current processing-time estimate; read it with the individual case record and inquiry path.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'cbp-inspection',
    label: 'Immigration Inspection Program',
    publisher: 'U.S. Customs and Border Protection',
    url: 'https://www.cbp.gov/border-security/ports-entry/overview',
    why: 'Explains that CBP officers inspect people seeking admission at ports of entry and determine admissibility under the applicable framework.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'cbp-admission',
    label: 'Admission into the United States',
    publisher: 'U.S. Customs and Border Protection',
    url: 'https://www.cbp.gov/travel/international-visitors/applying-admission-united-states',
    why: 'Describes the inspection/admission distinction and the need for an applicant for admission to establish admissibility to the CBP officer.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'cbp-i94',
    label: 'I-94 Official Website',
    publisher: 'U.S. Customs and Border Protection',
    url: 'https://i94.cbp.dhs.gov/I94/#/home',
    why: 'Official CBP portal for the I-94 record and related travel-history tools; use the live portal for current record access.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'i9-central',
    label: 'I-9 Central',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/i-9-central',
    why: 'Primary USCIS employer resource for Form I-9, employment-eligibility verification, employer guidance, and updates.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'i9-resources',
    label: 'Form I-9 Resources',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/i-9-central/form-i-9-resources',
    why: 'Current form, instructions, and employer resources should be checked before an employer completes or revises a Form I-9 process.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'everify-about',
    label: 'About E-Verify',
    publisher: 'E-Verify',
    url: 'https://www.e-verify.gov/about-e-verify',
    why: 'Official E-Verify overview for participating employers, employees, program scope, and current resources.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'everify-process',
    label: 'E-Verify Verification Process',
    publisher: 'E-Verify',
    url: 'https://www.e-verify.gov/employers/verification-process',
    why: 'Describes the employer-side verification sequence and current case-result handling in the E-Verify system.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'ceac',
    label: 'Consular Electronic Application Center (CEAC)',
    publisher: 'U.S. Department of State',
    url: 'https://ceac.state.gov/CEAC/',
    why: 'Official State Department portal used for selected visa application and case-status handoffs; the relevant route determines whether it applies.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'dhs-yearbook',
    label: 'Yearbook of Immigration Statistics',
    publisher: 'DHS Office of Homeland Security Statistics',
    url: 'https://ohss.dhs.gov/topics/immigration/yearbook',
    why: 'Official DHS collection of immigration tables with definitions, fiscal-year context, historical files, and release notes.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'dhs-immigration-statistics',
    label: 'Immigration Statistics',
    publisher: 'U.S. Department of Homeland Security',
    url: 'https://www.dhs.gov/immigration-statistics',
    why: 'DHS landing page for official immigration-statistics publications and data products; use the current page rather than a copied number.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'uscis-data',
    label: 'Immigration and Citizenship Data',
    publisher: 'U.S. Citizenship and Immigration Services',
    url: 'https://www.uscis.gov/tools/reports-and-studies/immigration-and-citizenship-data',
    why: 'USCIS data library for application and petition performance data, with filters and release context that must be read alongside each table.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'data-gov',
    label: 'Data.gov',
    publisher: 'U.S. General Services Administration',
    url: 'https://data.gov/',
    why: 'Explains the federal open-data catalog model, including the fact that Data.gov provides metadata and links while the publishing agency owns the underlying data.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'data-gov-catalog',
    label: 'Data.gov Catalog',
    publisher: 'U.S. General Services Administration',
    url: 'https://catalog.data.gov/',
    why: 'Searchable catalog for agency datasets and metadata; dataset pages identify publisher, access, dates, resources, and contacts.',
    lastChecked: briefsLastChecked,
  },
  {
    id: 'data-gov-immigration-catalog',
    label: 'Data.gov DHS CIS2 catalog record',
    publisher: 'Data.gov / Department of Homeland Security',
    url: 'https://catalog.data.gov/dataset/cis2-central-index-system-2-cis2-repository-of-immigration-benefits-and-enforcement-encoun',
    why: 'This DHS catalog entry demonstrates why researchers should inspect access level, publisher metadata, and the linked agency resource before treating a record as a public data file.',
    lastChecked: briefsLastChecked,
  },
];

const paragraph = (text: string, sourceIds?: readonly string[]): BriefParagraph => ({ text, sourceIds });

export const immigrationBriefs: readonly ImmigrationBrief[] = [
  {
    slug: 'purpose-of-travel-and-classification',
    number: '01',
    label: 'Classification desk',
    title: 'Purpose of travel is the first classification question',
    deck: 'A visa category follows the real purpose and activities of a trip. Record the activity, host, and timing before comparing categories.',
    audience: 'Readers deciding how to describe a proposed U.S. trip, study plan, research activity, or work question.',
    thesis: 'Start with a plain-language activity inventory. Then compare that inventory with the current State Department category guidance and the agency or institution responsible for the underlying activity.',
    takeaway: 'Record the planned activities, who directs them, who pays, where they happen, how long they last, and whether any part involves study, training, or work before choosing a category to investigate.',
    sourceIds: ['state-visa-categories', 'state-us-visas', 'state-basics', 'state-visitor', 'state-student', 'state-immigrate', 'cbp-admission'],
    relatedSlugs: ['immigrant-vs-nonimmigrant-route-map', 'agency-roles', 'record-readiness'],
    sections: [
      {
        id: 'classify-the-activity',
        heading: 'Classify the activity before choosing a category',
        paragraphs: [
          paragraph('The State Department says that the purpose of intended travel and other facts determine what type of visa is required. That framing matters because one person can describe the same trip as a conference, a research visit, a training placement, or employment depending on which fact is emphasized. The classification question is about the complete activity, with the full description carrying more weight than a flattering label.', ['state-visa-categories', 'state-basics']),
          paragraph('Make a private inventory before you search for a form: destination and dates; host or school; duties and deliverables; funding and compensation; supervision; whether you plan to enroll, train, perform services, or receive a benefit; and the next stage after the visit. This is an organizing tool for a source conversation.', ['state-us-visas']),
        ],
        note: 'Fact pattern first, category second. If an activity has mixed purposes, treat the mixed facts as the question to escalate rather than forcing them into the easiest label.',
        sourceIds: ['state-visa-categories', 'state-basics'],
      },
      {
        id: 'purpose-record',
        heading: 'Build a purpose record that another reader can test',
        intro: 'A useful purpose record is short enough to hand to a school, consular post, sponsor, employer, or attorney and specific enough to expose the unresolved issue.',
        steps: [
          { label: 'One sentence', text: 'State the primary reason for travel in plain language, then use the visa class as a reference.' },
          { label: 'Activity list', text: 'List each planned activity, including meetings, classes, laboratory work, observation, training, services, paid work, and unpaid work.' },
          { label: 'Control and funding', text: 'Name who directs the work, who supplies the location or equipment, who pays expenses or compensation, and what records support those facts.' },
          { label: 'Duration and exit', text: 'Record the planned dates, locations, and next-stage plan; label intentions separately from verified requirements.' },
          { label: 'Verification owner', text: 'Assign the next question to the relevant official agency, school, sponsor, employer representative, or qualified immigration attorney.' },
        ],
        sourceIds: ['state-visa-categories', 'state-us-visas'],
      },
      {
        id: 'category-lenses',
        heading: 'Use category pages as lenses for the next question',
        table: {
          caption: 'Questions that help separate common purpose-of-travel lenses',
          headers: ['Activity lens', 'Questions to document', 'Official starting point'],
          rows: [
            ['Temporary visit or business', 'What meetings, conferences, or visitor activities are planned? Is there compensation or productive service?', 'State Department Visitor Visa and category directory'],
            ['Study or academic program', 'What school and program accepted the student? What record, enrollment, and academic purpose control?', 'State Department Student Visa and the school/DSO'],
            ['Exchange or sponsored program', 'Who is the designated sponsor? What program activity and sponsor record govern the visit?', 'State Department category directory and sponsor'],
            ['Employment or services', 'Who is the employer or directing entity? What duties, location, compensation, and petition or authorization record exist?', 'State category directory, USCIS, employer, and qualified counsel'],
            ['Permanent immigration', 'Is the objective to immigrate and live permanently? Is there a petition, numerical category, or adjustment path?', 'State Department Immigrate and USCIS permanent-residence resources'],
          ],
        },
        sourceIds: ['state-visitor', 'state-student', 'state-visa-categories', 'state-immigrate'],
      },
      {
        id: 'visa-is-not-admission',
        heading: 'A visa and admission answer different questions',
        paragraphs: [
          paragraph('A visa is a travel document and category decision handled through the State Department’s visa process. At the port of entry, CBP conducts inspection and determines whether an arriving applicant is admissible under the facts and law applicable at that time. Read the State Department and CBP pages together for travel questions, with each source retaining its own event and authority.', ['state-us-visas', 'cbp-admission']),
          paragraph('Keep the distinction visible in your record: visa category, visa validity, admission inspection, admission record, and the activity you intend to perform are related but separate questions. A category page supplies a starting point; personal history and itinerary questions belong with the responsible authority.', ['cbp-admission']),
        ],
        note: 'Verify current travel, document, and admission instructions with the relevant embassy or consulate and CBP source before making arrangements.',
        sourceIds: ['state-us-visas', 'cbp-inspection', 'cbp-admission'],
      },
      {
        id: 'escalate-mixed-purpose',
        heading: 'Escalate when the itinerary has a mixed purpose',
        bullets: [
          'A visitor trip also includes hands-on work, services, or compensation.',
          'A research or academic relationship is described as informal, but another organization directs the duties or pays the person.',
          'A school, sponsor, employer, or consular post gives instructions that differ from a general web summary.',
          'The proposed activity depends on prior immigration history, a previous refusal, a change of status, or a personal deadline.',
        ],
        paragraphs: [
          paragraph('The right next action is to preserve the complete activity description and ask the authority responsible for the program, admission, visa, status, or employment question to verify the classification.', ['state-visa-categories', 'cbp-admission']),
        ],
        sourceIds: ['state-visa-categories', 'cbp-admission'],
      },
    ],
  },
  {
    slug: 'immigrant-vs-nonimmigrant-route-map',
    number: '02',
    label: 'Route map',
    title: 'Immigrant or nonimmigrant? Draw the route before the form',
    deck: 'The first fork is whether the plan is temporary or intended to lead to permanent residence. From there, location, petition requirements, and the responsible agency change the route.',
    audience: 'Readers comparing a temporary visit, study or work plan with a permanent family- or employment-based immigration objective.',
    thesis: 'Route mapping prevents a common category error: treating a petition, a visa, an admission decision, an immigration status, and a green-card process as one event.',
    takeaway: 'Make a one-page route map with the goal, location, petitioner or sponsor, next agency, record number, and unresolved question at each handoff.',
    sourceIds: ['state-visa-categories', 'state-us-visas', 'state-immigrate', 'uscis-green-card-process', 'state-nvc', 'cbp-admission'],
    relatedSlugs: ['purpose-of-travel-and-classification', 'agency-roles', 'case-status-and-account-handoffs'],
    sections: [
      {
        id: 'two-families',
        heading: 'Two route families, two different planning questions',
        paragraphs: [
          paragraph('Nonimmigrant routes are generally organized around a temporary purpose: visiting, studying, exchanging, working in a temporary classification, or another defined activity. Immigrant routes are organized around the objective of immigrating and living permanently, with family, employment, adoption, special immigrant, diversity, and other category families listed by the State Department.', ['state-visa-categories', 'state-basics', 'state-immigrate']),
          paragraph('The words temporary and permanent describe the route objective. Document the actual purpose, category-specific requirements, and relevant agency’s current instructions rather than infer a route from a hoped-for long-term outcome.', ['state-visa-categories']),
        ],
        sourceIds: ['state-visa-categories', 'state-immigrate'],
      },
      {
        id: 'route-map',
        heading: 'A route map with the handoffs left visible',
        table: {
          caption: 'Illustrative route families; the controlling instructions vary by category and facts',
          headers: ['Starting objective', 'Typical public handoff to investigate', 'What to verify before moving on'],
          rows: [
            ['Temporary visit or business', 'State Department category and consular process → CBP inspection at entry', 'Actual activities, documents, post instructions, and admission record'],
            ['Study or exchange', 'School or designated sponsor record → State visa process where applicable → CBP admission', 'School/sponsor record, program purpose, travel documents, and activity limits'],
            ['Temporary employment', 'Employer or petitioner process, if required → USCIS and/or State visa process → CBP admission', 'Classification, petition or authorization record, job duties, location, and start conditions'],
            ['Permanent immigration from abroad', 'Petition or immigrant case step → NVC/consular processing for applicable cases → immigrant visa → CBP admission', 'Category, petitioner, document collection, visa availability where relevant, and interview instructions'],
            ['Permanent residence from inside the United States', 'USCIS adjustment-of-status process where eligible', 'Eligibility, filing posture, travel/work consequences, and personal history with USCIS or counsel'],
          ],
        },
        note: 'This is an orientation map with route-specific sequences. Some routes skip, combine, or add steps; the location and category determine which agency has authority at each point.',
        sourceIds: ['state-immigrate', 'uscis-green-card-process', 'state-nvc', 'cbp-admission'],
      },
      {
        id: 'approval-is-not-admission',
        heading: 'Each desk completes its own review',
        paragraphs: [
          paragraph('USCIS may adjudicate a petition or benefit request. The State Department may process a visa application through a consular post or the National Visa Center for certain immigrant cases. CBP may then inspect an arriving applicant for admission. These decisions can be connected in a route, but each has its own record, authority, and current instructions.', ['uscis-about', 'state-nvc', 'cbp-inspection']),
          paragraph('Use precise verbs in your notes: filed, received, approved, transferred, documentarily complete, scheduled, issued, admitted, or denied. Avoid writing “approved” when the notice only says a filing was received, and avoid writing “visa approved” when the available record is a petition approval or an admission inspection.', ['state-nvc', 'cbp-admission', 'uscis-case-status']),
        ],
        sourceIds: ['uscis-about', 'state-nvc', 'cbp-admission'],
      },
      {
        id: 'map-worksheet',
        heading: 'A five-line route worksheet',
        steps: [
          { label: 'Goal', text: 'Write the immediate objective: visit, study, exchange, temporary work, or permanent immigration.' },
          { label: 'Location', text: 'Record whether the person is outside the United States, inside the United States, or planning travel between stages.' },
          { label: 'Sponsor or petitioner', text: 'Name the school, exchange sponsor, employer, family petitioner, or other responsible party.' },
          { label: 'Agency record', text: 'Identify the notice, petition, application, case number, visa record, admission record, or school record that controls the next step.' },
          { label: 'Open question', text: 'Write one unresolved question and assign it to the relevant agency, school, sponsor, employer, or qualified attorney.' },
        ],
        sourceIds: ['state-us-visas', 'uscis-green-card-process', 'state-nvc'],
      },
      {
        id: 'map-changes',
        heading: 'Facts that can change the map',
        bullets: [
          'The person’s physical location and whether the plan uses consular processing or an in-country process.',
          'Whether a petitioner, employer, school, or designated sponsor is required for the category.',
          'Whether the category is subject to a numerical limit or another availability rule.',
          'Prior immigration history, refusals, status issues, travel plans, dependents, or changes in the proposed activity.',
          'The difference between a public information page and instructions issued to the person on a case-specific notice.',
        ],
        paragraphs: [
          paragraph('When one of these facts is present, keep the map and the source note together. Verify current requirements with the agency that owns the next decision instead of relying on a route diagram as if it were a determination.', ['state-visa-categories', 'uscis-policy-manual', 'state-nvc']),
        ],
        sourceIds: ['state-visa-categories', 'uscis-policy-manual', 'state-nvc'],
      },
    ],
  },
  {
    slug: 'agency-roles',
    number: '03',
    label: 'Agency desk map',
    title: 'USCIS, State, and CBP are different desks',
    deck: 'The immigration system is easier to read when each agency’s decision is named separately: benefit or petition, visa processing, and inspection/admission each carry their own record and authority.',
    audience: 'Readers unsure which federal agency, portal, notice, or official source should receive the next question.',
    thesis: 'A clean handoff starts by naming the decision being requested and the agency that has authority over it.',
    takeaway: 'Before you ask for an update, write the agency, decision type, record number, current status, and exact question in one line.',
    sourceIds: ['uscis-about', 'state-us-visas', 'state-nvc', 'cbp-inspection', 'cbp-admission', 'cbp-i94'],
    relatedSlugs: ['immigrant-vs-nonimmigrant-route-map', 'case-status-and-account-handoffs', 'record-readiness'],
    sections: [
      {
        id: 'different-decisions',
        heading: 'One journey can contain several different decisions',
        paragraphs: [
          paragraph('USCIS, the Department of State, and CBP each serve a distinct desk inside the federal system. USCIS handles immigration benefit and naturalization services and related adjudications. The State Department handles visa information and consular processing. CBP inspects people seeking admission at ports of entry and makes the admission decision under its authority.', ['uscis-about', 'state-us-visas', 'cbp-inspection', 'cbp-admission']),
          paragraph('A person may have a USCIS notice, a State Department visa record, and a CBP admission record at different moments. Each record can inform the next handoff while remaining in its own authority’s system.', ['state-nvc', 'cbp-i94']),
        ],
        sourceIds: ['uscis-about', 'state-us-visas', 'cbp-admission'],
      },
      {
        id: 'role-table',
        heading: 'The desk map',
        table: {
          caption: 'Name the decision before naming the agency',
          headers: ['Agency or desk', 'Questions it can help answer', 'Questions reserved for another authority'],
          rows: [
            ['USCIS', 'Has a petition, application, or benefit request been received, processed, or adjudicated? What does the official notice or account show?', 'A visa issuance decision by a consular post or an admission decision by CBP'],
            ['Department of State / consular post', 'What visa category and consular instructions apply? What is the status of a visa process or an immigrant-case handoff?', 'A USCIS benefit adjudication or CBP’s inspection/admission determination'],
            ['National Visa Center', 'For applicable immigrant visa cases, what document and interview-processing step follows USCIS petition approval?', 'A general nonimmigrant case update or a visa-issuance decision outside the NVC step'],
            ['CBP', 'What happens at inspection and what admission record is available after travel?', 'A substitute for a visa, petition, school record, or employer authorization analysis'],
            ['School, DSO, sponsor, or employer representative', 'What institutional record, program instruction, role description, or employment-verification step applies?', 'A federal agency decision or individualized legal advice'],
          ],
        },
        sourceIds: ['uscis-about', 'state-us-visas', 'state-nvc', 'cbp-inspection', 'cbp-i94'],
      },
      {
        id: 'common-collisions',
        heading: 'Three collisions that create bad handoffs',
        bullets: [
          'Petition approval is recorded as if it were visa issuance. The next step may still belong to the State Department or a consular post.',
          'Visa validity is recorded as if it were an admission decision. CBP conducts inspection and maintains the relevant admission record.',
          'Employer verification is treated as if it decides the underlying immigration classification. Form I-9 and E-Verify are employment-verification processes with their own rules.',
        ],
        paragraphs: [
          paragraph('A reliable note names both the event and the source: “USCIS notice says…,” “State portal shows…,” “CBP I-94 record shows…,” or “employer’s Form I-9 process requires….” That language keeps an administrative record from becoming a larger conclusion.', ['uscis-case-status', 'state-nvc', 'cbp-i94', 'i9-central']),
        ],
        sourceIds: ['uscis-case-status', 'state-nvc', 'cbp-i94', 'i9-central'],
      },
      {
        id: 'handoff-packet',
        heading: 'Build a handoff packet that respects each desk',
        steps: [
          { label: 'Decision', text: 'State what you need: classification, benefit status, visa-process update, admission record, school instruction, or employment verification.' },
          { label: 'Record', text: 'Identify the notice, receipt, case number, passport/visa record, I-94 record, school record, or employer document that supports the question.' },
          { label: 'Timeline', text: 'List only the dates that can be supported by records, and label them as issue date, submission date, transfer date, travel date, or requested action date.' },
          { label: 'Question', text: 'Ask one concrete question of the agency or institution that controls the next step; address each desk with the question it owns.' },
          { label: 'Privacy', text: 'Use the official secure channel and share identifiers only after verifying the domain and recipient.' },
        ],
        sourceIds: ['uscis-contact-center', 'state-nvc', 'cbp-i94'],
      },
      {
        id: 'agency-caveat',
        heading: 'The source of truth is the authority for that decision',
        paragraphs: [
          paragraph('USIVA helps a reader organize the question and find the public starting point. Authority remains with USCIS, the State Department, CBP, a school, a sponsor, an employer, or a qualified attorney. Verify current requirements with the responsible official source before filing, traveling, working, or relying on a deadline.', ['uscis-about', 'state-us-visas', 'cbp-admission']),
        ],
        note: 'When personal facts could change eligibility or consequences, stop at orientation and obtain individualized advice from the appropriate professional or agency.',
        sourceIds: ['uscis-about', 'state-us-visas', 'cbp-admission'],
      },
    ],
  },
  {
    slug: 'record-readiness',
    number: '04',
    label: 'Evidence desk',
    title: 'Evidence is a chain of custody for your own facts',
    deck: 'A readiness file is useful when every important claim has a source, date, owner, and question attached to it; traceability matters more than volume.',
    audience: 'Students, researchers, families, and employers organizing records before a school, agency, sponsor, or attorney review.',
    thesis: 'Treat evidence as a traceable record of decisions. Separate what a document proves from what you still need someone with authority to decide.',
    takeaway: 'For each record, write: who issued it, when it was issued, when you checked it, what it supports, which questions require another source, and who owns the next answer.',
    sourceIds: ['state-student', 'state-visa-categories', 'uscis-policy-manual', 'cbp-admission'],
    relatedSlugs: ['purpose-of-travel-and-classification', 'agency-roles', 'employer-i9-and-everify'],
    sections: [
      {
        id: 'one-document-one-question',
        heading: 'A document answers one question at a time',
        paragraphs: [
          paragraph('A passport can support identity and travel-document facts. An admission letter can support a school relationship. A financial record can support a source and date of funds. A role description can explain duties. Eligibility, status, authorization, admissibility, and outcome questions belong with the responsible authority that reviews the full record.', ['state-student', 'cbp-admission', 'uscis-policy-manual']),
          paragraph('The USCIS Policy Manual and official State Department pages provide a public framework. The school, consular post, agency notice, employer process, or qualified attorney may require a different or more specific record for the facts at hand.', ['uscis-policy-manual', 'state-visa-categories']),
        ],
        sourceIds: ['uscis-policy-manual', 'state-student', 'state-visa-categories'],
      },
      {
        id: 'evidence-matrix',
        heading: 'Use an evidence matrix before you make a packet',
        table: {
          caption: 'Planning questions to organize and discuss with the responsible authority',
          headers: ['Evidence lane', 'Record fields to index', 'Verification owner'],
          rows: [
            ['Identity and travel', 'Name spellings, passport/travel document, prior visas, travel dates, and records explaining material differences', 'School, consular post, CBP source, USCIS, or qualified counsel as applicable'],
            ['Purpose and program', 'Invitation, admission, program name, host, duties, location, dates, curriculum, or sponsor record', 'School, sponsor, consular post, employer, or category-owning agency'],
            ['Funding and support', 'Issuer, currency, issue date, covered period, conditions, and what the record actually promises', 'School, sponsor, employer, consular post, or relevant agency'],
            ['Activity and authorization', 'Role description, supervisor, worksite, hours, compensation, relationship to study/program, and written instructions', 'DSO/sponsor, employer representative, USCIS, or qualified counsel'],
            ['History and changes', 'Prior notices, refusals, status records, address changes, name changes, and a private chronology', 'Agency named on the record or qualified immigration counsel'],
          ],
        },
        note: 'Index sensitive records in the approved secure system. A source trail strengthens a secure handoff and limits exposure risk.',
        sourceIds: ['state-student', 'state-visa-categories', 'cbp-admission', 'uscis-policy-manual'],
      },
      {
        id: 'version-control',
        heading: 'Version control is part of evidence quality',
        intro: 'Living records change. Keep the history instead of silently replacing the evidence that informed an earlier decision.',
        steps: [
          { label: 'Name', text: 'Give the record a precise name that distinguishes a notice, letter, form version, portal screenshot, or instruction page.' },
          { label: 'Date', text: 'Record the issue date, the date you retrieved it, and the last-checked date for the official page or tool.' },
          { label: 'Owner', text: 'Identify who can issue, correct, interpret, or replace the record.' },
          { label: 'Meaning', text: 'Write what the record supports and which questions require another source. Mark an assumption as an assumption.' },
          { label: 'Change note', text: 'When the record changes, retain the old note and describe what changed, who confirmed it, and what action follows.' },
        ],
        sourceIds: ['uscis-policy-manual', 'state-student'],
      },
      {
        id: 'readiness-test',
        heading: 'A readiness test for the next reviewer',
        bullets: [
          'Can the reviewer tell why this record belongs in the packet?',
          'Can the reviewer find the issuing authority and verify the current version?',
          'Can the reviewer see which dates are confirmed and which are projected?',
          'Can the reviewer distinguish a school, sponsor, employer, agency, or personal statement?',
          'Can the reviewer identify the one question that remains open?',
          'Can the reviewer understand the packet using only the identifiers the recipient requests through a verified channel?',
        ],
        paragraphs: [
          paragraph('If the answer is no, improve the index before adding more documents. A shorter, traceable packet is often a better starting point for the authority that must answer the question.', ['uscis-policy-manual']),
        ],
        sourceIds: ['uscis-policy-manual'],
      },
      {
        id: 'privacy-and-escalation',
        heading: 'Privacy and escalation are evidence decisions too',
        paragraphs: [
          paragraph('Keep passport scans, immigration identifiers, financial records, employer-sensitive material, and private correspondence in the secure system specified by the school, agency, employer, sponsor, or attorney. Public articles and shared links serve as references; use the approved secure document-transfer channel for records.', ['uscis-online-account', 'uscis-contact-center']),
          paragraph('Stop relying on a general checklist when a decision turns on a prior refusal, status concern, unauthorized work, criminal or civil issue, complex travel history, dependent, disputed employer relationship, or personal deadline. Preserve the chronology and take it to the agency, institution, or qualified attorney responsible for the answer.', ['uscis-policy-manual', 'cbp-admission']),
        ],
        note: 'Verify current evidence instructions with the relevant official agency before filing or submitting records. Personal case requirements belong to the responsible authority or qualified counsel.',
        sourceIds: ['uscis-online-account', 'uscis-policy-manual', 'cbp-admission'],
      },
    ],
  },
  {
    slug: 'employer-i9-and-everify',
    number: '05',
    label: 'Workplace desk',
    title: 'Employer orientation: Form I-9, E-Verify, and the authorization record',
    deck: 'Form I-9 and E-Verify are employer-side verification processes. Coordinate them with the worker’s actual immigration and work-authorization record, which remains the reference for the broader authorization question.',
    audience: 'Employers, HR teams, international workers, students, and researchers preparing for a compliant hiring handoff.',
    thesis: 'Start with the actual role and the current official employment-verification instructions. Then keep the employer process, the worker’s status, and any separate authorization record distinct.',
    takeaway: 'A clean hiring file explains the role, the employee’s Form I-9 process, any E-Verify participation, and the source of the work-authorization information while keeping visa classification with the responsible authority.',
    sourceIds: ['i9-central', 'i9-resources', 'everify-about', 'everify-process', 'uscis-policy-manual'],
    relatedSlugs: ['record-readiness', 'agency-roles', 'case-status-and-account-handoffs'],
    sections: [
      {
        id: 'start-with-i9',
        heading: 'Start with the employer’s Form I-9 duty',
        paragraphs: [
          paragraph('USCIS’s I-9 Central is the primary employer resource for Form I-9, employment-eligibility verification, and current employer guidance. The employer should use the current form, instructions, and official handbook resources rather than an old checklist or a document list copied into a job email.', ['i9-central', 'i9-resources']),
          paragraph('The employee and employer each have a role in the Form I-9 process. Keep the verification record focused on identity and employment authorization as the official instructions describe it. Ask only for the information required by the current process and use the employer’s authorized procedure as the operating source.', ['i9-central']),
        ],
        sourceIds: ['i9-central', 'i9-resources'],
      },
      {
        id: 'i9-everify-distinction',
        heading: 'Keep three records distinct',
        table: {
          caption: 'The employment handoff has related but different records',
          headers: ['Record or process', 'What it is for', 'Question reserved for another authority'],
          rows: [
            ['Form I-9', 'Employer verification of identity and employment authorization using the current form and instructions', 'Whether a visa category, status, or proposed job is legally available under every immigration rule'],
            ['E-Verify', 'An electronic employer process that compares Form I-9 information with available government records when the employer participates or is required to use it', 'A replacement for Form I-9 or a general credential for every job'],
            ['Immigration/status record', 'The worker’s visa, admission/status record, employment authorization document, school/sponsor instruction, or other source that may define a work boundary', 'A personal eligibility answer produced by the employer verification process'],
          ],
        },
        note: 'Participation, program obligations, remote-document options, and case handling can change. Verify the current E-Verify and USCIS instructions for the employer’s situation.',
        sourceIds: ['i9-central', 'everify-about', 'everify-process', 'uscis-policy-manual'],
      },
      {
        id: 'employer-sequence',
        heading: 'A current employer-side sequence',
        steps: [
          { label: 'Role facts', text: 'Record the legal employer, worksite or arrangement, job title, duties, start conditions, and who supervises the work.' },
          { label: 'Form I-9', text: 'Use the current USCIS form and instructions and complete the employee/employer portions through the authorized process.' },
          { label: 'Documents', text: 'Follow the current acceptable-document and receipt rules, allow the official choice, and keep the employer process consistent.' },
          { label: 'E-Verify', text: 'If the employer participates or is otherwise required to use E-Verify, follow the current verification-process instructions and record the case result and required next action.' },
          { label: 'Escalate', text: 'If the role, status, authorization dates, mismatch, or proposed activity is unclear, send the precise facts to the employer’s authorized representative, the DSO/sponsor, USCIS, or qualified counsel.' },
        ],
        sourceIds: ['i9-resources', 'everify-process', 'everify-about'],
      },
      {
        id: 'worker-side',
        heading: 'For the worker, verification is one part of authorization analysis',
        paragraphs: [
          paragraph('A completed Form I-9 or an E-Verify result answers the employer verification step. Role fit, underlying immigration classification, school or sponsor rules, authorization period, and specific duties belong to USCIS, a DSO or sponsor, an employer representative, or qualified immigration counsel.', ['i9-central', 'everify-process', 'uscis-policy-manual']),
          paragraph('Before starting or changing a role, keep the offer or role description, duties, location, supervisor, compensation, start date, and any authorization record together. Ask the authority responsible for the status or program to verify the activity before relying on the employer’s onboarding step as permission to work.', ['i9-central', 'uscis-policy-manual']),
        ],
        sourceIds: ['i9-central', 'uscis-policy-manual'],
      },
      {
        id: 'clean-hiring-file',
        heading: 'What a clean hiring handoff contains',
        bullets: [
          'A role description that matches the work the person plans to perform.',
          'The employer’s current Form I-9 and E-Verify operating instructions, owned by the authorized HR or compliance team.',
          'A private record of the worker’s status or authorization source, dates, and any school or sponsor instruction that controls the activity.',
          'A written owner for a mismatch, expiring document, changed duty, changed worksite, or uncertain classification.',
          'A secure channel for any personal record, with passport scans or immigration identifiers shared only when the authorized recipient requests them.',
        ],
        note: 'Verify current requirements with USCIS, E-Verify, the employer’s authorized representative, the school or sponsor, and qualified counsel where the facts require legal analysis.',
        sourceIds: ['i9-central', 'i9-resources', 'everify-about'],
      },
    ],
  },
  {
    slug: 'case-status-and-account-handoffs',
    number: '06',
    label: 'Status desk',
    title: 'Case status is a handoff map for the current record',
    deck: 'The safest status check begins with the agency named on the notice. Use the official portal for that record, preserve the confirmation, and treat the status line as current record detail.',
    audience: 'Readers tracking a USCIS filing, a visa process, an immigrant-case handoff, an admission record, or a school/sponsor record.',
    thesis: 'Status work is record management: identify the owner, use the right account or tool, capture the source and date, and escalate through the official channel when the record conflicts or stalls.',
    takeaway: 'Start with the official notice, agency, record number, and portal named by the agency; search snippets and third-party trackers serve as leads for verification.',
    sourceIds: ['uscis-case-status', 'uscis-online-account', 'uscis-contact-center', 'uscis-processing-times', 'ceac', 'state-nvc', 'cbp-i94'],
    relatedSlugs: ['agency-roles', 'immigrant-vs-nonimmigrant-route-map', 'record-readiness'],
    sections: [
      {
        id: 'start-with-notice',
        heading: 'Start from the agency named on the notice',
        table: {
          caption: 'Choose the official handoff that matches the record you actually have',
          headers: ['Record in hand', 'Official starting point', 'Next question to write down'],
          rows: [
            ['USCIS receipt or notice', 'USCIS Case Status Online or the USCIS online account, as the notice and current tool instructions direct', 'What did USCIS receive or decide, and is there a notice or account document that needs action?'],
            ['USCIS processing-time concern', 'USCIS processing-times tool and official case-inquiry path', 'Does the current tool identify an inquiry option for this form, office, and date?'],
            ['Immigrant visa case after petition handoff', 'State Department NVC/CEAC/consular instructions for the case', 'Which case number, document request, interview notice, or post instruction controls the next step?'],
            ['Visa application or consular process', 'The State Department and the responsible embassy/consulate’s current instructions', 'What does the current post or visa portal say, and is the question about documents, interview, issuance, or refusal?'],
            ['Admission or travel record', 'CBP inspection/admission information and the official I-94 portal', 'What admission record or travel-history entry is available, and what fact is disputed?'],
          ],
        },
        sourceIds: ['uscis-case-status', 'uscis-online-account', 'uscis-processing-times', 'state-nvc', 'ceac', 'cbp-i94'],
      },
      {
        id: 'status-control-panel',
        heading: 'Build a small status control panel',
        steps: [
          { label: 'Identify', text: 'Write the agency, application or case type, notice date, and private record number exactly as shown on the official document.' },
          { label: 'Open', text: 'Use the official domain linked by the notice or the agency’s current tools page. Avoid copying a credential or identifier into an unverified site.' },
          { label: 'Capture', text: 'Save the status text, notice title, date retrieved, and any required next action. A screenshot gains evidentiary value when paired with its source and date.' },
          { label: 'Compare', text: 'Use processing-time estimates as a dynamic reference alongside the individual notice and official inquiry path.' },
          { label: 'Escalate', text: 'If a notice is missing, the address is wrong, the record conflicts, or a deadline is personal, use the agency’s official inquiry/contact path or qualified counsel.' },
        ],
        sourceIds: ['uscis-case-status', 'uscis-online-account', 'uscis-contact-center', 'uscis-processing-times'],
      },
      {
        id: 'statuses-can-differ',
        heading: 'Why two official statuses can both be true',
        paragraphs: [
          paragraph('A USCIS account may show a case history while the case-status tool shows a shorter public status line. A State Department case may move from USCIS to the NVC or a consular post. A visa record can exist before travel, while CBP creates or updates the admission record during inspection. Each system describes its own event and timeline label.', ['uscis-online-account', 'state-nvc', 'ceac', 'cbp-i94']),
          paragraph('Write the event exactly as the source presents it and attach the source URL, date retrieved, and record owner. If the status line appears to conflict with a notice or admission record, preserve both and ask the agency that owns the disputed event to reconcile them.', ['uscis-contact-center', 'cbp-admission']),
        ],
        sourceIds: ['uscis-online-account', 'state-nvc', 'ceac', 'cbp-i94'],
      },
      {
        id: 'account-security',
        heading: 'Account security is part of the handoff',
        bullets: [
          'Use the official agency domain and confirm the address before entering a receipt number, case number, password, or personal identifier.',
          'Use an individual account when the agency says the account is personal; keep credentials within the account owner’s approved access.',
          'Keep official notices and account messages in the secure location the agency or authorized representative specifies.',
          'Treat a third-party tracker, social post, or email forward as a lead only; verify the underlying status in the official system.',
        ],
        sourceIds: ['uscis-online-account', 'uscis-contact-center', 'state-nvc'],
      },
      {
        id: 'status-escalation',
        heading: 'When a status page needs supporting records',
        paragraphs: [
          paragraph('Escalate when the question depends on a prior refusal, a status or travel consequence, a personal deadline, a missing or returned document, a changed address, a changed employer or role, a dependent, or any fact that the public status line leaves open. The right escalation is the official agency contact path, school or sponsor owner, employer representative, or qualified attorney.', ['uscis-contact-center', 'state-nvc', 'cbp-admission']),
        ],
        note: 'Verify current portal links, contact routes, processing tools, and agency instructions before acting. Private status interpretation belongs to the responsible agency or qualified counsel.',
        sourceIds: ['uscis-contact-center', 'state-nvc', 'cbp-admission'],
      },
    ],
  },
  {
    slug: 'official-immigration-data-research',
    number: '07',
    label: 'Data desk',
    title: 'A small research protocol for official immigration data',
    deck: 'Good immigration research begins with definitions, release context, and source ownership. This brief gives readers a repeatable way to use DHS, Data.gov, USCIS, and State Department data while preserving the source’s limits.',
    audience: 'Researchers, policy readers, journalists, students, and practitioners who need a careful starting protocol for public immigration data.',
    thesis: 'Define the event, unit, period, source, denominator, and caveat before reading a number. The official dataset or report remains the authority, while the catalog serves as a discovery and metadata layer.',
    takeaway: 'Create a research card for every result: question, official source URL, publication or dataset title, release date, filters, measure, denominator, retrieval date, and limitations.',
    sourceIds: ['dhs-yearbook', 'dhs-immigration-statistics', 'uscis-data', 'state-visa-statistics', 'state-visa-annual-reports', 'data-gov', 'data-gov-catalog', 'data-gov-immigration-catalog'],
    relatedSlugs: ['agency-roles', 'record-readiness', 'case-status-and-account-handoffs'],
    sections: [
      {
        id: 'define-before-counting',
        heading: 'Define the event before counting it',
        paragraphs: [
          paragraph('“Immigration data” spans multiple measures. A table may describe visa issuances, admissions, lawful permanent resident status, applications received, approvals, denials, pending cases, enforcement actions, or another event. Those events involve different agencies, records, and denominators. Start by naming exactly what the table measures.', ['dhs-yearbook', 'state-visa-statistics', 'uscis-data']),
          paragraph('DHS’s Yearbook of Immigration Statistics, the USCIS Data Library, and the State Department’s visa-statistics pages each organize their own data products. Read the methodology, table title, notes, fiscal-year label, and publication context before combining results across them.', ['dhs-yearbook', 'uscis-data', 'state-visa-statistics']),
        ],
        sourceIds: ['dhs-yearbook', 'uscis-data', 'state-visa-statistics'],
      },
      {
        id: 'source-map',
        heading: 'What each official source is for',
        table: {
          caption: 'A source map for responsible starting points; the live sources hold the current figures',
          headers: ['Source family', 'Useful starting question', 'Research caution'],
          rows: [
            ['DHS Office of Homeland Security Statistics Yearbook', 'What tables and definitions describe people, events, or actions across a fiscal year?', 'Read the table notes and preserve the historical release/version; terminology and coverage can change across editions.'],
            ['DHS immigration-statistics landing page', 'Which current DHS publication or data product owns the question?', 'Use the live landing page to find current releases instead of copying a number from a secondary summary.'],
            ['USCIS Immigration and Citizenship Data', 'What does USCIS report about receipts, approvals, denials, pending cases, processing measures, or form-specific workload?', 'A USCIS case-performance table describes a defined workload; pair it with its methodology rather than using it as a population estimate.'],
            ['State Department Visa Statistics', 'How many immigrant or nonimmigrant visas were reported as issued in the selected product and period?', 'The State page notes that some monthly data are preliminary and that some in-country adjustment categories are outside the visa-office report.'],
            ['Data.gov and its catalog', 'Where is the publishing agency’s dataset metadata, access level, resource link, and contact?', 'Data.gov is a catalog and metadata layer; the publishing agency owns the underlying data file and release context.'],
          ],
        },
        sourceIds: ['dhs-yearbook', 'dhs-immigration-statistics', 'uscis-data', 'state-visa-statistics', 'state-visa-annual-reports', 'data-gov', 'data-gov-catalog'],
      },
      {
        id: 'four-distinctions',
        heading: 'Four distinctions that prevent bad conclusions',
        bullets: [
          'Fiscal year versus calendar year: write the period exactly as the source defines it.',
          'Issuance, admission, adjustment, approval, receipt, and pending: these are distinct events and measures involving different records or people counts.',
          'Counts versus unique people: one person, case, petition, application, or admission can appear in different measures under different identifiers or periods.',
          'Preliminary versus revised data: preserve the release date and check the live official page before publication or reuse.',
        ],
        paragraphs: [
          paragraph('The State Department’s visa-statistics page explicitly warns that monthly reports contain preliminary data subject to change. Data.gov likewise explains that catalog metadata and the underlying agency data have different owners and update paths. These are core context for the strength of a result.', ['state-visa-statistics', 'data-gov']),
        ],
        sourceIds: ['state-visa-statistics', 'data-gov'],
      },
      {
        id: 'research-card',
        heading: 'Use a reproducible research card',
        steps: [
          { label: 'Question', text: 'Write the question as an observable event, separate from a conclusion: “How many reported issuances…?” or “What does this USCIS table measure?”' },
          { label: 'Source', text: 'Record the official publisher, exact report or dataset title, URL, table/resource identifier, and the date last checked.' },
          { label: 'Scope', text: 'Write the period, geography, category, filters, inclusion rules, and whether the result is preliminary, final, or revised.' },
          { label: 'Measure', text: 'Name the unit: cases, applications, petitions, people, visas, admissions, actions, or another unit defined by the source.' },
          { label: 'Limit', text: 'Record the questions the source leaves open and the next official source needed to complete the picture.' },
          { label: 'Recheck', text: 'Before publication, reopen the live official page and confirm the current resource, definition, and release context.' },
        ],
        sourceIds: ['dhs-yearbook', 'uscis-data', 'state-visa-statistics', 'data-gov-catalog'],
      },
      {
        id: 'catalog-is-not-data',
        heading: 'A catalog record points to the public data file',
        paragraphs: [
          paragraph('Data.gov describes itself as a metadata catalog: it points readers to datasets and their publishing agencies, while the publishing agency owns and manages the underlying data. A catalog record can also identify an access level, a contact, a resource URL, and a metadata update date that differ from the data’s own release date.', ['data-gov', 'data-gov-catalog']),
          paragraph('Use a Data.gov record to locate and document a source. Then follow the publishing agency’s resource and read its access, privacy, methodology, and license information. When access or verification remains open, record that status and return to the publishing agency for the next source.', ['data-gov-immigration-catalog', 'data-gov']),
        ],
        sourceIds: ['data-gov', 'data-gov-catalog', 'data-gov-immigration-catalog'],
      },
      {
        id: 'no-personal-forecast',
        heading: 'Keep aggregate data tied to its defined question',
        paragraphs: [
          paragraph('A published count describes the source’s defined workload or event. Personal visa, admission, benefit, work-authorization, and case-timing questions require the person’s facts, category, record, current instructions, and responsible agency.', ['dhs-yearbook', 'uscis-data', 'state-visa-statistics', 'cbp-admission']),
          paragraph('This brief links readers to the current official tables rather than reproducing a headline statistic. It gives the reader a method for finding the live table and preserving its limitations. Verify the live DHS, USCIS, State Department, and Data.gov pages before relying on a research result.', ['dhs-immigration-statistics', 'uscis-data', 'state-visa-statistics', 'data-gov']),
        ],
        note: 'USIVA provides a planning desk and research method. For legal decisions, use the relevant official agency or qualified immigration counsel; for data questions, contact the publishing agency named in the official record.',
        sourceIds: ['dhs-immigration-statistics', 'uscis-data', 'state-visa-statistics', 'data-gov'],
      },
    ],
  },
];

export const briefSourceMap = new Map(briefSources.map((source) => [source.id, source]));
export const briefMap = new Map(immigrationBriefs.map((brief) => [brief.slug, brief]));

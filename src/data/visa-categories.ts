/**
 * Source-aware visa taxonomy for the public USIVA orientation catalog.
 *
 * The catalog deliberately describes purpose and planning questions rather
 * than deciding eligibility. Every materialized category keeps its official
 * source, the date that source was checked, and a concrete official next step
 * so the route stays useful when government instructions change.
 */

export const visaCatalogReviewDate = '2026-08-22' as const;

export type VisaTrack = 'nonimmigrant' | 'immigrant';

export type OfficialSourceAgency =
  | 'U.S. Department of State'
  | 'U.S. Citizenship and Immigration Services';

export interface OfficialNextStep {
  label: string;
  url: string;
}

export interface OfficialSource {
  label: string;
  url: string;
  agency: OfficialSourceAgency;
  checkedOn: string;
  nextStepLabel: string;
}

export interface VisaCategory {
  slug: string;
  code: string;
  title: string;
  track: VisaTrack;
  family: string;
  familySlug: string;
  familyTitle: string;
  audience: string;
  purpose: string;
  sourceKey: SourceKey;
  officialSourceUrl: string;
  officialSourceLabel: string;
  officialSourceAgency: OfficialSourceAgency;
  officialSourceCheckedOn: string;
  officialNextStep: OfficialNextStep;
  planningTopics: readonly string[];
  scopeNote: string;
  relatedCodes: readonly string[];
}

export interface VisaFamily {
  slug: string;
  code: string;
  title: string;
  track: VisaTrack;
  summary: string;
  sourceKey: SourceKey;
  officialSourceUrl: string;
  officialSourceLabel: string;
  officialSourceAgency: OfficialSourceAgency;
  officialSourceCheckedOn: string;
  categoryCodes: readonly string[];
}

export type SourceKey = keyof typeof visaSources;

const visaSources = {
  directory: {
    label: 'Directory of Visa Categories',
    url: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the U.S. Department of State category directory',
  },
  visitor: {
    label: 'Visitor Visa',
    url: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department visitor-visa guidance',
  },
  diplomats: {
    label: 'Visas for Diplomats and Foreign Government Officials',
    url: 'https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visas-diplomats.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department official-travel guidance',
  },
  transit: {
    label: 'Transit Visa',
    url: 'https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/transit.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department transit guidance',
  },
  crewmember: {
    label: 'Crewmember Visa',
    url: 'https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/crewmember-visa.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department crewmember guidance',
  },
  treaty: {
    label: 'Treaty Trader, Treaty Investor, and Australian Specialty Occupations',
    url: 'https://travel.state.gov/content/travel/en/us-visas/employment/treaty-trader-investor-visa-e.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department treaty-category guidance',
  },
  student: {
    label: 'Student Visa',
    url: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department student-visa guidance',
  },
  exchange: {
    label: 'Exchange Visitor Visa',
    url: 'https://travel.state.gov/content/travel/en/us-visas/study/exchange.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department exchange-visitor guidance',
  },
  organization: {
    label: 'Visas for Employees of International Organizations and NATO',
    url: 'https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department G and NATO guidance',
  },
  media: {
    label: 'Visas for Members of the Foreign Media, Press, and Radio',
    url: 'https://travel.state.gov/content/travel/en/us-visas/employment/visas-members-foreign-media-press-radio.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department media-visa guidance',
  },
  exchangeK: {
    label: 'Nonimmigrant Visa for a Fiancé(e) (K-1)',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant-visa-for-a-fiance-k-1.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department K-visa guidance',
  },
  v: {
    label: 'Nonimmigrant (V) Visa for Spouse and Children of an LPR',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant--visa-for-spouse-and-children-of-a-lawful-permanent-resident.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department V-visa notice and current instructions',
  },
  immigrant: {
    label: 'Immigrate to the United States',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Start with the State Department immigrant-visa overview',
  },
  familyImmigrant: {
    label: 'Family Immigration',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department family-immigration process',
  },
  employmentImmigrant: {
    label: 'Employment-Based Immigrant Visas',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/employment-based-immigrant-visas.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department employment-based process',
  },
  diversity: {
    label: 'Diversity Visa Instructions',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-instructions.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Read the current State Department Diversity Visa instructions',
  },
  returningResident: {
    label: 'Returning Resident Visas',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/returning-resident.html',
    agency: 'U.S. Department of State',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review the State Department returning-resident guidance',
  },
  uscisTemporary: {
    label: 'USCIS Working in the United States',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS temporary-worker guidance and petition instructions',
  },
  uscisH1B: {
    label: 'USCIS Working in the United States — H-1B references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS H-1B category guidance',
  },
  uscisO: {
    label: 'USCIS Working in the United States — O references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS O-category guidance',
  },
  uscisP: {
    label: 'USCIS Working in the United States — P references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS P-category guidance',
  },
  uscisQ: {
    label: 'USCIS Working in the United States — Q references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS Q-category guidance',
  },
  uscisR: {
    label: 'USCIS Working in the United States — R references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS R-category guidance',
  },
  uscisT: {
    label: 'USCIS Form I-914 for T Nonimmigrant Status',
    url: 'https://www.uscis.gov/i-914',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS T-status guidance',
  },
  uscisU: {
    label: 'USCIS Form I-918 for U Nonimmigrant Status',
    url: 'https://www.uscis.gov/i-918',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS U-status guidance',
  },
  uscisTN: {
    label: 'USCIS Working in the United States — TN references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS TN/TD guidance',
  },
  uscisCW: {
    label: 'USCIS Working in the United States — CW-1 references',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    agency: 'U.S. Citizenship and Immigration Services',
    checkedOn: visaCatalogReviewDate,
    nextStepLabel: 'Review USCIS temporary-worker guidance for CW-1',
  },
} as const satisfies Record<string, OfficialSource>;

export const officialVisaSources = visaSources;

export const informationalScopeNote =
  'This is general planning information, not a legal conclusion or prediction. It does not determine eligibility, status, work authorization, admissibility, visa issuance, or timing; verify current rules and case-specific facts with the relevant U.S. government authority, school, sponsor, employer, or qualified immigration counsel.';

const topicSets = {
  officialTravel: [
    'Confirm the official role, assignment, and travel purpose in the source record.',
    'Identify the passport, diplomatic or official documentation, and local-post instructions that may apply.',
    'Record who can answer status, renewal, or change-of-status questions for this official assignment.',
  ],
  visitor: [
    'Describe the trip purpose, expected activities, and planned dates in plain language.',
    'Separate visitor activities from employment, study, or other activity that may require a different category.',
    'Check the embassy or consulate instructions and keep the supporting records current.',
  ],
  transit: [
    'Map the onward itinerary, destination, and reason the traveler passes through the United States.',
    'Check whether a different travel purpose, crewmember assignment, or official status changes the category question.',
    'Save the country-specific appointment and document instructions before scheduling travel.',
  ],
  crewmember: [
    'Document the vessel or aircraft, role, employer, and the travel-to-join sequence.',
    'Separate working onboard from transiting to meet the vessel or aircraft.',
    'Confirm the carrier and consular-post instructions before relying on a combination C-1/D notation.',
  ],
  treaty: [
    'Record the treaty-country connection, enterprise, role, and the nature of the trade, investment, or specialty occupation.',
    'Identify which facts are supported by enterprise, payroll, ownership, trade, or professional records.',
    'Check the consular post’s E-visa instructions and any employer or Department of Labor steps that apply.',
  ],
  student: [
    'Confirm the school or program, admission record, SEVIS relationship, and the document the school issued.',
    'Map funding, travel, study load, and any planned work or practical training questions separately.',
    'Ask the school’s designated official which current instructions control the student’s record.',
  ],
  exchange: [
    'Identify the designated sponsor, program category, SEVIS record, and program dates.',
    'Keep the DS-2019, sponsor instructions, funding information, and travel plans aligned.',
    'Name any employment, training, research, or travel change that should be discussed with the sponsor first.',
  ],
  organization: [
    'Document the international organization or NATO assignment and the official duties involved.',
    'Separate principal, immediate-family, and personal-employee records before planning the appointment.',
    'Use the Department of State or organization liaison for renewal, change, and document questions.',
  ],
  media: [
    'Describe the foreign media organization, the temporary assignment, and the informational work planned.',
    'Separate reporting activity from tourism, independent work, commercial production, or other purposes.',
    'Check whether the relevant embassy or consulate requests credentials, assignment letters, or employer records.',
  ],
  temporaryWorker: [
    'Identify the petitioning employer or organization, proposed role, worksite, and intended dates.',
    'Track the petition, labor-certification, consultation, or approval document that the official process requires.',
    'Do not begin a new role, location, or activity based only on a general category description; verify the controlling record.',
  ],
  derivative: [
    'Identify the principal category, relationship, and the dates or records that connect the derivative traveler to it.',
    'Separate dependent travel from independent study, employment, or other activity questions.',
    'Check the principal’s sponsor, school, employer, or consular-post instructions for derivative documentation.',
  ],
  familyTransition: [
    'Map the family relationship, principal petitioner, petition receipt or approval, and intended sequence of travel.',
    'Keep civil records and relationship evidence consistent across the petition and visa process.',
    'Use the official instructions for the responsible embassy, consulate, USCIS office, or National Visa Center.',
  ],
  humanitarian: [
    'Write down the relevant incident, dates, agencies, and safe contact method without sharing sensitive details on a public page.',
    'Identify the certification, petition, law-enforcement, medical, or protection records the official process may reference.',
    'Use a qualified advocate or attorney for case-specific safety, confidentiality, and filing questions.',
  ],
  tn: [
    'Identify the listed profession, nationality, U.S. role, employer, and assignment dates.',
    'Align the support letter, professional credentials, and border or consular filing plan with the official instructions.',
    'Keep dependent TD planning separate from any independent employment or study question.',
  ],
  other: [
    'Confirm whether the pathway is a visa classification, a special territorial program, or a visa-waiver travel program.',
    'Record the intended purpose, location, sponsor or employer, and travel document used.',
    'Use the official agency source before buying travel, accepting work, or sharing personal records.',
  ],
  immigrantFamily: [
    'Map the petitioner, beneficiary, family relationship, and whether the record is immediate-relative or preference-based.',
    'Keep civil documents, petition notices, financial-support materials, and country-specific instructions in one source trail.',
    'Track the handoff between USCIS, the National Visa Center, and the embassy or consulate when it occurs.',
  ],
  adoption: [
    'Identify whether the case uses the orphan or Hague process and keep the child’s civil and adoption records organized.',
    'Record the responsible USCIS, Department of State, embassy, consulate, or accredited adoption-service instructions.',
    'Treat medical, custody, and child-protection questions as case-specific matters for the responsible authority or counsel.',
  ],
  employmentImmigrant: [
    'Identify the preference category, employer or petitioner, role, and any labor-certification or petition milestone.',
    'Track the priority-date and visa-number information through the current Visa Bulletin rather than an undated summary.',
    'Keep petition, civil-document, medical, and interview instructions separate from general category orientation.',
  ],
  specialImmigrant: [
    'Identify the statutory or employment history that makes the special route relevant and the agency that documents it.',
    'Preserve service, employment, family, petition, or approval records in the order the official process requests.',
    'Use current USCIS, Department of State, and post-specific instructions for the case rather than relying on a category label alone.',
  ],
  diversity: [
    'Use only the official Diversity Visa instructions and Entrant Status Check for a current program year.',
    'Record the confirmation number, household changes, deadlines, and DS-260 or interview milestones in a secure place.',
    'Do not treat selection as a visa issuance; follow the official process and current deadline notices.',
  ],
  returningResident: [
    'Document the prior permanent-resident record, travel dates, intended return, and circumstances affecting the time abroad.',
    'Gather the official forms and evidence listed by the responsible embassy or consulate.',
    'Do not make non-refundable travel decisions until the official process provides a current result.',
  ],
} as const;

interface CategoryDefinition {
  code: string;
  title: string;
  audience?: string;
  purpose?: string;
  source?: SourceKey;
  planningTopics: readonly string[];
  scopeNote?: string;
  relatedCodes?: readonly string[];
  officialNextStep?: OfficialNextStep;
}

interface FamilyDefinition {
  slug: string;
  code: string;
  title: string;
  track: VisaTrack;
  summary: string;
  audience: string;
  purpose: string;
  source: SourceKey;
  categories: readonly CategoryDefinition[];
}

export function slugifyVisaCode(code: string): string {
  return code.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function buildCatalog(definitions: readonly FamilyDefinition[]) {
  const categories: VisaCategory[] = definitions.flatMap((family) =>
    family.categories.map((entry) => {
      const sourceKey = entry.source ?? family.source;
      const source = visaSources[sourceKey];
      const familyCategoryCodes = family.categories.map((candidate) => candidate.code);

      return {
        slug: slugifyVisaCode(entry.code),
        code: entry.code,
        title: entry.title,
        track: family.track,
        family: family.code,
        familySlug: family.slug,
        familyTitle: family.title,
        audience: entry.audience ?? family.audience,
        purpose: entry.purpose ?? family.purpose,
        sourceKey,
        officialSourceUrl: source.url,
        officialSourceLabel: source.label,
        officialSourceAgency: source.agency,
        officialSourceCheckedOn: source.checkedOn,
        officialNextStep: entry.officialNextStep ?? {
          label: source.nextStepLabel,
          url: source.url,
        },
        planningTopics: entry.planningTopics,
        scopeNote: entry.scopeNote ?? informationalScopeNote,
        relatedCodes:
          entry.relatedCodes ?? familyCategoryCodes.filter((code) => code !== entry.code).slice(0, 4),
      } satisfies VisaCategory;
    }),
  );

  const families: VisaFamily[] = definitions.map((family) => {
    const familyCategories = categories.filter((category) => category.familySlug === family.slug && category.track === family.track);
    const source = visaSources[family.source];
    return {
      slug: family.slug,
      code: family.code,
      title: family.title,
      track: family.track,
      summary: family.summary,
      sourceKey: family.source,
      officialSourceUrl: source.url,
      officialSourceLabel: source.label,
      officialSourceAgency: source.agency,
      officialSourceCheckedOn: source.checkedOn,
      categoryCodes: familyCategories.map((category) => category.code),
    } satisfies VisaFamily;
  });

  return { categories, families };
}

const nonimmigrantFamilyDefinitions: readonly FamilyDefinition[] = [
  {
    slug: 'a',
    code: 'A',
    title: 'Diplomats and foreign government officials',
    track: 'nonimmigrant',
    summary: 'Official travel by national-government representatives, their qualified family members, and personal employees.',
    audience: 'National-government representatives, qualified family members, and personal employees researching official travel.',
    purpose: 'Official travel or assignment for a foreign government, with related family and personal-employee pathways.',
    source: 'diplomats',
    categories: [
      { code: 'A-1', title: 'Diplomats and heads of state', planningTopics: topicSets.officialTravel },
      { code: 'A-2', title: 'Other foreign government officials and employees', planningTopics: topicSets.officialTravel },
      { code: 'A-3', title: 'Personal employees of A-1 or A-2 visa holders', planningTopics: topicSets.officialTravel },
    ],
  },
  {
    slug: 'b',
    code: 'B',
    title: 'Visitors for business, tourism, or border travel',
    track: 'nonimmigrant',
    summary: 'Temporary business and visitor travel, including the Mexico Border Crossing Card.',
    audience: 'Visitors, business travelers, and Mexican travelers researching short-term visitor documentation.',
    purpose: 'Temporary business, tourism, medical treatment, or related visitor travel that is not a permanent move.',
    source: 'visitor',
    categories: [
      { code: 'B-1', title: 'Business visitor', planningTopics: topicSets.visitor },
      { code: 'B-2', title: 'Tourism, medical treatment, and other visitor travel', planningTopics: topicSets.visitor },
      { code: 'BCC', title: 'Border Crossing Card for Mexican citizens', planningTopics: topicSets.visitor, source: 'directory' },
    ],
  },
  {
    slug: 'c',
    code: 'C',
    title: 'Transit and foreign government officials in transit',
    track: 'nonimmigrant',
    summary: 'Temporary passage through the United States and official transit categories.',
    audience: 'Travelers passing through the United States and foreign government officials in transit.',
    purpose: 'Transit through the United States to another country, including specified official-transit situations.',
    source: 'transit',
    categories: [
      { code: 'C-1', title: 'Transit traveler', planningTopics: topicSets.transit },
      { code: 'C-2', title: 'Foreign government official in transit to the United Nations', planningTopics: topicSets.transit },
      { code: 'C-3', title: 'Foreign government official in transit', planningTopics: topicSets.transit, source: 'diplomats' },
      { code: 'C-1/D', title: 'Combined transit and crewmember notation', planningTopics: topicSets.crewmember, source: 'crewmember' },
    ],
  },
  {
    slug: 'd',
    code: 'D',
    title: 'Crewmembers',
    track: 'nonimmigrant',
    summary: 'Crewmember travel for service aboard commercial sea vessels and international aircraft.',
    audience: 'Commercial airline and sea-vessel crewmembers and employers organizing travel-to-join details.',
    purpose: 'Temporary entry connected to qualifying crewmember duties and departure on the relevant vessel or aircraft.',
    source: 'crewmember',
    categories: [
      { code: 'D', title: 'Crewmember on a commercial vessel or aircraft', planningTopics: topicSets.crewmember },
    ],
  },
  {
    slug: 'e',
    code: 'E',
    title: 'Treaty traders, treaty investors, and Australian specialty occupations',
    track: 'nonimmigrant',
    summary: 'Treaty-based trade and investment routes plus the Australian specialty-occupation category and derivatives.',
    audience: 'Treaty-country enterprise owners, employees, Australian professionals, and their dependents.',
    purpose: 'Temporary business, investment, specialty-occupation, or derivative travel tied to an E-category principal.',
    source: 'treaty',
    categories: [
      { code: 'E-1', title: 'Treaty trader', planningTopics: topicSets.treaty },
      { code: 'E-2', title: 'Treaty investor', planningTopics: topicSets.treaty },
      { code: 'E-3', title: 'Australian specialty-occupation professional', planningTopics: topicSets.treaty },
      { code: 'E-3D', title: 'Dependent of an E-3 principal', planningTopics: topicSets.derivative },
      { code: 'E-3R', title: 'Returning E-3 worker', planningTopics: topicSets.treaty },
    ],
  },
  {
    slug: 'f',
    code: 'F',
    title: 'Academic and vocational students',
    track: 'nonimmigrant',
    summary: 'Academic study, dependent travel, and Canadian or Mexican commuter-student variants.',
    audience: 'International students, dependents, schools, and education partners organizing study documentation.',
    purpose: 'Temporary academic study and closely related dependent or commuter-student travel.',
    source: 'student',
    categories: [
      { code: 'F-1', title: 'Academic student', planningTopics: topicSets.student },
      { code: 'F-2', title: 'Spouse or child of an F-1 student', planningTopics: topicSets.derivative },
      { code: 'F-3', title: 'Canadian or Mexican commuter student', planningTopics: topicSets.student, source: 'directory' },
    ],
  },
  {
    slug: 'g',
    code: 'G',
    title: 'International organization officials and employees',
    track: 'nonimmigrant',
    summary: 'Official work with designated international organizations and related personal employees.',
    audience: 'International-organization officials, employees, qualified family members, and personal employees.',
    purpose: 'Official assignment or employment with a designated international organization.',
    source: 'organization',
    categories: [
      { code: 'G-1', title: 'Permanent mission member', planningTopics: topicSets.organization },
      { code: 'G-2', title: 'Representative of a recognized government', planningTopics: topicSets.organization },
      { code: 'G-3', title: 'Representative of a nonrecognized government or member', planningTopics: topicSets.organization },
      { code: 'G-4', title: 'International organization employee', planningTopics: topicSets.organization },
      { code: 'G-5', title: 'Personal employee of a G-1 through G-4 holder', planningTopics: topicSets.organization },
    ],
  },
  {
    slug: 'h',
    code: 'H',
    title: 'Temporary workers and related dependents',
    track: 'nonimmigrant',
    summary: 'Petition-based temporary worker categories, specialty-occupation variants, seasonal work, training, and dependents.',
    audience: 'Temporary workers, employers, trainees, and family members organizing petition and travel records.',
    purpose: 'Temporary employment, training, or dependent travel connected to an H-category principal.',
    source: 'uscisTemporary',
    categories: [
      { code: 'H-1B', title: 'Specialty-occupation worker', planningTopics: topicSets.temporaryWorker, source: 'uscisH1B' },
      { code: 'H-1B1', title: 'Chile or Singapore free-trade professional', planningTopics: topicSets.temporaryWorker },
      { code: 'H-2A', title: 'Temporary agricultural worker', planningTopics: topicSets.temporaryWorker },
      { code: 'H-2B', title: 'Temporary nonagricultural worker', planningTopics: topicSets.temporaryWorker },
      { code: 'H-3', title: 'Trainee or special-education exchange visitor', planningTopics: topicSets.temporaryWorker },
      { code: 'H-4', title: 'Spouse or child of an H principal', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'i',
    code: 'I',
    title: 'Foreign media representatives',
    track: 'nonimmigrant',
    summary: 'Temporary media, press, radio, film, and other information-media work for foreign organizations.',
    audience: 'Journalists, producers, camera crews, and foreign media organizations planning a U.S. assignment.',
    purpose: 'Temporary informational or news-gathering work for a foreign media organization.',
    source: 'media',
    categories: [
      { code: 'I', title: 'Representative of foreign press, radio, film, or other information media', planningTopics: topicSets.media },
    ],
  },
  {
    slug: 'j',
    code: 'J',
    title: 'Exchange visitors',
    track: 'nonimmigrant',
    summary: 'Designated exchange programs, sponsors, SEVIS records, and derivative family travel.',
    audience: 'Exchange visitors, designated sponsors, schools, employers, and J-2 family members.',
    purpose: 'Participation in an approved exchange visitor program and related dependent travel.',
    source: 'exchange',
    categories: [
      { code: 'J-1', title: 'Exchange visitor', planningTopics: topicSets.exchange },
      { code: 'J-2', title: 'Spouse or child of a J-1 exchange visitor', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'k',
    code: 'K',
    title: 'Fiancé(e)s, spouses, and children of U.S. citizens',
    track: 'nonimmigrant',
    summary: 'Immigration-related nonimmigrant routes for a fiancé(e), spouse, or child connected to a U.S. citizen.',
    audience: 'Foreign-citizen fiancé(e)s, spouses, children, and U.S.-citizen petitioners.',
    purpose: 'Temporary entry connected to a qualifying family process that may lead to permanent residence.',
    source: 'exchangeK',
    categories: [
      { code: 'K-1', title: 'Fiancé(e) of a U.S. citizen', planningTopics: topicSets.familyTransition },
      { code: 'K-2', title: 'Child of a K-1 fiancé(e)', planningTopics: topicSets.familyTransition },
      { code: 'K-3', title: 'Spouse of a U.S. citizen with a pending immigrant petition', planningTopics: topicSets.familyTransition },
      { code: 'K-4', title: 'Child of a K-3 spouse', planningTopics: topicSets.familyTransition },
    ],
  },
  {
    slug: 'l',
    code: 'L',
    title: 'Intracompany transferees and dependents',
    track: 'nonimmigrant',
    summary: 'Temporary transfer within a qualifying international organization and dependent family travel.',
    audience: 'International companies, executives, managers, specialized-knowledge workers, and dependents.',
    purpose: 'Temporary intracompany transfer to a U.S. office, affiliate, subsidiary, or qualifying new office.',
    source: 'uscisTemporary',
    categories: [
      { code: 'L-1A', title: 'Intracompany executive or manager', planningTopics: topicSets.temporaryWorker },
      { code: 'L-1B', title: 'Intracompany specialized-knowledge worker', planningTopics: topicSets.temporaryWorker },
      { code: 'L-2', title: 'Spouse or child of an L-1 principal', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'm',
    code: 'M',
    title: 'Vocational and nonacademic students',
    track: 'nonimmigrant',
    summary: 'Vocational or other recognized nonacademic study and dependent or commuter-student variants.',
    audience: 'Vocational students, schools, dependents, and Canadian or Mexican commuter students.',
    purpose: 'Temporary vocational or nonacademic study and related dependent travel.',
    source: 'student',
    categories: [
      { code: 'M-1', title: 'Vocational or nonacademic student', planningTopics: topicSets.student },
      { code: 'M-2', title: 'Spouse or child of an M-1 student', planningTopics: topicSets.derivative },
      { code: 'M-3', title: 'Canadian or Mexican commuter student', planningTopics: topicSets.student, source: 'directory' },
    ],
  },
  {
    slug: 'n',
    code: 'N',
    title: 'Children and surviving family of special immigrants',
    track: 'nonimmigrant',
    summary: 'N-category family routes connected to certain special-immigrant classifications.',
    audience: 'Children and qualifying surviving family members researching an N-category connection.',
    purpose: 'Temporary family travel tied to specific special-immigrant classifications.',
    source: 'directory',
    categories: [
      { code: 'N-8', title: 'Parent of certain special immigrants', planningTopics: topicSets.familyTransition },
      { code: 'N-9', title: 'Child of an N-8 or related special immigrant', planningTopics: topicSets.familyTransition },
    ],
  },
  {
    slug: 'o',
    code: 'O',
    title: 'Individuals of extraordinary ability or achievement',
    track: 'nonimmigrant',
    summary: 'Petition-based temporary work for extraordinary ability or achievement and essential support or family travel.',
    audience: 'Individuals, petitioning organizations, support personnel, and dependents in the O category.',
    purpose: 'Temporary work in a field of extraordinary ability or achievement, with related support and family routes.',
    source: 'uscisO',
    categories: [
      { code: 'O-1', title: 'Individual of extraordinary ability or achievement', planningTopics: topicSets.temporaryWorker },
      { code: 'O-2', title: 'Essential support personnel for an O-1', planningTopics: topicSets.temporaryWorker },
      { code: 'O-3', title: 'Spouse or child of an O-1 or O-2', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'p',
    code: 'P',
    title: 'Athletes, artists, entertainers, and support personnel',
    track: 'nonimmigrant',
    summary: 'Temporary performance, competition, cultural, and support-personnel routes.',
    audience: 'Athletes, artists, entertainers, reciprocal-exchange participants, support staff, and dependents.',
    purpose: 'Temporary participation in qualifying athletic, artistic, entertainment, or reciprocal-exchange activity.',
    source: 'uscisP',
    categories: [
      { code: 'P-1', title: 'Internationally recognized athlete or entertainment group', planningTopics: topicSets.temporaryWorker },
      { code: 'P-2', title: 'Artist or entertainer in a reciprocal exchange program', planningTopics: topicSets.temporaryWorker },
      { code: 'P-3', title: 'Artist or entertainer in a culturally unique program', planningTopics: topicSets.temporaryWorker },
      { code: 'P-4', title: 'Spouse or child of a P principal', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'q',
    code: 'Q',
    title: 'Cultural exchange visitors',
    track: 'nonimmigrant',
    summary: 'Cultural exchange and international cultural exchange program routes.',
    audience: 'Cultural exchange participants, sponsoring organizations, and program partners.',
    purpose: 'Temporary participation in an approved international cultural exchange program.',
    source: 'uscisQ',
    categories: [
      { code: 'Q-1', title: 'International cultural exchange visitor', planningTopics: topicSets.exchange },
      { code: 'Q-2', title: 'Irish or Northern Irish peace-program participant', planningTopics: topicSets.exchange, source: 'directory' },
    ],
  },
  {
    slug: 'r',
    code: 'R',
    title: 'Religious workers and dependents',
    track: 'nonimmigrant',
    summary: 'Temporary religious-worker service and dependent family travel.',
    audience: 'Religious organizations, temporary religious workers, and their dependents.',
    purpose: 'Temporary religious work for a qualifying religious organization and related dependent travel.',
    source: 'uscisR',
    categories: [
      { code: 'R-1', title: 'Temporary religious worker', planningTopics: topicSets.temporaryWorker },
      { code: 'R-2', title: 'Spouse or child of an R-1', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 's',
    code: 'S',
    title: 'Informants and witnesses',
    track: 'nonimmigrant',
    summary: 'Special law-enforcement and information-provider categories that require careful official coordination.',
    audience: 'Informants, witnesses, and responsible law-enforcement or government coordinators.',
    purpose: 'Temporary presence connected to qualifying information or testimony for law-enforcement purposes.',
    source: 'directory',
    categories: [
      { code: 'S-5', title: 'Informant providing critical information', planningTopics: topicSets.humanitarian },
      { code: 'S-6', title: 'Terrorism-related informant', planningTopics: topicSets.humanitarian },
      { code: 'S-7', title: 'Qualified family member of an S principal', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 't',
    code: 'T',
    title: 'Victims of human trafficking',
    track: 'nonimmigrant',
    summary: 'Humanitarian protection category for victims of a severe form of trafficking and certain family members.',
    audience: 'Trafficking survivors, qualifying family members, advocates, and authorized representatives.',
    purpose: 'Humanitarian protection and temporary status connected to a qualifying trafficking situation.',
    source: 'uscisT',
    categories: [
      { code: 'T-1', title: 'Victim of a severe form of human trafficking', planningTopics: topicSets.humanitarian },
      { code: 'T-2', title: 'Spouse of a T-1', planningTopics: topicSets.derivative },
      { code: 'T-3', title: 'Child of a T-1', planningTopics: topicSets.derivative },
      { code: 'T-4', title: 'Parent of a T-1 under specified circumstances', planningTopics: topicSets.derivative },
      { code: 'T-5', title: 'Unmarried sibling under specified circumstances', planningTopics: topicSets.derivative },
      { code: 'T-6', title: 'Derivative family member of a T principal', planningTopics: topicSets.derivative },
    ],
  },
  {
    slug: 'u',
    code: 'U',
    title: 'Victims of qualifying criminal activity',
    track: 'nonimmigrant',
    summary: 'Humanitarian protection category for victims who assist law enforcement in qualifying investigations or prosecutions.',
    audience: 'Crime victims, qualifying family members, advocates, law-enforcement certifiers, and representatives.',
    purpose: 'Humanitarian protection and temporary status connected to a qualifying criminal activity and official cooperation.',
    source: 'uscisU',
    categories: [
      { code: 'U', title: 'Victim of qualifying criminal activity', planningTopics: topicSets.humanitarian },
    ],
  },
  {
    slug: 'v',
    code: 'V',
    title: 'Certain spouses and children of lawful permanent residents',
    track: 'nonimmigrant',
    summary: 'A rarely issued family-reunification category preserved in statute with current State Department notice language.',
    audience: 'Certain spouses and children of lawful permanent residents researching a V-category record.',
    purpose: 'Temporary family reunification while a qualifying family immigration process is pending, subject to current official guidance.',
    source: 'v',
    categories: [
      { code: 'V', title: 'Spouse or child of a lawful permanent resident', planningTopics: topicSets.familyTransition },
    ],
  },
  {
    slug: 'nato',
    code: 'NATO',
    title: 'NATO officials, employees, and dependents',
    track: 'nonimmigrant',
    summary: 'Official NATO travel categories, including qualified family members and personal employees.',
    audience: 'NATO representatives, international staff, qualified family members, and personal employees.',
    purpose: 'Official NATO assignment or related family and personal-employee travel.',
    source: 'organization',
    categories: [
      { code: 'NATO-1', title: 'Principal representative of a NATO member', planningTopics: topicSets.organization },
      { code: 'NATO-2', title: 'Representative or family member under NATO agreements', planningTopics: topicSets.organization },
      { code: 'NATO-3', title: 'Official clerical staff', planningTopics: topicSets.organization },
      { code: 'NATO-4', title: 'NATO official or employee', planningTopics: topicSets.organization },
      { code: 'NATO-5', title: 'Expert on NATO mission', planningTopics: topicSets.organization },
      { code: 'NATO-6', title: 'Member of a civilian component or military force', planningTopics: topicSets.organization },
      { code: 'NATO-7', title: 'Personal employee of a NATO-1 through NATO-6 holder', planningTopics: topicSets.organization },
    ],
  },
  {
    slug: 'tn',
    code: 'TN',
    title: 'USMCA professionals and dependents',
    track: 'nonimmigrant',
    summary: 'Professional trade-agreement travel for qualifying Canadian and Mexican professionals and their dependents.',
    audience: 'Canadian and Mexican professionals, U.S. employers, and TD dependents.',
    purpose: 'Temporary professional activity under the United States–Mexico–Canada Agreement framework.',
    source: 'uscisTN',
    categories: [
      { code: 'TN', title: 'USMCA professional', planningTopics: topicSets.tn },
      { code: 'TD', title: 'Spouse or child of a TN professional', planningTopics: topicSets.tn },
    ],
  },
  {
    slug: 'other',
    code: 'Other',
    title: 'Other official temporary pathways',
    track: 'nonimmigrant',
    summary: 'Additional official State Department directory entries that do not fit the A–V family index.',
    audience: 'Travelers and employers researching a special territorial worker route or visa-waiver travel.',
    purpose: 'A special CNMI transitional-worker route or a visa-waiver travel pathway that is not itself a visa.',
    source: 'directory',
    categories: [
      { code: 'CW-1', title: 'CNMI-only transitional worker', planningTopics: topicSets.other, source: 'uscisCW' },
      {
        code: 'VWP',
        title: 'Visa Waiver Program travel reference (not a visa category)',
        planningTopics: topicSets.other,
        scopeNote:
          'This entry describes a visa-waiver travel program, not a visa classification. It is general orientation only and does not determine whether a traveler may use the program, enter the United States, or avoid another visa category; verify current requirements with the official State Department and ESTA resources.',
      },
    ],
  },
];

const immigrantFamilyDefinitions: readonly FamilyDefinition[] = [
  {
    slug: 'ir-cr',
    code: 'IR / CR',
    title: 'Immediate relatives and conditional residents',
    track: 'immigrant',
    summary: 'Immediate-relative and conditional-resident routes for spouses, children, and parents of U.S. citizens.',
    audience: 'U.S.-citizen petitioners, spouses, children, parents, and families organizing an immigrant-visa record.',
    purpose: 'Permanent immigration through a qualifying immediate-relative or conditional-resident family relationship.',
    source: 'familyImmigrant',
    categories: [
      { code: 'IR-1', title: 'Spouse of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'CR-1', title: 'Conditional spouse of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'IR-2', title: 'Unmarried child of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'CR-2', title: 'Conditional child of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'IR-5', title: 'Parent of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
    ],
  },
  {
    slug: 'adoption',
    code: 'IR / IH',
    title: 'Intercountry adoption',
    track: 'immigrant',
    summary: 'Orphan and Hague adoption routes for children immigrating through a U.S.-citizen adoption process.',
    audience: 'U.S.-citizen adoptive parents, children, accredited providers, and officials coordinating adoption cases.',
    purpose: 'Immigration connected to an intercountry adoption process under the applicable official framework.',
    source: 'immigrant',
    categories: [
      { code: 'IR-3', title: 'Child adopted abroad under the orphan process', planningTopics: topicSets.adoption },
      { code: 'IH-3', title: 'Child adopted abroad under the Hague process', planningTopics: topicSets.adoption },
      { code: 'IR-4', title: 'Child to be adopted in the United States under the orphan process', planningTopics: topicSets.adoption },
      { code: 'IH-4', title: 'Child to be adopted in the United States under the Hague process', planningTopics: topicSets.adoption },
    ],
  },
  {
    slug: 'f-family',
    code: 'F',
    title: 'Family-sponsored preference categories',
    track: 'immigrant',
    summary: 'Family-preference categories for relatives of U.S. citizens and lawful permanent residents.',
    audience: 'Family petitioners and beneficiaries tracking preference-category records and visa-number timing.',
    purpose: 'Permanent immigration through a qualifying family-sponsored preference relationship.',
    source: 'familyImmigrant',
    categories: [
      { code: 'F1', title: 'Unmarried son or daughter of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'F2A', title: 'Spouse or child of a lawful permanent resident', planningTopics: topicSets.immigrantFamily },
      { code: 'F2B', title: 'Unmarried son or daughter of a lawful permanent resident', planningTopics: topicSets.immigrantFamily },
      { code: 'F3', title: 'Married son or daughter of a U.S. citizen', planningTopics: topicSets.immigrantFamily },
      { code: 'F4', title: 'Sibling of an adult U.S. citizen', planningTopics: topicSets.immigrantFamily },
    ],
  },
  {
    slug: 'eb',
    code: 'EB',
    title: 'Employment-based preference categories',
    track: 'immigrant',
    summary: 'Permanent-worker and investment categories across the five employment-based preference groups.',
    audience: 'Employers, workers, entrepreneurs, agents, and families organizing an employment-based immigrant case.',
    purpose: 'Permanent immigration through employment, exceptional ability, special employment, or qualifying investment.',
    source: 'employmentImmigrant',
    categories: [
      { code: 'EB-1', title: 'First preference: priority workers', planningTopics: topicSets.employmentImmigrant },
      { code: 'EB-2', title: 'Second preference: advanced degree or exceptional ability', planningTopics: topicSets.employmentImmigrant },
      { code: 'EB-3', title: 'Third preference: professionals, skilled workers, and other workers', planningTopics: topicSets.employmentImmigrant },
      { code: 'EW-3', title: 'Other worker subcategory', planningTopics: topicSets.employmentImmigrant },
      { code: 'EB-4', title: 'Fourth preference: certain special immigrants', planningTopics: topicSets.specialImmigrant },
      { code: 'EB-5', title: 'Fifth preference: employment creation investors', planningTopics: topicSets.employmentImmigrant },
    ],
  },
  {
    slug: 'special',
    code: 'SPECIAL',
    title: 'Special immigrant routes',
    track: 'immigrant',
    summary: 'Special immigrant classifications, including religious workers and certain Iraqi and Afghan cases.',
    audience: 'Special immigrants, religious workers, translators, and people whose records involve U.S. government service.',
    purpose: 'Permanent immigration through a specifically defined special-immigrant classification.',
    source: 'immigrant',
    categories: [
      { code: 'SI', title: 'Iraqi and Afghan translators or interpreters', planningTopics: topicSets.specialImmigrant },
      { code: 'SQ', title: 'Iraqis and Afghans who worked for or on behalf of the U.S. government', planningTopics: topicSets.specialImmigrant },
      { code: 'SD', title: 'Special immigrant religious worker', planningTopics: topicSets.specialImmigrant },
      { code: 'SR', title: 'Special immigrant religious worker', planningTopics: topicSets.specialImmigrant },
    ],
  },
  {
    slug: 'k-family',
    code: 'K',
    title: 'Immigration-related K routes',
    track: 'immigrant',
    summary: 'K-1 fiancé(e) and K-3 spouse routes, listed by the State Department alongside immigrant categories because of their immigration purpose.',
    audience: 'U.S.-citizen petitioners, foreign-citizen fiancé(e)s, spouses, and related children.',
    purpose: 'Immigration-related entry for a fiancé(e) or spouse while the related family process continues.',
    source: 'exchangeK',
    categories: [
      { code: 'K-1', title: 'Fiancé(e) of a U.S. citizen', planningTopics: topicSets.familyTransition },
      { code: 'K-3', title: 'Spouse of a U.S. citizen with a pending immigrant petition', planningTopics: topicSets.familyTransition },
    ],
  },
  {
    slug: 'dv',
    code: 'DV',
    title: 'Diversity Visa program',
    track: 'immigrant',
    summary: 'Annual diversity immigrant-visa program with its own official instructions, selection notice, and deadline sequence.',
    audience: 'Diversity Visa entrants, selectees, accompanying family members, and authorized helpers.',
    purpose: 'Potential permanent immigration through the Department of State Diversity Visa program.',
    source: 'diversity',
    categories: [
      { code: 'DV', title: 'Diversity immigrant visa', planningTopics: topicSets.diversity },
    ],
  },
  {
    slug: 'sb',
    code: 'SB',
    title: 'Returning resident',
    track: 'immigrant',
    summary: 'Returning-resident processing for a lawful permanent resident who has remained abroad beyond ordinary travel validity.',
    audience: 'Lawful permanent residents or conditional residents researching a returning-resident record.',
    purpose: 'A returning-resident immigrant-visa process for a former resident seeking to resume permanent residence.',
    source: 'returningResident',
    categories: [
      { code: 'SB', title: 'Returning resident immigrant visa', planningTopics: topicSets.returningResident },
    ],
  },
];

const nonimmigrantCatalog = buildCatalog(nonimmigrantFamilyDefinitions);
const immigrantCatalog = buildCatalog(immigrantFamilyDefinitions);

export const nonimmigrantCategories = nonimmigrantCatalog.categories;
export const nonimmigrantFamilies = nonimmigrantCatalog.families;
export const immigrantCategories = immigrantCatalog.categories;
export const immigrantFamilies = immigrantCatalog.families;

export const allVisaCategories = [...nonimmigrantCategories, ...immigrantCategories];
export const allVisaFamilies = [...nonimmigrantFamilies, ...immigrantFamilies];

export const visaCatalogStats = {
  nonimmigrant: nonimmigrantCategories.length,
  immigrant: immigrantCategories.length,
  total: allVisaCategories.length,
  nonimmigrantFamilies: nonimmigrantFamilies.length,
  immigrantFamilies: immigrantFamilies.length,
} as const;

export function categoryPath(category: Pick<VisaCategory, 'track' | 'slug'>): string {
  return `/visa/${category.track}/${category.slug}.html`;
}

export function familyPath(family: Pick<VisaFamily, 'track' | 'slug'>): string {
  return `/visa/${family.track}/family/${family.slug}.html`;
}

export function directoryPath(track: VisaTrack): string {
  return `/visa/${track}.html`;
}

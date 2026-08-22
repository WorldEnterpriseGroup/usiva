/**
 * Official handoffs for the static resource and employer routes.
 *
 * These links are intentionally kept in one typed ledger. Government tools,
 * processing estimates, form editions, and program requirements can change;
 * the page copy should point readers back to the official source rather than
 * reproduce a result that may already be stale.
 */

export const officialResourceReviewDate = '2026-08-22' as const;

export const planningBoundary =
  'USIVA is not a law firm. This site provides planning and document-organization information only; it is not legal advice, legal representation, an eligibility determination, or a guarantee of admission, employment, funding, visa issuance, work authorization, or government approval.';

export interface OfficialResource {
  id: string;
  label: string;
  href: string;
  agency: 'USCIS' | 'U.S. Department of State' | 'E-Verify' | 'U.S. Department of Justice';
  audience: string;
  summary: string;
  use: string;
}

export const officialResources = [
  {
    id: 'uscis-case-status',
    label: 'USCIS Case Status Online',
    href: 'https://www.uscis.gov/casestatus',
    agency: 'USCIS',
    audience: 'Applicants, petitioners, and authorized representatives',
    summary: 'Use the USCIS electronic portal to check a case with the receipt number on a USCIS notice.',
    use: 'The official handoff for a current case-status result. USIVA does not mirror, interpret, or guarantee that result.',
  },
  {
    id: 'uscis-my-account',
    label: 'myUSCIS account and profile',
    href: 'https://my.uscis.gov/',
    agency: 'USCIS',
    audience: 'People who need their own USCIS online account',
    summary: 'Sign in or create a personal myUSCIS account for account-specific tools, notices, alerts, and profile actions USCIS makes available.',
    use: 'Use the account owned by the person filing or tracking the matter. Do not share credentials with a static site or place them in a public form.',
  },
  {
    id: 'uscis-processing-times',
    label: 'USCIS Case Processing Times',
    href: 'https://egov.uscis.gov/processing-times/',
    agency: 'USCIS',
    audience: 'Applicants, petitioners, and planning teams',
    summary: 'Select the form, category, and USCIS office to see the agency’s current processing-time information.',
    use: 'A planning reference, not a promise about an individual case or a substitute for a case inquiry.',
  },
  {
    id: 'state-visa-wizard',
    label: 'Visa Wizard',
    href: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wizard.html',
    agency: 'U.S. Department of State',
    audience: 'People beginning to sort a travel purpose and possible visa category',
    summary: 'Use the State Department’s guide to orient around common travel purposes and visa categories.',
    use: 'The State Department says the tool is a guide and does not guarantee eligibility; the consular officer determines visa eligibility under law.',
  },
  {
    id: 'state-visa-categories',
    label: 'Directory of Visa Categories',
    href: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html',
    agency: 'U.S. Department of State',
    audience: 'Readers comparing temporary and immigrant visa categories',
    summary: 'Review the State Department’s category directory and the approvals or prerequisites identified for each category.',
    use: 'Use the directory to frame a question, then verify the current category instructions and facts with the responsible authority.',
  },
  {
    id: 'state-visa-bulletin',
    label: 'Visa Bulletin',
    href: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html',
    agency: 'U.S. Department of State',
    audience: 'People tracking immigrant-visa availability and priority-date movement',
    summary: 'Check the current and archived Visa Bulletins published by the State Department.',
    use: 'A live publication that must be read with the applicable USCIS filing-chart guidance and the facts of the matter.',
  },
  {
    id: 'uscis-case-status-api',
    label: 'USCIS Developer Portal — Case Status API',
    href: 'https://developer.uscis.gov/api/case-status',
    agency: 'USCIS',
    audience: 'Engineering and platform teams with an approved integration need',
    summary: 'Read the USCIS Case Status API documentation, authentication model, sandbox details, and access requirements.',
    use: 'The source of truth for a future server-side integration. The static USIVA site does not call this API.',
  },
  {
    id: 'e-verify',
    label: 'E-Verify',
    href: 'https://www.e-verify.gov/',
    agency: 'E-Verify',
    audience: 'Employers, employer agents, and workers',
    summary: 'Start with the official E-Verify program information, employer obligations, and worker protections.',
    use: 'The program’s current rules, manuals, enrollment paths, and contact options control over this orientation page.',
  },
  {
    id: 'i-9-central',
    label: 'I-9 Central',
    href: 'https://www.uscis.gov/i-9-central',
    agency: 'USCIS',
    audience: 'Employers and people completing Form I-9',
    summary: 'Use USCIS I-9 Central for the current Form I-9, instructions, acceptable-document guidance, and employer resources.',
    use: 'Check the current form edition and instructions at the point of use; do not rely on a copied form or an old checklist.',
  },
  {
    id: 'e-verify-employers',
    label: 'E-Verify employer hub',
    href: 'https://www.e-verify.gov/employers',
    agency: 'E-Verify',
    audience: 'Companies deciding how to organize employment verification',
    summary: 'Review the official employer landing page for enrollment, verification, resources, and program responsibilities.',
    use: 'A starting point for company-owned research before choosing an access method or implementation path.',
  },
  {
    id: 'e-verify-enrollment',
    label: 'Enrolling in E-Verify',
    href: 'https://www.e-verify.gov/employers/enrolling-in-e-verify',
    agency: 'E-Verify',
    audience: 'Companies and authorized administrators',
    summary: 'Follow the current enrollment checklist and process published by E-Verify.',
    use: 'Enrollment creates program obligations. Read the terms and choose the access method that matches the company’s operation.',
  },
  {
    id: 'e-verify-verification-process',
    label: 'E-Verify verification process',
    href: 'https://www.e-verify.gov/employers/verification-process',
    agency: 'E-Verify',
    audience: 'E-Verify employers and employer agents',
    summary: 'Review how a participating employer creates and manages a case after the Form I-9 process.',
    use: 'Use the official workflow and program rules for timing, case results, notices, and required follow-up.',
  },
  {
    id: 'e-verify-employer-resources',
    label: 'E-Verify employer resources',
    href: 'https://www.e-verify.gov/employers/employer-resources',
    agency: 'E-Verify',
    audience: 'Employers, administrators, and employer agents',
    summary: 'Find official employer guides, manuals, job aids, webinars, and resource updates.',
    use: 'Use this index for implementation details rather than treating a general orientation page as an operating manual.',
  },
  {
    id: 'e-verify-quick-reference',
    label: 'E-Verify Quick Reference Guide for Employers',
    href: 'https://www.e-verify.gov/sites/default/files/everify/guides/EVerifyQuickReferenceGuideEmployer.pdf',
    agency: 'E-Verify',
    audience: 'Employers preparing for enrollment or internal training',
    summary: 'Download the official employer quick-reference guide for a concise program orientation.',
    use: 'A supporting guide; verify current program pages and terms before operational use.',
  },
  {
    id: 'e-verify-mismatch-process',
    label: 'DHS and SSA mismatch guidance',
    href: 'https://www.e-verify.gov/employers/verification-process/tentative-nonconfirmations/dhs-and-ssa-mismatches',
    agency: 'E-Verify',
    audience: 'Employers and workers handling a mismatch',
    summary: 'Read the official referral and notice steps for a DHS or SSA mismatch.',
    use: 'An initial mismatch is not the same as a final case result. Follow the official notice and referral process before acting.',
  },
  {
    id: 'uscis-form-updates',
    label: 'USCIS Forms Updates',
    href: 'https://www.uscis.gov/forms/forms-updates',
    agency: 'USCIS',
    audience: 'Employers and filing teams',
    summary: 'Check USCIS updates before using a form, instruction set, or edition date in a workflow.',
    use: 'A freshness check for form materials; current instructions remain the controlling source.',
  },
  {
    id: 'doj-i9-e-verify',
    label: 'DOJ IER — Form I-9 and E-Verify',
    href: 'https://www.justice.gov/crt/form-i-9-and-e-verify',
    agency: 'U.S. Department of Justice',
    audience: 'Employers and workers seeking anti-discrimination guidance',
    summary: 'Review the Immigrant and Employee Rights Section’s guidance on consistent, non-discriminatory verification practices.',
    use: 'Use the DOJ source for rights and anti-discrimination questions; USIVA does not investigate or decide a complaint.',
  },
] as const satisfies readonly OfficialResource[];

export type OfficialResourceId = (typeof officialResources)[number]['id'];

export function getOfficialResource(id: OfficialResourceId): OfficialResource {
  const resource = officialResources.find((candidate) => candidate.id === id);

  if (!resource) {
    throw new Error(`Missing official resource: ${id}`);
  }

  return resource;
}

export interface OfficialResourceGroup {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  resourceIds: readonly OfficialResourceId[];
}

export const officialToolGroups = [
  {
    id: 'uscis-case-navigation',
    eyebrow: 'USCIS / current case tools',
    title: 'Track, account, and estimate',
    description: 'Use USCIS itself for case-specific information, account activity, and current processing-time estimates.',
    resourceIds: ['uscis-case-status', 'uscis-my-account', 'uscis-processing-times'],
  },
  {
    id: 'visa-orientation',
    eyebrow: 'State Department / visa orientation',
    title: 'Sort the category before making a claim',
    description: 'The Visa Wizard and category directory can help frame a travel-purpose question. They do not decide eligibility.',
    resourceIds: ['state-visa-wizard', 'state-visa-categories', 'state-visa-bulletin'],
  },
  {
    id: 'employer-orientation',
    eyebrow: 'Employers / verification resources',
    title: 'Start with the official hiring record',
    description: 'Form I-9 is the baseline record for covered hires; E-Verify is a separate program with its own access methods and rules.',
    resourceIds: ['i-9-central', 'e-verify', 'e-verify-employers'],
  },
] as const satisfies readonly OfficialResourceGroup[];

export const employerResourceIds = [
  'i-9-central',
  'uscis-form-updates',
  'e-verify-employers',
  'e-verify-enrollment',
  'e-verify-verification-process',
  'e-verify-employer-resources',
  'e-verify-quick-reference',
  'e-verify-mismatch-process',
  'doj-i9-e-verify',
] as const satisfies readonly OfficialResourceId[];

export const eVerifyResourceIds = [
  'e-verify',
  'e-verify-employers',
  'e-verify-enrollment',
  'e-verify-verification-process',
  'e-verify-employer-resources',
  'e-verify-quick-reference',
  'e-verify-mismatch-process',
  'i-9-central',
  'doj-i9-e-verify',
] as const satisfies readonly OfficialResourceId[];

/**
 * This is a contract for a future server-side integration, not an endpoint.
 * It deliberately does not include a client secret, a receipt number, or a
 * claim that the static site currently returns a case result.
 */
export const uscisCaseStatusContract = {
  status: 'static-handoff-only',
  futureServerRoute: '/api/uscis/case-status/{receiptNumber}',
  clientRequest: {
    method: 'GET',
    body: 'none',
    response: 'A narrowly normalized status or a safe error state; never an access token or raw secret.',
  },
  serverResponsibilities: [
    'Keep the USCIS OAuth 2.0 client credentials in server-side secret storage; never expose them in Astro HTML, browser JavaScript, or public environment variables.',
    'Validate the receipt-number shape, authorize the caller, rate-limit the route, and avoid logging receipt numbers or upstream credentials.',
    'Call the currently approved USCIS Case Status API operation (GET /{receiptNumber}) using the authentication and server URL documented by USCIS.',
    'Avoid shared caching for a response that contains case-specific or personal information, and provide a clear upstream error and retry state.',
  ],
  upstream: {
    documentation: 'https://developer.uscis.gov/api/case-status',
    operation: 'GET /{receiptNumber}',
    authentication: 'OAuth 2.0 client credentials issued through the USCIS Developer Portal',
    sandboxBaseUrl: 'https://api-int.uscis.gov/case-status',
  },
  staticPageBehavior: [
    'No receipt-number input is rendered on the static page.',
    'No user receipt number is proxied through a USIVA endpoint.',
    'No USCIS API request is made from the browser or build.',
    'No live case status is returned, inferred, or represented as a USIVA result.',
    'Readers are handed to USCIS Case Status Online, myUSCIS, processing times, or the official API documentation.',
  ],
} as const;

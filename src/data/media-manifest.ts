export type MediaAssetId =
  | 'hero-consultation'
  | 'pathways-terminal'
  | 'study-research'
  | 'employment-engineering'
  | 'family-records'
  | 'evidence-desk';

export interface MediaFocalPoint {
  /** Normalized horizontal focal position, from 0 (left) to 1 (right). */
  x: number;
  /** Normalized vertical focal position, from 0 (top) to 1 (bottom). */
  y: number;
}

export interface MediaAsset {
  id: MediaAssetId;
  src: string;
  type: 'photography';
  width: number;
  height: number;
  alt: string;
  caption: string;
  focalPoint: MediaFocalPoint;
  sourceRightsNote: string;
  intendedUse: string;
}

const generatedAssetRightsNote =
  'Original project visual generated with OpenAI image generation on 2026-08-22. Reviewed for readable text, logos, identifiable clients, case records, outcomes, and official-document simulation; none are represented.';

export const mediaManifest = [
  {
    id: 'hero-consultation',
    src: '/assets/photos/usiva-hero-consultation.webp',
    type: 'photography',
    width: 1536,
    height: 1024,
    alt: 'Two people review a document together at a library table.',
    caption: 'A careful planning conversation starts by naming the document, date, and question in front of the reader.',
    focalPoint: { x: 0.72, y: 0.46 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Homepage or service-page opening; establish planning as a document-and-question conversation, not an outcome.',
  },
  {
    id: 'pathways-terminal',
    src: '/assets/photos/usiva-pathways-terminal.webp',
    type: 'photography',
    width: 1536,
    height: 1024,
    alt: 'A traveler in a suit carries a briefcase through a bright terminal with a suitcase.',
    caption: 'A journey has a sequence. Route planning is an orientation exercise, not a decision about eligibility.',
    focalPoint: { x: 0.38, y: 0.43 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Visa-pathway orientation, travel-timing context, or a secondary image beside a route map.',
  },
  {
    id: 'study-research',
    src: '/assets/photos/usiva-study-research.webp',
    type: 'photography',
    width: 1536,
    height: 1024,
    alt: 'A researcher in a lab coat examines a microscope beside lab notes and sample containers.',
    caption: 'The work itself supplies context: describe the research setting before mapping the authorization question.',
    focalPoint: { x: 0.48, y: 0.5 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Study, research, or scholar pathway sections where the work setting provides useful orientation.',
  },
  {
    id: 'employment-engineering',
    src: '/assets/photos/usiva-employment-engineering.webp',
    type: 'photography',
    width: 1536,
    height: 1024,
    alt: 'An engineer examines a metal component over technical drawings in a workshop.',
    caption: 'Technical work makes the role visible; the authorization and training record still need their own source trail.',
    focalPoint: { x: 0.72, y: 0.42 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Employment, OPT, STEM OPT, or employer-resource modules that need a concrete work context.',
  },
  {
    id: 'family-records',
    src: '/assets/photos/usiva-family-records.webp',
    type: 'photography',
    width: 1536,
    height: 1024,
    alt: 'Two adults sort paper records and envelopes at a kitchen table.',
    caption: 'Records become useful when their owner, date, purpose, and missing piece are clear.',
    focalPoint: { x: 0.54, y: 0.47 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Readiness files, family documentation, evidence checklists, or records-focused planning sections.',
  },
  {
    id: 'evidence-desk',
    src: '/assets/photos/usiva-evidence-desk.webp',
    type: 'photography',
    width: 1448,
    height: 1086,
    alt: 'Hands open a blank document beside a calendar, notebook, folders, ruler, and pencil on a dark desk.',
    caption: 'The brief is a working surface for facts, sources, dates, and the questions that still need a responsible answer.',
    focalPoint: { x: 0.5, y: 0.58 },
    sourceRightsNote: generatedAssetRightsNote,
    intendedUse: 'Question briefs, evidence desks, source-trail modules, or compact detail crops beside a checklist.',
  },
] as const satisfies readonly MediaAsset[];

export const mediaById = mediaManifest.reduce<Record<MediaAssetId, MediaAsset>>((manifest, asset) => {
  manifest[asset.id] = asset;
  return manifest;
}, {} as Record<MediaAssetId, MediaAsset>);

export function getMediaAsset(id: MediaAssetId): MediaAsset {
  return mediaById[id];
}

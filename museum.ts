export type GalleryId =
  | 'larong-kalye'
  | 'buhay-eskwela'
  | 'telebisyon-aliwan'
  | 'tindahan-pagkain'
  | 'y2k-era'
  | 'araw-araw-90s';

export type EraPeriod =
  | 'Early 1990s'
  | 'Mid-1990s'
  | 'Late 1990s'
  | 'Early 2000s'
  | 'Y2K Era';

export interface Artifact {
  id: string;
  galleryId: GalleryId;
  title: string;
  tagalogTitle: string;
  subtitle: string;
  period: EraPeriod;
  yearRange: string;
  category: string;
  imageUrl: string;
  badgeTag: string;
  description: string;
  culturalBackground: string;
  howItWasUsed: string;
  interestingFacts: string[];
  documentedFacts: string;
  personalMemories: string;
  rulesAndTerminology?: string[];
  relatedArtifactIds: string[];
}

export interface GalleryMeta {
  id: GalleryId;
  number: string;
  title: string;
  tagalogTitle: string;
  theme: string;
  badgeColor: string;
  accentBg: string;
  heroImage: string;
  description: string;
  curatorNote: string;
}

export interface MemorySubmission {
  id: string;
  author: string;
  memory: string;
  decade: 'Early 90s' | 'Mid 90s' | 'Late 90s' | 'Early 2000s';
  timestamp: string;
  likes: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  tagalogPrompt: string;
  options: {
    label: string;
    points: number;
    explanation: string;
  }[];
}

export interface TimeCapsuleItem {
  id: string;
  era: EraPeriod;
  year: number;
  title: string;
  tagalogTitle: string;
  category: string;
  summary: string;
  culturalContext: string;
  artifactIconOrImage?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artistOrSource: string;
  category: 'opm' | 'soundscape' | 'broadcast' | 'modem';
  duration: string;
  description: string;
  synthesizerType: 'guitarRock' | 'dialup' | 'animeTheme' | 'nu107Static' | 'kantoStreet';
}


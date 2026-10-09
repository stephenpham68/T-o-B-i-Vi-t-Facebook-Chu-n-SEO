export interface MediaSuggestion {
  type: string;
  idea: string;
  imageTextOverlay: string;
}

export interface SeoAnalysis {
  score: number;
  hookStrength: string;
  keywordDensity: string;
  engagementPotential: string;
  tips: string[];
}

export interface GenerationResult {
  headlineOptions: string[];
  selectedHeadline: string;
  fullContent: string;
  bodyWithoutHashtags: string;
  hashtags: string[];
  callToAction: string;
  firstCommentPrompt: string;
  mediaSuggestion: MediaSuggestion;
  seoAnalysis: SeoAnalysis;
}

export interface GenerationParams {
  query: string;
  brandOrShop: string;
  contactInfo: string;
  postStyle: string;
  tone: string;
  targetAudience: string;
  contentLength: string;
  customNotes: string;
}

export interface SavedPost {
  id: string;
  createdAt: number;
  query: string;
  brandOrShop?: string;
  selectedHeadline: string;
  fullContent: string;
  hashtags: string[];
  postStyle: string;
}

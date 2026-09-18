export type Platform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'Mobile';

export type GameGenre =
  | 'Action'
  | 'Adventure'
  | 'RPG'
  | 'Racing'
  | 'Sports'
  | 'Strategy'
  | 'Puzzle'
  | 'Horror'
  | 'Indie'
  | 'Multiplayer';

export interface Author {
  name: string;
  role: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  heroImage: string;
  genre: GameGenre;
  genres: GameGenre[];
  platforms: Platform[];
  releaseDate: string;
  developer: string;
  publisher: string;
  rating: number; // e.g. 9.4
  description: string;
  overview: string;
  gameplay: string;
  features: string[];
  graphics: string;
  sound: string;
  performance: string;
  pros: string[];
  cons: string[];
  reviewSlug?: string;
  relatedGameSlugs: string[];
  relatedGuideSlugs: string[];
  relatedNewsSlugs: string[];
}

export interface ReviewScoreBreakdown {
  category: string;
  score: number;
}

export interface Review {
  id: string;
  slug: string;
  gameSlug: string;
  gameTitle: string;
  coverImage: string;
  genre: GameGenre;
  platforms: Platform[];
  score: number;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  summary: string;
  gameplay: string;
  graphics: string;
  performance: string;
  sound: string;
  contentDepth: string;
  value: string;
  pros: string[];
  cons: string[];
  verdict: string;
  breakdown: ReviewScoreBreakdown[];
}

export type NewsCategory =
  | 'Gaming News'
  | 'Industry'
  | 'PC'
  | 'PlayStation'
  | 'Xbox'
  | 'Nintendo'
  | 'Mobile'
  | 'Indie';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  summary: string;
  heroImage: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  author: Author;
  introduction: string;
  mainStory: string;
  whatWeKnow: string;
  whyItMatters: string;
  whatHappensNext: string;
  relatedArticleSlugs: string[];
  relatedGameSlugs: string[];
}

export type GuideCategory =
  | 'Beginner Guides'
  | 'Walkthroughs'
  | 'Tips & Tricks'
  | 'Builds'
  | 'Secrets'
  | 'Strategies';

export interface GuideSection {
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  category: GuideCategory;
  summary: string;
  heroImage: string;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  gameSlug: string;
  gameTitle: string;
  sections: GuideSection[];
  keyTips: string[];
  relatedGuideSlugs: string[];
  relatedGameSlugs: string[];
}

export interface CategoryInfo {
  id: string;
  name: GameGenre;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

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

/**
 * Fields every indexable piece of content shares.
 *
 * Dates are stored exactly as published and rendered with
 * `formatDate` from lib/site.ts. They are never back-dated or forward-dated.
 */
export interface ContentBase {
  id: string;
  slug: string;
  title: string;
  /** Alternative text for the record's image. Required — never optional. */
  imageAlt: string;
  /** ISO-ish human date string, e.g. 'September 30, 2026'. */
  publishedAt: string;
  /** Only present when the piece has genuinely been revised since publication. */
  updatedAt?: string;
  /**
   * References an entry in data/authors.ts. Resolved through
   * `getAuthorFor` so a byline can never render as an empty string or a
   * broken author link.
   */
  authorId: string;
  tags?: string[];
}

export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  coverage: string[];
  links: {
    about: string;
    editorialPolicy: string;
    contact: string;
  };
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  heroImage: string;
  imageAlt: string;
  genre: GameGenre;
  genres: GameGenre[];
  platforms: Platform[];
  /** Release date as a parseable date string, with any qualifier separate. */
  releaseDate: string;
  /** e.g. 'Early Access'. Rendered after the date, never inside it. */
  releaseNote?: string;
  developer: string;
  publisher: string;
  /**
   * The publication's own score for the game. Only present when a real
   * review exists. Never synthesised.
   */
  rating?: number;
  description: string;
  overview: string;
  gameplay: string;
  features: string[];
  graphics: string;
  sound: string;
  performance: string;
  pros: string[];
  cons: string[];
  relatedGameSlugs: string[];
  relatedGuideSlugs: string[];
  relatedNewsSlugs: string[];
}

export interface ReviewScoreBreakdown {
  category: string;
  score: number;
}

/**
 * A review is titled after the game it covers, so `title` from ContentBase is
 * replaced by `gameTitle` rather than duplicated.
 */
export interface Review extends Omit<ContentBase, 'title'> {
  gameSlug: string;
  gameTitle: string;
  coverImage: string;
  genre: GameGenre;
  platforms: Platform[];
  /** Real score awarded by this publication, 0-10. */
  score: number;
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

export interface NewsArticle extends ContentBase {
  category: NewsCategory;
  summary: string;
  heroImage: string;
  readTime: string;
  introduction: string;
  mainStory: string;
  whatWeKnow: string;
  whyItMatters: string;
  whatHappensNext: string;
  /**
   * A quotation from a named, attributable source. Rendered as a pull quote.
   * When absent, no pull quote is rendered — a decorative quote is never
   * invented or reused across articles.
   */
  pullQuote?: { text: string; attribution: string };
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

export interface Guide extends ContentBase {
  category: GuideCategory;
  summary: string;
  heroImage: string;
  readTime: string;
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
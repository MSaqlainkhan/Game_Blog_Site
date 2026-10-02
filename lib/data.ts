import { games } from '@/data/games';
import { reviews } from '@/data/reviews';
import { newsArticles } from '@/data/news';
import { guides } from '@/data/guides';
import { getCategoriesWithCounts } from '@/data/categories';
import { getAuthorFor } from '@/data/authors';
import {
  AuthorProfile,
  CategoryInfo,
  Game,
  GameGenre,
  Guide,
  GuideCategory,
  NewsArticle,
  NewsCategory,
  Platform,
  Review,
} from '@/types';

/* -------------------------------------------------------------------------- */
/* Ordering                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Newest first, by publication date.
 *
 * All stored dates are parseable `Month D, YYYY` strings, so they sort
 * correctly. Release dates carrying a qualifier such as "(Early Access)" were
 * split into `releaseDate` + `releaseNote` for exactly this reason.
 */
function byNewest<T extends { publishedAt: string }>(a: T, b: T): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/* -------------------------------------------------------------------------- */
/* Games                                                                       */
/* -------------------------------------------------------------------------- */

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getRelatedGames(slugs: string[]): Game[] {
  return slugs.map(getGameBySlug).filter((g): g is Game => Boolean(g));
}

/** The real review for a game, if one exists. Never synthesised. */
export function getReviewForGame(gameSlug: string): Review | undefined {
  return reviews.find((r) => r.gameSlug === gameSlug);
}

export function getGamesByGenre(genre: GameGenre): Game[] {
  return games.filter((g) => g.genres.includes(genre) || g.genre === genre);
}

export function getGamesByPlatform(platform: Platform): Game[] {
  return games.filter((g) => g.platforms.includes(platform));
}

/* -------------------------------------------------------------------------- */
/* Reviews                                                                     */
/* -------------------------------------------------------------------------- */

export function getAllReviews(): Review[] {
  return [...reviews].sort(byNewest);
}

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

/* -------------------------------------------------------------------------- */
/* News                                                                        */
/* -------------------------------------------------------------------------- */

export function getAllNews(): NewsArticle[] {
  return [...newsArticles].sort(byNewest);
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug);
}

export function getLatestNews(limit = 5): NewsArticle[] {
  return getAllNews().slice(0, limit);
}

/**
 * News categories that actually have at least one published article.
 *
 * The section filter and the sitemap both read from this. A category with no
 * articles is never offered as a filter and never indexed, rather than being
 * linked to an empty page.
 */
export function getNewsCategoriesWithCounts(): {
  name: NewsCategory;
  count: number;
}[] {
  const counts = new Map<NewsCategory, number>();
  for (const article of newsArticles) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/* -------------------------------------------------------------------------- */
/* Guides                                                                      */
/* -------------------------------------------------------------------------- */

export function getAllGuides(): Guide[] {
  return [...guides].sort(byNewest);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getLatestGuides(limit = 4): Guide[] {
  return getAllGuides().slice(0, limit);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return guides.filter((g) => g.category === category);
}

/* -------------------------------------------------------------------------- */
/* Categories                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Game genres that have at least one game. Genres with no games are dropped so
 * no empty category is linked or indexed.
 */
export function getGenresWithCounts(): CategoryInfo[] {
  return getCategoriesWithCounts().filter((c) => c.count > 0);
}

/* -------------------------------------------------------------------------- */
/* Authors                                                                     */
/* -------------------------------------------------------------------------- */

export { getAuthorFor };
export type { AuthorProfile };

/* -------------------------------------------------------------------------- */
/* Search                                                                      */
/* -------------------------------------------------------------------------- */

export type SearchResultType = 'game' | 'review' | 'news' | 'guide';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  url: string;
  date?: string;
  rating?: number;
}

/** Fields searched, in descending order of importance. */
function scoreField(haystack: string, needle: string, weight: number): number {
  const value = haystack.toLowerCase();
  if (value === needle) return weight * 3;
  const index = value.indexOf(needle);
  if (index === -1) return 0;
  // Word-boundary matches rank above mid-word substring matches.
  return weight * (index === 0 || /\W/.test(value[index - 1]) ? 2 : 1);
}

/**
 * Full-site search across games, reviews, news and guides.
 *
 * Ranked by field weight (title beats summary beats body) with word-boundary
 * bonus, so an exact title match outranks a passing mention in prose.
 */
export function searchAll(rawQuery: string): SearchResultItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const scored: { item: SearchResultItem; score: number }[] = [];

  const consider = (score: number, item: SearchResultItem) => {
    if (score > 0) scored.push({ item, score });
  };

  for (const game of games) {
    const score =
      scoreField(game.title, query, 10) +
      scoreField(game.developer, query, 6) +
      scoreField(game.genre, query, 4) +
      scoreField(game.platforms.join(' '), query, 3) +
      scoreField(game.description, query, 2) +
      scoreField(game.overview, query, 1);
    consider(score, {
      id: `game-${game.id}`,
      type: 'game',
      title: game.title,
      category: game.genre,
      summary: game.description,
      image: game.coverImage,
      imageAlt: game.imageAlt,
      url: `/games/${game.slug}`,
      rating: game.rating,
    });
  }

  for (const review of reviews) {
    const score =
      scoreField(review.gameTitle, query, 10) +
      scoreField(review.genre, query, 4) +
      scoreField(review.platforms.join(' '), query, 3) +
      scoreField(review.summary, query, 3) +
      scoreField(review.verdict, query, 2);
    consider(score, {
      id: `review-${review.id}`,
      type: 'review',
      title: `${review.gameTitle} Review`,
      category: `${review.genre} Review`,
      summary: review.summary,
      image: review.coverImage,
      imageAlt: review.imageAlt,
      url: `/reviews/${review.slug}`,
      date: review.publishedAt,
      rating: review.score,
    });
  }

  for (const article of newsArticles) {
    const score =
      scoreField(article.title, query, 10) +
      scoreField(article.category, query, 5) +
      scoreField(article.summary, query, 3) +
      scoreField(article.introduction, query, 1);
    consider(score, {
      id: `news-${article.id}`,
      type: 'news',
      title: article.title,
      category: article.category,
      summary: article.summary,
      image: article.heroImage,
      imageAlt: article.imageAlt,
      url: `/news/${article.slug}`,
      date: article.publishedAt,
    });
  }

  for (const guide of guides) {
    const score =
      scoreField(guide.title, query, 10) +
      scoreField(guide.gameTitle, query, 6) +
      scoreField(guide.category, query, 5) +
      scoreField(guide.summary, query, 3);
    consider(score, {
      id: `guide-${guide.id}`,
      type: 'guide',
      title: guide.title,
      category: guide.category,
      summary: guide.summary,
      image: guide.heroImage,
      imageAlt: guide.imageAlt,
      url: `/guides/${guide.slug}`,
      date: guide.publishedAt,
    });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
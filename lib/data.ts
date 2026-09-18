import { games } from '@/data/games';
import { reviews } from '@/data/reviews';
import { newsArticles } from '@/data/news';
import { guides } from '@/data/guides';
import { getCategoriesWithCounts } from '@/data/categories';
import { Game, Review, NewsArticle, Guide, CategoryInfo, GameGenre, Platform } from '@/types';

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getRelatedGames(slugs: string[]): Game[] {
  return games.filter((g) => slugs.includes(g.slug));
}

export function getAllReviews(): Review[] {
  return reviews;
}

export function getReviewBySlug(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getReviewForGame(gameSlug: string): Review | undefined {
  return reviews.find((r) => r.gameSlug === gameSlug);
}

export function getAllNews(): NewsArticle[] {
  return newsArticles;
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((n) => n.slug === slug);
}

export function getLatestNews(limit = 5): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getLatestGuides(limit = 4): Guide[] {
  return [...guides]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getAllCategories(): CategoryInfo[] {
  return getCategoriesWithCounts();
}

export interface SearchResultItem {
  id: string;
  type: 'game' | 'review' | 'news' | 'guide';
  title: string;
  category: string;
  summary: string;
  image: string;
  url: string;
  date?: string;
  rating?: number;
}

export function searchAll(rawQuery: string): SearchResultItem[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const results: SearchResultItem[] = [];

  // Search Games
  for (const game of games) {
    if (
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.platforms.some((p) => p.toLowerCase().includes(query)) ||
      game.developer.toLowerCase().includes(query)
    ) {
      results.push({
        id: `game-${game.id}`,
        type: 'game',
        title: game.title,
        category: game.genre,
        summary: game.description,
        image: game.coverImage,
        url: `/games/${game.slug}`,
        rating: game.rating
      });
    }
  }

  // Search Reviews
  for (const rev of reviews) {
    if (
      rev.gameTitle.toLowerCase().includes(query) ||
      rev.summary.toLowerCase().includes(query) ||
      rev.verdict.toLowerCase().includes(query) ||
      rev.genre.toLowerCase().includes(query)
    ) {
      results.push({
        id: `rev-${rev.id}`,
        type: 'review',
        title: `${rev.gameTitle} Review`,
        category: `${rev.genre} Review`,
        summary: rev.summary,
        image: rev.coverImage,
        url: `/reviews/${rev.slug}`,
        date: rev.publishedAt,
        rating: rev.score
      });
    }
  }

  // Search News
  for (const article of newsArticles) {
    if (
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.introduction.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    ) {
      results.push({
        id: `news-${article.id}`,
        type: 'news',
        title: article.title,
        category: article.category,
        summary: article.summary,
        image: article.heroImage,
        url: `/news/${article.slug}`,
        date: article.publishedAt
      });
    }
  }

  // Search Guides
  for (const guide of guides) {
    if (
      guide.title.toLowerCase().includes(query) ||
      guide.summary.toLowerCase().includes(query) ||
      guide.gameTitle.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query)
    ) {
      results.push({
        id: `guide-${guide.id}`,
        type: 'guide',
        title: guide.title,
        category: guide.category,
        summary: guide.summary,
        image: guide.heroImage,
        url: `/guides/${guide.slug}`,
        date: guide.publishedAt
      });
    }
  }

  return results;
}

import type { MetadataRoute } from 'next';

import { getAllAuthors } from '@/data/authors';
import {
  getAllGames,
  getAllGuides,
  getAllNews,
  getAllReviews,
  getNewsCategoriesWithCounts,
} from '@/lib/data';
import { getPlatformPages } from '@/lib/platforms';
import { absoluteUrl, toIsoDate } from '@/lib/site';

/**
 * Dynamic XML sitemap.
 *
 * Generated entirely from the content store, so adding an article makes it
 * indexable automatically with no manual sitemap edit.
 *
 * Deliberately excluded:
 *  - /search                — result permutations, noindex anyway
 *  - /404 and /not-found    — error responses
 *  - the news category list filtered to empty categories — categories with no
 *    articles have no route, so they cannot appear
 *  - any query-string variant — only clean canonical paths are emitted
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const newest = [...getAllNews(), ...getAllReviews(), ...getAllGuides()]
    .map((item) => new Date(item.publishedAt).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => b - a)[0];

  const sectionLastModified = newest ? new Date(newest) : new Date();

  /** Content that does not change after publication. */
  const staticEntries = [
    { path: '/', priority: 1, changeFrequency: 'daily' as const },
    { path: '/news', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/reviews', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/guides', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/games', priority: 0.9, changeFrequency: 'weekly' as const },
    // Platform pages are appended from getPlatformPages() below, so they are
    // deliberately absent here. Listing them in both places emitted each one
    // twice, which search engines treat as a malformed sitemap.
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/editorial-policy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/corrections', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-settings', priority: 0.2, changeFrequency: 'yearly' as const },
  ].map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: sectionLastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  /** Published articles carry their real modification dates. */
  const articleEntries = [
    ...getAllNews().map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: new Date(toIsoDate(article.updatedAt ?? article.publishedAt)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllReviews().map((review) => ({
      url: absoluteUrl(`/reviews/${review.slug}`),
      lastModified: new Date(toIsoDate(review.updatedAt ?? review.publishedAt)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllGuides().map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: new Date(toIsoDate(guide.updatedAt ?? guide.publishedAt)),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const gameEntries = getAllGames().map((game) => ({
    url: absoluteUrl(`/games/${game.slug}`),
    // Game reference pages only change when their facts are corrected.
    lastModified: sectionLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const categoryEntries = getNewsCategoriesWithCounts().map((category) => ({
    url: absoluteUrl(`/news/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`),
    lastModified: sectionLastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const platformEntries = getPlatformPages().map((platform) => ({
    url: absoluteUrl(platform.path),
    lastModified: sectionLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const authorEntries = getAllAuthors().map((author) => ({
    url: absoluteUrl(`/authors/${author.slug}`),
    lastModified: sectionLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...platformEntries,
    ...articleEntries,
    ...gameEntries,
    ...authorEntries,
  ];
}
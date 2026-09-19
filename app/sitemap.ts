import { MetadataRoute } from 'next';
import { games } from '@/data/games';
import { reviews } from '@/data/reviews';
import { newsArticles } from '@/data/news';
import { guides } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamerspulse.site';
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/games`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // Dynamic game routes
  const gameRoutes: MetadataRoute.Sitemap = games.map((game) => ({
    url: `${baseUrl}/games/${game.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic review routes
  const reviewRoutes: MetadataRoute.Sitemap = reviews.map((rev) => ({
    url: `${baseUrl}/reviews/${rev.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic news routes
  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic guide routes
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...gameRoutes,
    ...reviewRoutes,
    ...newsRoutes,
    ...guideRoutes,
  ];
}

import type { MetadataRoute } from 'next';

import { SITE_URL, absoluteUrl } from '@/lib/site';

/**
 * robots.txt
 *
 * Allows all public content to be crawled. Only /search is disallowed, because
 * its result permutations are generated per query and are marked noindex —
 * crawling them wastes crawl budget without surfacing anything new.
 *
 * Nothing that renders a page is blocked: CSS, JavaScript and images are all
 * permitted, so pages render correctly for crawlers and for readers on slow
 * mobile connections.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
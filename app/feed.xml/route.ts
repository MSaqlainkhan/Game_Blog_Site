import { getAllNews, getAllReviews } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';

/**
 * RSS 2.0 feed.
 *
 * Gives readers a genuine, track-free subscription channel. Listed in the
 * `<head>` via `alternates.types` and linked from /news and the homepage panel.
 */
export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface FeedEntry {
  title: string;
  link: string;
  description: string;
  date: string;
  category: string;
  guid: string;
}

export function GET(): Response {
  const entries: FeedEntry[] = [
    ...getAllNews().map((article) => ({
      title: article.title,
      link: absoluteUrl(`/news/${article.slug}`),
      description: article.summary,
      date: article.publishedAt,
      category: article.category,
      guid: absoluteUrl(`/news/${article.slug}`),
    })),
    ...getAllReviews().map((review) => ({
      title: `${review.gameTitle} Review`,
      link: absoluteUrl(`/reviews/${review.slug}`),
      description: review.summary,
      date: review.publishedAt,
      category: 'Review',
      guid: absoluteUrl(`/reviews/${review.slug}`),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastBuildDate = entries[0] ? new Date(entries[0].date).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GamersPulse — Gaming News, Reviews &amp; Guides</title>
    <link>${absoluteUrl('/')}</link>
    <description>Independent gaming coverage: news, honest reviews, practical guides and game discovery across PC, PlayStation, Xbox and Nintendo.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml"/>
${entries
  .map(
    (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.link}</link>
      <guid isPermaLink="true">${entry.guid}</guid>
      <category>${escapeXml(entry.category)}</category>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description>${escapeXml(entry.description)}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

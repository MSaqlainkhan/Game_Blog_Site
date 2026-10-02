import { AuthorProfile } from '@/types';

/**
 * Author registry.
 *
 * GamersPulse is published by a single independent editorial operation, so
 * there is exactly one byline. Inventing a staff of writers, job titles or
 * biographies would misrepresent who produces the publication, so the
 * registry holds one honest profile.
 *
 * To add a real contributor later:
 *  1. Add an entry to `authorProfiles` below with their real name, slug, role
 *     and a factual biography written by them.
 *  2. Set `authorId` on their articles in data/news.ts, data/guides.ts or
 *     data/reviews.ts to the new profile's `slug`.
 *  3. Their profile page, byline, Person structured data and sitemap entry are
 *     generated automatically. No other file needs editing.
 *
 * Guidelines:
 *  - Do not add a profile for a person who does not write for GamersPulse.
 *  - Do not describe credentials, awards or experience that are not real.
 */
const authorProfiles: AuthorProfile[] = [
  {
    slug: 'gamerspulse-editorial',
    name: 'GamersPulse Editorial',
    role: 'Editorial desk',
    /** Shown in the author page biography. Kept factual and verifiable. */
    bio: [
      'GamersPulse is produced by a small independent editorial desk. Every article, review and guide published here is written, edited and fact-checked by the same team, and every piece carries this single byline.',
      'We publish coverage of PC, PlayStation, Xbox and Nintendo games alongside industry and technology analysis. Our focus is practical: what a game actually plays like, how long it will take you to get good at it, and whether it is worth your time.',
    ],
    /** Areas this desk covers. Used as tags on the author page. */
    coverage: ['Gaming news', 'Reviews', 'Guides', 'Game discovery', 'Industry analysis'],
    links: {
      about: '/about',
      editorialPolicy: '/editorial-policy',
      contact: '/contact',
    },
  },
];

export function getAllAuthors(): AuthorProfile[] {
  return authorProfiles;
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authorProfiles.find((a) => a.slug === slug);
}

/**
 * Resolves the author for a piece of content.
 *
 * Falls back to the desk profile rather than rendering an empty byline or a
 * broken author link, so a missing `authorId` can never produce a dead link.
 */
export function getAuthorFor(authorId: string): AuthorProfile {
  return getAuthorBySlug(authorId) ?? authorProfiles[0];
}

export const DEFAULT_AUTHOR_ID = 'gamerspulse-editorial';
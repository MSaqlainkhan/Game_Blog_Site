import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RatingBadge } from '@/components/RatingBadge';
import { searchAll, type SearchResultItem } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

interface PageProps {
  searchParams: { q?: string };
}

/**
 * Site search.
 *
 * Target of the `SearchAction` declared in the WebSite structured data, so
 * `search_term_string` maps to the `q` parameter. The page is `noindex,
 * nofollow`: result permutations are generated per keystroke and have no
 * standalone SEO value. It is also excluded from sitemap.xml.
 */
export const metadata: Metadata = buildPageMetadata({
  title: 'Search',
  description: 'Search GamersPulse for games, reviews, guides and news articles.',
  path: '/search',
  index: false,
});

const TYPE_LABEL: Record<SearchResultItem['type'], string> = {
  game: 'Game',
  review: 'Review',
  news: 'News',
  guide: 'Guide',
};

export default function SearchPage({ searchParams }: PageProps) {
  const query = (searchParams.q ?? '').trim();
  const results = query.length >= 2 ? searchAll(query) : [];

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Search' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Search GamersPulse
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Search across games, reviews, guides and news articles.
        </p>

        {/* GET form so a search result URL can be shared and bookmarked. */}
        <form action="/search" method="get" role="search" className="mt-5 max-w-xl">
          <label htmlFor="site-search" className="mb-1 block text-[12px] font-medium text-ink-muted">
            Search term
          </label>
          <div className="flex gap-2">
            <input
              id="site-search"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Elden Ring, Cyberpunk, boss strategies..."
              className="h-10 w-full rounded border border-surface-border bg-white px-3 text-body-compact text-ink placeholder:text-ink-faint focus:border-accent"
            />
            <button
              type="submit"
              className="h-10 shrink-0 bg-ink px-4 text-body-compact font-semibold text-white transition-colors hover:bg-accent"
            >
              Search
            </button>
          </div>
        </form>
      </header>

      {query.length === 0 ? (
        <p className="mt-8 text-body-default text-ink-muted">
          Enter a search term above to find games, reviews, guides and news.
        </p>
      ) : query.length === 1 ? (
        <p className="mt-8 text-body-default text-ink-muted">
          Please enter at least two characters.
        </p>
      ) : results.length === 0 ? (
        <div className="mt-8 border border-surface-border bg-canvas p-8 text-center">
          <h2 className="font-serif text-headline-sm font-semibold text-ink">
            No results for &ldquo;{query}&rdquo;
          </h2>
          <p className="mt-2 text-body-default text-ink-muted">
            Try a different spelling, or search by platform, genre or developer.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-body-compact">
            <Link href="/games" className="text-accent-hover underline underline-offset-2">
              Browse all games
            </Link>
            <Link href="/reviews" className="text-accent-hover underline underline-offset-2">
              Read reviews
            </Link>
            <Link href="/guides" className="text-accent-hover underline underline-offset-2">
              Browse guides
            </Link>
          </div>
        </div>
      ) : (
        <section aria-labelledby="search-results">
          <h2 id="search-results" className="mt-8 font-serif text-headline-sm font-semibold text-ink">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </h2>

          <ol className="mt-5 flex flex-col gap-4">
            {results.map((result) => (
              <li key={result.id}>
                <article className="flex gap-4 border border-surface-border bg-white p-4">
                  <Link
                    href={result.url}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative hidden h-20 w-32 shrink-0 overflow-hidden rounded bg-surface-low sm:block"
                  >
                    <Image
                      src={result.image}
                      alt={result.imageAlt}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <p className="meta-stamp flex flex-wrap items-center gap-1.5 text-ink-faint">
                      <span className="font-semibold uppercase tracking-label text-accent-hover">
                        {TYPE_LABEL[result.type]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{result.category}</span>
                      {result.date ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <time dateTime={result.date}>{result.date}</time>
                        </>
                      ) : null}
                    </p>

                    <h3 className="mt-1 font-serif text-[19px] font-medium leading-snug text-ink">
                      <Link
                        href={result.url}
                        className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
                      >
                        {result.title}
                      </Link>
                    </h3>

                    <p className="mt-1 line-clamp-2 text-body-compact leading-relaxed text-ink-muted">
                      {result.summary}
                    </p>

                    {result.rating !== undefined ? (
                      <div className="mt-2">
                        <RatingBadge score={result.rating} size="sm" />
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
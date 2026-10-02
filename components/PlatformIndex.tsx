import Image from 'next/image';
import Link from 'next/link';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ReviewCard } from '@/components/ReviewCard';
import { SectionHeader } from '@/components/SectionHeader';
import { getAllGames, getAllReviews } from '@/lib/data';
import { getGenreLabelForPlatform, type PlatformIndexData } from '@/lib/platforms';

/**
 * Shared renderer for the platform category pages.
 *
 * A platform page is only rendered when it has enough genuinely useful content:
 * at least three games plus any reviews available for them. Platforms that do
 * not meet that bar get no route at all rather than a thin indexable page.
 */
export function PlatformIndex({
  platform,
  path,
  title,
  description,
  headingId,
}: PlatformIndexData) {
  const games = getAllGames().filter((game) => game.platforms.includes(platform));
  const reviews = getAllReviews().filter((review) => review.platforms.includes(platform));
  const genres = getGenreLabelForPlatform(platform);

  const featured = [...games].sort(
    (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.title.localeCompare(b.title),
  );

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Games', href: '/games' }, { label: title }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          {description}
        </p>
        {genres.length > 0 ? (
          <p className="mt-3 meta-stamp text-ink-faint">
            Genres covered: {genres.join(', ')}
          </p>
        ) : null}
      </header>

      {reviews.length > 0 ? (
        <section aria-labelledby={`${headingId}-reviews`} className="mt-10">
          <SectionHeader
            id={`${headingId}-reviews`}
            badge="Editorial verdicts"
            title={`${title} reviews`}
            viewAllHref="/reviews"
            viewAllText="All reviews"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard key={review.slug} review={review} horizontal />
            ))}
          </div>
        </section>
      ) : null}

      <AdSlot name="gamesAfterLead" className="mt-10" />

      <section aria-labelledby={`${headingId}-games`} className="mt-10">
        <SectionHeader
          id={`${headingId}-games`}
          badge="Catalogue"
          title={`Games on ${title}`}
          viewAllHref="/games"
          viewAllText="Full catalogue"
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <li key={game.slug}>
              <article className="flex h-full flex-col border border-surface-border bg-white p-4">
                <Link
                  href={`/games/${game.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative mb-3 block aspect-[16/10] overflow-hidden rounded bg-surface-low"
                >
                  <Image
                    src={game.coverImage}
                    alt={game.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </Link>

                <h3 className="font-serif text-[19px] font-medium leading-tight text-ink">
                  <Link
                    href={`/games/${game.slug}`}
                    className="transition-colors hover:text-accent-hover"
                  >
                    {game.title}
                  </Link>
                </h3>

                <p className="mt-0.5 text-[11px] text-ink-faint">
                  {game.developer} · {game.genre}
                </p>

                <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-ink-muted">
                  {game.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
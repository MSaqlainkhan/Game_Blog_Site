import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GameCard } from '@/components/GameCard';
import { GuideCard } from '@/components/GuideCard';
import { NewsCard } from '@/components/NewsCard';
import { RatingBadge } from '@/components/RatingBadge';
import { SectionHeader } from '@/components/SectionHeader';
import {
  getAllGames,
  getGameBySlug,
  getGuideBySlug,
  getNewsBySlug,
  getRelatedGames,
  getReviewForGame,
} from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd } from '@/lib/seo';
import { formatDate, toIsoDate } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllGames().map((game) => ({ slug: game.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const game = getGameBySlug(params.slug);

  if (!game) {
    return buildPageMetadata({
      title: 'Game not found',
      description: 'This game profile does not exist or has been moved.',
      path: `/games/${params.slug}`,
      index: false,
    });
  }

  return buildPageMetadata({
    title: game.title,
    description: game.description,
    path: `/games/${game.slug}`,
    image: game.coverImage,
    imageAlt: game.imageAlt,
  });
}

/**
 * Game profile.
 *
 * This is a factual reference page — developer, publisher, platforms, genre,
 * release information and our own written coverage. It deliberately carries no
 * `aggregateRating`: the score shown on the page is GamersPulse's own editorial
 * judgement from a single review, which is not an aggregate of third-party
 * ratings, and marking it up as one would misrepresent it to search engines.
 */
export default function GamePage({ params }: PageProps) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();

  const review = getReviewForGame(game.slug);
  const relatedGames = getRelatedGames(game.relatedGameSlugs);
  const relatedGuides = game.relatedGuideSlugs
    .map(getGuideBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedNews = game.relatedNewsSlugs
    .map(getNewsBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const path = `/games/${game.slug}`;

  const videoGameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${path}#game`,
    name: game.title,
    description: game.description,
    image: [game.coverImage, game.heroImage],
    genre: game.genres,
    gamePlatform: game.platforms,
    author: { '@type': 'Organization', name: game.developer },
    publisher: { '@type': 'Organization', name: game.publisher },
    datePublished: toIsoDate(game.releaseDate),
  };

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games' },
    { name: game.title, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(videoGameJsonLd) }}
      />
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <div className="editorial-container py-8 md:py-10">
        <Breadcrumbs items={[{ label: 'Games', href: '/games' }, { label: game.title }]} />

        <article>
          <header className="border-b border-surface-border pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/games?genre=${encodeURIComponent(game.genre)}`}
                className="kicker border border-accent/30 bg-accent-tint px-2 py-0.5 text-accent-hover"
              >
                {game.genre}
              </Link>
              {review ? <RatingBadge score={review.score} size="md" /> : null}
            </div>

            <h1 className="mt-4 font-serif text-headline-lg font-semibold leading-tight tracking-tight text-ink md:text-display-hero">
              {game.title}
            </h1>

            <p className="mt-4 max-w-3xl text-subhead-editorial leading-relaxed text-ink-muted">
              {game.description}
            </p>
          </header>

          {/* Factual reference table */}
          <div className="mt-8 grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
            <div className="lg:col-span-8">
              <figure className="figure-breakout figure-breakout--contained">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-low">
                  <Image
                    src={game.heroImage}
                    alt={game.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
                <figcaption>{game.imageAlt}</figcaption>
              </figure>

              <div className="prose-editorial mt-8">
                <h2>Overview</h2>
                <p>{game.overview}</p>

                <h2>Gameplay</h2>
                <p>{game.gameplay}</p>

                <h3>Key features</h3>
                <ul>
                  {game.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <h2>Graphics</h2>
                <p>{game.graphics}</p>

                <h2>Sound</h2>
                <p>{game.sound}</p>

                <h2>Performance</h2>
                <p>{game.performance}</p>
              </div>

              <AdSlot name="articleMid" className="mt-10" />
            </div>

            <aside className="lg:col-span-4" aria-label="Game details">
              <section aria-labelledby="game-details" className="border-t border-surface-border pt-6">
                <h2 id="game-details" className="font-serif text-headline-sm font-semibold text-ink">
                  Game details
                </h2>

                <dl className="mt-4 flex flex-col text-[13px]">
                  <DetailRow label="Developer">{game.developer}</DetailRow>
                  <DetailRow label="Publisher">{game.publisher}</DetailRow>
                  <DetailRow label="Genre">{game.genres.join(', ')}</DetailRow>
                  <DetailRow label="Platforms">{game.platforms.join(', ')}</DetailRow>
                  <DetailRow label="Release date">
                    <time dateTime={game.releaseDate}>{formatDate(game.releaseDate)}</time>
                    {game.releaseNote ? ` (${game.releaseNote})` : null}
                  </DetailRow>
                </dl>
              </section>

              {review ? (
                <section aria-labelledby="game-review" className="mt-10 border-t border-surface-border pt-6">
                  <SectionHeader id="game-review" title="Our review" />
                  <div className="flex items-start gap-3">
                    <RatingBadge score={review.score} size="lg" showLabel />
                    <p className="text-body-compact leading-relaxed text-ink-muted">
                      {review.summary}
                    </p>
                  </div>
                  <Link
                    href={`/reviews/${review.slug}`}
                    className="mt-4 inline-flex items-center bg-ink px-4 py-2 text-body-compact font-medium text-white transition-colors hover:bg-accent"
                  >
                    Read the full review
                  </Link>
                </section>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 border-t border-surface-border pt-6">
                <h2 className="font-serif text-headline-sm font-semibold text-ink">
                  Strengths and drawbacks
                </h2>

                <div>
                  <h3 className="kicker text-accent-hover">Pros</h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {game.pros.map((pro) => (
                      <li key={pro} className="text-[13px] leading-relaxed text-ink-muted">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="kicker text-ink-faint">Cons</h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {game.cons.map((con) => (
                      <li key={con} className="text-[13px] leading-relaxed text-ink-muted">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <AdSlot name="newsSidebar" format="rectangle" className="mt-10" />
            </aside>
          </div>
        </article>

        {/* Internal linking: only sections that genuinely have content */}
        {relatedNews.length > 0 ? (
          <section aria-labelledby="game-news" className="mt-12 border-t border-surface-border pt-8">
            <SectionHeader
              id="game-news"
              badge="Coverage"
              title="News and analysis"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedNews.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedGuides.length > 0 ? (
          <section aria-labelledby="game-guides" className="mt-12 border-t border-surface-border pt-8">
            <SectionHeader
              id="game-guides"
              badge="Level up"
              title="Guides for this game"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ) : null}

        {relatedGames.length > 0 ? (
          <section aria-labelledby="similar-games" className="mt-12 border-t border-surface-border pt-8">
            <SectionHeader
              id="similar-games"
              badge="More to play"
              title="Players also looked at"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {relatedGames.slice(0, 6).map((related) => (
                <GameCard key={related.slug} game={related} showScore />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-surface-border py-2.5 sm:flex-row sm:gap-4">
      <dt className="font-medium text-ink sm:w-32 sm:shrink-0">{label}</dt>
      <dd className="text-ink-muted">{children}</dd>
    </div>
  );
}
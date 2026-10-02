import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GameCard } from '@/components/GameCard';
import { GuideCard } from '@/components/GuideCard';
import { RatingBadge } from '@/components/RatingBadge';
import { SectionHeader } from '@/components/SectionHeader';
import { ShareButtons } from '@/components/ShareButtons';
import { getAllReviews, getAuthorFor, getGameBySlug, getGuideBySlug, getReviewBySlug } from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd, personJsonLd } from '@/lib/seo';
import { canonical, formatDate, toIsoDate } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllReviews().map((review) => ({ slug: review.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const review = getReviewBySlug(params.slug);

  if (!review) {
    return buildPageMetadata({
      title: 'Review not found',
      description: 'This review does not exist or has been moved.',
      path: `/reviews/${params.slug}`,
      index: false,
    });
  }

  const path = `/reviews/${review.slug}`;

  return buildPageMetadata({
    // The template appends "| GamersPulse", so the brand is not repeated here.
    title: `${review.gameTitle} Review`,
    description: `${review.gameTitle} review: ${review.summary}`,
    path,
    image: review.coverImage,
    imageAlt: review.imageAlt,
    type: 'article',
    publishedTime: toIsoDate(review.publishedAt),
    ...(review.updatedAt ? { modifiedTime: toIsoDate(review.updatedAt) } : {}),
  });
}

export default function ReviewPage({ params }: PageProps) {
  const review = getReviewBySlug(params.slug);
  if (!review) notFound();

  const author = getAuthorFor(review.authorId);
  const game = getGameBySlug(review.gameSlug);
  const path = `/reviews/${review.slug}`;

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${canonical(path)}#review`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(path) },
    name: `${review.gameTitle} Review`,
    reviewBody: review.verdict,
    datePublished: toIsoDate(review.publishedAt),
    dateModified: toIsoDate(review.updatedAt ?? review.publishedAt),
    inLanguage: 'en-US',
    author: { '@id': `${canonical(`/authors/${author.slug}`)}#person` },
    publisher: { '@id': `${canonical('/')}#organization` },
    itemReviewed: {
      '@type': 'VideoGame',
      name: review.gameTitle,
      image: review.coverImage,
      genre: review.genre,
      gamePlatform: review.platforms,
    },
    // A single real editorial score. No aggregate rating, no invented rating
    // count, and never a score on a page that is not a review.
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 0,
    },
  };

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Reviews', path: '/reviews' },
    { name: `${review.gameTitle} Review`, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              reviewJsonLd,
              personJsonLd({
                name: author.name,
                jobTitle: author.role,
                url: canonical(`/authors/${author.slug}`),
              }),
            ],
          }),
        }}
      />
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <div className="editorial-container py-8 md:py-10">
        <Breadcrumbs
          items={[{ label: 'Reviews', href: '/reviews' }, { label: `${review.gameTitle} Review` }]}
        />

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
          <article className="lg:col-span-8">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <RatingBadge score={review.score} size="lg" showLabel />
                <span className="kicker text-ink-faint">{review.genre}</span>
              </div>

              <h1 className="mt-4 font-serif text-headline-lg font-semibold leading-tight tracking-tight text-ink md:text-display-hero">
                {review.gameTitle} Review
              </h1>

              <p className="mt-4 text-subhead-editorial leading-relaxed text-ink-muted">
                {review.summary}
              </p>

              <div className="mt-6 border-y border-surface-border py-4">
                <p className="text-body-compact text-ink">
                  By{' '}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="font-medium underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
                  >
                    {author.name}
                  </Link>
                </p>
                <dl className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 meta-stamp text-ink-muted">
                  <dt className="sr-only">Publication date</dt>
                  <dd>
                    <time dateTime={review.publishedAt}>
                      {formatDate(review.publishedAt)}
                    </time>
                  </dd>
                  {review.updatedAt ? (
                    <>
                      <dt className="sr-only">Last updated</dt>
                      <dd aria-hidden="true">·</dd>
                      <dd>
                        Updated{' '}
                        <time dateTime={review.updatedAt}>{formatDate(review.updatedAt)}</time>
                      </dd>
                    </>
                  ) : null}
                  <dt className="sr-only">Platforms</dt>
                  <dd aria-hidden="true">·</dd>
                  <dd>{review.platforms.join(', ')}</dd>
                </dl>
              </div>
            </header>

            <figure className="figure-breakout mt-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-low">
                <Image
                  src={review.coverImage}
                  alt={review.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <figcaption>{review.imageAlt}</figcaption>
            </figure>

            <div className="prose-editorial mt-8">
              <h2>Gameplay</h2>
              <p>{review.gameplay}</p>

              <AdSlot name="articleAfterIntro" className="my-10 not-prose" />

              <h2>Graphics</h2>
              <p>{review.graphics}</p>

              <h2>Performance</h2>
              <p>{review.performance}</p>

              <h2>Sound</h2>
              <p>{review.sound}</p>

              <h2>Content depth</h2>
              <p>{review.contentDepth}</p>

              <h2>Value</h2>
              <p>{review.value}</p>

              <AdSlot name="articleMid" className="my-10 not-prose" />

              <h2>Final thoughts</h2>
              <p>{review.verdict}</p>
            </div>

            <ShareButtons title={`${review.gameTitle} Review`} url={path} />

            <AdSlot name="articleFooter" className="mt-8" />
          </article>

          <aside className="lg:col-span-4" aria-label="Review scorecard">
            {/* Scorecard */}
            <section aria-labelledby="scorecard" className="border-t border-surface-border pt-6">
              <h2 id="scorecard" className="font-serif text-headline-sm font-semibold text-ink">
                Score breakdown
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                {review.breakdown.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-medium text-ink">{item.category}</span>
                      <span className="text-[13px] font-semibold tabular-nums text-accent-hover">
                        {item.score.toFixed(1)}
                      </span>
                    </div>
                    {/*
                      The numeric value is always rendered as text above, so the
                      bar is decorative reinforcement rather than the only signal.
                    */}
                    <div
                      aria-hidden="true"
                      className="mt-1 h-1 w-full bg-surface-low"
                    >
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${Math.max(0, Math.min(100, (item.score / 10) * 100))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-t border-surface-border pt-3 text-[12px] leading-relaxed text-ink-faint">
                Scores are awarded by the GamersPulse editorial desk out of 10. The full method is
                published on our{' '}
                <Link
                  href="/editorial-policy#scoring"
                  className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
                >
                  editorial policy
                </Link>
                .
              </p>
            </section>

            {/* Pros and cons */}
            <section aria-labelledby="pros-cons" className="mt-10 border-t border-surface-border pt-6">
              <h2 id="pros-cons" className="font-serif text-headline-sm font-semibold text-ink">
                Pros and cons
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <h3 className="kicker text-accent-hover">Pros</h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {review.pros.map((pro) => (
                      <li key={pro} className="text-[13px] leading-relaxed text-ink-muted">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="kicker text-ink-faint">Cons</h3>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {review.cons.map((con) => (
                      <li key={con} className="text-[13px] leading-relaxed text-ink-muted">
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Related game and guides */}
            {game ? (
              <section aria-labelledby="game-profile" className="mt-10 border-t border-surface-border pt-6">
                <SectionHeader id="game-profile" title="Game profile" />
                <GameCard game={game} />
              </section>
            ) : null}

            {game?.relatedGuideSlugs.length ? (
              <section aria-labelledby="review-guides" className="mt-10 border-t border-surface-border pt-6">
                <SectionHeader id="review-guides" title="Guides for this game" />
                <div className="flex flex-col gap-4">
                  {game.relatedGuideSlugs
                    .map(getGuideBySlug)
                    .filter((item): item is NonNullable<typeof item> => Boolean(item))
                    .map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} />
                    ))}
                </div>
              </section>
            ) : null}

            <AdSlot name="newsSidebar" format="rectangle" className="mt-10" />
          </aside>
        </div>
      </div>
    </>
  );
}
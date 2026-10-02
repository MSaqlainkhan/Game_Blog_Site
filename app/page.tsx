import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { AdSlot } from '@/components/AdSlot';
import { CategoryCard } from '@/components/CategoryCard';
import { GameCard } from '@/components/GameCard';
import { GuideCard } from '@/components/GuideCard';
import { Newsletter } from '@/components/Newsletter';
import { ReviewCard } from '@/components/ReviewCard';
import { SectionHeader } from '@/components/SectionHeader';
import {
  getAllGames,
  getAllReviews,
  getAuthorFor,
  getGenresWithCounts,
  getGuideBySlug,
  getLatestGuides,
  getLatestNews,
  getReviewForGame,
} from '@/lib/data';
import { buildPageMetadata, jsonLd } from '@/lib/seo';
import { absoluteUrl, formatDate } from '@/lib/site';
import type { Game, Guide, NewsArticle, Review } from '@/types';

export const metadata: Metadata = buildPageMetadata({
  title: 'GamersPulse — Gaming News, Reviews & Guides',
  description:
    'Independent gaming coverage: news and analysis on PC, PlayStation, Xbox and Nintendo, reviews written by people who played the game, and guides you can actually follow.',
  path: '/',
});

export default function HomePage() {
  const news = getLatestNews(6);
  const lead: NewsArticle | undefined = news[0];
  const secondary = news.slice(1);
  const reviews = getAllReviews().slice(0, 3);
  const guides = getLatestGuides(4);
  const genres = getGenresWithCounts();

  const spotlight = gamesForSpotlight();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(homepageItemListJsonLd([...(lead ? [lead] : []), ...secondary])),
        }}
      />

      <div className="editorial-container py-8 md:py-10">
        {lead ? <FeaturedStory article={lead} /> : null}

        {/* Ad: after the lead editorial section */}
        <AdSlot name="homeAfterLead" className="mt-10" />

        {spotlight.length > 0 ? (
          <section aria-labelledby="spotlight" className="mt-10">
            <SectionHeader
              badge="In focus"
              id="spotlight"
              title="In the spotlight"
              description="Reviews, guides and coverage for the games we are following."
              viewAllHref="/games"
              viewAllText="Browse all games"
            />
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {spotlight.map((entry) => (
                <li key={entry.game.slug}>
                  <SpotlightCard game={entry.game} review={entry.review} guide={entry.guide} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {secondary.length > 0 ? (
          <section aria-labelledby="latest-news" className="mt-12">
            <SectionHeader
              badge="Journalism & tech"
              id="latest-news"
              title="Latest gaming news"
              description="Reporting on engines and hardware, platform shifts, and design decisions that affect how games play."
              viewAllHref="/news"
              viewAllText="More news"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {secondary.map((article) => (
                <LatestNewsRow key={article.slug} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Ad: between major editorial sections */}
        <AdSlot name="homeMidFeed" className="mt-12" />

        {genres.length > 0 ? (
          <section aria-labelledby="explore-by-genre" className="mt-12">
            <SectionHeader
              badge="Game discovery"
              id="explore-by-genre"
              title="Explore games by genre"
              description="Browse the catalogue by the kind of game you want to play next."
              viewAllHref="/games"
              viewAllText="Full catalogue"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {genres.map((genre) => (
                <CategoryCard key={genre.slug} category={genre} />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="featured-games" className="mt-12">
          <SectionHeader
            badge="Curated index"
            id="featured-games"
            title="Featured games"
            description="Titles with strong critical reception and genuinely interesting systems."
            viewAllHref="/games"
            viewAllText="Browse all games"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {spotlight.slice(0, 6).map((entry) => (
              <GameCard key={entry.game.slug} game={entry.game} showScore />
            ))}
          </div>
        </section>

        {reviews.length > 0 ? (
          <section aria-labelledby="latest-reviews" className="mt-12">
            <SectionHeader
              badge="Editorial verdicts"
              id="latest-reviews"
              title="Latest reviews"
              description="Scores are earned, not averaged. We state what worked and what did not."
              viewAllHref="/reviews"
              viewAllText="All reviews"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.slug} review={review} />
              ))}
            </div>
          </section>
        ) : null}

        {guides.length > 0 ? (
          <section aria-labelledby="latest-guides" className="mt-12">
            <SectionHeader
              badge="Level up your game"
              id="latest-guides"
              title="Actionable gaming guides"
              description="Builds, walkthroughs and mechanics breakdowns written to be followed."
              viewAllHref="/guides"
              viewAllText="Explore all guides"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        ) : null}

        <Newsletter className="mt-12" />
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Lead story                                                                 */
/* -------------------------------------------------------------------------- */

function FeaturedStory({ article }: { article: NewsArticle }) {
  const author = getAuthorFor(article.authorId);

  return (
    <section aria-labelledby="featured-story" className="border-b border-surface-border pb-10">
      <h2 id="featured-story" className="kicker mb-4 text-accent">
        Featured story
      </h2>

      <div className="grid grid-cols-1 items-start gap-gutter-desktop lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Link
            href={`/news/${article.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-low"
          >
            <Image
              src={article.heroImage}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </Link>
        </div>

        <div className="lg:col-span-5">
          <Link
            href={`/news/${article.slug}`}
            className="kicker border border-accent/30 bg-accent-tint px-2 py-0.5 text-accent-hover"
          >
            {article.category}
          </Link>

          {/* The lead headline is the page's single top-level heading. */}
          <h1 className="mt-3 font-serif text-headline-md font-semibold leading-tight tracking-tight text-ink md:text-display-hero">
            <Link
              href={`/news/${article.slug}`}
              className="transition-colors hover:text-accent-hover"
            >
              {article.title}
            </Link>
          </h1>

          <p className="mt-4 text-body-default leading-relaxed text-ink-muted">
            {article.summary}
          </p>

          <div className="mt-5 border-t border-surface-border pt-4">
            <p className="meta-stamp text-ink">
              By{' '}
              <Link
                href={`/authors/${author.slug}`}
                className="font-medium underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
              >
                {author.name}
              </Link>
            </p>

            <dl className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 meta-stamp text-ink-muted">
              <dt className="sr-only">Publication date</dt>
              <dd>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </dd>

              {article.updatedAt ? (
                <>
                  <dt className="sr-only">Last updated</dt>
                  <dd aria-hidden="true">·</dd>
                  <dd>
                    Updated{' '}
                    <time dateTime={article.updatedAt}>
                      {formatDate(article.updatedAt)}
                    </time>
                  </dd>
                </>
              ) : null}

              <dt className="sr-only">Reading time</dt>
              <dd aria-hidden="true">·</dd>
              <dd>{article.readTime}</dd>
            </dl>

            <Link
              href={`/news/${article.slug}`}
              className="mt-5 inline-flex items-center gap-2 bg-ink px-4 py-2 text-body-compact font-medium text-white transition-colors hover:bg-accent"
            >
              Read the story
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Latest news                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Newspaper-style row: image beside a headline, rather than a large floating
 * card. Headlines and readability are prioritised over card effects.
 */
function LatestNewsRow({ article }: { article: NewsArticle }) {
  return (
    <article className="group flex gap-4 border-b border-surface-border pb-4">
      <Link
        href={`/news/${article.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative hidden aspect-[4/3] w-32 shrink-0 overflow-hidden rounded bg-surface-low sm:block"
      >
        <Image
          src={article.heroImage}
          alt={article.imageAlt}
          fill
          sizes="128px"
          className="object-cover"
        />
      </Link>

      <div className="min-w-0">
        <p className="meta-stamp flex flex-wrap items-center gap-1.5 text-ink-faint">
          <span className="font-semibold uppercase tracking-label text-accent-hover">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </p>

        <h3 className="mt-1 font-serif text-[19px] font-medium leading-snug text-ink">
          <Link
            href={`/news/${article.slug}`}
            className="transition-colors hover:text-accent-hover"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-2 text-body-compact leading-relaxed text-ink-muted">
          {article.summary}
        </p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Spotlight                                                                   */
/* -------------------------------------------------------------------------- */

function SpotlightCard({
  game,
  review,
  guide,
}: {
  game: Game;
  review?: Review;
  guide?: Guide;
}) {
  return (
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
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </Link>

      <h3 className="font-serif text-[17px] font-medium leading-snug text-ink">
        <Link
          href={`/games/${game.slug}`}
          className="transition-colors hover:text-accent-hover"
        >
          {game.title}
        </Link>
      </h3>

      <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-ink-muted">
        {game.description}
      </p>

      <ul className="mt-auto flex flex-col gap-1 border-t border-surface-border pt-3 text-[12px]">
        {review ? (
          <li>
            <Link
              href={`/reviews/${review.slug}`}
              className="text-ink-muted transition-colors hover:text-accent-hover"
            >
              Read the review
            </Link>
          </li>
        ) : null}
        {guide ? (
          <li>
            <Link
              href={`/guides/${guide.slug}`}
              className="text-ink-muted transition-colors hover:text-accent-hover"
            >
              {guide.category} guide
            </Link>
          </li>
        ) : null}
      </ul>
    </article>
  );
}

/**
 * Picks up to four games that have both a review and a guide, so the spotlight
 * always links somewhere real rather than to an empty section.
 */
function gamesForSpotlight(): { game: Game; review?: Review; guide?: Guide }[] {
  return getAllGames()
    .map((game) => ({
      game,
      review: getReviewForGame(game.slug),
      guide: game.relatedGuideSlugs.map(getGuideBySlug).find(Boolean),
    }))
    .filter((entry) => entry.review || entry.guide)
    .slice(0, 4);
}

/* -------------------------------------------------------------------------- */
/* Structured data                                                             */
/* -------------------------------------------------------------------------- */

/**
 * ItemList of the articles currently on the homepage. Only genuinely rendered
 * articles are listed, and every URL is absolute.
 */
function homepageItemListJsonLd(articles: NewsArticle[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest gaming news from GamersPulse',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/news/${article.slug}`),
      name: article.title,
    })),
  };
}
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllReviews, getReviewBySlug, getGameBySlug, getRelatedGames } from '@/lib/data';
import { RatingBadge } from '@/components/RatingBadge';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareButtons } from '@/components/ShareButtons';
import { GameCard } from '@/components/GameCard';
import { AdSlot } from '@/components/AdSlot';
import {
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  Gamepad2,
  Eye,
  Volume2,
  Cpu,
  Layers,
  CircleDollarSign,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const reviews = getAllReviews();
  return reviews.map((rev) => ({
    slug: rev.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const review = getReviewBySlug(params.slug);
  if (!review) return { title: 'Review Not Found' };

  return {
    title: `${review.gameTitle} Review — GamersPulse Score: ${review.score}/10`,
    description: review.summary,
    openGraph: {
      title: `${review.gameTitle} Review | GamersPulse`,
      description: review.summary,
      images: [{ url: review.coverImage }],
    },
  };
}

export default function ReviewDetailPage({ params }: Props) {
  const review = getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const associatedGame = getGameBySlug(review.gameSlug);
  const relatedGames = associatedGame
    ? getRelatedGames(associatedGame.relatedGameSlugs).slice(0, 3)
    : [];

  const jsonLdReview = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'VideoGame',
      name: review.gameTitle,
      genre: review.genre,
      gamePlatform: review.platforms,
    },
    author: {
      '@type': 'Person',
      name: review.author.name,
      jobTitle: review.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GamersPulse',
      url: 'https://gamerspulse.site',
    },
    datePublished: review.publishedAt,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 1,
    },
    reviewBody: review.verdict,
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdReview) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Reviews', href: '/reviews' },
          { label: `${review.gameTitle} Review` },
        ]}
      />

      {/* Header Info */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pulse text-background shadow-pulse-glow">
            {review.genre} Review
          </span>
          <span className="text-xs text-slate-400">
            Platforms: {review.platforms.join(', ')}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {review.gameTitle} — In-Depth Review
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <User className="w-4 h-4 text-pulse" />
              {review.author.name} ({review.author.role})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {review.publishedAt}
            </span>
            {review.updatedAt && (
              <>
                <span>•</span>
                <span className="text-slate-500">Updated: {review.updatedAt}</span>
              </>
            )}
          </div>

          <RatingBadge score={review.score} size="md" showLabel />
        </div>
      </header>

      {/* Hero Cover */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-8 border border-surface-border shadow-card bg-surface-subtle">
        <Image
          src={review.coverImage}
          alt={`${review.gameTitle} review cover image`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-pulse block mb-1">
              Executive Summary
            </span>
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed drop-shadow-md">
              {review.summary}
            </p>
          </div>

          {associatedGame && (
            <Link
              href={`/games/${associatedGame.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/90 hover:bg-surface border border-surface-border text-white text-xs font-bold backdrop-blur-md transition-colors shrink-0"
            >
              <Gamepad2 className="w-4 h-4 text-pulse" />
              <span>Game Specs</span>
            </Link>
          )}
        </div>
      </div>

      <ShareButtons title={`${review.gameTitle} Review - GamersPulse`} />

      {/* Review Content Sections */}
      <div className="space-y-10 my-10 text-slate-300 leading-relaxed">
        {/* Gameplay */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Gamepad2 className="w-5 h-5 text-pulse" />
            Gameplay & Mechanics
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">{review.gameplay}</p>
        </section>

        {/* Graphics */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Eye className="w-5 h-5 text-pulse" />
            Graphics & Visual Fidelity
          </h2>
          <p className="text-base leading-relaxed">{review.graphics}</p>
        </section>

        {/* Performance */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-pulse" />
            Performance & Stability
          </h2>
          <p className="text-base leading-relaxed">{review.performance}</p>
        </section>

        {/* Sound & Music */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-pulse" />
            Sound & Audio Design
          </h2>
          <p className="text-base leading-relaxed">{review.sound}</p>
        </section>

        {/* Content & Depth */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-pulse" />
            Content Depth & Replayability
          </h2>
          <p className="text-base leading-relaxed">{review.contentDepth}</p>
        </section>

        {/* Value */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <CircleDollarSign className="w-5 h-5 text-pulse" />
            Value Proposition
          </h2>
          <p className="text-base leading-relaxed">{review.value}</p>
        </section>

        {/* Ad Container */}
        <AdSlot format="horizontal" slotId="review-article-mid" />

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Pros
            </h3>
            <ul className="space-y-3">
              {review.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6">
            <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" />
              Cons
            </h3>
            <ul className="space-y-3">
              {review.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Score Breakdown Bars & Final Verdict */}
        <div className="rounded-3xl border border-pulse/40 bg-gradient-to-b from-surface-elevated to-surface p-8 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-border">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-pulse">
                GamersPulse Evaluation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Final Review Verdict
              </h3>
            </div>
            <RatingBadge score={review.score} size="lg" showLabel />
          </div>

          {/* Breakdown progress bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {review.breakdown.map((item, idx) => (
              <div key={idx} className="bg-surface-subtle/70 p-3.5 rounded-xl border border-surface-border">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">{item.category}</span>
                  <span className="text-pulse">{item.score.toFixed(1)} / 10</span>
                </div>
                <div className="w-full bg-surface-border h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-pulse h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(item.score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Verdict Text */}
          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed bg-surface-subtle p-6 rounded-2xl border border-surface-border">
            &ldquo;{review.verdict}&rdquo;
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>
              Reviewed by <strong>{review.author.name}</strong> • Evaluated under our{' '}
              <Link href="/editorial-policy#reviews" className="text-pulse underline">
                Review Methodology
              </Link>
            </span>

            {associatedGame && (
              <Link
                href={`/games/${associatedGame.slug}`}
                className="inline-flex items-center gap-1.5 font-bold text-pulse hover:text-pulse-hover"
              >
                <span>View {associatedGame.title} Game Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="mt-16 pt-10 border-t border-surface-border">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recommended Games in this Genre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedGames.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

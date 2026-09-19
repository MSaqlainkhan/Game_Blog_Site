import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  getAllGames,
  getGameBySlug,
  getRelatedGames,
  getReviewForGame,
  getNewsBySlug,
  getGuideBySlug
} from '@/lib/data';
import { RatingBadge } from '@/components/RatingBadge';
import { GameCard } from '@/components/GameCard';
import { NewsCard } from '@/components/NewsCard';
import { GuideCard } from '@/components/GuideCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import {
  Calendar,
  Building,
  Monitor,
  CheckCircle2,
  XCircle,
  Star,
  ArrowRight,
  Sparkles,
  Volume2,
  Eye,
  Cpu
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const games = getAllGames();
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: 'Game Not Found' };

  return {
    title: `${game.title} — Overview, Features & Technical Breakdown`,
    description: game.description,
    openGraph: {
      title: `${game.title} | GamersPulse`,
      description: game.description,
      images: [{ url: game.heroImage || game.coverImage }],
    },
  };
}

export default function GameDetailPage({ params }: Props) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  const review = getReviewForGame(game.slug);
  const relatedGames = getRelatedGames(game.relatedGameSlugs).slice(0, 4);
  const relatedGuides = game.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter(Boolean);
  const relatedNews = game.relatedNewsSlugs
    .map((s) => getNewsBySlug(s))
    .filter(Boolean);

  const jsonLdGame = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description,
    image: game.coverImage,
    genre: game.genres,
    gamePlatform: game.platforms,
    author: {
      '@type': 'Organization',
      name: game.developer,
    },
    publisher: {
      '@type': 'Organization',
      name: game.publisher,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    },
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGame) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Games', href: '/games' },
          { label: game.title },
        ]}
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-surface border border-surface-border overflow-hidden mb-12 shadow-card">
        <div className="relative aspect-[21/9] min-h-[300px] md:min-h-[440px] w-full bg-surface-subtle">
          <Image
            src={game.heroImage}
            alt={`${game.title} backdrop banner`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />

          {/* Overlay Info */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pulse text-background shadow-pulse-glow">
                {game.genre}
              </span>
              <RatingBadge score={game.rating} size="md" showLabel />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              {game.title}
            </h1>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 bg-surface-subtle/80 px-3 py-1.5 rounded-lg border border-surface-border">
                <Calendar className="w-4 h-4 text-pulse" />
                <span>{game.releaseDate}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-surface-subtle/80 px-3 py-1.5 rounded-lg border border-surface-border">
                <Building className="w-4 h-4 text-pulse" />
                <span>Dev: {game.developer}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-surface-subtle/80 px-3 py-1.5 rounded-lg border border-surface-border">
                <Monitor className="w-4 h-4 text-pulse" />
                <span>Platforms: {game.platforms.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Main Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main 2-Column Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Section: Overview */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pulse" />
              Overview
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              {game.overview}
            </p>
          </section>

          {/* Review Callout (if available) */}
          {review && (
            <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-surface to-surface p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-pulse-glow">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                  <Star className="w-4 h-4 fill-cyan-400" />
                  Editorial Review Available
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  GamersPulse Verdict: {review.score} / 10
                </h3>
                <p className="text-sm text-slate-300 max-w-lg line-clamp-2">
                  {review.summary}
                </p>
              </div>

              <Link
                href={`/reviews/${review.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow shrink-0"
              >
                <span>Read Full Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Section: Gameplay */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Gameplay Mechanics</h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {game.gameplay}
            </p>
          </section>

          {/* Section: Features */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 gap-3">
              {game.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                  <CheckCircle2 className="w-5 h-5 text-pulse shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Graphics & Visuals */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-pulse" />
              Graphics & Visual Presentation
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {game.graphics}
            </p>
          </section>

          {/* Section: Sound & Music */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-pulse" />
              Sound & Audio Design
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {game.sound}
            </p>
          </section>

          {/* Section: Performance */}
          <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-pulse" />
              Performance & Hardware Optimization
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">
              {game.performance}
            </p>
          </section>

          {/* Section: Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Key Strengths
              </h3>
              <ul className="space-y-2.5">
                {game.pros.map((pro, idx) => (
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
                Notable Limitations
              </h3>
              <ul className="space-y-2.5">
                {game.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Specs Box */}
          <div className="bg-surface rounded-2xl border border-surface-border p-6 shadow-card">
            <h3 className="text-base font-bold uppercase tracking-wider text-white pb-3 border-b border-surface-border mb-4">
              Game Specifications
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-400">Rating:</dt>
                <dd className="font-bold text-white">{game.rating} / 10</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Primary Genre:</dt>
                <dd className="font-medium text-white">{game.genre}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Release Date:</dt>
                <dd className="font-medium text-white">{game.releaseDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Developer:</dt>
                <dd className="font-medium text-white text-right">{game.developer}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Publisher:</dt>
                <dd className="font-medium text-white text-right">{game.publisher}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400">Platforms:</dt>
                <dd className="font-medium text-white text-right">{game.platforms.join(', ')}</dd>
              </div>
            </dl>
          </div>

          {/* Ad Slot Ready */}
          <AdSlot format="rectangle" slotId="game-sidebar-rect" />

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                Helpful Guides for {game.title}
              </h3>
              <div className="space-y-4">
                {relatedGuides.map((g: any) => (
                  <GuideCard key={g.id} guide={g} />
                ))}
              </div>
            </div>
          )}

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white">
                Related News & Tech Analysis
              </h3>
              <div className="space-y-4">
                {relatedNews.map((n: any) => (
                  <NewsCard key={n.id} article={n} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Games (4 games) */}
      {relatedGames.length > 0 && (
        <section className="mt-16 pt-12 border-t border-surface-border">
          <h2 className="text-2xl font-bold text-white mb-6">
            Players Also Enjoyed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGames.map((relGame) => (
              <GameCard key={relGame.id} game={relGame} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

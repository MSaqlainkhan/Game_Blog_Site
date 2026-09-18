import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllGuides, getGuideBySlug, getGameBySlug, getRelatedGames } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareButtons } from '@/components/ShareButtons';
import { GuideCard } from '@/components/GuideCard';
import { GameCard } from '@/components/GameCard';
import { AdSlot } from '@/components/AdSlot';
import {
  Calendar,
  Clock,
  User,
  Lightbulb,
  CheckCircle2,
  Gamepad2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: `${guide.title} — GamersPulse Guide`,
    description: guide.summary,
    openGraph: {
      title: `${guide.title} | GamersPulse Guides`,
      description: guide.summary,
      images: [{ url: guide.heroImage }],
    },
  };
}

export default function GuideDetailPage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const associatedGame = getGameBySlug(guide.gameSlug);
  const relatedGuides = guide.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter(Boolean);
  const relatedGames = associatedGame
    ? getRelatedGames(associatedGame.relatedGameSlugs).slice(0, 2)
    : [];

  const jsonLdGuide = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.summary,
    image: guide.heroImage,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GamersPulse',
      url: 'https://gamerspulse.site',
    },
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGuide) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Guides', href: '/guides' },
          { label: guide.title },
        ]}
      />

      {/* Guide Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pulse text-background shadow-pulse-glow">
            {guide.category}
          </span>
          {associatedGame && (
            <Link
              href={`/games/${associatedGame.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-surface-border text-slate-300 hover:text-pulse transition-colors"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{associatedGame.title}</span>
            </Link>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
          {guide.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border text-xs sm:text-sm text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <User className="w-4 h-4 text-pulse" />
            {guide.author.name} ({guide.author.role})
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {guide.publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {guide.readTime}
          </span>
          {guide.updatedAt && (
            <>
              <span>•</span>
              <span className="text-slate-500">Updated: {guide.updatedAt}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-8 border border-surface-border shadow-card bg-surface-subtle">
        <Image
          src={guide.heroImage}
          alt={guide.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <ShareButtons title={`${guide.title} - GamersPulse Guides`} />

      {/* Main Guide Sections */}
      <div className="space-y-10 my-10 text-slate-300 leading-relaxed">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-pulse/10 text-pulse border border-pulse/20 text-sm font-mono flex items-center justify-center shrink-0">
                0{idx + 1}
              </span>
              <span>{section.title}</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-6">
              {section.content}
            </p>

            {section.keyPoints && section.keyPoints.length > 0 && (
              <div className="bg-surface-subtle/70 rounded-xl p-5 border border-surface-border">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pulse mb-3">
                  Tactical Breakdown & Action Items
                </h3>
                <ul className="space-y-2.5">
                  {section.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-pulse shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Ad Container */}
        <AdSlot format="horizontal" slotId="guide-article-mid" />

        {/* Essential Tips Callout Box */}
        {guide.keyTips && guide.keyTips.length > 0 && (
          <section className="rounded-3xl border border-pulse/40 bg-gradient-to-b from-surface-elevated to-surface p-8 shadow-card">
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-pulse" />
              Pro Tips for Easy Execution
            </h2>
            <ul className="space-y-3">
              {guide.keyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm md:text-base">
                  <span className="w-2 h-2 rounded-full bg-pulse mt-2 shrink-0 shadow-pulse-glow" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mt-16 pt-10 border-t border-surface-border">
          <h2 className="text-2xl font-bold text-white mb-6">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedGuides.map((g: any) => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </section>
      )}

      {/* Associated Game Link */}
      {associatedGame && (
        <section className="mt-12 bg-surface p-6 rounded-2xl border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Game Profile
            </span>
            <h3 className="text-lg font-bold text-white">
              {associatedGame.title}
            </h3>
            <p className="text-xs text-slate-400">
              Check out full technical specs, graphics breakdown, and performance notes.
            </p>
          </div>
          <Link
            href={`/games/${associatedGame.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pulse text-background font-bold text-xs hover:bg-pulse-hover transition-colors shadow-pulse-glow shrink-0"
          >
            <span>View Full Game Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      )}
    </article>
  );
}

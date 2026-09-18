import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllNews, getNewsBySlug, getGameBySlug } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareButtons } from '@/components/ShareButtons';
import { NewsCard } from '@/components/NewsCard';
import { AdSlot } from '@/components/AdSlot';
import { Calendar, Clock, User, ArrowRight, Gamepad2, Layers, Compass, HelpCircle } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const news = getAllNews();
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getNewsBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} — GamersPulse News`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | GamersPulse`,
      description: article.summary,
      images: [{ url: article.heroImage }],
    },
  };
}

export default function NewsArticlePage({ params }: Props) {
  const article = getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedArticleSlugs
    .map((s) => getNewsBySlug(s))
    .filter(Boolean);

  const relatedGames = article.relatedGameSlugs
    .map((s) => getGameBySlug(s))
    .filter(Boolean);

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: article.heroImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GamersPulse',
      url: 'https://gamerspulse.site',
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <Breadcrumbs
        items={[
          { label: 'News', href: '/news' },
          { label: article.title },
        ]}
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pulse text-background shadow-pulse-glow">
            {article.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-6 font-medium">
          {article.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border text-xs sm:text-sm text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
            <User className="w-4 h-4 text-pulse" />
            {article.author.name} ({article.author.role})
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {article.publishedAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
          {article.updatedAt && (
            <>
              <span>•</span>
              <span className="text-slate-500">Updated: {article.updatedAt}</span>
            </>
          )}
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-8 border border-surface-border shadow-card bg-surface-subtle">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      <ShareButtons title={`${article.title} - GamersPulse News`} />

      {/* Main Body */}
      <div className="space-y-10 my-10 text-slate-300 leading-relaxed text-base md:text-lg">
        {/* Introduction */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="leading-relaxed whitespace-pre-line">{article.introduction}</p>
        </section>

        {/* Main Story */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">The Main Story</h2>
          <div className="space-y-4 leading-relaxed">
            {article.mainStory.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Mid-Article Ad Slot */}
        <AdSlot format="horizontal" slotId="news-article-mid" />

        {/* What We Know */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-pulse" />
            What We Know
          </h2>
          <p className="leading-relaxed">{article.whatWeKnow}</p>
        </section>

        {/* Why It Matters */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-pulse" />
            Why It Matters
          </h2>
          <p className="leading-relaxed">{article.whyItMatters}</p>
        </section>

        {/* What Happens Next */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-pulse" />
            What Happens Next
          </h2>
          <p className="leading-relaxed">{article.whatHappensNext}</p>
        </section>
      </div>

      {/* Mentioned / Related Games */}
      {relatedGames.length > 0 && (
        <section className="my-12 bg-surface p-6 rounded-2xl border border-surface-border">
          <h3 className="text-xs font-bold uppercase tracking-wider text-pulse mb-3">
            Games Mentioned in this Report
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedGames.map((g: any) => (
              <Link
                key={g.id}
                href={`/games/${g.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-elevated border border-surface-border text-slate-200 hover:text-pulse text-xs font-semibold transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>{g.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related News Stories */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-10 border-t border-surface-border">
          <h2 className="text-2xl font-bold text-white mb-6">
            Related Industry Stories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel: any) => (
              <NewsCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

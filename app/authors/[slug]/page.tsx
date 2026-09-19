import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllAuthors, getAuthorBySlug } from '@/data/authors';
import { getAuthorProfileWithStats } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { ReviewCard } from '@/components/ReviewCard';
import { GuideCard } from '@/components/GuideCard';
import { NewsCard } from '@/components/NewsCard';
import { BookOpen, Star, Newspaper, Compass } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return { title: 'Author Not Found' };

  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: {
      canonical: `/authors/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | GamersPulse`,
      description: author.bio,
    },
  };
}

export default function AuthorProfilePage({ params }: Props) {
  const result = getAuthorProfileWithStats(params.slug);

  if (!result) {
    notFound();
  }

  const { profile, archive, totalArticles } = result!;

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.bio,
    url: `https://gamerspulse.site/authors/${profile.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'GamersPulse',
      url: 'https://gamerspulse.site',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Authors', href: '/authors' },
          { label: profile.name },
        ]}
      />

      {/* Profile Header */}
      <div className="bg-surface rounded-3xl border border-surface-border p-6 md:p-10 mb-12 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <AuthorAvatar initials={profile.initials} accent={profile.accent} size="lg" />
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-pulse uppercase tracking-wider mb-3">
              {profile.role}
            </p>
            <p className="text-xs text-slate-500">
              {totalArticles} published {totalArticles === 1 ? 'article' : 'articles'} on GamersPulse
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg text-slate-300 leading-relaxed mt-6 max-w-3xl">
          {profile.bio}
        </p>

        <div className="mt-6 pt-6 border-t border-surface-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-pulse" />
            Coverage Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.coverageAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-subtle border border-surface-border text-slate-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Archive: Reviews */}
      {archive.reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 pb-3 border-b border-surface-border">
            <Star className="w-5 h-5 text-pulse" />
            Reviews by {profile.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archive.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Archive: Guides */}
      {archive.guides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 pb-3 border-b border-surface-border">
            <BookOpen className="w-5 h-5 text-pulse" />
            Guides by {profile.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {archive.guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </section>
      )}

      {/* Archive: News */}
      {archive.news.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 pb-3 border-b border-surface-border">
            <Newspaper className="w-5 h-5 text-pulse" />
            News & Analysis by {profile.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {archive.news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

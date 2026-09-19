import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { getAllAuthorsWithCounts } from '@/lib/data';
import { Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authors & Contributors — GamersPulse',
  description:
    'Meet the GamersPulse editorial team — the bylines behind our reviews, guides, and gaming news coverage.',
  alternates: {
    canonical: '/authors',
  },
  openGraph: {
    title: 'Authors & Contributors | GamersPulse',
    description:
      'Meet the GamersPulse editorial team — the bylines behind our reviews, guides, and gaming news coverage.',
  },
};

export default function AuthorsPage() {
  const authors = getAllAuthorsWithCounts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Authors' }]} />

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Editorial Team</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Authors & Contributors
        </h1>
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
          Every review, guide, and news story on GamersPulse carries a byline. Here&rsquo;s who writes what, and where their coverage focuses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {authors.map(({ profile, totalArticles }) => (
          <Link
            key={profile.slug}
            href={`/authors/${profile.slug}`}
            className="group flex flex-col p-6 rounded-2xl bg-surface border border-surface-border hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <AuthorAvatar initials={profile.initials} accent={profile.accent} size="lg" />
              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-pulse transition-colors">
                  {profile.name}
                </h2>
                <p className="text-xs text-pulse font-semibold uppercase tracking-wider">
                  {profile.role}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-4 mb-4 flex-grow">
              {profile.bio}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
              <span className="text-slate-500">
                {totalArticles} published {totalArticles === 1 ? 'article' : 'articles'}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

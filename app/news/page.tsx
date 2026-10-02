import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NewsCard } from '@/components/NewsCard';
import { Newsletter } from '@/components/Newsletter';
import { getAllNews, getNewsCategoriesWithCounts } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gaming News',
  description:
    'Reporting and analysis on game engines, console hardware, platform policies and design decisions across PC, PlayStation, Xbox and Nintendo.',
  path: '/news',
});

export default function NewsIndexPage() {
  const articles = getAllNews();
  const lead = articles[0];
  const rest = articles.slice(1);
  const categories = getNewsCategoriesWithCounts();

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'News' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Gaming news
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Reporting on the technology and design decisions behind the games — engines, handheld
          hardware, platform policies and what they mean for players.
        </p>
      </header>

      {/*
        Category filters link to real, indexable category pages. A category with
        no articles is never offered, so no filter can lead to an empty page.
      */}
      {categories.length > 0 ? (
        <nav aria-label="News categories" className="mt-6">
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <span
                aria-current="page"
                className="inline-block border border-accent bg-accent-tint px-3 py-1 text-[12px] font-medium text-accent-hover"
              >
                All news
              </span>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={`/news/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-block border border-surface-border bg-canvas px-3 py-1 text-[12px] font-medium text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
                >
                  {category.name}
                  <span className="ml-1.5 text-ink-faint">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      {lead ? (
        <section aria-labelledby="news-lead" className="mt-8">
          <h2 id="news-lead" className="sr-only">
            Lead story
          </h2>
          <NewsCard article={lead} featured priority />
        </section>
      ) : null}

      <AdSlot name="newsAfterLead" className="mt-10" />

      {rest.length > 0 ? (
        <section aria-labelledby="news-archive" className="mt-10">
          <h2
            id="news-archive"
            className="font-serif text-headline-md font-semibold text-ink md:text-headline-lg"
          >
            More news
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>

          <p className="mt-6 flex items-center gap-1 text-body-compact text-ink-muted">
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-1 text-accent-hover transition-colors hover:text-ink"
            >
              Subscribe to the RSS feed
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            to follow new coverage as it is published.
          </p>
        </section>
      ) : null}

      <Newsletter className="mt-12" />
    </div>
  );
}
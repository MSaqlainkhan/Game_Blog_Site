import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NewsCard } from '@/components/NewsCard';
import { Newsletter } from '@/components/Newsletter';
import { getAllNews, getNewsCategoriesWithCounts } from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd } from '@/lib/seo';
import type { NewsCategory } from '@/types';

interface PageProps {
  params: { category: string };
}

/** Slug <-> category name, derived from the categories that have articles. */
function slugFor(name: NewsCategory): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function nameForSlug(slug: string): NewsCategory | undefined {
  return getNewsCategoriesWithCounts().find((entry) => slugFor(entry.name) === slug)?.name;
}

/**
 * Only categories that actually have published articles are pre-rendered.
 * A category with no articles has no route at all, so it can never be linked,
 * crawled or indexed as an empty page.
 */
export function generateStaticParams() {
  return getNewsCategoriesWithCounts().map((entry) => ({ category: slugFor(entry.name) }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const name = nameForSlug(params.category);

  if (!name) {
    return buildPageMetadata({
      title: 'News category not found',
      description: 'This news category does not exist or has no published coverage.',
      path: `/news/category/${params.category}`,
      index: false,
    });
  }

  const count = getAllNews().filter((article) => article.category === name).length;

  return buildPageMetadata({
    title: `${name} news`,
    description: `GamersPulse coverage of ${name.toLowerCase()} — ${count} article${
      count === 1 ? '' : 's'
    } on ${name.toLowerCase()} in gaming, written for players.`,
    path: `/news/category/${slugFor(name)}`,
  });
}

export default function NewsCategoryPage({ params }: PageProps) {
  const name = nameForSlug(params.category);
  if (!name) notFound();

  const articles = getAllNews().filter((article) => article.category === name);
  const [lead, ...rest] = articles;

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name, path: `/news/category/${slugFor(name)}` },
  ]);

  return (
    <div className="editorial-container py-8 md:py-10">
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <Breadcrumbs
        items={[{ label: 'News', href: '/news' }, { label: name }]}
      />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          {name} news
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          {articles.length} article{articles.length === 1 ? '' : 's'} on {name.toLowerCase()} in
          gaming, from the GamersPulse editorial desk.
        </p>
      </header>

      {lead ? (
        <section className="mt-8" aria-labelledby="category-lead">
          <h2 id="category-lead" className="sr-only">
            Lead story
          </h2>
          <NewsCard article={lead} featured priority />
        </section>
      ) : null}

      <AdSlot name="newsAfterLead" className="mt-10" />

      {rest.length > 0 ? (
        <section aria-labelledby="category-archive" className="mt-10">
          <h2 id="category-archive" className="font-serif text-headline-md font-semibold text-ink">
            More {name.toLowerCase()} coverage
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <Newsletter className="mt-12" />
    </div>
  );
}
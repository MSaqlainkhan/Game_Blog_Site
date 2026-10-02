import type { Metadata } from 'next';
import Link from 'next/link';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';
import { GuideCard } from '@/components/GuideCard';
import { Newsletter } from '@/components/Newsletter';
import { getAllGuides } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gaming Guides',
  description:
    'Practical gaming guides — builds, walkthroughs, boss tactics and mechanics breakdowns, written to be followed from the first step.',
  path: '/guides',
});

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  // Categories are derived from the guides that exist, so a filter can never
  // link to an empty section.
  const categories = [...new Set(guides.map((guide) => guide.category))].sort();

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Guides' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Gaming guides
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Builds, routes and mechanics breakdowns written to be followed. Each guide names the game
          it applies to and the platform it was tested on.
        </p>
      </header>

      {categories.length > 0 ? (
        <nav aria-label="Guide categories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = guides.filter((guide) => guide.category === category).length;
              return (
                <li
                  key={category}
                  className="border border-surface-border bg-canvas px-3 py-1 text-[12px] font-medium text-ink-muted"
                >
                  {category}
                  <span className="ml-1.5 text-ink-faint">{count}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {guides.length === 0 ? (
        <EmptyState
          title="No guides published yet"
          description="GamersPulse has not published a guide yet. Check back soon."
          resetHref="/reviews"
          resetActionText="Read the reviews"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      )}

      <AdSlot name="guidesAfterLead" className="mt-10" />

      <p className="mt-8 text-body-compact text-ink-muted">
        Looking for a specific game?{' '}
        <Link
          href="/games"
          className="text-accent-hover underline decoration-accent/40 underline-offset-2 transition-colors hover:text-ink"
        >
          Browse the game catalogue
        </Link>{' '}
        to see which guides apply to it.
      </p>

      <Newsletter className="mt-12" />
    </div>
  );
}
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { formatDate } from '@/lib/site';
import type { Guide } from '@/types';

interface GuideCardProps {
  guide: Guide;
}

/**
 * Guide teaser.
 *
 * Shows "Updated" only when the guide genuinely has been revised. Otherwise it
 * shows the publication date, so a reader is never told a piece was updated
 * when it was not.
 */
export function GuideCard({ guide }: GuideCardProps) {
  const dateLabel = guide.updatedAt ? 'Updated' : 'Published';
  const dateValue = guide.updatedAt ?? guide.publishedAt;

  return (
    <article className="group flex flex-col justify-between border border-surface-border bg-canvas p-4 transition-colors hover:border-outline-variant">
      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="kicker border border-surface-border bg-white px-2 py-0.5 text-ink-muted">
            {guide.category}
          </span>
          <span className="meta-stamp text-ink-faint">{guide.readTime}</span>
        </div>

        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-hover">
          {guide.gameTitle}
        </p>

        <h3 className="font-serif text-[18px] font-medium leading-snug text-ink">
          <Link
            href={`/guides/${guide.slug}`}
            className="transition-colors hover:text-accent-hover"
          >
            {guide.title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-3 text-body-compact leading-relaxed text-ink-muted">
          {guide.summary}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-3">
        <p className="meta-stamp text-ink-faint">
          {dateLabel}:{' '}
          <time dateTime={dateValue}>{formatDate(dateValue)}</time>
        </p>
        <Link
          href={`/guides/${guide.slug}`}
          className="inline-flex items-center gap-1 text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
        >
          Read guide
          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
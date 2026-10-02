import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  /** Rendered above the headline as an uppercase kicker. */
  badge?: string;
  title: string;
  /** Must match the `id` used by an enclosing section's aria-labelledby. */
  id?: string;
  description?: string;
  viewAllHref?: string;
  viewAllText?: string;
  accentKicker?: boolean;
}

/**
 * Editorial section divider.
 *
 * A hairline rule beneath the heading separates sections without any drop
 * shadow or filled container.
 */
export function SectionHeader({
  badge,
  title,
  id,
  description,
  viewAllHref,
  viewAllText = 'View all',
  accentKicker = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-surface-border pb-3 md:flex-row md:items-baseline md:justify-between">
      <div>
        {badge ? (
          <p className={`kicker mb-0.5 ${accentKicker ? 'text-accent' : 'text-ink-faint'}`}>
            {badge}
          </p>
        ) : null}
        <h2
          id={id}
          className="font-serif text-headline-md font-semibold tracking-tight text-ink md:text-headline-lg"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-body-default leading-relaxed text-ink-muted">
            {description}
          </p>
        ) : null}
      </div>

      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1 text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
        >
          <span>{viewAllText}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </div>
  );
}
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { getAuthorFor } from '@/lib/data';
import { formatDate } from '@/lib/site';
import { RatingBadge } from './RatingBadge';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  horizontal?: boolean;
}

/**
 * Review teaser.
 *
 * The score is rendered from `review.score`, which only exists where a real
 * review was written. No score is ever inferred or defaulted.
 */
export function ReviewCard({ review, horizontal = false }: ReviewCardProps) {
  const author = getAuthorFor(review.authorId);

  const meta = (
    <p className="meta-stamp flex flex-wrap items-center gap-1.5 text-ink-muted">
      <Link
        href={`/authors/${author.slug}`}
        className="font-medium text-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
      >
        {author.name}
      </Link>
      <span aria-hidden="true">·</span>
      <time dateTime={review.publishedAt}>{formatDate(review.publishedAt)}</time>
    </p>
  );

  const image = (sizes: string) => (
    <Link
      href={`/reviews/${review.slug}`}
      tabIndex={-1}
      aria-hidden="true"
      className="relative block aspect-[16/10] overflow-hidden rounded bg-surface-low"
    >
      <Image
        src={review.coverImage}
        alt={review.imageAlt}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <span className="kicker absolute left-2.5 top-2.5 border border-surface-border bg-white/90 px-2 py-0.5 text-ink-muted">
        {review.genre}
      </span>
    </Link>
  );

  if (horizontal) {
    return (
      <article className="group grid grid-cols-1 gap-gutter-desktop border border-surface-border bg-white p-4 transition-colors hover:border-outline-variant md:grid-cols-5">
        <div className="md:col-span-2">{image('(max-width: 768px) 100vw, 40vw')}</div>

        <div className="flex flex-col justify-center md:col-span-3">
          <div className="mb-2 flex items-center gap-3">
            <RatingBadge score={review.score} size="md" />
            <span className="meta-stamp text-ink-muted">{review.platforms.join(', ')}</span>
          </div>

          <h3 className="font-serif text-headline-md font-medium leading-snug text-ink">
            <Link
              href={`/reviews/${review.slug}`}
              className="transition-colors hover:text-accent-hover"
            >
              {review.gameTitle} Review
            </Link>
          </h3>

          <p className="mt-2 line-clamp-3 text-body-default leading-relaxed text-ink-muted">
            {review.summary}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-4">
            {meta}
            <Link
              href={`/reviews/${review.slug}`}
              className="inline-flex items-center gap-1 text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
            >
              Read review
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between border border-surface-border bg-white p-4 transition-colors hover:border-outline-variant">
      <div>
        <Link
          href={`/reviews/${review.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mb-4 block aspect-[16/10] overflow-hidden rounded bg-surface-low"
        >
          <Image
            src={review.coverImage}
            alt={review.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="absolute right-2.5 top-2.5">
            <RatingBadge score={review.score} size="md" />
          </span>
        </Link>

        {meta}

        <h3 className="mt-1 font-serif text-headline-sm font-medium leading-snug text-ink">
          <Link
            href={`/reviews/${review.slug}`}
            className="transition-colors hover:text-accent-hover"
          >
            {review.gameTitle} Review
          </Link>
        </h3>

        <p className="mt-1 line-clamp-3 text-body-compact leading-relaxed text-ink-muted">
          {review.summary}
        </p>
      </div>

      <Link
        href={`/reviews/${review.slug}`}
        className="mt-4 inline-flex items-center gap-1 border-t border-surface-border pt-3 text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
      >
        Read the review
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
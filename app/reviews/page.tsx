import type { Metadata } from 'next';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';
import { ReviewCard } from '@/components/ReviewCard';
import { getAllReviews } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Game Reviews',
  description:
    'Honest, fully written game reviews with a stated scoring method — what worked, what did not, and who should spend their time on it.',
  path: '/reviews',
});

export default function ReviewsIndexPage() {
  const reviews = getAllReviews();

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Reviews' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Game reviews
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Every review here is written after playing the game, and every score comes with a stated
          breakdown. We list the downsides as prominently as the upsides.
        </p>
      </header>

      {reviews.length === 0 ? (
        <EmptyState
          title="No reviews published yet"
          description="GamersPulse has not published a review yet. Check back soon."
          resetHref="/news"
          resetActionText="Read the news"
        />
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} horizontal />
          ))}
        </div>
      )}

      <AdSlot name="reviewsAfterLead" className="mt-10" />
    </div>
  );
}
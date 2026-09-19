import { Metadata } from 'next';
import ReviewsPageClient from './ReviewsPageClient';

export const metadata: Metadata = {
  title: 'Game Reviews — Scored & Explained',
  description:
    'Independent game reviews covering gameplay, performance, presentation, and value, scored against a consistent published methodology.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Game Reviews | GamersPulse',
    description:
      'Independent game reviews covering gameplay, performance, presentation, and value, scored against a consistent published methodology.',
  },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}

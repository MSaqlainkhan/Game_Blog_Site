import { Metadata } from 'next';
import GamesPageClient from './GamesPageClient';

export const metadata: Metadata = {
  title: 'Explore Games — Browse by Genre & Platform',
  description:
    'Browse the full GamersPulse games catalog. Filter by genre and platform, and sort by rating, release date, or title.',
  alternates: {
    canonical: '/games',
  },
  openGraph: {
    title: 'Explore Games | GamersPulse',
    description:
      'Browse the full GamersPulse games catalog. Filter by genre and platform, and sort by rating, release date, or title.',
  },
};

export default function GamesPage() {
  return <GamesPageClient />;
}

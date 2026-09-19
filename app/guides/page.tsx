import { Metadata } from 'next';
import GuidesPageClient from './GuidesPageClient';

export const metadata: Metadata = {
  title: 'Gaming Guides — Walkthroughs, Builds & Strategies',
  description:
    'Practical gaming guides covering walkthroughs, build optimization, boss strategies, and beginner tips built around specific mechanics.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Gaming Guides | GamersPulse',
    description:
      'Practical gaming guides covering walkthroughs, build optimization, boss strategies, and beginner tips built around specific mechanics.',
  },
};

export default function GuidesPage() {
  return <GuidesPageClient />;
}

import { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';

export const metadata: Metadata = {
  title: 'Gaming News & Industry Analysis',
  description:
    'Gaming news and industry analysis covering hardware engineering, graphics architecture, platform policy, and ecosystem trends.',
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: 'Gaming News & Industry Analysis | GamersPulse',
    description:
      'Gaming news and industry analysis covering hardware engineering, graphics architecture, platform policy, and ecosystem trends.',
  },
};

export default function NewsPage() {
  return <NewsPageClient />;
}

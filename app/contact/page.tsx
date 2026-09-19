import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact GamersPulse',
  description:
    'Get in touch with the GamersPulse editorial team — report a factual correction, ask a question, or send feedback.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact GamersPulse',
    description:
      'Get in touch with the GamersPulse editorial team — report a factual correction, ask a question, or send feedback.',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://gamerspulse.site'),
  title: {
    default: 'GamersPulse — Gaming News, Reviews & Guides',
    template: '%s | GamersPulse'
  },
  description:
    'GamersPulse brings you gaming news, reviews, guides, game discovery and useful information for players.',
  keywords: [
    'gaming news',
    'game reviews',
    'gaming guides',
    'game discovery',
    'PC gaming',
    'PlayStation',
    'Xbox',
    'Nintendo Switch',
    'indie games'
  ],
  authors: [{ name: 'GamersPulse Editorial Team' }],
  creator: 'GamersPulse',
  publisher: 'GamersPulse',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'GamersPulse — Gaming News, Reviews & Guides',
    description:
      'GamersPulse brings you gaming news, reviews, guides, game discovery and useful information for players.',
    url: 'https://gamerspulse.site',
    siteName: 'GamersPulse',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'GamersPulse Media'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GamersPulse — Gaming News, Reviews & Guides',
    description:
      'GamersPulse brings you gaming news, reviews, guides, game discovery and useful information for players.',
    images: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GamersPulse',
    url: 'https://gamerspulse.site',
    description: 'Gaming news, reviews, guides and game discovery publication.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://gamerspulse.site/games?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'GamersPulse',
    url: 'https://gamerspulse.site',
    logo: 'https://gamerspulse.site/icon.png',
    publishingPrinciples: 'https://gamerspulse.site/editorial-policy',
    correctionsPolicy: 'https://gamerspulse.site/editorial-policy#corrections'
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <meta name="google-site-verification" content="gLXEl4H2xwZy8NF1cb7Ju9Qw1oVMtAmmWZGj_IJT6bA" />
      </head>
      <body className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-pulse selection:text-background">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

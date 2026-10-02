import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';
import { fontVariables } from '@/app/fonts';
import { Header } from '@/components/Header';
import { Dateline } from '@/components/Dateline';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { AdSenseScript } from '@/components/AdSenseScript';
import { jsonLd } from '@/lib/seo';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
  adsenseScriptSrc,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  /*
   * No `canonical` here on purpose. A canonical declared in the root layout is
   * inherited by every page that does not override it, which pointed all of
   * them at the homepage. Each route now declares its own canonical via
   * `buildPageMetadata` from lib/seo.ts.
   */
  alternates: {
    types: {
      'application/rss+xml': absoluteUrl('/feed.xml'),
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

/**
 * Site-level structured data.
 *
 * `WebSite` + `SearchAction` points at the real /search route, which reads the
 * `q` parameter and returns genuine results.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'NewsMediaOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      // Served by app/icon.svg. Previously pointed at a non-existent
      // /icon.png, which made the logo reference invalid.
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.svg'),
        width: 64,
        height: 64,
      },
      publishingPrinciples: absoluteUrl('/editorial-policy'),
      correctionsPolicy: absoluteUrl('/corrections'),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseSrc = adsenseScriptSrc();

  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/*
          Google Search Console verification. Replace with the exact token
          issued in the Search Console property settings if it changes.
        */}
        <meta
          name="google-site-verification"
          content="gLXEl4H2xwZy8NF1cb7Ju9Qw1oVMtAmmWZGj_IJT6bA"
        />
        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
        {/*
          Google AdSense. The root layout is the only `<head>` in the app
          router, so this places the snippet between <head> and </head> on
          every page, as the AdSense account requires. Rendered only when a real
          publisher ID is configured.
        */}
        {adsenseSrc ? <AdSenseScript src={adsenseSrc} /> : null}
      </head>
      <body className="bg-white text-ink min-h-screen flex flex-col antialiased selection:bg-accent-tint selection:text-accent-hover">
        <a
          href="#main-content"
          className="sr-only-focusable absolute left-4 top-4 z-[100] bg-white border border-surface-border rounded px-4 py-2 text-sm font-semibold text-ink"
        >
          Skip to content
        </a>
        <Dateline />
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent adsEnabled={Boolean(adsenseSrc)} privacyHref="/privacy-policy" />
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  canonical,
} from '@/lib/site';

/**
 * Metadata and structured-data helpers.
 *
 * Every indexable page builds its metadata here so that canonical URLs, Open
 * Graph tags and Twitter cards are generated consistently and can never drift
 * between routes.
 */

export interface PageMetaInput {
  title: string;
  description: string;
  /** Route path, e.g. '/news/article-slug'. Used for canonical + OG URL. */
  path: string;
  /** Absolute or root-relative image URL for social cards. */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** Set false for pages that must not be indexed (e.g. search results). */
  index?: boolean;
  /** Set for filter permutations that must not compete with the clean URL. */
  follow?: boolean;
}

const DEFAULT_OG_IMAGE = {
  url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  width: 1200,
  height: 630,
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE.url,
  imageAlt = `${SITE_NAME} — ${SITE_TAGLINE}`,
  type = 'website',
  publishedTime,
  modifiedTime,
  index = true,
  follow = true,
}: PageMetaInput): Metadata {
  const url = canonical(path);
  const titleWithBrand = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index
      ? {
          index: true,
          follow,
          googleBot: {
            index: true,
            follow,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      title: titleWithBrand,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [{ url: image, width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height, alt: imageAlt }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithBrand,
      description,
      images: [image],
    },
  };
}

/** Serialises a JSON-LD graph into a script tag payload. */
export function jsonLd(data: Record<string, unknown>): string {
  // Strip characters that could terminate the script element early.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Absolute URL for structured data, which must never use a relative path. */
export function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * BreadcrumbList matching the visible breadcrumb trail exactly.
 *
 * Only emitted when at least two levels exist, which is the minimum for the
 * markup to be meaningful.
 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> | null {
  if (items.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

interface PersonSchemaInput {
  name: string;
  jobTitle?: string;
  url: string;
}

/**
 * Person schema for a real author.
 *
 * Only ever generated for an author that exists in data/authors.ts.
 */
export function personJsonLd({ name, jobTitle, url }: PersonSchemaInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(jobTitle ? { jobTitle } : {}),
    url,
    worksFor: { '@type': 'NewsMediaOrganization', name: SITE_NAME, url: SITE_URL },
  };
}

export const SITE_DESCRIPTION_TEXT = SITE_DESCRIPTION;
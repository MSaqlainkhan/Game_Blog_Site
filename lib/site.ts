/**
 * Central site configuration.
 *
 * Everything that identifies the publication — domain, name, navigation,
 * contact details and advertising configuration — lives here so that no page
 * hardcodes a domain string, an email address or a publisher ID.
 *
 * Environment variables are read at build time. See `.env.example`.
 */

/**
 * Production domain. Canonical URLs, Open Graph URLs, structured data,
 * robots.txt and the sitemap all derive from this single value.
 */
export const SITE_URL = 'https://www.gamerspulse.site';

export const SITE_NAME = 'GamersPulse';

export const SITE_TAGLINE = 'Gaming News, Reviews & Guides';

/** Used in `WebSite` structured data and as the default meta description. */
export const SITE_DESCRIPTION =
  'GamersPulse is an independent gaming publication covering news, honest reviews, practical guides and game discovery across PC, PlayStation, Xbox and Nintendo.';

/** Short human label used in the masthead dateline. */
export const SITE_DATELINE = 'Independent gaming coverage';

/**
 * Contact address for editorial, corrections and general enquiries.
 *
 * Left undefined until the publisher supplies a real address. Pages that need
 * it render an explicit "not yet configured" notice rather than inventing one.
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined;

export function hasContactEmail(): boolean {
  return Boolean(CONTACT_EMAIL);
}

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/guides', label: 'Guides' },
  { href: '/games', label: 'Games' },
] as const;

/**
 * Advertising configuration.
 *
 * The publisher ID is supplied by Google AdSense and must never be invented.
 * It is read from the environment so it can be rotated without a code change.
 *
 * `adsenseConfigured` is false when the variable is missing or still holds the
 * documented placeholder — in that case no AdSense script is emitted at all.
 */
const ADSENSE_PLACEHOLDER = 'REPLACE_WITH_REAL_ADSENSE_PUBLISHER_ID';

const rawPublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim();

export const ADSENSE_PUBLISHER_ID =
  rawPublisherId && rawPublisherId !== ADSENSE_PLACEHOLDER ? rawPublisherId : undefined;

export function adsenseConfigured(): boolean {
  return Boolean(ADSENSE_PUBLISHER_ID);
}

/**
 * Google AdSense script URL, or undefined when unconfigured.
 * `ca-pub-<digits>` is the only shape AdSense accepts.
 */
export function adsenseScriptSrc(): string | undefined {
  if (!ADSENSE_PUBLISHER_ID || !/^ca-pub-\d+$/.test(ADSENSE_PUBLISHER_ID)) {
    return undefined;
  }
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
}

/** Absolute URL helper. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Canonical URL for a route. Trailing slashes are stripped except at the root
 * so that a single canonical form exists for every page.
 */
export function canonical(path: string): string {
  const clean = path === '/' ? '/' : path.replace(/\/+$/, '');
  return absoluteUrl(clean);
}

/** ISO 8601 date used by Open Graph `published_time` and structured data. */
export function toIsoDate(date: string): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

/** Long-form date for display, e.g. "September 30, 2026". */
export function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
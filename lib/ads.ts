/**
 * Advertising infrastructure.
 *
 * Design constraints (approved design system):
 *  - Ads are visibly delineated: hairline border, off-canvas fill, a clear
 *    uppercase `ADVERTISEMENT` label. Zero dark patterns.
 *  - Never placed over navigation, inside buttons, next to misleading
 *    controls, or styled to resemble article links.
 *  - Placement must never obstruct reading or push content.
 *
 * No publisher ID or ad unit ID is invented. Until real values are supplied
 * via environment variables (see .env.example), every slot renders a labelled
 * placeholder and no AdSense code is emitted at all.
 */

/**
 * Named ad unit slots. Each maps to an environment variable holding the real
 * AdSense ad unit ID (`ca-pub-.../...`), e.g.
 *
 *   NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP=1234567890
 *
 * Naming a slot documents where ads appear without inventing an identifier.
 */
export const AD_SLOTS = {
  homeAfterLead: 'NEXT_PUBLIC_ADSENSE_SLOT_HOME_AFTER_LEAD',
  homeMidFeed: 'NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID_FEED',
  newsAfterLead: 'NEXT_PUBLIC_ADSENSE_SLOT_NEWS_AFTER_LEAD',
  newsSidebar: 'NEXT_PUBLIC_ADSENSE_SLOT_NEWS_SIDEBAR',
  reviewsAfterLead: 'NEXT_PUBLIC_ADSENSE_SLOT_REVIEWS_AFTER_LEAD',
  guidesAfterLead: 'NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_AFTER_LEAD',
  gamesAfterLead: 'NEXT_PUBLIC_ADSENSE_SLOT_GAMES_AFTER_LEAD',
  articleAfterIntro: 'NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_AFTER_INTRO',
  articleMid: 'NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID',
  articleFooter: 'NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_FOOTER',
  /** Single mid-page unit shared by the static legal and information pages. */
  staticPageMid: 'NEXT_PUBLIC_ADSENSE_SLOT_STATIC_PAGE_MID',
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/** Responsive format for the unit. */
export type AdSlotFormat = 'horizontal' | 'rectangle' | 'vertical';

/** Tailwind sizing per format. Reserved height prevents layout shift. */
const FORMAT_CLASSES: Record<AdSlotFormat, string> = {
  horizontal: 'min-h-[110px]',
  rectangle: 'min-h-[280px]',
  vertical: 'min-h-[600px]',
};

/**
 * Reads the configured ad unit ID for a named slot.
 *
 * Returns undefined when the variable is unset or still holds the documented
 * placeholder, so a placeholder can never be sent to Google as a real unit.
 */
export function getAdUnitId(name: AdSlotName): string | undefined {
  const envKey = AD_SLOTS[name];
  const raw = process.env[envKey]?.trim();
  if (!raw || raw === 'REPLACE_WITH_REAL_ADSENSE_AD_UNIT_ID') return undefined;
  // AdSense ad unit IDs are numeric and are always qualified by the publisher.
  return /^\d+$/.test(raw) ? raw : undefined;
}
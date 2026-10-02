import { ADSENSE_PUBLISHER_ID, SITE_URL, adsenseConfigured } from '@/lib/site';

/**
 * Shared constants for the legal and policy pages.
 *
 * The effective date is the date these policies were written. It is a fixed
 * value on purpose: deriving it from `new Date()` would silently push the date
 * forward on every rebuild, which would claim the policy had been reviewed
 * more recently than it actually had.
 *
 * Update it by hand when a policy genuinely changes.
 */
export const POLICY_EFFECTIVE_DATE = 'October 2, 2026';

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/**
 * Whether advertising is actually live.
 *
 * The privacy policy must describe the deployment that is running, not an
 * intended future one, so this is read from the real configuration rather than
 * hard-coded either way.
 */
export type AdsenseState = 'live' | 'not-enabled';

export const ADSENSE_STATE: AdsenseState = adsenseConfigured() ? 'live' : 'not-enabled';

/** Whether a contact address exists, used by the policy pages. */
export { ADSENSE_PUBLISHER_ID };
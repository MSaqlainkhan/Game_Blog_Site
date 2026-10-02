import { ADSENSE_PUBLISHER_ID, adsenseConfigured } from '@/lib/site';

/**
 * Google AdSense loader, rendered inside `<head>` by the root layout.
 *
 * Byte-for-byte the snippet Google issues for this account: the `async`
 * `adsbygoogle.js` loader for this publisher with `crossorigin="anonymous"`,
 * and nothing else. It is emitted server-side so the tag is present in the
 * initial HTML of every page, which is what the AdSense site review reads; a
 * client-injected loader is absent from the served markup and only shows up as
 * a `<link rel="preload">` hint.
 *
 * The layout renders this only when a real publisher ID is configured. Without
 * one, nothing is requested from Google and no advertising cookies are set.
 *
 * Ad units are requested by `AdUnit` itself, which pushes `{}` from an effect
 * once its `<ins>` node exists. The loader drains that queue on load, so no
 * inline init script is needed and none is emitted.
 */
export function AdSenseScript({ src }: { src: string }) {
  if (!adsenseConfigured() || !ADSENSE_PUBLISHER_ID) return null;

  return <script async src={src} crossOrigin="anonymous" />;
}

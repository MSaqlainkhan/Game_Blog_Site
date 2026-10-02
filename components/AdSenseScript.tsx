import Script from 'next/script';

import { ADSENSE_PUBLISHER_ID, adsenseConfigured } from '@/lib/site';

/**
 * Loads Google AdSense and initialises any ad units rendered on the page.
 *
 * Rendered only when a real publisher ID is configured. Without one, nothing
 * is requested from Google and no advertising cookies are set.
 *
 * `data-ad-slot` is read from each `<ins>` element rather than hard-coded here,
 * so adding a slot never requires editing this component.
 */
export function AdSenseScript({ src }: { src: string }) {
  if (!adsenseConfigured() || !ADSENSE_PUBLISHER_ID) return null;

  // Declared before the loader script runs so `push()` is always defined.
  const bootstrap = `
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({
      event: 'init',
      google_ad_client: '${ADSENSE_PUBLISHER_ID}',
      enable_page_level_ads: false
    });
    (function () {
      var units = document.querySelectorAll('ins[data-ad-slot]:not([data-ad-rendered])');
      for (var i = 0; i < units.length; i++) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          units[i].setAttribute('data-ad-rendered', 'true');
        } catch (e) {}
      }
    })();
  `;

  return (
    <>
      <Script id="adsense-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        id="adsense-loader"
        src={src}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
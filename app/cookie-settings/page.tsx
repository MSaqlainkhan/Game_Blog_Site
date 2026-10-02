import type { Metadata } from 'next';
import Link from 'next/link';

import { CookieSettingsPanel } from '@/components/CookieSettingsPanel';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cookie Settings',
  description:
    'Review and change which cookies GamersPulse may use on this device, including withdrawing an earlier consent choice.',
  path: '/cookie-settings',
});

/**
 * Cookie preferences.
 *
 * Lets a reader change or withdraw their choice at any time, which is what the
 * consent bar in the footer links to. The bar itself is deliberately a
 * restrained strip that never blocks reading; this page holds the detail.
 */
export default function CookieSettingsPage() {
  return (
    <div className="editorial-container py-8 md:py-10">
      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Cookie settings
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Choose which cookies GamersPulse may use. Your choice is stored in your own browser and
          applies to this device only.
        </p>
      </header>

      <div className="mt-8 max-w-2xl">
        <CookieSettingsPanel />
      </div>

      <section
        aria-labelledby="what-we-use"
        className="mt-12 max-w-2xl border-t border-surface-border pt-8"
      >
        <h2 id="what-we-use" className="font-serif text-headline-md font-semibold text-ink">
          What each choice allows
        </h2>

        <div className="prose-editorial mt-4 !max-w-none">
          <h3>Essential</h3>
          <p>
            This site stores your cookie preference locally in your browser so the notice stops
            reappearing. That is the only thing stored today. Essential storage does not require
            consent under UK and EU rules, because the site cannot work without it.
          </p>

          <h3>Analytics and advertising</h3>
          <p>
            GamersPulse runs no analytics tracker. If Google AdSense is enabled in a deployment,
            choosing “accept all” allows Google and its partners to use cookies to measure
            advertising performance and to limit how often an advert is shown to you. Choosing
            “essential only” prevents those cookies from being set, and advertising slots continue
            to show a labelled placeholder with no request made to Google.
          </p>

          <p>
            Full detail is in the{' '}
            <Link
              href="/privacy-policy"
              className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
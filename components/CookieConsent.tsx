'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'gp-cookie-consent';

type ConsentChoice = 'accepted' | 'essential-only';

interface CookieConsentProps {
  /** True when advertising is actually configured on this deployment. */
  adsEnabled: boolean;
  privacyHref: string;
}

/**
 * Cookie / consent notice.
 *
 * Deliberately restrained: a single hairline-bordered bar at the foot of the
 * page. It never covers the article, never blocks reading and never traps
 * focus. Essential storage is always permitted; analytics and advertising
 * storage are only set after the reader chooses.
 *
 * The choice is stored locally so the notice is not shown on every page view.
 */
export function CookieConsent({ adsEnabled, privacyHref }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode). The notice stays hidden rather than
      // reappearing on every navigation.
    }
  }, []);

  function choose(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Preference cannot be persisted; it still applies to this page view.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-border bg-white"
    >
      <div className="editorial-container py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-body-compact text-ink-muted">
            GamersPulse uses essential cookies to run the site.{' '}
            {adsEnabled
              ? 'With your permission, Google and its partners may use cookies to measure advertising performance.'
              : 'We do not currently run advertising or analytics cookies.'}{' '}
            See the{' '}
            <Link href={privacyHref} className="text-ink underline decoration-accent/40 underline-offset-2 hover:text-accent-hover hover:decoration-accent-hover">
              privacy policy
            </Link>{' '}
            for details.
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => choose('essential-only')}
              className="rounded border border-surface-border bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-canvas hover:border-[#d1d5db]"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="rounded bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
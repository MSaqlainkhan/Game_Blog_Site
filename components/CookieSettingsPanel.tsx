'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'gp-cookie-consent';

type ConsentChoice = 'accepted' | 'essential-only';

interface ConsentRecord {
  choice: ConsentChoice;
  recordedAt: string;
}

/**
 * Interactive cookie preference controls.
 *
 * Lives in its own client component so `/cookie-settings` itself stays a server
 * component. That matters: a page-level `'use client'` file cannot export
 * `metadata`, which is why this page previously inherited the site-wide
 * canonical URL and shipped its whole body to the browser.
 */
export function CookieSettingsPanel() {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === 'accepted' || raw === 'essential-only') {
        setRecord({ choice: raw, recordedAt: '' });
      } else {
        setRecord(null);
      }
    } catch {
      setRecord(null);
    }
    setLoaded(true);
  }, []);

  function save(choice: ConsentChoice) {
    const next: ConsentRecord = { choice, recordedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage blocked; the choice applies to this visit only.
    }
    setRecord(next);
  }

  return (
    <section aria-labelledby="current-choice">
      <h2 id="current-choice" className="font-serif text-headline-md font-semibold text-ink">
        Your current choice
      </h2>

      <p aria-live="polite" className="mt-3 text-body-default text-ink-muted">
        {!loaded
          ? 'Loading your saved choice…'
          : record
            ? `You chose “${record.choice === 'accepted' ? 'Accept all' : 'Essential only'}”.`
            : 'You have not made a choice yet, so only essential storage is in use.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => save('accepted')}
          aria-pressed={record?.choice === 'accepted'}
          className={`h-10 px-4 text-body-compact font-semibold transition-colors ${
            record?.choice === 'accepted'
              ? 'border border-accent bg-accent-tint text-accent-hover'
              : 'bg-ink text-white hover:bg-accent'
          }`}
        >
          Accept all cookies
        </button>

        <button
          type="button"
          onClick={() => save('essential-only')}
          aria-pressed={record?.choice === 'essential-only'}
          className={`h-10 px-4 text-body-compact font-semibold transition-colors ${
            record?.choice === 'essential-only'
              ? 'border border-accent bg-accent-tint text-accent-hover'
              : 'border border-surface-border bg-white text-ink hover:border-ink-faint'
          }`}
        >
          Essential cookies only
        </button>
      </div>
    </section>
  );
}
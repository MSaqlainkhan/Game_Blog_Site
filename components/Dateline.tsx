import { SITE_DATELINE, SITE_NAME, formatDate } from '@/lib/site';

/**
 * Editorial dateline.
 *
 * A small, factual information line above the masthead. It states only what is
 * true: what the publication covers, its name, and the date the page was
 * rendered.
 *
 * Earlier versions of this bar displayed invented publication metadata
 * ("Volume III", "Independent Dispatch", "Archival Cycle") and a hardcoded
 * "Updated: Autumn 2024". None of that referred to anything real, so it has
 * been removed rather than restyled.
 */
export function Dateline() {
  const today = formatDate(new Date().toISOString());

  return (
    <div className="w-full border-b border-surface-border bg-white">
      <div className="editorial-container flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1 meta-stamp">
        <p className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span className="font-semibold uppercase tracking-label text-primary">
            {SITE_DATELINE}
          </span>
          <span className="text-outline-variant" aria-hidden="true">
            /
          </span>
          <span className="hidden md:inline">{SITE_NAME}</span>
        </p>
        <p className="hidden items-center gap-3 sm:flex">
          <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
          <span className="text-outline-variant" aria-hidden="true">
            &middot;
          </span>
          <span className="font-medium text-ink-muted">www.gamerspulse.site</span>
        </p>
      </div>
    </div>
  );
}
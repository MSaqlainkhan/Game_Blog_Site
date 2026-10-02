import Link from 'next/link';
import { Search } from 'lucide-react';

/**
 * Global 404.
 *
 * This is the only not-found page. An earlier `app/404/page.tsx` duplicated
 * this, so a 404 response could render either of two different designs
 * depending on how Next resolved the request. The duplicate was removed.
 */
export default function NotFound() {
  return (
    <div className="editorial-container py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="kicker text-accent">Error 404</p>

        <h1 className="mt-2 font-serif text-display-hero font-semibold tracking-tight text-ink">
          Page not found
        </h1>

        <p className="mt-4 text-body-default leading-relaxed text-ink-muted">
          The page you are looking for does not exist, or it may have moved. Nothing has been
          removed from the archive without a permanent redirect.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-10 w-full items-center justify-center bg-ink px-5 text-body-compact font-semibold text-white transition-colors hover:bg-accent sm:w-auto"
          >
            Back to GamersPulse
          </Link>

          <Link
            href="/search"
            className="inline-flex h-10 w-full items-center justify-center gap-2 border border-surface-border bg-white px-5 text-body-compact font-semibold text-ink transition-colors hover:border-ink-faint sm:w-auto"
          >
            <Search aria-hidden="true" className="h-4 w-4" />
            Search GamersPulse
          </Link>
        </div>

        <nav aria-label="Popular sections" className="mt-10 border-t border-surface-border pt-6">
          <p className="kicker text-ink-faint">Or start with a section</p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              { href: '/news', label: 'News' },
              { href: '/reviews', label: 'Reviews' },
              { href: '/guides', label: 'Guides' },
              { href: '/games', label: 'Games' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body-compact text-ink-muted transition-colors hover:text-accent-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
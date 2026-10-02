import Link from 'next/link';

import { CONTACT_EMAIL, SITE_NAME, SITE_TAGLINE } from '@/lib/site';

const EXPLORE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/news', label: 'News' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/guides', label: 'Guides' },
  { href: '/games', label: 'Games' },
];

const ABOUT_LINKS = [
  { href: '/about', label: 'About GamersPulse' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/corrections', label: 'Corrections' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms' },
  { href: '/cookie-settings', label: 'Cookie Settings' },
];

/**
 * Site footer.
 *
 * Grouped per the approved structure: Explore, About, Legal. Copyright year is
 * derived from the current date rather than hardcoded, so it cannot go stale
 * against the dateline.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 w-full border-t border-surface-border bg-white">
      <div className="editorial-container py-10">
        <div className="grid grid-cols-1 gap-8 border-b border-surface-border pb-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-serif text-xl font-semibold text-ink">
              {SITE_NAME}
            </Link>
            <p className="kicker mt-0.5 text-ink-faint">{SITE_TAGLINE}</p>
            <p className="mt-2 text-body-compact leading-relaxed text-ink-muted">
              An independent gaming publication covering PC, PlayStation, Xbox and Nintendo — news,
              reviews written by people who played the game, and guides you can actually follow.
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="kicker mb-2 text-ink-faint">
              Explore
            </h2>
            <ul className="flex flex-col gap-1.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-about">
            <h2 id="footer-about" className="kicker mb-2 text-ink-faint">
              About
            </h2>
            <ul className="flex flex-col gap-1.5">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="kicker mb-2 text-ink-faint">
              Legal
            </h2>
            <ul className="flex flex-col gap-1.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
              {CONTACT_EMAIL ? (
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-body-compact text-ink-muted underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-body-compact text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Independent gaming publication</span>
            <span aria-hidden="true">·</span>
            <Link
              href="/editorial-policy"
              className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              How we work
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-body-compact text-ink-muted transition-colors hover:text-accent-hover"
    >
      {children}
    </Link>
  );
}
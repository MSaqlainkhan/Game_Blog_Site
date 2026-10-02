'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowRight, ChevronRight } from 'lucide-react';

import { SearchModal } from './SearchModal';
import { NAV_LINKS } from '@/lib/site';

const navLinks = [
  ...NAV_LINKS.map((link) => ({ label: link.label, href: link.href })),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // The drawer must not stay open across a navigation.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
          isScrolled ? 'border-surface-border shadow-overlay' : 'border-transparent'
        }`}
      >
        <div className="editorial-container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2"
            aria-label="GamersPulse — home"
          >
            <span className="font-serif text-2xl font-semibold leading-none tracking-tight text-ink">
              Gamers<span className="text-accent">Pulse</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 py-2 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors ${
                    active ? 'text-accent' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search GamersPulse"
              aria-haspopup="dialog"
              className="flex h-9 items-center gap-2 border border-surface-border px-3 text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
            >
              <Search aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
              <span className="hidden text-[13px] sm:inline">Search</span>
              <kbd className="hidden border border-surface-border bg-canvas px-1.5 py-0.5 font-sans text-[10px] text-ink-faint sm:inline-block">
                Ctrl K
              </kbd>
            </button>

            <Link
              href="/games"
              className="hidden h-9 items-center gap-1.5 bg-ink px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-accent sm:inline-flex"
            >
              <span>Explore Games</span>
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="border border-surface-border p-2 text-ink transition-colors hover:border-ink-faint lg:hidden"
            >
              {mobileMenuOpen ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Menu aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-surface-border bg-white lg:hidden"
          >
            <div className="editorial-container py-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between border-b border-surface-border/70 py-2.5 text-[13px] font-medium uppercase tracking-[0.08em] transition-colors ${
                          active ? 'text-accent' : 'text-ink-muted'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-ink-faint" />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/games"
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-ink text-[13px] font-semibold text-white transition-colors hover:bg-accent"
              >
                <span>Explore All Games</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </nav>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}
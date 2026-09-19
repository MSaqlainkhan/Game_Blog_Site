'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Activity, Gamepad2, ChevronRight } from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Games', href: '/games' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Guides', href: '/guides' },
    { label: 'News', href: '/news' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-surface-border shadow-lg py-3'
            : 'bg-background/60 backdrop-blur-sm border-b border-surface-border/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight group"
          >
            <div className="w-9 h-9 rounded-xl bg-pulse/10 border border-pulse/30 flex items-center justify-center text-pulse group-hover:scale-105 group-hover:border-pulse transition-all shadow-pulse-glow">
              <Activity className="w-5 h-5 text-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none flex items-center">
                Gamers<span className="text-pulse">Pulse</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Media
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-pulse bg-pulse/10 border border-pulse/20'
                      : 'text-slate-300 hover:text-white hover:bg-surface-subtle'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search GamersPulse"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-subtle hover:bg-surface border border-surface-border hover:border-pulse/40 text-slate-300 hover:text-white text-xs transition-colors"
            >
              <Search className="w-4 h-4 text-pulse" />
              <span className="hidden sm:inline text-slate-400">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-surface border border-surface-border rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Explore Games CTA */}
            <Link
              href="/games"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pulse text-background font-bold text-xs hover:bg-pulse-hover transition-colors shadow-pulse-glow"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Explore Games</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-xl bg-surface-subtle border border-surface-border text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 border-t border-surface-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'text-pulse bg-pulse/10 border border-pulse/20'
                        : 'text-slate-300 hover:text-white hover:bg-surface-subtle'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
              <Link
                href="/games"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-pulse text-background font-bold text-sm shadow-pulse-glow"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Explore All Games</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

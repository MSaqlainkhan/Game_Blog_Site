'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Gamepad2, FileText, Star, BookOpen } from 'lucide-react';

import { searchAll, type SearchResultItem } from '@/lib/data';
import { RatingBadge } from './RatingBadge';

const TYPE_META: Record<
  SearchResultItem['type'],
  { label: string; Icon: typeof Gamepad2 }
> = {
  game: { label: 'Game', Icon: Gamepad2 },
  review: { label: 'Review', Icon: Star },
  news: { label: 'News', Icon: FileText },
  guide: { label: 'Guide', Icon: BookOpen },
};

const SUGGESTED_TERMS = ['Elden Ring', 'Cyberpunk', "Baldur's Gate", 'Helldivers', 'Balatro'];

/** Delay before a keystroke triggers a search, in milliseconds. */
const SEARCH_DEBOUNCE_MS = 180;

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /* ---- Focus management, Escape, scroll lock, focus trap ---- */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    // Defer so the input exists and the browser has painted the panel.
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      // Trap focus inside the dialog. Without this, keyboard users can tab
      // straight out of an `aria-modal` region into the page behind it.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    setQuery('');
    setResults([]);
  }, [isOpen]);

  /* ---- Debounced search so each keystroke does not rescan all content ---- */
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    const timer = window.setTimeout(() => setResults(searchAll(trimmed)), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const trimmedQuery = query.trim();

  return (
    /* The backdrop is a sibling button, not the dialog itself, so dismissing
       by clicking outside is a real button for assistive technology too. */
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 md:pt-24">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden border border-surface-border bg-white shadow-overlay"
      >
        <h2 id={titleId} className="sr-only">
          Search GamersPulse
        </h2>

        <div className="flex items-center border-b border-surface-border bg-canvas px-4 py-3">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search games, news, reviews and guides"
            aria-label="Search games, news, reviews and guides"
            aria-describedby={`${titleId}-hint`}
            className="w-full bg-transparent px-3 py-2 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 text-ink-faint transition-colors hover:text-ink"
              aria-label="Clear search input"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="border border-surface-border px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-label text-ink-muted transition-colors hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div className="flex-grow space-y-2 overflow-y-auto p-4">
          {trimmedQuery.length === 0 ? (
            <div className="py-12 text-center text-ink-muted">
              <p className="text-[15px] font-medium">
                Type a search term to find games, reviews, guides and news
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="text-ink-faint">Popular searches:</span>
                {SUGGESTED_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="border border-surface-border bg-canvas px-2.5 py-1 text-ink-muted transition-colors hover:border-accent hover:text-accent-hover"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-ink-muted">
              <p className="font-serif text-xl font-semibold text-ink">
                No results found for &ldquo;{trimmedQuery}&rdquo;
              </p>
              <p className="mt-1 text-[13px] text-ink-faint">
                Try a different spelling, or search by platform, genre or developer.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((item) => {
                const { Icon, label } = TYPE_META[item.type];
                return (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      onClick={onClose}
                      className="group flex items-center justify-between border border-surface-border bg-canvas p-3 transition-colors hover:border-outline-variant hover:bg-accent-tint"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-surface-low">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-0.5 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-muted">
                              <Icon aria-hidden="true" className="h-3 w-3 text-accent" />
                              {label}
                            </span>
                            <span className="text-xs text-ink-faint">{item.category}</span>
                          </div>
                          <p className="truncate font-serif text-[15px] font-medium text-ink transition-colors group-hover:text-accent-hover">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      <div className="ml-3 flex shrink-0 items-center gap-3">
                        {item.rating !== undefined && (
                          <RatingBadge score={item.rating} size="sm" />
                        )}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-surface-border bg-canvas px-4 py-2.5 text-xs text-ink-faint">
          <span id={`${titleId}-hint`} aria-live="polite">
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? '' : 's'}`
              : 'Searches games, reviews, guides and news'}
          </span>
          <span className="hidden sm:inline">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}
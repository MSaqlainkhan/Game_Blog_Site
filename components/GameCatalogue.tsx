'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { EmptyState } from '@/components/EmptyState';
import { RatingBadge } from '@/components/RatingBadge';
import { formatDate } from '@/lib/site';
import type { GameCatalogueFilter, GameSummary, SortOption } from '@/types/catalogue';
import type { GameGenre, Platform } from '@/types';

/**
 * Game catalogue with client-side filtering.
 *
 * The server renders the heading, metadata and canonical URL; only this
 * interactive region ships as JavaScript. Filter permutations are not
 * separately indexable — the page canonicalises to /games so a single URL
 * competes for the catalogue rather than an unbounded set of filter
 * combinations.
 */
export function GameCatalogue({ games, genres, platforms }: GameCatalogueFilter) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<GameGenre | 'All'>('All');
  const [platform, setPlatform] = useState<Platform | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('newest');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const matches = games.filter((game) => {
      if (genre !== 'All' && !game.genres.includes(genre) && game.genre !== genre) return false;
      if (platform !== 'All' && !game.platforms.includes(platform)) return false;
      if (needle && !`${game.title} ${game.developer} ${game.description}`.toLowerCase().includes(needle)) {
        return false;
      }
      return true;
    });

    const sorted = [...matches];
    switch (sort) {
      case 'rating':
        // Games without a real score sort last rather than being treated as 0.
        sorted.sort(
          (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.title.localeCompare(b.title),
        );
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        sorted.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime() ||
            a.title.localeCompare(b.title),
        );
        break;
    }
    return sorted;
  }, [games, query, genre, platform, sort]);

  const hasFilters = query !== '' || genre !== 'All' || platform !== 'All';

  const reset = () => {
    setQuery('');
    setGenre('All');
    setPlatform('All');
    setSort('newest');
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-surface-border pb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label
              htmlFor="game-search"
              className="mb-1 block text-[12px] font-medium text-ink-muted"
            >
              Search games
            </label>
            <input
              id="game-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Title, developer or keyword"
              className="h-10 w-full rounded border border-surface-border bg-white px-3 text-body-compact text-ink placeholder:text-ink-faint focus:border-accent"
            />
          </div>

          <div className="md:w-48">
            <label htmlFor="game-sort" className="mb-1 block text-[12px] font-medium text-ink-muted">
              Sort by
            </label>
            <select
              id="game-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-10 w-full rounded border border-surface-border bg-white px-3 text-body-compact text-ink focus:border-accent"
            >
              <option value="newest">Newest release</option>
              <option value="rating">Highest rated</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Genre filter */}
        <div role="group" aria-label="Filter by genre">
          <p className="mb-1.5 text-[12px] font-medium text-ink-muted">Genre</p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <FilterChip pressed={genre === 'All'} onClick={() => setGenre('All')}>
                All genres
              </FilterChip>
            </li>
            {genres.map((entry) => (
              <li key={entry.slug}>
                <FilterChip
                  pressed={genre === entry.name}
                  onClick={() => setGenre(entry.name)}
                >
                  {entry.name}
                  <span className="ml-1.5 text-ink-faint">{entry.count}</span>
                </FilterChip>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform filter */}
        <div role="group" aria-label="Filter by platform">
          <p className="mb-1.5 text-[12px] font-medium text-ink-muted">Platform</p>
          <ul className="flex flex-wrap gap-2">
            <li>
              <FilterChip pressed={platform === 'All'} onClick={() => setPlatform('All')}>
                All platforms
              </FilterChip>
            </li>
            {platforms.map((item) => (
              <li key={item}>
                <FilterChip pressed={platform === item} onClick={() => setPlatform(item)}>
                  {item}
                </FilterChip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-ink-muted" role="status" aria-live="polite">
        Showing {filtered.length} of {games.length} game{games.length === 1 ? '' : 's'}
        {genre !== 'All' ? ` in ${genre}` : ''}
        {platform !== 'All' ? ` on ${platform}` : ''}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No games match those filters"
          description="Try removing a filter or searching for a different title."
          onReset={reset}
          resetActionText="Clear all filters"
        />
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((game) => (
            <li key={game.slug}>
              <CatalogueCard game={game} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`border px-3 py-1 text-[12px] font-medium transition-colors ${
        pressed
          ? 'border-accent bg-accent-tint text-accent-hover'
          : 'border-surface-border bg-canvas text-ink-muted hover:border-ink-faint hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function CatalogueCard({ game }: { game: GameSummary }) {
  return (
    <article className="flex h-full flex-col border border-surface-border bg-white p-4 transition-colors hover:border-outline-variant">
      <Link
        href={`/games/${game.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative mb-3 block aspect-[3/4] overflow-hidden rounded bg-surface-low"
      >
        <Image
          src={game.coverImage}
          alt={game.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-2 top-2 border border-surface-border bg-white/90 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-ink-muted">
          {game.genre}
        </span>
        {game.rating !== undefined ? (
          <span className="absolute right-2 top-2">
            <RatingBadge score={game.rating} size="sm" />
          </span>
        ) : null}
      </Link>

      <h2 className="font-serif text-[17px] font-medium leading-tight text-ink">
        <Link
          href={`/games/${game.slug}`}
          className="transition-colors hover:text-accent-hover"
        >
          {game.title}
        </Link>
      </h2>

      <p className="mt-0.5 text-[11px] text-ink-faint">
        {game.developer} · Released{' '}
        <time dateTime={game.releaseDate}>{formatDate(game.releaseDate)}</time>
      </p>

      <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-ink-muted">
        {game.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-surface-border pt-3">
        <span className="text-[11px] text-ink-faint">{game.platforms.join(' · ')}</span>
        <Link
          href={`/games/${game.slug}`}
          className="inline-flex items-center text-[13px] font-medium text-accent-hover transition-colors hover:text-ink"
        >
          View
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
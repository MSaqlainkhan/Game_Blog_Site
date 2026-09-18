'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllGames } from '@/lib/data';
import { Game, GameGenre, Platform } from '@/types';
import { GameCard } from '@/components/GameCard';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

function GamesContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get('genre') || 'All';
  const initialPlatform = searchParams.get('platform') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(initialPlatform);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'az'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam) setSelectedGenre(genreParam);
  }, [searchParams]);

  const allGames = getAllGames();

  const genres: (GameGenre | 'All')[] = [
    'All',
    'Action',
    'Adventure',
    'RPG',
    'Racing',
    'Sports',
    'Strategy',
    'Puzzle',
    'Horror',
    'Indie',
    'Multiplayer'
  ];

  const platforms: (Platform | 'All')[] = [
    'All',
    'PC',
    'PlayStation',
    'Xbox',
    'Nintendo',
    'Mobile'
  ];

  // Filter and sort logic
  const filteredGames = useMemo(() => {
    let result = [...allGames];

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q)
      );
    }

    // Filter by Genre
    if (selectedGenre !== 'All') {
      result = result.filter(
        (g) => g.genres.includes(selectedGenre as GameGenre) || g.genre === selectedGenre
      );
    }

    // Filter by Platform
    if (selectedPlatform !== 'All') {
      result = result.filter((g) => g.platforms.includes(selectedPlatform as Platform));
    }

    // Sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [allGames, searchQuery, selectedGenre, selectedPlatform, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGames.slice(start, start + itemsPerPage);
  }, [filteredGames, currentPage]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedPlatform('All');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Games' }]} />

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          Explore Games
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Discover games across different genres and platforms. Filter by technical platforms, narrative archetypes, and ratings.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-surface rounded-2xl border border-surface-border p-5 mb-8 shadow-card space-y-5">
        {/* Top bar: Search + Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter by title, developer or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pulse focus:ring-1 focus:ring-pulse transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-surface-subtle border border-surface-border text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-pulse"
            >
              <option value="popular">Popular (Highest Rated)</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Releases</option>
              <option value="az">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Genre Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-pulse" />
            <span>Genre:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setSelectedGenre(genre);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedGenre === genre
                    ? 'bg-pulse text-background shadow-pulse-glow'
                    : 'bg-surface-subtle border border-surface-border text-slate-300 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Platform:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => {
                  setSelectedPlatform(platform);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedPlatform === platform
                    ? 'bg-pulse text-background shadow-pulse-glow'
                    : 'bg-surface-subtle border border-surface-border text-slate-300 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
        <span>
          Showing <strong className="text-white">{filteredGames.length}</strong> {filteredGames.length === 1 ? 'game' : 'games'}
          {selectedGenre !== 'All' && ` in ${selectedGenre}`}
          {selectedPlatform !== 'All' && ` on ${selectedPlatform}`}
        </span>
        {(searchQuery || selectedGenre !== 'All' || selectedPlatform !== 'All') && (
          <button
            onClick={handleReset}
            className="text-pulse hover:underline font-semibold"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <EmptyState
          title="No Games Found"
          description="We couldn't find any games matching your current search query or filter selection. Try adjusting your parameters."
          resetActionText="Reset All Filters"
          onReset={handleReset}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Advertising container */}
      <AdSlot format="horizontal" slotId="games-catalog-bottom" />
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-slate-400">
          <div className="inline-block w-8 h-8 border-2 border-pulse border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium">Loading Games Directory...</p>
        </div>
      }
    >
      <GamesContent />
    </Suspense>
  );
}

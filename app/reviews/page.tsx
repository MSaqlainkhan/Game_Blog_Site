'use client';

import React, { useState, useMemo } from 'react';
import { getAllReviews } from '@/lib/data';
import { Platform } from '@/types';
import { ReviewCard } from '@/components/ReviewCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';
import { AdSlot } from '@/components/AdSlot';
import { Search, Filter, Star } from 'lucide-react';

export default function ReviewsPage() {
  const allReviews = getAllReviews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [minScore, setMinScore] = useState<number>(0);

  const platforms: (Platform | 'All')[] = [
    'All',
    'PC',
    'PlayStation',
    'Xbox',
    'Nintendo',
    'Mobile'
  ];

  const filteredReviews = useMemo(() => {
    let list = [...allReviews];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.gameTitle.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.genre.toLowerCase().includes(q)
      );
    }

    if (selectedPlatform !== 'All') {
      list = list.filter((r) => r.platforms.includes(selectedPlatform));
    }

    if (minScore > 0) {
      list = list.filter((r) => r.score >= minScore);
    }

    // Default sort by score / date
    return list.sort((a, b) => b.score - a.score);
  }, [allReviews, searchQuery, selectedPlatform, minScore]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedPlatform('All');
    setMinScore(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Reviews' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <Star className="w-3.5 h-3.5 fill-pulse" />
          <span>Independent Criticism</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          Game Reviews
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Detailed game reviews covering gameplay, performance, presentation and overall value. Every score is based on comprehensive hands-on playthroughs.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-2xl border border-surface-border p-5 mb-8 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews by game title..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pulse focus:ring-1 focus:ring-pulse transition-colors"
            />
          </div>

          {/* Min Score Filter */}
          <div className="flex items-center gap-2 shrink-0 text-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Min Score:
            </span>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="bg-surface-subtle border border-surface-border text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-pulse"
            >
              <option value="0">All Scores</option>
              <option value="9.0">9.0+ Masterpieces</option>
              <option value="8.0">8.0+ Great</option>
            </select>
          </div>
        </div>

        {/* Platform Buttons */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-pulse" />
            <span>Platform:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedPlatform === plat
                    ? 'bg-pulse text-background shadow-pulse-glow'
                    : 'bg-surface-subtle border border-surface-border text-slate-300 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      {filteredReviews.length === 0 ? (
        <EmptyState
          title="No Reviews Found"
          description="We couldn't find any reviews matching your criteria. Try adjusting your platform or search term."
          resetActionText="Reset Filters"
          onReset={handleReset}
        />
      ) : (
        <div className="space-y-6">
          {/* Top Featured Review */}
          <ReviewCard review={filteredReviews[0]} horizontal />

          {/* Subsequent Reviews */}
          {filteredReviews.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredReviews.slice(1).map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Ad container */}
      <AdSlot format="horizontal" slotId="reviews-catalog-bottom" />
    </div>
  );
}

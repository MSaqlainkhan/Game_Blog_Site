'use client';

import React, { useState, useMemo } from 'react';
import { getAllGuides } from '@/lib/data';
import { GuideCategory } from '@/types';
import { GuideCard } from '@/components/GuideCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { AdSlot } from '@/components/AdSlot';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function GuidesPage() {
  const allGuides = getAllGuides();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories: (GuideCategory | 'All')[] = [
    'All',
    'Beginner Guides',
    'Walkthroughs',
    'Tips & Tricks',
    'Builds',
    'Secrets',
    'Strategies'
  ];

  const filteredGuides = useMemo(() => {
    let result = [...allGuides];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q) ||
          g.gameTitle.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((g) => g.category === selectedCategory);
    }

    return result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [allGuides, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);
  const paginatedGuides = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGuides.slice(start, start + itemsPerPage);
  }, [filteredGuides, currentPage]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Guides' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Actionable Walkthroughs</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          Gaming Guides
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Tips, walkthroughs, strategies and useful information to help you get more from your games. Tested mechanics, optimized loadouts, and boss survival tactics.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-surface rounded-2xl border border-surface-border p-5 mb-8 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search guides by title or game..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pulse focus:ring-1 focus:ring-pulse transition-colors"
            />
          </div>

          <span className="text-xs text-slate-400">
            {filteredGuides.length} {filteredGuides.length === 1 ? 'guide found' : 'guides found'}
          </span>
        </div>

        {/* Category Filter Badges */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-pulse" />
            <span>Category:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-pulse text-background shadow-pulse-glow'
                    : 'bg-surface-subtle border border-surface-border text-slate-300 hover:text-white hover:bg-surface-elevated'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <EmptyState
          title="No Guides Found"
          description="We couldn't find any guides matching your criteria. Try choosing a different guide category or clearing your search."
          resetActionText="Reset All Filters"
          onReset={handleReset}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
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

      {/* Ad slot */}
      <AdSlot format="horizontal" slotId="guides-catalog-bottom" />
    </div>
  );
}

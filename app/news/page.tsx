'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllNews } from '@/lib/data';
import { NewsCategory, NewsArticle } from '@/types';
import { NewsCard } from '@/components/NewsCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { AdSlot } from '@/components/AdSlot';
import { Search, Filter, Newspaper, TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const allNews = getAllNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories: (NewsCategory | 'All')[] = [
    'All',
    'Gaming News',
    'Industry',
    'PC',
    'PlayStation',
    'Xbox',
    'Nintendo',
    'Mobile',
    'Indie'
  ];

  const filteredNews = useMemo(() => {
    let result = [...allNews];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    return result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [allNews, searchQuery, selectedCategory]);

  const featuredStory = filteredNews[0];
  const secondaryStories = filteredNews.slice(1);

  const totalPages = Math.ceil(secondaryStories.length / itemsPerPage);
  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return secondaryStories.slice(start, start + itemsPerPage);
  }, [secondaryStories, currentPage]);

  const popularArticles = allNews.slice(0, 4);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'News' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Independent Reporting</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          Gaming News & Industry Analysis
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Comprehensive, non-sensational coverage of hardware engineering, graphics architecture, ecosystem updates, and gaming industry trends.
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
              placeholder="Search news by headline or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-white placeholder-slate-400 text-sm focus:outline-none focus:border-pulse focus:ring-1 focus:ring-pulse transition-colors"
            />
          </div>

          <span className="text-xs text-slate-400">
            {filteredNews.length} {filteredNews.length === 1 ? 'story' : 'stories'} available
          </span>
        </div>

        {/* Category Buttons */}
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

      {filteredNews.length === 0 ? (
        <EmptyState
          title="No Stories Found"
          description="We couldn't find any articles matching your search query or category filter. Try clearing your filters."
          resetActionText="Reset All Filters"
          onReset={handleReset}
        />
      ) : (
        <div className="space-y-12">
          {/* Featured Article */}
          {featuredStory && (
            <section>
              <NewsCard article={featuredStory} featured />
            </section>
          )}

          {/* Main 2-Column: Latest Stories + Popular Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Latest Stories List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-white pb-3 border-b border-surface-border flex items-center gap-2">
                <span>Latest Stories</span>
                {selectedCategory !== 'All' && (
                  <span className="text-sm font-normal text-slate-400">
                    in {selectedCategory}
                  </span>
                )}
              </h2>

              {secondaryStories.length === 0 ? (
                <p className="text-sm text-slate-400 py-6">
                  No additional stories in this category. Check back soon for more updates!
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {paginatedStories.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 500, behavior: 'smooth' });
                    }}
                  />
                </>
              )}
            </div>

            {/* Popular Section Sidebar */}
            <aside className="space-y-8">
              <div className="bg-surface rounded-2xl border border-surface-border p-6 shadow-card">
                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 pb-3 border-b border-surface-border">
                  <TrendingUp className="w-4 h-4 text-pulse" />
                  <span>Popular Articles</span>
                </h3>

                <div className="space-y-4">
                  {popularArticles.map((item, idx) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className="group flex items-start gap-3 text-xs"
                    >
                      <span className="font-mono text-base font-black text-slate-600 group-hover:text-pulse shrink-0 w-5">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="text-[11px] font-semibold text-pulse block mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-pulse transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          {item.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad Container */}
              <AdSlot format="rectangle" slotId="news-sidebar-rect" />
            </aside>
          </div>
        </div>
      )}

      {/* Footer Ad Slot */}
      <AdSlot format="horizontal" slotId="news-catalog-bottom" />
    </div>
  );
}

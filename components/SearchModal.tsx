'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Gamepad2, FileText, Star, BookOpen } from 'lucide-react';
import { searchAll, SearchResultItem } from '@/lib/data';
import { RatingBadge } from './RatingBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      setResults(searchAll(val));
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'game':
        return <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'review':
        return <Star className="w-3.5 h-3.5 text-amber-400" />;
      case 'news':
        return <FileText className="w-3.5 h-3.5 text-blue-400" />;
      case 'guide':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getTypeLabel = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'game':
        return 'Game';
      case 'review':
        return 'Review';
      case 'news':
        return 'News';
      case 'guide':
        return 'Guide';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 md:pt-24 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-surface-border bg-surface-elevated">
          <Search className="w-5 h-5 text-pulse shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search games, news, reviews and guides..."
            className="w-full bg-transparent px-3 py-2 text-white placeholder-slate-400 text-base focus:outline-none"
            id="search-modal-title"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-subtle transition-colors mr-1"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-subtle transition-colors text-xs font-mono border border-surface-border"
            aria-label="Close search modal"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 flex-grow space-y-2">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">Type a search term to find games, reviews, guides and news</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="text-slate-500">Popular searches:</span>
                {['Elden Ring', 'Cyberpunk', 'Baldur\'s Gate', 'Helldivers', 'Balatro'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setResults(searchAll(term));
                    }}
                    className="px-2.5 py-1 rounded bg-surface-subtle border border-surface-border text-slate-300 hover:text-pulse hover:border-pulse/40 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-base font-semibold text-slate-300">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try checking for typos or searching by platform, genre, or developer.</p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                onClick={onClose}
                className="group flex items-center justify-between p-3 rounded-xl bg-surface-subtle/60 hover:bg-surface-elevated border border-surface-border/50 hover:border-pulse/40 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        {getTypeIcon(item.type)}
                        <span>{getTypeLabel(item.type)}</span>
                      </span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-slate-400 text-xs truncate">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-pulse transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  {item.rating && <RatingBadge score={item.rating} size="sm" />}
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pulse transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-surface-elevated border-t border-surface-border flex items-center justify-between text-xs text-slate-500">
          <span>
            {results.length > 0 ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Search across all GamersPulse publications'}
          </span>
          <span className="hidden sm:inline font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}

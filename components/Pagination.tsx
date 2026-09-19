import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-surface-border"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-surface-border bg-surface hover:bg-surface-elevated text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`min-w-[40px] h-10 rounded-lg text-sm font-bold border transition-colors ${
              currentPage === page
                ? 'bg-pulse text-background border-pulse shadow-pulse-glow'
                : 'bg-surface border-surface-border text-slate-300 hover:bg-surface-elevated hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="inline-flex items-center justify-center p-2 rounded-lg border border-surface-border bg-surface hover:bg-surface-elevated text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}

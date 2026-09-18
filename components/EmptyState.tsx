import React from 'react';
import Link from 'next/link';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  resetActionText?: string;
  onReset?: () => void;
  resetHref?: string;
}

export function EmptyState({
  title,
  description,
  resetActionText,
  onReset,
  resetHref
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-surface-border bg-surface/50 my-8">
      <div className="w-14 h-14 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-slate-400 mb-4">
        <SearchX className="w-7 h-7 text-pulse" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {resetHref && (
        <Link
          href={resetHref}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow"
        >
          {resetActionText || 'View All Items'}
        </Link>
      )}

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow"
        >
          {resetActionText || 'Reset Filters'}
        </button>
      )}
    </div>
  );
}

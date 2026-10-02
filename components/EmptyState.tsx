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
    <div className="flex flex-col items-center justify-center p-12 text-center bg-canvas border border-surface-border my-8">
      <div className="w-12 h-12 rounded-full bg-accent-tint border border-outline-variant flex items-center justify-center mb-4">
        <SearchX className="w-5 h-5 text-accent" />
      </div>
      <h3 className="font-serif text-2xl font-semibold text-ink mb-2">{title}</h3>
      <p className="text-body-default text-ink-muted max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {resetHref && (
        <Link
          href={resetHref}
          className="inline-flex items-center px-4 h-10 bg-ink text-white text-body-compact font-semibold hover:bg-accent transition-colors"
        >
          {resetActionText || 'View All Items'}
        </Link>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-4 h-10 bg-ink text-white text-body-compact font-semibold hover:bg-accent transition-colors"
        >
          {resetActionText || 'Reset Filters'}
        </button>
      )}
    </div>
  );
}

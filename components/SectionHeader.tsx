import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllText?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  viewAllHref,
  viewAllText = 'View All'
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-surface-border/60">
      <div>
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-pulse/10 text-pulse border border-pulse/20 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pulse animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pulse hover:text-pulse-hover transition-colors group shrink-0"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

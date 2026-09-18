import React from 'react';
import Link from 'next/link';
import { Gamepad2, Home, Newspaper, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full text-center bg-surface rounded-3xl border border-surface-border p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-pulse/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pulse/10 border border-pulse/30 text-pulse font-mono font-black text-3xl mb-6 shadow-pulse-glow">
          404
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
          The requested gaming page, review, or guide might have been moved, renamed, or does not exist in our current index.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-subtle hover:bg-surface-elevated border border-surface-border text-white font-bold text-sm transition-colors"
          >
            <Gamepad2 className="w-4 h-4 text-pulse" />
            <span>Explore Games</span>
          </Link>

          <Link
            href="/news"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-subtle hover:bg-surface-elevated border border-surface-border text-white font-bold text-sm transition-colors"
          >
            <Newspaper className="w-4 h-4 text-pulse" />
            <span>Read Latest News</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

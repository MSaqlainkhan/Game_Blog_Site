import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide } from '@/types';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
        <Image
          src={guide.heroImage}
          alt={guide.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
            <BookOpen className="w-3 h-3" />
            {guide.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="text-pulse/90 font-medium truncate max-w-[160px]">
            {guide.gameTitle}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pulse transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={`/guides/${guide.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {guide.title}
          </Link>
        </h3>

        <p className="text-xs md:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {guide.summary}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
          <span className="text-slate-500">{guide.publishedAt}</span>
          <span className="relative z-10 inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

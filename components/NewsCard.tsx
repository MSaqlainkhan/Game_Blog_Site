import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <div className="group relative flex flex-col lg:flex-row rounded-3xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/50 transition-all duration-300 hover:shadow-card">
        {/* Featured Image */}
        <div className="relative lg:w-3/5 aspect-[16/9] lg:aspect-auto overflow-hidden bg-surface-subtle shrink-0 min-h-[280px] lg:min-h-[380px]">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface via-surface/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pulse text-background shadow-pulse-glow">
              Featured Story
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 lg:p-8 flex-grow">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="text-pulse font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-pulse transition-colors leading-tight mb-4">
              <Link href={`/news/${article.slug}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {article.title}
              </Link>
            </h3>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed line-clamp-3 lg:line-clamp-4 mb-6">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-surface-border text-xs">
            <span className="text-slate-400">
              By <strong className="text-slate-200">{article.author.name}</strong> ({article.author.role})
            </span>
            <span className="relative z-10 inline-flex items-center gap-1.5 font-bold text-pulse group-hover:text-pulse-hover">
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Article Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>{article.publishedAt}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pulse transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={`/news/${article.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>

        <p className="text-xs md:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {article.summary}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
          <span className="text-slate-500 truncate max-w-[140px]">
            {article.author.name}
          </span>
          <span className="relative z-10 inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Review } from '@/types';
import { RatingBadge } from './RatingBadge';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  horizontal?: boolean;
}

export function ReviewCard({ review, horizontal = false }: ReviewCardProps) {
  if (horizontal) {
    return (
      <div className="group relative flex flex-col md:flex-row rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card">
        {/* Cover */}
        <div className="relative md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden bg-surface-subtle shrink-0">
          <Image
            src={review.coverImage}
            alt={`${review.gameTitle} review cover`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface via-surface/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
              {review.genre}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 md:hidden">
            <RatingBadge score={review.score} size="md" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 flex-grow">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-pulse" />
                  {review.author.name}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {review.publishedAt}
                </span>
              </div>
              <div className="hidden md:block">
                <RatingBadge score={review.score} size="md" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-pulse transition-colors mb-2">
              <Link href={`/reviews/${review.slug}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {review.gameTitle}
              </Link>
            </h3>

            <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
              {review.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Platforms: {review.platforms.join(', ')}</span>
            </div>
            <span className="relative z-10 inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
              <span>Read Review</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
        <Image
          src={review.coverImage}
          alt={`${review.gameTitle} review cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

        <div className="absolute top-3 right-3">
          <RatingBadge score={review.score} size="sm" />
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
            {review.genre}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>{review.author.name}</span>
          <span>•</span>
          <span>{review.publishedAt}</span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-pulse transition-colors line-clamp-1 mb-2">
          <Link href={`/reviews/${review.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {review.gameTitle}
          </Link>
        </h3>

        <p className="text-xs md:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {review.summary}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
          <span className="text-slate-500 font-medium">
            {review.platforms[0]}
            {review.platforms.length > 1 ? ` +${review.platforms.length - 1}` : ''}
          </span>
          <span className="relative z-10 inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
            <span>Read Review</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

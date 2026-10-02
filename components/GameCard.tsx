import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import { RatingBadge } from './RatingBadge';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  showScore?: boolean;
}

/**
 * Game teaser.
 *
 * The score badge appears only when `game.rating` exists, which is only set
 * where GamersPulse actually published a review.
 */
export function GameCard({ game, showScore = false }: GameCardProps) {
  return (
    <article className="group flex flex-col justify-between border border-surface-border bg-white p-4 transition-colors hover:border-outline-variant">
      <div>
        <Link
          href={`/games/${game.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mb-3 block aspect-[3/4] overflow-hidden rounded bg-surface-low"
        >
          <Image
            src={game.coverImage}
            alt={game.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 border border-surface-border bg-white/90 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-ink-muted">
            {game.genre}
          </span>
          {showScore && game.rating !== undefined && (
            <span className="absolute right-2 top-2">
              <RatingBadge score={game.rating} size="sm" />
            </span>
          )}
        </Link>

        <h3 className="font-serif text-[19px] font-medium leading-tight text-ink">
          <Link
            href={`/games/${game.slug}`}
            className="transition-colors hover:text-accent-hover"
          >
            {game.title}
          </Link>
        </h3>

        <p className="mt-0.5 text-[11px] text-ink-faint">{game.developer}</p>

        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-ink-muted">
          {game.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-border pt-2">
        <span className="text-[11px] text-ink-faint">{game.platforms.join(' · ')}</span>
        <Link
          href={`/games/${game.slug}`}
          className="inline-flex items-center text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
        >
          View game
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
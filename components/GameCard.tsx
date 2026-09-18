import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types';
import { RatingBadge } from './RatingBadge';
import { Gamepad2, Monitor, Tv, Smartphone, ChevronRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export function GameCard({ game, featured = false }: GameCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'PC':
        return <Monitor className="w-3.5 h-3.5" />;
      case 'PlayStation':
      case 'Xbox':
      case 'Nintendo':
        return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'Mobile':
        return <Smartphone className="w-3.5 h-3.5" />;
      default:
        return <Tv className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
        <Image
          src={game.coverImage}
          alt={`${game.title} cover image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <RatingBadge score={game.rating} size="sm" />
        </div>

        {/* Primary Genre Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
            {game.genre}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Platforms */}
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
          {game.platforms.map((plat) => (
            <span
              key={plat}
              className="flex items-center gap-1 bg-surface-subtle px-2 py-0.5 rounded border border-surface-border"
              title={plat}
            >
              {getPlatformIcon(plat)}
              <span>{plat}</span>
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-pulse transition-colors line-clamp-1 mb-2">
          <Link href={`/games/${game.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {game.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs md:text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {game.description}
        </p>

        {/* Developer & CTA Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs">
          <span className="text-slate-500 font-medium truncate max-w-[140px]">
            {game.developer}
          </span>

          <span className="relative z-10 inline-flex items-center gap-1 font-semibold text-pulse group-hover:text-pulse-hover">
            <span>View Game</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
}

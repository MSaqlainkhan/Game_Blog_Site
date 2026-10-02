import type { GameGenre, Platform } from '@/types';
import type { CategoryInfo } from '@/types';

/**
 * Trimmed game record sent to the browser.
 *
 * The full catalogue is roughly 38 KB of prose. Sending it to the client just
 * to power a filter would put every game description, overview, feature list
 * and pros/cons list into the page's JavaScript payload. Only the fields the
 * filter and grid actually render are serialised here.
 */
export interface GameSummary {
  slug: string;
  title: string;
  coverImage: string;
  imageAlt: string;
  genre: GameGenre;
  genres: GameGenre[];
  platforms: Platform[];
  developer: string;
  description: string;
  rating?: number;
  /** Parseable release date, used for sorting. */
  releaseDate: string;
}

export interface GameCatalogueFilter {
  games: GameSummary[];
  genres: CategoryInfo[];
  platforms: Platform[];
}

export type SortOption = 'newest' | 'rating' | 'title';
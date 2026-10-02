import type { GameGenre, Platform } from '@/types';

import { getAllGames } from '@/lib/data';

export interface PlatformIndexData {
  platform: Platform;
  /** Route path. Used for the canonical URL. */
  path: string;
  title: string;
  description: string;
  /** Unique prefix for section heading ids. */
  headingId: string;
}

/**
 * Minimum number of games a platform page needs before it gets a route.
 *
 * A page with one or two entries is a thin indexable page, so those platforms
 * are deliberately not given their own URL.
 */
const MIN_GAMES = 3;

/**
 * Platform category definitions.
 *
 * Only these platforms get dedicated indexable pages. `Mobile` is omitted
 * outright: the catalogue holds a single mobile title, which would be a thin
 * page rather than useful coverage.
 *
 * `Nintendo` is defined but currently filtered out by `minGames` — only two
 * catalogue entries are Nintendo games, and two entries do not make a page
 * worth indexing. When a third Nintendo title is added to data/games.ts, the
 * /nintendo route becomes eligible automatically; only the route file in
 * app/nintendo/page.tsx needs creating at that point.
 */
const PLATFORM_PAGES: (PlatformIndexData & { minGames: number })[] = [
  {
    platform: 'PC',
    path: '/pc-gaming',
    title: 'PC gaming',
    description:
      'Games we cover on PC, with the hardware and settings that matter for frame rate and load times, plus the guides that make difficult fights survivable.',
    headingId: 'pc',
    minGames: MIN_GAMES,
  },
  {
    platform: 'PlayStation',
    path: '/playstation',
    title: 'PlayStation',
    description:
      'PlayStation coverage: console releases, platform policy and the image-quality questions that follow new hardware.',
    headingId: 'playstation',
    minGames: MIN_GAMES,
  },
  {
    platform: 'Xbox',
    path: '/xbox',
    title: 'Xbox',
    description:
      'Xbox coverage across console and PC, including first-party releases and multiplayer games built around co-op and squad play.',
    headingId: 'xbox',
    minGames: MIN_GAMES,
  },
  {
    platform: 'Nintendo',
    path: '/nintendo',
    title: 'Nintendo',
    description:
      'Nintendo Switch and Nintendo coverage, with attention to how the platform’s hardware constraints shape the games released on it.',
    headingId: 'nintendo',
    minGames: MIN_GAMES,
  },
];

/**
 * Platform pages that actually meet the content bar.
 *
 * Consumed by the route files, the sitemap and the footer, so a platform can
 * never be linked or indexed while its page does not exist.
 */
export function getPlatformPages(): PlatformIndexData[] {
  const games = getAllGames();

  return PLATFORM_PAGES.filter(
    (page) => games.filter((game) => game.platforms.includes(page.platform)).length >= page.minGames,
  ).map(({ minGames: _minGames, ...data }) => data);
}

export function getPlatformPage(path: string): PlatformIndexData | undefined {
  return getPlatformPages().find((page) => page.path === path);
}

/** Distinct genres represented on a platform, used for the page subheading. */
export function getGenreLabelForPlatform(platform: Platform): GameGenre[] {
  const genres = new Set<GameGenre>();
  for (const game of getAllGames()) {
    if (game.platforms.includes(platform)) genres.add(game.genre);
  }
  return [...genres].sort();
}
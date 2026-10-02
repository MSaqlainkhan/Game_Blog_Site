import type { Metadata } from 'next';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GameCatalogue } from '@/components/GameCatalogue';
import { Newsletter } from '@/components/Newsletter';
import { getAllGames, getGenresWithCounts } from '@/lib/data';
import { buildPageMetadata } from '@/lib/seo';
import type { Platform } from '@/types';
import type { GameSummary } from '@/types/catalogue';

export const metadata: Metadata = buildPageMetadata({
  title: 'Games Catalogue',
  description:
    'Browse the GamersPulse catalogue — game profiles with developer, publisher, platforms, genre, release information and links to our reviews and guides.',
  path: '/games',
});

/** Only platforms that actually have games are offered as a filter. */
const PLATFORMS: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile'];

export default function GamesIndexPage() {
  const games = getAllGames();
  const genres = getGenresWithCounts();

  const availablePlatforms = PLATFORMS.filter((platform) =>
    games.some((game) => game.platforms.includes(platform)),
  );

  // Only the fields the catalogue grid renders are sent to the browser.
  const summaries: GameSummary[] = games.map((game) => ({
    slug: game.slug,
    title: game.title,
    coverImage: game.coverImage,
    imageAlt: game.imageAlt,
    genre: game.genre,
    genres: game.genres,
    platforms: game.platforms,
    developer: game.developer,
    description: game.description,
    rating: game.rating,
    releaseDate: game.releaseDate,
  }));

  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Games' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Games catalogue
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          {games.length} game profiles with developer, publisher, platforms, genre and release
          information. Where we have reviewed or written a guide for a game, it is linked from the
          profile.
        </p>
      </header>

      <div className="mt-8">
        <GameCatalogue
          games={summaries}
          genres={genres}
          platforms={availablePlatforms}
        />
      </div>

      <AdSlot name="gamesAfterLead" className="mt-10" />

      <Newsletter className="mt-12" />
    </div>
  );
}
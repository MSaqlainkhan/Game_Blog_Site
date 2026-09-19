import { CategoryInfo, GameGenre } from '@/types';
import { games } from './games';

export const rawCategories: { name: GameGenre; slug: string; description: string; icon: string }[] = [
  {
    name: 'Action',
    slug: 'action',
    description: 'Fast-paced combat, precision mechanics, and exhilarating reflex-driven encounters.',
    icon: 'Swords'
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    description: 'Immersive worlds, environmental exploration, and sweeping epic narrative journeys.',
    icon: 'Compass'
  },
  {
    name: 'RPG',
    slug: 'rpg',
    description: 'Deep character progression, tactical build diversity, and branching narrative consequences.',
    icon: 'Shield'
  },
  {
    name: 'Racing',
    slug: 'racing',
    description: 'High-speed motorsport, authentic vehicle dynamics, and open-world road expeditions.',
    icon: 'Car'
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Competitive athletics, team management, and realistic physical sports simulation.',
    icon: 'Trophy'
  },
  {
    name: 'Strategy',
    slug: 'strategy',
    description: 'Tactical planning, resource logistics, settlement building, and battlefield command.',
    icon: 'Target'
  },
  {
    name: 'Puzzle',
    slug: 'puzzle',
    description: 'Intricate problem-solving, environmental deduction, and cerebral mechanics.',
    icon: 'Brain'
  },
  {
    name: 'Horror',
    slug: 'horror',
    description: 'Atmospheric psychological dread, survival resource scarcity, and spine-chilling encounters.',
    icon: 'Ghost'
  },
  {
    name: 'Indie',
    slug: 'indie',
    description: 'Original artistic visions, innovative game mechanics, and passionate independent craftsmanship.',
    icon: 'Sparkles'
  },
  {
    name: 'Multiplayer',
    slug: 'multiplayer',
    description: 'Cooperative campaigns, squad-based extraction, and shared digital worlds.',
    icon: 'Users'
  }
];

export function getCategoriesWithCounts(): CategoryInfo[] {
  return rawCategories.map((cat) => {
    const count = games.filter((g) => g.genres.includes(cat.name) || g.genre === cat.name).length;
    return {
      id: cat.slug,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      count
    };
  });
}

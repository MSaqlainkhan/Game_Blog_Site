import React from 'react';
import Link from 'next/link';
import { CategoryInfo } from '@/types';
import {
  Swords,
  Compass,
  Shield,
  Car,
  Trophy,
  Target,
  Brain,
  Ghost,
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Swords':
        return <Swords className="w-5 h-5 text-accent" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-accent" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-accent" />;
      case 'Car':
        return <Car className="w-5 h-5 text-accent" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-accent" />;
      case 'Target':
        return <Target className="w-5 h-5 text-accent" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-accent" />;
      case 'Ghost':
        return <Ghost className="w-5 h-5 text-accent" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-accent" />;
      case 'Users':
        return <Users className="w-5 h-5 text-accent" />;
      default:
        return <Shield className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <Link
      href={`/games?genre=${category.name}`}
      className="group relative flex flex-col justify-between p-4 rounded bg-white border border-surface-border hover:border-accent transition-colors"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 bg-accent-tint border border-accent/30 flex items-center justify-center">
            {getIcon(category.icon)}
          </div>
          <span className="px-2 py-0.5 bg-canvas border border-surface-border text-ink-muted text-[11px] font-medium">
            {category.count} {category.count === 1 ? 'Game' : 'Games'}
          </span>
        </div>

        <h3 className="font-serif text-headline-sm font-medium text-ink group-hover:text-accent transition-colors mb-1.5">
          {category.name}
        </h3>

        <p className="text-body-compact text-ink-muted line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-body-compact text-accent font-medium mt-4 pt-2 border-t border-surface-border">
        <span>Explore genre</span>
        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

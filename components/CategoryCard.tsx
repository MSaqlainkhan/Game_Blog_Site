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
        return <Swords className="w-6 h-6 text-pulse" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-pulse" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-pulse" />;
      case 'Car':
        return <Car className="w-6 h-6 text-pulse" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-pulse" />;
      case 'Target':
        return <Target className="w-6 h-6 text-pulse" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-pulse" />;
      case 'Ghost':
        return <Ghost className="w-6 h-6 text-pulse" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-pulse" />;
      case 'Users':
        return <Users className="w-6 h-6 text-pulse" />;
      default:
        return <Shield className="w-6 h-6 text-pulse" />;
    }
  };

  return (
    <Link
      href={`/games?genre=${category.name}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-surface border border-surface-border hover:border-pulse/40 hover:bg-surface-elevated transition-all duration-300 hover:shadow-card hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-pulse/10 border border-pulse/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            {getIcon(category.icon)}
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-subtle border border-surface-border text-slate-300">
            {category.count} {category.count === 1 ? 'Game' : 'Games'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-pulse transition-colors mb-1.5">
          {category.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-xs font-semibold text-pulse mt-4 pt-3 border-t border-surface-border/50">
        <span>Explore genre</span>
        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

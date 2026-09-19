import React from 'react';

interface AuthorAvatarProps {
  initials: string;
  accent: 'cyan' | 'teal' | 'amber';
  size?: 'sm' | 'md' | 'lg';
}

const accentClasses: Record<AuthorAvatarProps['accent'], string> = {
  cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-400/50',
  teal: 'bg-teal-950/60 text-teal-300 border-teal-400/50',
  amber: 'bg-amber-950/60 text-amber-300 border-amber-400/50'
};

const sizeClasses: Record<NonNullable<AuthorAvatarProps['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-20 h-20 text-xl'
};

export function AuthorAvatar({ initials, accent, size = 'md' }: AuthorAvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border font-black shrink-0 ${accentClasses[accent]} ${sizeClasses[size]}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

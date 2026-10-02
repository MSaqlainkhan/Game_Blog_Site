import React from 'react';

interface RatingBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RatingBadge({ score, size = 'md', showLabel = false }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-[12px] px-1.5 py-0.5 font-semibold',
    md: 'text-[15px] px-2.5 py-1 font-semibold',
    lg: 'text-3xl px-3 py-1.5 font-semibold tracking-tight',
  };

  // Square badge: 4px radius, accent tint fill, fine accent border.
  const tone = 'bg-accent-tint border-accent text-accent-hover font-serif';

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className={`inline-flex items-center justify-center rounded border ${sizeClasses[size]} ${tone}`}
        title={`GamersPulse Rating: ${score.toFixed(1)} / 10`}
      >
        <span>{score.toFixed(1)}</span>
        {size !== 'sm' && <span className="font-sans text-[11px] font-medium text-ink-muted">/ 10</span>}
      </div>
      {showLabel && (
        <span className="kicker text-ink-faint">
          GamersPulse Score
        </span>
      )}
    </div>
  );
}

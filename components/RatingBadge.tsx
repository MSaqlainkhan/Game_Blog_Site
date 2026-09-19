import React from 'react';

interface RatingBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function RatingBadge({ score, size = 'md', showLabel = false }: RatingBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-bold',
    md: 'text-sm px-2.5 py-1 font-extrabold',
    lg: 'text-2xl px-4 py-2 font-black tracking-tight',
  };

  // Tier color styling
  let colorStyle = 'border-pulse/40 bg-pulse/10 text-pulse';
  if (score >= 9.5) {
    colorStyle = 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-pulse-glow';
  } else if (score >= 9.0) {
    colorStyle = 'border-teal-400 bg-teal-950/60 text-teal-300';
  } else if (score >= 8.0) {
    colorStyle = 'border-sky-400 bg-sky-950/60 text-sky-300';
  } else {
    colorStyle = 'border-amber-400 bg-amber-950/60 text-amber-300';
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className={`inline-flex items-center justify-center rounded-lg border backdrop-blur-sm ${sizeClasses[size]} ${colorStyle}`}
        title={`GamersPulse Rating: ${score.toFixed(1)} / 10`}
      >
        <span>{score.toFixed(1)}</span>
      </div>
      {showLabel && (
        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Pulse Score
        </span>
      )}
    </div>
  );
}

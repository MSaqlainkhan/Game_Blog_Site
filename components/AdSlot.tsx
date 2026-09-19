import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export function AdSlot({ slotId = 'future-ad-slot', format = 'horizontal', className = '' }: AdSlotProps) {
  // Conforms to Google AdSense editorial requirements:
  // Pre-allocated semantic container without fake ad creative or deceitful content
  const formatClasses = {
    horizontal: 'min-h-[90px] w-full max-w-4xl',
    rectangle: 'min-h-[250px] w-full max-w-[300px]',
    'in-feed': 'min-h-[120px] w-full',
  };

  return (
    <div
      className={`my-8 mx-auto flex flex-col items-center justify-center p-2 rounded-xl border border-surface-border/40 bg-surface/30 text-center select-none ${formatClasses[format]} ${className}`}
      aria-hidden="true"
      data-ad-slot-id={slotId}
    >
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">
        Editorial Advertising Zone
      </div>
      <div className="w-full h-full border border-dashed border-surface-border/60 rounded-lg flex items-center justify-center py-4 px-2">
        <span className="text-xs text-slate-500/80 font-mono">
          AdSense Ready Container [{format}]
        </span>
      </div>
    </div>
  );
}

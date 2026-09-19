import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  className?: string;
}

export function AdSlot({ slotId = 'future-ad-slot', format = 'horizontal', className = '' }: AdSlotProps) {
  // Reserves layout space for a future advertising placement without rendering
  // any fake ad creative, dev-only labels, or placeholder text to visitors.
  const formatClasses = {
    horizontal: 'min-h-[90px] w-full max-w-4xl',
    rectangle: 'min-h-[250px] w-full max-w-[300px]',
    'in-feed': 'min-h-[120px] w-full',
  };

  return (
    <div
      className={`my-8 mx-auto ${formatClasses[format]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
      data-ad-slot-id={slotId}
    />
  );
}

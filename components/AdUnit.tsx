'use client';

import { useEffect, useRef } from 'react';

/**
 * A single Google AdSense ad unit.
 *
 * Mounted only when a real publisher ID and a real ad unit ID are configured.
 * The `adsbygoogle.push({})` call is made from an effect so the unit is
 * requested after this element exists in the DOM. `data-ad-rendered` guards
 * against a double push under React strict mode.
 */
export function AdUnit({
  slotId,
  publisherId,
  format = 'horizontal',
}: {
  slotId: string;
  /** Real AdSense publisher ID. Never a placeholder. */
  publisherId: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
}) {
  const insRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = insRef.current;
    if (!node || node.getAttribute('data-ad-rendered')) return;

    try {
      // @ts-expect-error -- the global is installed by AdSenseScript.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      node.setAttribute('data-ad-rendered', 'true');
    } catch {
      // Advertising failed to initialise. The labelled container remains, so
      // layout is unaffected and nothing is silently misrepresented.
    }
  }, []);

  return (
    <ins
      // Callback ref: React types <ins> as a non-standard element, so the
      // ref object is populated through a callback rather than a typed ref.
      ref={(node) => {
        insRef.current = node;
      }}
      className="adsbygoogle block w-full"
      style={{ display: 'block' }}
      data-ad-client={publisherId}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
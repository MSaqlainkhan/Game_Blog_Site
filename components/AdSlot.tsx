import { AdUnit } from '@/components/AdUnit';
import { getAdUnitId, type AdSlotFormat, type AdSlotName } from '@/lib/ads';
import { ADSENSE_PUBLISHER_ID } from '@/lib/site';

export interface AdSlotProps {
  /**
   * Named slot from lib/ads.ts. The environment variable name documents where
   * the unit appears and holds the real ad unit ID once supplied.
   */
  name: AdSlotName;
  format?: AdSlotFormat;
  className?: string;
}

const FORMAT_FILL: Record<AdSlotFormat, string> = {
  horizontal: 'min-h-[110px]',
  rectangle: 'min-h-[280px]',
  vertical: 'min-h-[600px]',
};

/**
 * A clearly delineated advertising container.
 *
 * Behaviour:
 *  - With a real publisher ID and a real ad unit ID configured, renders a live
 *    AdSense unit.
 *  - Otherwise renders a labelled placeholder. No fake ad creative, no fake
 *    revenue, no invented publisher or unit ID.
 *
 * The container is never styled to resemble an article link, and the
 * `ADVERTISEMENT` label is a real text node rather than an image so it is
 * announced to assistive technology.
 */
export function AdSlot({ name, format = 'horizontal', className = '' }: AdSlotProps) {
  const adUnitId = ADSENSE_PUBLISHER_ID ? getAdUnitId(name) : undefined;
  const isLive = Boolean(ADSENSE_PUBLISHER_ID && adUnitId);

  return (
    <aside
      aria-label="Advertisement"
      data-ad-slot-name={name}
      className={`w-full border border-dashed border-surface-border bg-[#f9fafb] ${FORMAT_FILL[format]} ${className}`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-6">
        <span className="text-[10px] font-semibold uppercase tracking-label text-ink-faint">
          Advertisement
        </span>
        {isLive ? (
          <AdUnit
            slotId={adUnitId as string}
            publisherId={ADSENSE_PUBLISHER_ID as string}
            format={format}
          />
        ) : (
          <span className="sr-only">
            Advertising space. This site does not currently display ads.
          </span>
        )}
      </div>
    </aside>
  );
}
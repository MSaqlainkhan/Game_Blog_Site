'use client';

import { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

import { SITE_URL } from '@/lib/site';

interface ShareButtonsProps {
  title: string;
  /** Route path, e.g. /news/article-slug. */
  url: string;
}

/**
 * Share controls.
 *
 * Opens share targets with `noopener,noreferrer`. No social handle is asserted
 * in the pre-filled text, because the publication does not claim accounts it
 * has not linked.
 */
export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () =>
    typeof window !== 'undefined'
      ? new URL(url, window.location.origin).toString()
      : `${SITE_URL}${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable (insecure context or denied permission).
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url: getFullUrl() });
      } catch {
        // Reader dismissed the sheet.
      }
    } else {
      handleCopy();
    }
  };

  const shareOnX = () => {
    const params = new URLSearchParams({ url: getFullUrl(), text: title });
    window.open(`https://x.com/intent/post?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnReddit = () => {
    const params = new URLSearchParams({ url: getFullUrl(), title });
    window.open(`https://www.reddit.com/submit?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-y border-surface-border py-3">
      <span className="kicker mr-2 flex items-center gap-1.5 text-ink-faint">
        <Share2 aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
        Share
      </span>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="inline-flex h-8 items-center gap-1.5 border border-surface-border bg-white px-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        {copied ? (
          <>
            <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
            <span className="text-accent-hover">Copied</span>
          </>
        ) : (
          <>
            <LinkIcon aria-hidden="true" className="h-3.5 w-3.5" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={shareOnX}
        aria-label="Share on X"
        className="inline-flex h-8 items-center gap-1.5 border border-surface-border bg-white px-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        X
      </button>

      <button
        type="button"
        onClick={shareOnReddit}
        aria-label="Share on Reddit"
        className="inline-flex h-8 items-center gap-1.5 border border-surface-border bg-white px-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
      >
        Reddit
      </button>

      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="More sharing options"
        className="inline-flex items-center gap-1.5 border border-surface-border bg-canvas px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-white sm:hidden"
      >
        <Share2 aria-hidden="true" className="h-3.5 w-3.5" />
        <span>More</span>
      </button>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return url ? `${window.location.origin}${url}` : window.location.href;
    }
    return `https://gamerspulse.site${url || ''}`;
  };

  const handleCopy = async () => {
    try {
      const fullUrl = getFullUrl();
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url: getFullUrl(),
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopy();
    }
  };

  const shareOnTwitter = () => {
    const fullUrl = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(`${title} via @GamersPulse`);
    window.open(`https://twitter.com/intent/tweet?url=${fullUrl}&text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnReddit = () => {
    const fullUrl = encodeURIComponent(getFullUrl());
    const text = encodeURIComponent(title);
    window.open(`https://reddit.com/submit?url=${fullUrl}&title=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-surface-border">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-pulse" />
        Share Article:
      </span>

      <button
        onClick={handleCopy}
        aria-label="Copy link to clipboard"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-surface-subtle hover:bg-surface-elevated text-slate-300 hover:text-white border border-surface-border transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={shareOnTwitter}
        aria-label="Share on X (formerly Twitter)"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-surface-subtle hover:bg-surface-elevated text-slate-300 hover:text-white border border-surface-border transition-colors"
      >
        <span>X / Twitter</span>
      </button>

      <button
        onClick={shareOnReddit}
        aria-label="Share on Reddit"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-surface-subtle hover:bg-surface-elevated text-slate-300 hover:text-white border border-surface-border transition-colors"
      >
        <span>Reddit</span>
      </button>

      <button
        onClick={handleNativeShare}
        aria-label="Native share"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-surface-subtle hover:bg-surface-elevated text-slate-300 hover:text-white border border-surface-border transition-colors sm:hidden"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>More</span>
      </button>
    </div>
  );
}

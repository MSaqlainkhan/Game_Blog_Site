import Link from 'next/link';
import { Rss } from 'lucide-react';


/**
 * Reader sign-up panel.
 *
 * This deliberately does not present an email capture form. There is no mailing
 * list provider connected to this deployment, and the previous version
 * "succeeded" after a simulated delay while telling the reader the subscription
 * had been processed. Claiming a subscription that was never stored is
 * misleading, so the panel instead offers the channels that genuinely work:
 * the RSS feed, and email for anything that needs a reply.
 *
 * If a real provider is connected later, restore a form here — but only once
 * addresses are actually stored.
 */
export function Newsletter({ className = '' }: { className?: string }) {
  return (
    <section
      aria-labelledby="stay-in-the-game"
      className={`border border-surface-border bg-canvas p-6 md:p-8 ${className}`}
    >
      <div className="mx-auto max-w-[560px] text-center">
        <span className="kicker block text-ink-faint">Follow GamersPulse</span>

        <h2
          id="stay-in-the-game"
          className="mt-1 font-serif text-headline-md font-semibold text-ink md:text-headline-lg"
        >
          Stay in the game
        </h2>

        <p className="mt-2 text-body-default leading-relaxed text-ink-muted">
          New coverage lands on the site as it is published. Subscribe to the feed in your reader, or
          email the desk if you want to tell us about something we should be writing about.
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/feed.xml"
            className="inline-flex h-10 w-full items-center justify-center gap-2 bg-ink px-4 text-body-compact font-semibold text-white transition-colors hover:bg-accent sm:w-auto"
          >
            <Rss aria-hidden="true" className="h-4 w-4" />
            Subscribe via RSS
          </a>

          <Link
            href="/contact"
            className="inline-flex h-10 w-full items-center justify-center border border-surface-border bg-white px-4 text-body-compact font-semibold text-ink transition-colors hover:border-ink-faint hover:bg-white sm:w-auto"
          >
            Contact the desk
          </Link>
        </div>

        <p className="meta-stamp mt-4 text-ink-faint">
          No tracking pixels. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
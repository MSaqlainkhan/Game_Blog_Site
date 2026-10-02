import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ShieldCheck } from 'lucide-react';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { buildPageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, SITE_URL, hasContactEmail } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description:
    'Contact the GamersPulse editorial desk for story ideas, factual corrections, business enquiries or general questions.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <header className="mb-10 border-b border-surface-border pb-6">
        <p className="kicker border border-accent/30 bg-accent-tint px-2 py-0.5 text-accent-hover">
          Editorial desk
        </p>
        <h1 className="mt-3 font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Contact GamersPulse
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          Story ideas, questions about coverage, factual errors, and business enquiries all reach the
          same small desk.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {hasContactEmail() && CONTACT_EMAIL ? (
            <ContactForm email={CONTACT_EMAIL} />
          ) : (
            /*
              No address is configured for this deployment. Printing a guessed or
              placeholder address would produce an inbox nobody receives, which is
              worse than saying so plainly.
            */
            <div className="border border-dashed border-surface-border bg-canvas p-6 md:p-8">
              <h2 className="font-serif text-headline-sm font-semibold text-ink">
                No contact address is configured yet
              </h2>
              <p className="mt-2 text-body-default leading-relaxed text-ink-muted">
                This deployment has no editorial email address set, so there is currently no way to
                reach the desk from this page. Rather than show an address that would not receive
                mail, the page says so plainly.
              </p>
              <p className="mt-4 text-body-compact text-ink-muted">
                To enable the contact form, set the following environment variable and redeploy:
              </p>
              <pre className="mt-2 overflow-x-auto border border-surface-border bg-white p-3 text-[12px] text-ink">
                <code>NEXT_PUBLIC_CONTACT_EMAIL=you@example.com</code>
              </pre>
              <p className="mt-4 text-body-compact text-ink-muted">
                In the meantime you can still browse the{' '}
                <Link
                  href="/corrections"
                  className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
                >
                  corrections policy
                </Link>
                , which explains how errors are handled once a channel exists.
              </p>
            </div>
          )}

          <div className="mt-8">
            <AdSlot name="staticPageMid" />
          </div>
        </div>

        <aside className="flex flex-col gap-6" aria-label="Contact information">
          <section className="border border-surface-border bg-white p-6">
            <h2 className="kicker mb-3 flex items-center gap-2 border-b border-surface-border pb-2 text-ink-faint">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-accent" />
              <span>Editorial integrity</span>
            </h2>
            <p className="text-[13px] leading-relaxed text-ink-muted">
              We hold every claim we publish to a checkable standard. If you think something we
              wrote is factually wrong, please tell us — see the{' '}
              <Link
                href="/corrections"
                className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
              >
                corrections policy
              </Link>{' '}
              for what happens next.
            </p>
            <p className="mt-3 text-[12px] text-ink-faint">
              Site: <strong className="text-ink-muted">{SITE_URL.replace('https://', '')}</strong>
            </p>
          </section>

          {CONTACT_EMAIL ? (
            <section className="border border-surface-border bg-white p-6">
              <h2 className="kicker mb-3 flex items-center gap-2 border-b border-surface-border pb-2 text-ink-faint">
                <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
                <span>Direct email</span>
              </h2>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-body-compact text-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
              >
                {CONTACT_EMAIL}
              </a>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
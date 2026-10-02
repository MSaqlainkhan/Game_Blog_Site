import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CONTACT_EMAIL, hasContactEmail } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Corrections',
  description:
    'How to report a factual error in GamersPulse coverage, what happens when you report one, and how published corrections are marked.',
  path: '/corrections',
});

const STEPS = [
  {
    title: 'Tell us what is wrong',
    body: 'Quote the sentence or the specific fact you believe is incorrect, and say what the correct information is. A link to a primary source — an official announcement, a patch note, a publisher statement — helps most.',
  },
  {
    title: 'We check it',
    body: 'Every report is checked against the source before anything changes. If we cannot verify the correction, we will say so rather than change the text.',
  },
  {
    title: 'We correct the record',
    body: 'Verified factual errors are fixed on the article itself. The change is described honestly — we do not quietly edit, and we do not remove text that is merely unwelcome.',
  },
];

export default function CorrectionsPage() {
  return (
    <div className="editorial-container py-8 md:py-10">
      <Breadcrumbs items={[{ label: 'Corrections' }]} />

      <header className="border-b border-surface-border pb-6">
        <h1 className="font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
          Corrections
        </h1>
        <p className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted">
          GamersPulse publishes factual errors like any other publication. Reporting one is welcome
          and helps readers who relied on what we wrote.
        </p>
      </header>

      <div className="mt-8 max-w-3xl">
        <section aria-labelledby="report">
          <h2 id="report" className="font-serif text-headline-md font-semibold text-ink">
            Report an error
          </h2>

          <div className="prose-editorial mt-4 !max-w-none">
            <p>
              Email the desk with the article title or link, the specific claim, and the source that
              contradicts it. Please include the URL of the page.
            </p>
          </div>

          {/*
           * No address has been supplied yet. Rather than printing a fabricated
           * or placeholder address that would not receive mail, the page says so
           * and points at the only configured route.
           */}
          {hasContactEmail() && CONTACT_EMAIL ? (
            <p className="mt-4">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Correction request: GamersPulse')}`}
                className="inline-flex items-center gap-2 bg-ink px-4 py-2 text-body-compact font-medium text-white transition-colors hover:bg-accent"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                Email {CONTACT_EMAIL}
              </a>
            </p>
          ) : (
            <div
              role="status"
              className="mt-4 border border-dashed border-surface-border bg-canvas p-4 text-body-compact text-ink-muted"
            >
              <p className="font-semibold text-ink">Contact address not yet configured</p>
              <p className="mt-1">
                No editorial email address has been set for this deployment, so corrections cannot
                be received by email yet. Set{' '}
                <code className="bg-white px-1 py-0.5 text-[12px]">NEXT_PUBLIC_CONTACT_EMAIL</code>{' '}
                and redeploy. Until then, use the{' '}
                <Link href="/contact" className="underline decoration-accent/40 underline-offset-2">
                  contact page
                </Link>
                .
              </p>
            </div>
          )}
        </section>

        <section aria-labelledby="process" className="mt-12 border-t border-surface-border pt-8">
          <h2 id="process" className="font-serif text-headline-md font-semibold text-ink">
            What happens when you report one
          </h2>

          <ol className="mt-5 flex flex-col gap-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="font-serif flex h-8 w-8 shrink-0 items-center justify-center border border-accent bg-accent-tint text-[15px] font-semibold text-accent-hover"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-body-default font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-body-default leading-relaxed text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="scope" className="mt-12 border-t border-surface-border pt-8">
          <h2 id="scope" className="font-serif text-headline-md font-semibold text-ink">
            What counts as an error
          </h2>

          <div className="prose-editorial mt-4 !max-w-none">
            <p>These are corrections:</p>
            <ul>
              <li>A fact that is wrong — a date, a platform, a developer, a credit.</li>
              <li>A quotation that is misattributed or mis-transcribed.</li>
              <li>A claim we cannot support with the source we cited.</li>
              <li>Information that changed after publication, where the change is material to the article.</li>
            </ul>

            <p>These are not corrections:</p>
            <ul>
              <li>Disagreement with an opinion or a review score.</li>
              <li>Dislike of a recommendation, a criticism or a verdict.</li>
              <li>Requests to change or remove coverage.</li>
            </ul>

            <p>
              The wider editorial standard is set out in our{' '}
              <Link
                href="/editorial-policy"
                className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
              >
                editorial policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
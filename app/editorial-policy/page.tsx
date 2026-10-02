import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ShieldCheck,
  Cpu,
  Mail,
  ArrowRight,
  EyeOff
} from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo';
import { ADSENSE_STATE, POLICY_EFFECTIVE_DATE, SITE_HOST } from '@/lib/legal';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Policy',
  description:
    'GamersPulse editorial standards: factual accuracy, how review scores are awarded, corrections, conflicts of interest, image rights and AI-assisted drafting.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 kicker bg-accent-tint text-accent-hover border border-accent/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ethics & Trust</span>
        </div>
        <h1 className="font-serif text-[32px] md:text-display-hero font-semibold text-ink tracking-tight leading-[1.1] mb-4">
          Editorial Policy & Standards
        </h1>
        <p className="text-base sm:text-body-editorial text-ink-muted leading-relaxed max-w-3xl">
          At GamersPulse, our primary commitment is to our readers. This document outlines our editorial philosophy, fact-checking protocols, review standards, and ethical disclosures.
        </p>
      </div>

      <div className="space-y-10 text-ink-muted leading-relaxed text-base md:text-lg">
        {/* Editorial Standards */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            1. Editorial Standards
          </h2>
          <p className="mb-4">
            GamersPulse produces gaming journalism, reviews, and guides founded on three core tenets:
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span><strong>Accuracy:</strong> All reporting must be grounded in verified documentation, direct hands-on testing, official release notes, or verified developer announcements.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span><strong>Originality:</strong> We do not scrape, copy, or plagiarize content from other outlets or online stores. Every article represents genuine editorial synthesis and original writing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
              <span><strong>Usefulness:</strong> We do not publish articles merely for search engine indexing or keyword volume. Every article must provide actionable information, thoughtful critique, or genuine entertainment to gamers.</span>
            </li>
          </ul>
        </section>

        {/* Fact Checking */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            2. Fact Checking & Verification
          </h2>
          <p className="mb-4">
            Before publishing technical analysis, guides, or industry news, our writers verify hardware specifications, engine capabilities, and gameplay mechanics through hands-on testing or primary developer sources.
          </p>
          <p>
            When reporting on rumors, industry speculation, or unannounced hardware developments, we explicitly label the information as unverified and separate documented facts from analytical inference.
          </p>
        </section>

        {/* Reviews */}
        <section id="reviews" className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            3. Review Scoring Methodology
          </h2>
          <p className="mb-4">
            Our game reviews represent independent, critical assessments of a title’s merits and shortcomings. Reviewers spend substantive time with each title across relevant platforms to experience the full gameplay loop, technical performance, and narrative arc before awarding a score.
          </p>
          <div className="bg-canvas p-5 rounded-xl border border-surface-border text-sm space-y-2 mb-4">
            <p><strong>10.0: Masterpiece</strong> — A rare and defining achievement that sets a new high mark for its genre.</p>
            <p><strong>9.0–9.9: Exceptional</strong> — An outstanding, highly polished experience with only minor flaws.</p>
            <p><strong>8.0–8.9: Great</strong> — Very enjoyable, mechanically sound, and well worth playing.</p>
            <p><strong>7.0–7.9: Good</strong> — Entertaining with worthwhile concepts, but held back by noticeable drawbacks.</p>
            <p><strong>Below 7.0: Flawed</strong> — Hampered by severe bugs, poor design choices, or insufficient value.</p>
          </div>
          <p className="text-sm text-ink-muted">
            Publishers or developers providing review copies receive no input, preview rights, or editorial influence over our final score or conclusions.
          </p>
        </section>

        {/* Corrections */}
        <section id="corrections" className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            4. Corrections Policy
          </h2>
          <p className="mb-4">
            GamersPulse is committed to correcting errors promptly and transparently. When a substantive factual error is identified:
          </p>
          <ul className="space-y-2 text-sm sm:text-base list-disc list-inside mb-4">
            <li>The error is amended directly in the article text.</li>
            <li>A clear correction notice is added to the top or bottom of the article specifying what was corrected and the date of the update.</li>
            <li>Minor typographical or grammatical fixes may be made without a formal correction notice.</li>
          </ul>
          <p className="text-sm text-ink-muted">
            To report an error, please reach out via our{' '}
            <Link href="/contact" className="text-accent underline font-semibold">
              Contact Page
            </Link>
            .
          </p>
        </section>

        {/* Ad container */}
        <AdSlot name="staticPageMid" />

        {/* Sponsored Content */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-accent" />
            5. Sponsored Content & Native Advertising
          </h2>
          <p className="mb-4">
            If GamersPulse ever publishes content created in partnership with or funded by an advertiser, it will be clearly and prominently labeled as <strong>&ldquo;Sponsored Content&rdquo;</strong> or <strong>&ldquo;Partner Article&rdquo;</strong> at the top of the page.
          </p>
          <p>
            Sponsored content will never be disguised as independent editorial reporting, and advertisers have no right to influence editorial review scores or regular news stories.
          </p>
        </section>

        {/* Advertising Separation */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            6. Advertising Independence
          </h2>
          <p className="mb-4">
            Our editorial operations are strictly separate from advertising revenue. Display advertising networks (including Google AdSense) or direct brand advertisements operate independently of our editorial staff.
          </p>
          <p>
            Advertisers do not receive advance notice of review scores, cannot purchase favorable coverage, and cannot remove critical commentary from our publications.
          </p>
        </section>

        {/* Affiliate Disclosure */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            7. Affiliate Disclosure
          </h2>
          <p className="mb-4">
            In the future, GamersPulse may participate in affiliate marketing programs, where we may earn a small commission on qualifying purchases made through links to digital storefronts or hardware retailers.
          </p>
          <p>
            Affiliate partnerships do not influence our buying advice, recommendations, or review scores. When affiliate links are present on a page, a clear disclosure will always appear before any links.
          </p>
        </section>

        {/* AI-Assisted Content */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent" />
            8. AI-Assisted Content Guidelines
          </h2>
          <p className="mb-4">
            GamersPulse uses AI tools as part of its drafting workflow. Drafts may be produced with
            AI assistance, which means an article can reach you in a form that a language model
            helped write. We disclose this rather than presenting machine-assisted drafts as wholly
            human-written.
          </p>
          <p className="mb-4">
            What the desk takes responsibility for: every published article is reviewed and
            fact-checked before it goes live, and its facts are checked against real sources rather
            than accepted as generated. Where an AI draft introduced an invented date, statistic,
            quotation or source, the piece is corrected or withdrawn rather than published.
          </p>
          <p>
            What we do not do: publish machine-generated drafts unreviewed, and we do not generate
            articles at volume to fill keyword gaps. If a piece cannot be made genuinely useful to a
            reader, it is not published. Machine-assisted drafting is never used to fabricate
            reviews, scores, quotations, sources or reader statistics.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            9. Contacting Our Editorial Team
          </h2>
          <p className="mb-6">
            If you have questions regarding our editorial standards, wish to dispute a factual statement, or want to submit feedback, our team is always available.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-10 px-5 bg-ink text-white text-body-compact font-semibold hover:bg-accent transition-colors"
          >
            <span>Get in Touch with Editorial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

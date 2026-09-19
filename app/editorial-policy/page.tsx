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

export const metadata: Metadata = {
  title: 'Editorial Policy & Standards — GamersPulse',
  description:
    'GamersPulse editorial guidelines covering factual accuracy, review scoring standards, sponsored content separation, corrections, and AI disclosures.',
  openGraph: {
    title: 'Editorial Policy | GamersPulse',
    description:
      'GamersPulse editorial guidelines covering factual accuracy, review scoring standards, sponsored content separation, corrections, and AI disclosures.',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ethics & Trust</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Editorial Policy & Standards
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
          At GamersPulse, our primary commitment is to our readers. This document outlines our editorial philosophy, fact-checking protocols, review standards, and ethical disclosures.
        </p>
      </div>

      <div className="space-y-10 text-slate-300 leading-relaxed text-base md:text-lg">
        {/* Editorial Standards */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-pulse" />
            1. Editorial Standards
          </h2>
          <p className="mb-4">
            GamersPulse produces gaming journalism, reviews, and guides founded on three core tenets:
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-pulse shrink-0 mt-1" />
              <span><strong>Accuracy:</strong> All reporting must be grounded in verified documentation, direct hands-on testing, official release notes, or verified developer announcements.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-pulse shrink-0 mt-1" />
              <span><strong>Originality:</strong> We do not scrape, copy, or plagiarize content from other outlets or online stores. Every article represents genuine editorial synthesis and original writing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-pulse shrink-0 mt-1" />
              <span><strong>Usefulness:</strong> We do not publish articles merely for search engine indexing or keyword volume. Every article must provide actionable information, thoughtful critique, or genuine entertainment to gamers.</span>
            </li>
          </ul>
        </section>

        {/* Fact Checking */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-pulse" />
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
        <section id="reviews" className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-pulse" />
            3. Review Scoring Methodology
          </h2>
          <p className="mb-4">
            Our game reviews represent independent, critical assessments of a title’s merits and shortcomings. Reviewers spend substantive time with each title across relevant platforms to experience the full gameplay loop, technical performance, and narrative arc before awarding a score.
          </p>
          <div className="bg-surface-subtle p-5 rounded-xl border border-surface-border text-sm space-y-2 mb-4">
            <p><strong>10.0: Masterpiece</strong> — A rare and defining achievement that sets a new high mark for its genre.</p>
            <p><strong>9.0–9.9: Exceptional</strong> — An outstanding, highly polished experience with only minor flaws.</p>
            <p><strong>8.0–8.9: Great</strong> — Very enjoyable, mechanically sound, and well worth playing.</p>
            <p><strong>7.0–7.9: Good</strong> — Entertaining with worthwhile concepts, but held back by noticeable drawbacks.</p>
            <p><strong>Below 7.0: Flawed</strong> — Hampered by severe bugs, poor design choices, or insufficient value.</p>
          </div>
          <p className="text-sm text-slate-400">
            Publishers or developers providing review copies receive no input, preview rights, or editorial influence over our final score or conclusions.
          </p>
        </section>

        {/* Corrections */}
        <section id="corrections" className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-pulse" />
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
          <p className="text-sm text-slate-400">
            To report an error, please reach out via our{' '}
            <Link href="/contact" className="text-pulse underline font-semibold">
              Contact Page
            </Link>
            .
          </p>
        </section>

        {/* Ad container */}
        <AdSlot format="horizontal" slotId="editorial-policy-mid" />

        {/* Sponsored Content */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-pulse" />
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
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-pulse" />
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
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-pulse" />
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
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-pulse" />
            8. AI-Assisted Content Guidelines
          </h2>
          <p className="mb-4">
            GamersPulse believes in total transparency regarding modern editorial technology. AI tools may assist our editorial workflow with research discovery, outlining, copy editing, or drafting assistance.
          </p>
          <p>
            However, <strong>all published content must be thoroughly reviewed, verified, edited, and fact-checked by a human editor</strong> for accuracy, tone, and usefulness. We strictly prohibit uncurated, automated AI generation designed solely for keyword stuffing or thin content.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-pulse" />
            9. Contacting Our Editorial Team
          </h2>
          <p className="mb-6">
            If you have questions regarding our editorial standards, wish to dispute a factual statement, or want to submit feedback, our team is always available.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow"
          >
            <span>Get in Touch with Editorial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

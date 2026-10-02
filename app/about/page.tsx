import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import {
  Activity,
  Target,
  Gamepad2,
  CheckCircle2,
  FileCheck,
  Scale,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About GamersPulse',
  description:
    'What GamersPulse covers, who publishes it, how the articles are produced, and the standards the editorial desk works to.',
  path: '/about',
});

export default function AboutPage() {
  const coverageAreas = [
    {
      title: 'Gaming News',
      desc: 'Accurate reporting on hardware engineering, graphics architecture, industry trends, and platform policies.'
    },
    {
      title: 'Game Reviews',
      desc: 'Independent critical reviews evaluating gameplay loops, performance stability, audiovisual craft, and consumer value.'
    },
    {
      title: 'Practical Guides',
      desc: 'Actionable walkthroughs, build optimizations, and boss battle strategies written to solve actual gameplay hurdles.'
    },
    {
      title: 'Game Discovery',
      desc: 'Curated catalogs and genre breakdowns highlighting innovative indie gems alongside high-budget blockbusters.'
    },
    {
      title: 'Industry Updates',
      desc: 'Deep dives into game engine technology, cloud ecosystems, backward compatibility, and digital preservation.'
    },
    {
      title: 'Gaming Culture',
      desc: 'Thoughtful discussions on game design philosophy, player agency, and the cultural evolution of interactive media.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 kicker bg-accent-tint text-accent-hover border border-accent/30 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>Independent Media</span>
        </div>
        <h1 className="font-serif text-[32px] md:text-display-hero font-semibold text-ink tracking-tight leading-[1.1] mb-4">
          About GamersPulse
        </h1>
        <p className="text-base sm:text-xl text-ink-muted leading-relaxed max-w-3xl">
          GamersPulse is a gaming-focused digital publication created to help players discover games, follow gaming news, read reviews and find useful guides.
        </p>
      </div>

      <div className="space-y-12 text-ink-muted leading-relaxed text-base md:text-lg">
        {/* What We Do */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            What We Do
          </h2>
          <p className="mb-4">
            GamersPulse was founded to cut through the noise of clickbait headlines, engagement algorithms, and superficial content. As dedicated video game players and technology analysts, we produce comprehensive, readable editorial content designed to inform and assist players throughout their gaming journey.
          </p>
          <p>
            Whether analyzing the technical nuances of modern GPU upscalers, crafting step-by-step boss encounter blueprints, or delivering honest review scores that players can depend on, our priority is always reader utility and editorial integrity.
          </p>
        </section>

        {/* Our Mission */}
        <section className="border border-accent/30 bg-accent-tint p-8">
          <span className="text-xs font-sans uppercase tracking-widest text-accent block mb-2">
            Our Purpose
          </span>
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4">
            Our Mission
          </h2>
          <blockquote className="text-xl sm:text-2xl font-semibold text-ink border-l-4 border-accent pl-4 py-1 italic mb-4">
            &ldquo;To make gaming information easier to discover, understand and use.&rdquo;
          </blockquote>
          <p className="text-sm sm:text-base text-ink-muted">
            We believe gaming content should respect your intelligence and your time. Every article we publish is written to deliver clear, actionable, and genuine value without fluff.
          </p>
        </section>

        {/* What We Cover */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-accent" />
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverageAreas.map((area, idx) => (
              <div key={idx} className="bg-canvas/70 p-4 rounded-xl border border-surface-border">
                <h3 className="font-serif text-headline-sm font-medium text-ink mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>{area.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Container */}
        <AdSlot name="staticPageMid" />

        {/* Editorial Approach */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-accent" />
            Our Editorial Approach
          </h2>
          <p className="mb-4">
            Our editorial approach is governed by three foundational pillars: <strong>utility</strong>, <strong>clarity</strong>, and <strong>transparency</strong>.
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong>Original Craftsmanship:</strong> We do not scrape third-party websites, republish marketing press releases without analysis, or generate thin keyword-stuffed articles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong>Factual Accuracy:</strong> We verify patch notes, performance metrics, and platform details firsthand before publishing. When rumors or unconfirmed reports are discussed, they are explicitly identified as speculative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>
                <strong>Zero Sponsored Influence:</strong> Commercial partnerships or future advertising programs never dictate review verdicts, editorial conclusions, or coverage priority.
              </span>
            </li>
          </ul>
        </section>

        {/* Review Methodology */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            Review Methodology
          </h2>
          <p className="mb-4">
            We evaluate games on a 1.0 to 10.0 scale, where a score represents our comprehensive verdict based on gameplay mechanics, narrative coherence, visual fidelity, sound engineering, technical polish, and player value.
          </p>
          <div className="bg-canvas p-5 rounded-xl border border-surface-border text-xs sm:text-sm space-y-2 mb-4">
            <p><strong>10.0 — Masterpiece:</strong> A landmark achievement that defines or redefines its genre.</p>
            <p><strong>9.0–9.9 — Exceptional:</strong> Outstanding execution with minor flaws that do not impede enjoyment.</p>
            <p><strong>8.0–8.9 — Great:</strong> Highly engaging with memorable high points and solid craftsmanship.</p>
            <p><strong>7.0–7.9 — Good:</strong> Solid experience with worthwhile ideas but noticeable mechanical or technical caveats.</p>
            <p><strong>Under 7.0:</strong> Significant design shortcomings, performance instability, or lack of value.</p>
          </div>
          <p className="text-sm text-ink-muted">
            For full details on our evaluation criteria and disclosures, read our comprehensive{' '}
            <Link href="/editorial-policy" className="text-accent font-semibold underline">
              Editorial Policy
            </Link>
            .
          </p>
        </section>

        {/* Corrections & Contact */}
        <section className="bg-white rounded border border-surface-border p-6 md:p-8">
          <h2 className="font-serif text-headline-md font-semibold text-ink tracking-tight mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent" />
            Corrections & Reader Feedback
          </h2>
          <p className="mb-4">
            We hold ourselves to factual accuracy. If you find an error, a broken instruction in a
            guide, or a typo, please tell us — the{' '}
            <Link
              href="/corrections"
              className="underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
            >
              corrections page
            </Link>{' '}
            explains how to report one and what happens next.
          </p>
          <p className="mb-6">
            When an article is genuinely revised, its original publication date is kept and the later
            date is shown as an update date, so you can always see how old a piece is. We do not
            rewrite publication dates to make old coverage look recent.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-10 px-5 bg-ink text-white text-body-compact font-semibold hover:bg-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Editorial / Report an Error</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

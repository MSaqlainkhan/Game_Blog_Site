import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
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
  ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About GamersPulse — Independent Gaming Publication',
  description:
    'GamersPulse is a gaming-focused digital publication created to help players discover games, follow gaming news, read reviews and find useful guides.',
  openGraph: {
    title: 'About GamersPulse',
    description:
      'GamersPulse is a gaming-focused digital publication created to help players discover games, follow gaming news, read reviews and find useful guides.',
  },
};

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>Independent Media</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          About GamersPulse
        </h1>
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
          GamersPulse is a gaming-focused digital publication created to help players discover games, follow gaming news, read reviews and find useful guides.
        </p>
      </div>

      <div className="space-y-12 text-slate-300 leading-relaxed text-base md:text-lg">
        {/* What We Do */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Target className="w-5 h-5 text-pulse" />
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
        <section className="rounded-3xl border border-pulse/40 bg-gradient-to-r from-surface-elevated via-surface to-surface p-8 shadow-card">
          <span className="text-xs font-mono uppercase tracking-widest text-pulse block mb-2">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Our Mission
          </h2>
          <blockquote className="text-xl sm:text-2xl font-semibold text-slate-100 border-l-4 border-pulse pl-4 py-1 italic mb-4">
            &ldquo;To make gaming information easier to discover, understand and use.&rdquo;
          </blockquote>
          <p className="text-sm sm:text-base text-slate-400">
            We believe gaming content should respect your intelligence and your time. Every article we publish is written to deliver clear, actionable, and genuine value without fluff.
          </p>
        </section>

        {/* What We Cover */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
            <Gamepad2 className="w-5 h-5 text-pulse" />
            What We Cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coverageAreas.map((area, idx) => (
              <div key={idx} className="bg-surface-subtle/70 p-4 rounded-xl border border-surface-border">
                <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pulse shrink-0" />
                  <span>{area.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Container */}
        <AdSlot format="horizontal" slotId="about-mid-slot" />

        {/* Editorial Approach */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-pulse" />
            Our Editorial Approach
          </h2>
          <p className="mb-4">
            Our editorial approach is governed by three foundational pillars: <strong>utility</strong>, <strong>clarity</strong>, and <strong>transparency</strong>.
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Original Craftsmanship:</strong> We do not scrape third-party websites, republish marketing press releases without analysis, or generate thin keyword-stuffed articles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Factual Accuracy:</strong> We verify patch notes, performance metrics, and platform details firsthand before publishing. When rumors or unconfirmed reports are discussed, they are explicitly identified as speculative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Zero Sponsored Influence:</strong> Commercial partnerships or future advertising programs never dictate review verdicts, editorial conclusions, or coverage priority.
              </span>
            </li>
          </ul>
        </section>

        {/* Review Methodology */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-pulse" />
            Review Methodology
          </h2>
          <p className="mb-4">
            We evaluate games on a 1.0 to 10.0 scale, where a score represents our comprehensive verdict based on gameplay mechanics, narrative coherence, visual fidelity, sound engineering, technical polish, and player value.
          </p>
          <div className="bg-surface-subtle p-5 rounded-xl border border-surface-border text-xs sm:text-sm space-y-2 mb-4">
            <p><strong>10.0 — Masterpiece:</strong> A landmark achievement that defines or redefines its genre.</p>
            <p><strong>9.0–9.9 — Exceptional:</strong> Outstanding execution with minor flaws that do not impede enjoyment.</p>
            <p><strong>8.0–8.9 — Great:</strong> Highly engaging with memorable high points and solid craftsmanship.</p>
            <p><strong>7.0–7.9 — Good:</strong> Solid experience with worthwhile ideas but noticeable mechanical or technical caveats.</p>
            <p><strong>Under 7.0:</strong> Significant design shortcomings, performance instability, or lack of value.</p>
          </div>
          <p className="text-sm text-slate-400">
            For full details on our evaluation criteria and disclosures, read our comprehensive{' '}
            <Link href="/editorial-policy" className="text-pulse font-semibold underline">
              Editorial Policy
            </Link>
            .
          </p>
        </section>

        {/* Corrections & Contact */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-pulse" />
            Corrections & Reader Feedback
          </h2>
          <p className="mb-4">
            We hold ourselves to rigorous editorial standards. If you discover a factual inaccuracy, broken guide instruction, or typo in any of our articles, we encourage you to report it directly to our editorial team.
          </p>
          <p className="mb-6">
            When substantive corrections are made to articles, an explicit update notice is appended detailing what was amended and why.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-colors shadow-pulse-glow"
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

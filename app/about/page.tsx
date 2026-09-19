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
  alternates: {
    canonical: '/about',
  },
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
        {/* Who Runs GamersPulse */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Target className="w-5 h-5 text-pulse" />
            Who Runs GamersPulse
          </h2>
          <p className="mb-4">
            GamersPulse is a small, independently operated gaming publication. Coverage is organized around three editorial bylines, each focused on a specific area — action RPGs and horror, narrative RPGs and platform policy, and hardware/technical analysis. You can see exactly who wrote what, and read more about each byline's coverage focus, on our{' '}
            <Link href="/authors" className="text-pulse font-semibold underline">Authors & Contributors</Link> page.
          </p>
          <p>
            GamersPulse is not affiliated with, sponsored by, or endorsed by any game publisher, developer, or platform holder mentioned on this site.
          </p>
        </section>

        {/* Why We Exist */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <Gamepad2 className="w-5 h-5 text-pulse" />
            Why GamersPulse Exists
          </h2>
          <p className="mb-4">
            Most gaming coverage online is optimized for pageviews rather than usefulness — recycled press releases, review scores untethered from stated criteria, and guides padded to hit a word count. GamersPulse exists to do the opposite: publish reviews with a consistent, published scoring methodology, guides built around specific mechanics and numbers rather than vague tips, and news analysis that separates confirmed facts from speculation.
          </p>
          <p>
            We don't cover every release. We'd rather publish fewer, more useful pieces than chase every trending headline.
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

        {/* Editorial Approach & Content Standards */}
        <section className="bg-surface rounded-2xl border border-surface-border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-pulse" />
            Editorial Approach & Content Standards
          </h2>
          <p className="mb-4">
            Reviews, guides, and news on GamersPulse go through the same basic process: research against primary sources (official patch notes, developer communications, and publicly available gameplay footage), a written draft grounded in specific mechanics rather than general impressions, and an editorial pass before publishing.
          </p>
          <ul className="space-y-3 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Original writing:</strong> We do not scrape third-party websites, republish press releases without analysis, or generate thin, keyword-stuffed articles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Sources:</strong> Technical and gameplay claims are checked against official patch notes, developer statements, and documented, verifiable gameplay footage. Rumors and unconfirmed reports are explicitly labeled as speculative, never presented as fact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Corrections:</strong> Factual errors are corrected in the article text with a visible correction notice. Our full process is in the{' '}
                <Link href="/editorial-policy#corrections" className="text-pulse underline">Editorial Policy</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Editorial independence:</strong> No publisher, developer, or advertiser receives advance notice of a review score or the ability to influence it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Sponsored & affiliate content:</strong> GamersPulse does not currently run sponsored content or affiliate links. If either is introduced, it will be clearly labeled at the top of the page — see our{' '}
                <Link href="/editorial-policy" className="text-pulse underline">Editorial Policy</Link> for the full disclosure commitment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pulse mt-2 shrink-0" />
              <span>
                <strong>Updates:</strong> Reviews and guides are revisited after major patches when mechanics change meaningfully; an &ldquo;Updated&rdquo; date is shown alongside the original publish date when that happens.
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

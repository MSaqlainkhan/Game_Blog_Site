import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Scale, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — GamersPulse',
  description:
    'Read the terms of use, intellectual property policies, and legal disclaimers governing the GamersPulse website.',
  openGraph: {
    title: 'Terms & Conditions | GamersPulse',
    description:
      'Read the terms of use, intellectual property policies, and legal disclaimers governing the GamersPulse website.',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pulse/10 text-pulse border border-pulse/30 mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Last Updated: September 2024 • Domain: <strong>gamerspulse.site</strong>
        </p>
      </div>

      <div className="bg-surface rounded-3xl border border-surface-border p-6 sm:p-10 space-y-8 text-slate-300 leading-relaxed text-base">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or browsing <strong>GamersPulse</strong> (&ldquo;gamerspulse.site&rdquo;), you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should discontinue using this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Permitted Website Use</h2>
          <p className="mb-3">
            GamersPulse is provided for your personal, non-commercial informational and entertainment purposes. You agree to use the site only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their enjoyment of the publication.
          </p>
          <p>
            Automated scraping, bulk downloading, or crawling that imposes excessive load on our infrastructure is prohibited without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Editorial Content & Commentary</h2>
          <p>
            The game reviews, guides, technical analysis, news reports, and opinions published on GamersPulse represent the independent assessments of our editorial team. While we strive for rigorous accuracy, gaming software is subject to frequent developer patches, balance revisions, and online server shifts that may alter in-game parameters after publication date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
          <p className="mb-3">
            All original editorial text, site design, layouts, graphics, logos, and custom code on GamersPulse are the proprietary intellectual property of GamersPulse. You may quote excerpts for educational or non-commercial journalistic commentary provided clear attribution and a clickable link to GamersPulse are included.
          </p>
          <p className="text-slate-400 text-sm">
            All video game titles, trademarks, logos, character names, and associated game assets mentioned or depicted on this site belong to their respective copyright and trademark owners. Their mention on GamersPulse constitutes descriptive fair use for critique, news reporting, and discovery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. User Conduct</h2>
          <p className="mb-2">When submitting messages through our contact form, you agree not to transmit:</p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
            <li>Any unlawful, defamatory, abusive, or harassing content.</li>
            <li>Commercial solicitations, spam, chain letters, or unsolicited advertising.</li>
            <li>Material containing computer viruses, trojans, or malicious scripts.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. External Links</h2>
          <p>
            GamersPulse may contain hyperlinks to third-party websites or services. We do not endorse, guarantee, or assume responsibility for the accuracy, content, or practices of any external sites. Accessing third-party links is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Disclaimers</h2>
          <p>
            THE CONTENT ON GAMERSPULSE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. GAMERSPULSE DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL OPERATE UNINTERRUPTED OR ERROR-FREE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, GAMERSPULSE AND ITS AUTHORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THIS WEBSITE OR ITS CONTENT.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Modifications to Terms</h2>
          <p>
            We reserve the right to revise or update these Terms & Conditions at any time. Changes take effect immediately upon posting to this page. Your continued use of the website following any changes signifies your acceptance of the revised terms.
          </p>
        </section>

        <section className="pt-4 border-t border-surface-border">
          <h2 className="text-xl font-bold text-white mb-3">10. Contact Information</h2>
          <p className="mb-4">
            If you have questions regarding these Terms & Conditions, please contact us via our editorial contact form:
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-pulse hover:underline font-bold text-sm"
          >
            GamersPulse Editorial Desk →
          </Link>
        </section>
      </div>
    </div>
  );
}

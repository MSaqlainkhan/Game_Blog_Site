import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShieldCheck, Lock, Eye, Mail } from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo';
import { ADSENSE_STATE, POLICY_EFFECTIVE_DATE, SITE_HOST } from '@/lib/legal';


export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How GamersPulse handles visitor data, cookies, analytics, advertising and your rights as a reader.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-2 py-0.5 kicker bg-accent-tint text-accent-hover border border-accent/30 mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>Data Transparency</span>
        </div>
        <h1 className="font-serif text-[32px] md:text-display-hero font-semibold text-ink tracking-tight leading-[1.1] mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-2xl leading-relaxed">
          Effective date: <strong>{POLICY_EFFECTIVE_DATE}</strong> • Domain:{' '}
          <strong>{SITE_HOST}</strong>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-surface-border p-6 sm:p-10 space-y-8 text-ink-muted leading-relaxed text-base">
        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-accent" />
            1. Information We Collect
          </h2>
          <p className="mb-3">
            GamersPulse is designed primarily as an open-access gaming media publication. We do not require you to create an account, log in, or provide personal payment information to read our articles, guides, or reviews.
          </p>
          <p className="mb-2">We only receive personal information when you deliberately submit it to us, such as:</p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-muted pl-2">
            <li><strong>Contact Inquiries:</strong> Your name, email address, and message content when submitting feedback or error reports via our contact form.</li>
            <li><strong>Newsletter Requests:</strong> Your email address if you voluntarily opt in to future email updates.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">2. How We Use Information</h2>
          <p className="mb-2">Any information you submit is used solely for legitimate operational purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-muted pl-2">
            <li>To respond to your inquiries, feedback, or factual correction submissions.</li>
            <li>To deliver newsletter updates if explicitly requested.</li>
            <li>To maintain website security, prevent malicious automated abuse, and monitor server health.</li>
          </ul>
          <p className="mt-3 text-ink-muted">
            We never sell, rent, or trade your personal contact information to third-party data brokers.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">3. Cookies and Local Storage</h2>
          <p className="mb-3">
            Cookies are small text files stored on your browser. GamersPulse uses minimal first-party cookies and browser local storage strictly to remember your preferences (such as search filters or interface display settings).
          </p>
          <p className="text-ink-muted">
            You can configure your web browser to reject cookies or notify you when cookies are being set. Disabling cookies will not hinder your ability to read our articles.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">4. Analytics and Technical Logs</h2>
          <p className="mb-3">
            Like most web servers, our infrastructure may collect standard, non-personally identifiable log information when you access our pages, including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-muted pl-2">
            <li>Browser type and operating system.</li>
            <li>Referring URL and requested page paths.</li>
            <li>Aggregated timestamp and geographic region (country or state level).</li>
          </ul>
          <p className="mt-3 text-ink-muted">
            This technical data is used solely in aggregate form to measure which articles are popular, detect broken links, and optimize page load speeds.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">5. Advertising</h2>
          <p className="mb-3">
            {ADSENSE_STATE === 'live' ? (
              <>
                GamersPulse uses Google AdSense to serve advertising. Google and its partners may
                use cookies or similar technologies to serve ads based on your prior visits to this
                or other websites. You can opt out of personalised advertising through{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                  Google Ads Settings
                </a>{' '}
                or{' '}
                <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
                  aboutads.info
                </a>
                .
              </>
            ) : (
              <>
                GamersPulse currently serves no advertising. No advertising network scripts are
                loaded and no advertising cookies are set. Advertising slots on the site display a
                labelled placeholder only.
              </>
            )}
          </p>
          <p className="text-ink-muted">
            When advertising is enabled, every ad is clearly labelled and visually separated from
            editorial content, and is never placed over navigation, inside buttons, or styled to
            look like an article link. If you accept advertising cookies, that choice is stored
            locally in your browser and can be withdrawn at any time on the{' '}
            <a href="/cookie-settings">cookie settings</a> page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">6. Third-Party Services & External Links</h2>
          <p className="mb-3">
            Our articles may include links to external websites, such as game storefronts (Steam, PlayStation Store, Nintendo eShop) or official developer portals. GamersPulse does not control and is not responsible for the privacy practices or content of third-party domains. We encourage you to review their individual privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">7. Data Security</h2>
          <p className="mb-3">
            We employ industry-standard transport layer security (HTTPS/TLS encryption) to safeguard all communications between your browser and our website. While no transmission over the internet is completely impregnable, we take all reasonable technical precautions to safeguard submitted information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">8. Children&rsquo;s Privacy</h2>
          <p className="mb-3">
            GamersPulse is a general gaming publication intended for players aged 13 and older. We do not knowingly solicit or collect personally identifiable information from children under the age of 13. If you believe a child has provided us with personal information, please contact us immediately so we can promptly delete it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">9. Your Privacy Rights</h2>
          <p className="mb-3">
            Depending on your jurisdiction (including GDPR in Europe and CCPA/CPRA in California), you have rights regarding your personal data, including:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-ink-muted pl-2">
            <li>The right to request access to any personal information we hold about you.</li>
            <li>The right to request correction of inaccurate personal data.</li>
            <li>The right to request deletion of your submitted contact messages or newsletter email.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3">10. Changes to This Policy</h2>
          <p className="mb-3">
            We may update this Privacy Policy from time to time to reflect modifications in our editorial operations, legal obligations, or technical implementations. The &ldquo;Effective Date&rdquo; at the top of this document will indicate when the latest revisions were posted.
          </p>
        </section>

        <section className="pt-4 border-t border-surface-border">
          <h2 className="font-serif text-headline-sm font-medium text-ink mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            11. How to Contact Us
          </h2>
          <p className="mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please reach out via our contact page:
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium text-body-compact"
          >
            Visit GamersPulse Contact Desk →
          </Link>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GameCard } from '@/components/GameCard';
import { GuideCard } from '@/components/GuideCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ShareButtons } from '@/components/ShareButtons';
import { getAllGuides, getAuthorFor, getGameBySlug, getGuideBySlug } from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd, personJsonLd } from '@/lib/seo';
import { canonical, formatDate, toIsoDate } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return buildPageMetadata({
      title: 'Guide not found',
      description: 'This guide does not exist or has been moved.',
      path: `/guides/${params.slug}`,
      index: false,
    });
  }

  const path = `/guides/${guide.slug}`;

  return buildPageMetadata({
    title: guide.title,
    description: guide.summary,
    path,
    image: guide.heroImage,
    imageAlt: guide.imageAlt,
    type: 'article',
    publishedTime: toIsoDate(guide.publishedAt),
    ...(guide.updatedAt ? { modifiedTime: toIsoDate(guide.updatedAt) } : {}),
  });
}

export default function GuidePage({ params }: PageProps) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const author = getAuthorFor(guide.authorId);
  const game = getGuideGame(guide.gameSlug);
  const path = `/guides/${guide.slug}`;

  const relatedGuides = guide.relatedGuideSlugs
    .map(getGuideBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonical(path)}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(path) },
    headline: guide.title,
    description: guide.summary,
    image: [guide.heroImage],
    datePublished: toIsoDate(guide.publishedAt),
    dateModified: toIsoDate(guide.updatedAt ?? guide.publishedAt),
    inLanguage: 'en-US',
    author: { '@id': `${canonical(`/authors/${author.slug}`)}#person` },
    publisher: { '@id': `${canonical('/')}#organization` },
    articleSection: guide.category,
    ...(guide.tags?.length ? { keywords: guide.tags.join(', ') } : {}),
  };

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.title, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              articleJsonLd,
              personJsonLd({
                name: author.name,
                jobTitle: author.role,
                url: canonical(`/authors/${author.slug}`),
              }),
            ],
          }),
        }}
      />
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <div className="editorial-container py-8 md:py-10">
        <Breadcrumbs
          items={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]}
        />

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
          <article className="lg:col-span-8">
            <header>
              <p className="kicker border border-surface-border bg-canvas px-2 py-0.5 text-ink-muted">
                {guide.category}
              </p>

              <h1 className="mt-4 font-serif text-headline-lg font-semibold leading-tight tracking-tight text-ink md:text-display-hero">
                {guide.title}
              </h1>

              <p className="mt-4 text-subhead-editorial leading-relaxed text-ink-muted">
                {guide.summary}
              </p>

              <div className="mt-6 border-y border-surface-border py-4">
                <p className="text-body-compact text-ink">
                  By{' '}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="font-medium underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
                  >
                    {author.name}
                  </Link>
                </p>
                <dl className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 meta-stamp text-ink-muted">
                  <dt className="sr-only">Publication date</dt>
                  <dd>
                    <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
                  </dd>
                  {guide.updatedAt ? (
                    <>
                      <dt className="sr-only">Last updated</dt>
                      <dd aria-hidden="true">·</dd>
                      <dd>
                        Updated{' '}
                        <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
                      </dd>
                    </>
                  ) : null}
                  <dt className="sr-only">Reading time</dt>
                  <dd aria-hidden="true">·</dd>
                  <dd>{guide.readTime}</dd>
                </dl>
              </div>
            </header>

            <figure className="figure-breakout figure-breakout--contained mt-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-low">
                <Image
                  src={guide.heroImage}
                  alt={guide.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <figcaption>{guide.imageAlt}</figcaption>
            </figure>

            <div className="prose-editorial mt-8">
              {guide.sections.map((section, index) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>

                  {section.keyPoints?.length ? (
                    <>
                      <h3>Key points</h3>
                      <ul>
                        {section.keyPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {index === 0 ? (
                    <AdSlot name="articleAfterIntro" className="my-10 not-prose" />
                  ) : null}

                  {index === Math.floor(guide.sections.length / 2) ? (
                    <AdSlot name="articleMid" className="my-10 not-prose" />
                  ) : null}
                </section>
              ))}

              {guide.keyTips.length > 0 ? (
                <section>
                  <h2>Key takeaways</h2>
                  <ul>
                    {guide.keyTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <ShareButtons title={guide.title} url={path} />

            <AdSlot name="articleFooter" className="mt-8" />
          </article>

          <aside className="lg:col-span-4" aria-label="Related guides">
            {game ? (
              <section aria-labelledby="guide-game" className="border-t border-surface-border pt-6">
                <SectionHeader id="guide-game" title="This guide is for" />
                <GameCard game={game} />
              </section>
            ) : null}

            {relatedGuides.length > 0 ? (
              <section aria-labelledby="related-guides" className="mt-10 border-t border-surface-border pt-6">
                <SectionHeader id="related-guides" title="Related guides" />
                <div className="flex flex-col gap-4">
                  {relatedGuides.slice(0, 3).map((related) => (
                    <GuideCard key={related.slug} guide={related} />
                  ))}
                </div>
              </section>
            ) : null}

            <AdSlot name="newsSidebar" format="rectangle" className="mt-10" />
          </aside>
        </div>
      </div>
    </>
  );
}

function getGuideGame(slug: string) {
  return getGameBySlug(slug);
}
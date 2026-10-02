import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdSlot } from '@/components/AdSlot';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GameCard } from '@/components/GameCard';
import { NewsCard } from '@/components/NewsCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ShareButtons } from '@/components/ShareButtons';
import { getAllNews, getAuthorFor, getGameBySlug, getNewsBySlug } from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd, personJsonLd } from '@/lib/seo';
import { canonical, formatDate, toIsoDate } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllNews().map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getNewsBySlug(params.slug);

  if (!article) {
    return buildPageMetadata({
      title: 'Article not found',
      description: 'This article does not exist or has been moved.',
      path: `/news/${params.slug}`,
      index: false,
    });
  }

  const path = `/news/${article.slug}`;

  return buildPageMetadata({
    title: article.title,
    description: article.summary,
    path,
    image: article.heroImage,
    imageAlt: article.imageAlt,
    type: 'article',
    publishedTime: toIsoDate(article.publishedAt),
    ...(article.updatedAt ? { modifiedTime: toIsoDate(article.updatedAt) } : {}),
  });
}

export default function NewsArticlePage({ params }: PageProps) {
  const article = getNewsBySlug(params.slug);
  if (!article) notFound();

  const author = getAuthorFor(article.authorId);
  const path = `/news/${article.slug}`;

  const relatedArticles = article.relatedArticleSlugs
    .map(getNewsBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const relatedGames = article.relatedGameSlugs
    .map(getGameBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${canonical(path)}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(path) },
    headline: article.title,
    description: article.summary,
    image: [article.heroImage],
    datePublished: toIsoDate(article.publishedAt),
    dateModified: toIsoDate(article.updatedAt ?? article.publishedAt),
    inLanguage: 'en-US',
    author: { '@id': `${canonical(`/authors/${author.slug}`)}#person` },
    publisher: { '@id': `${canonical('/')}#organization` },
    articleSection: article.category,
    ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
  };

  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: article.title, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@graph': [articleJsonLd, personJsonLd({ name: author.name, jobTitle: author.role, url: canonical(`/authors/${author.slug}`) })],
          }),
        }}
      />
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <div className="editorial-container py-8 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'News', href: '/news' },
            { label: article.title },
          ]}
        />

        <div className="grid grid-cols-1 gap-gutter-desktop lg:grid-cols-12">
          {/* Article column */}
          <article className="lg:col-span-8">
            <header>
              <Link
                href={`/news/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="kicker border border-accent/30 bg-accent-tint px-2 py-0.5 text-accent-hover"
              >
                {article.category}
              </Link>

              <h1 className="mt-4 font-serif text-headline-lg font-semibold leading-tight tracking-tight text-ink md:text-display-hero">
                {article.title}
              </h1>

              <p className="mt-4 text-subhead-editorial leading-relaxed text-ink-muted">
                {article.summary}
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
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </dd>

                  {article.updatedAt ? (
                    <>
                      <dt className="sr-only">Last updated</dt>
                      <dd aria-hidden="true">·</dd>
                      <dd>
                        Updated{' '}
                        <time dateTime={article.updatedAt}>
                          {formatDate(article.updatedAt)}
                        </time>
                      </dd>
                    </>
                  ) : null}

                  <dt className="sr-only">Reading time</dt>
                  <dd aria-hidden="true">·</dd>
                  <dd>{article.readTime}</dd>
                </dl>
              </div>
            </header>

            <figure className="figure-breakout mt-8">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface-low">
                <Image
                  src={article.heroImage}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <figcaption>{article.imageAlt}</figcaption>
            </figure>

            <div className="prose-editorial mt-8">
              <p>{article.introduction}</p>

              <h2>What happened</h2>
              <p>{article.mainStory}</p>

              {/* A pull quote is rendered only when the piece carries a real,
                  attributable quotation. Earlier versions rendered the same
                  unsourced sentence on every article. */}
              {article.pullQuote ? (
                <blockquote className="my-10 border-l-2 border-accent pl-5">
                  <p className="pull-quote">&ldquo;{article.pullQuote.text}&rdquo;</p>
                  <footer className="mt-3 font-sans text-[13px] not-italic text-ink-muted">
                    &mdash; {article.pullQuote.attribution}
                  </footer>
                </blockquote>
              ) : null}

              <h2>What we know</h2>
              <p>{article.whatWeKnow}</p>

              <AdSlot name="articleMid" className="my-10 not-prose" />

              <h2>Why it matters</h2>
              <p>{article.whyItMatters}</p>

              <h2>What happens next</h2>
              <p>{article.whatHappensNext}</p>
            </div>

            <ShareButtons title={article.title} url={path} />

            {article.tags?.length ? (
              <ul aria-label="Article tags" className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-surface-border bg-canvas px-2.5 py-1 text-[12px] text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <AdSlot name="articleFooter" className="mt-8" />
          </article>

          {/* Contextual sidebar */}
          <aside className="lg:col-span-4" aria-label="Related coverage">
            {relatedGames.length > 0 ? (
              <section aria-labelledby="mentioned-games" className="border-t border-surface-border pt-6">
                <h2 id="mentioned-games" className="font-serif text-headline-sm font-semibold text-ink">
                  Games in this article
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                  {relatedGames.slice(0, 4).map((game) => (
                    <GameCard key={game.slug} game={game} />
                  ))}
                </div>
              </section>
            ) : null}

            {relatedArticles.length > 0 ? (
              <section aria-labelledby="related-news" className="mt-10 border-t border-surface-border pt-6">
                <SectionHeader id="related-news" title="Related coverage" />
                <div className="flex flex-col gap-4">
                  {relatedArticles.slice(0, 3).map((related) => (
                    <NewsCard key={related.slug} article={related} />
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
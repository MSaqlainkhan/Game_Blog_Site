import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GuideCard } from '@/components/GuideCard';
import { NewsCard } from '@/components/NewsCard';
import { ReviewCard } from '@/components/ReviewCard';
import { SectionHeader } from '@/components/SectionHeader';
import { getAllAuthors, getAuthorBySlug } from '@/data/authors';
import { getAllGuides, getAllNews, getAllReviews } from '@/lib/data';
import { breadcrumbJsonLd, buildPageMetadata, jsonLd, personJsonLd } from '@/lib/seo';
import { canonical } from '@/lib/site';

interface PageProps {
  params: { slug: string };
}

/** Only real authors from data/authors.ts get a route. */
export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAuthorBySlug(params.slug);

  if (!author) {
    return buildPageMetadata({
      title: 'Author not found',
      description: 'This author profile does not exist.',
      path: `/authors/${params.slug}`,
      index: false,
    });
  }

  return buildPageMetadata({
    title: `${author.name} — ${author.role}`,
    description: `Articles, reviews and guides published by ${author.name}, the ${author.role} at GamersPulse.`,
    path: `/authors/${author.slug}`,
  });
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const news = getAllNews().filter((article) => article.authorId === author.slug);
  const reviews = getAllReviews().filter((review) => review.authorId === author.slug);
  const guides = getAllGuides().filter((guide) => guide.authorId === author.slug);

  const path = `/authors/${author.slug}`;
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: author.name, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(personJsonLd({ name: author.name, jobTitle: author.role, url: canonical(path) })),
        }}
      />
      {crumbs ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
      ) : null}

      <div className="editorial-container py-8 md:py-10">
        <Breadcrumbs items={[{ label: author.name }]} />

        <article>
          <header className="border-b border-surface-border pb-6">
            <p className="kicker text-accent">{author.role}</p>
            <h1 className="mt-2 font-serif text-headline-lg font-semibold tracking-tight text-ink md:text-display-hero">
              {author.name}
            </h1>

            {author.bio.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 max-w-2xl text-body-default leading-relaxed text-ink-muted"
              >
                {paragraph}
              </p>
            ))}

            {author.coverage.length > 0 ? (
              <>
                <h2 className="kicker mt-6 text-ink-faint">Areas of coverage</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {author.coverage.map((area) => (
                    <li
                      key={area}
                      className="border border-surface-border bg-canvas px-2.5 py-1 text-[12px] text-ink-muted"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </header>

          {reviews.length > 0 ? (
            <section aria-labelledby="author-reviews" className="mt-10">
              <SectionHeader
                id="author-reviews"
                badge="Reviews"
                title={`Reviews by ${author.name}`}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <ReviewCard key={review.slug} review={review} />
                ))}
              </div>
            </section>
          ) : null}

          {news.length > 0 ? (
            <section aria-labelledby="author-news" className="mt-12">
              <SectionHeader
                id="author-news"
                badge="News"
                title={`News and analysis by ${author.name}`}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {news.map((article) => (
                  <NewsCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ) : null}

          {guides.length > 0 ? (
            <section aria-labelledby="author-guides" className="mt-12">
              <SectionHeader
                id="author-guides"
                badge="Guides"
                title={`Guides by ${author.name}`}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {guides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>
    </>
  );
}
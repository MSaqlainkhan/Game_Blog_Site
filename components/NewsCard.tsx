import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { getAuthorFor } from '@/lib/data';
import { formatDate } from '@/lib/site';
import type { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
  /** Only the page's lead image should be eagerly loaded. */
  priority?: boolean;
}

/**
 * News teaser.
 *
 * `featured` renders the broadsheet lead card (image beside headline). The
 * default variant is a flat editorial card separated by hairline borders, not
 * a floating surface — depth comes from rules and whitespace, not shadows.
 */
export function NewsCard({ article, featured = false, priority = false }: NewsCardProps) {
  const author = getAuthorFor(article.authorId);

  if (featured) {
    return (
      <article className="group grid grid-cols-1 items-stretch gap-gutter-desktop lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Link
            href={`/news/${article.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface-low"
          >
            <Image
              src={article.heroImage}
              alt={article.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="kicker border border-accent/30 bg-accent-tint px-2 py-0.5 text-accent-hover">
                {article.category}
              </span>
            </div>

            <h2 className="font-serif text-headline-sm font-semibold leading-tight tracking-tight text-ink md:text-headline-lg">
              <Link
                href={`/news/${article.slug}`}
                className="transition-colors hover:text-accent-hover"
              >
                {article.title}
              </Link>
            </h2>

            <p className="mt-3 text-body-default leading-relaxed text-ink-muted">
              {article.summary}
            </p>
          </div>

          <div className="mt-6 border-t border-surface-border pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/authors/${author.slug}`}
                className="text-meta-stamp font-medium text-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
              >
                {author.name}
              </Link>
              <p className="meta-stamp text-ink-muted">
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <span aria-hidden="true"> · </span>
                {article.readTime}
              </p>
            </div>

            <Link
              href={`/news/${article.slug}`}
              className="mt-4 inline-flex items-center gap-2 bg-ink px-4 py-2 text-body-compact font-medium text-white transition-colors hover:bg-accent"
            >
              Read full story
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between border border-surface-border bg-white p-4 transition-colors hover:border-outline-variant">
      <div>
        <Link
          href={`/news/${article.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mb-4 block aspect-[16/9] overflow-hidden rounded bg-surface-low"
        >
          <Image
            src={article.heroImage}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="kicker absolute left-2.5 top-2.5 border border-surface-border bg-white/90 px-2 py-0.5 text-accent-hover">
            {article.category}
          </span>
        </Link>

        <p className="meta-stamp mb-1 flex flex-wrap items-center gap-1.5 text-ink-muted">
          <Link
            href={`/authors/${author.slug}`}
            className="font-medium text-ink underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
          >
            {author.name}
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </p>

        <h3 className="font-serif text-headline-sm font-medium leading-snug text-ink">
          <Link
            href={`/news/${article.slug}`}
            className="transition-colors hover:text-accent-hover"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-3 text-body-compact leading-relaxed text-ink-muted">
          {article.summary}
        </p>
      </div>

      <Link
        href={`/news/${article.slug}`}
        className="mt-4 inline-flex items-center gap-1 border-t border-surface-border pt-3 text-body-compact font-medium text-accent-hover transition-colors hover:text-ink"
      >
        Read the analysis
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
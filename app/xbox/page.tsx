import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlatformIndex } from '@/components/PlatformIndex';
import { getPlatformPage } from '@/lib/platforms';
import { buildPageMetadata } from '@/lib/seo';

const PATH = '/xbox';

/**
 * Platform category page. Metadata and canonical URL are generated from the
 * shared platform definition so they cannot drift from the rendered content.
 */
export function generateMetadata(): Metadata {
  const page = getPlatformPage(PATH);

  if (!page) {
    return buildPageMetadata({
      title: 'Platform not found',
      description: 'This platform page does not exist.',
      path: PATH,
      index: false,
    });
  }

  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default function Page() {
  const page = getPlatformPage(PATH);

  /*
   * The route only exists while the platform meets the content bar. Returning
   * an empty page here would serve an indexable 200 with no content, which is a
   * soft 404 — far worse than a real 404. `getPlatformPages` also excludes it
   * from the sitemap, so the two stay consistent.
   */
  if (!page) notFound();

  return <PlatformIndex {...page} />;
}

/**
 * Content validator.
 *
 * Fails the build when the content store is internally inconsistent. This is
 * the guard rail behind the "add this article to GamersPulse" workflow: it makes
 * it impossible to publish an article with a missing required field, a
 * duplicate slug, or a broken internal reference.
 *
 * Run: npm run validate:content
 */

import { loadContent } from './load-content.mjs';

const { authors, games, reviews, news, guides } = loadContent();

const newsArticles = news.newsArticles;
const guidesData = guides.guides;
const gamesData = games.games;
const reviewsData = reviews.reviews;

const errors = [];
const warnings = [];

/* -------------------------------------------------------------------------- */

function checkUniqueSlugs() {
  const seen = new Map();

  const register = (slug, kind, title) => {
    if (seen.has(slug)) {
      errors.push(`Duplicate slug "${slug}": ${seen.get(slug)} and ${kind} "${title}"`);
    } else {
      seen.set(slug, `${kind} "${title}"`);
    }
  };

  for (const g of gamesData) register(g.slug, 'Game', g.title);
  for (const r of reviewsData) register(r.slug, 'Review', r.gameTitle);
  for (const a of newsArticles) register(a.slug, 'News', a.title);
  for (const g of guidesData) register(g.slug, 'Guide', g.title);

  return seen;
}

const slugs = checkUniqueSlugs();

/* -------------------------------------------------------------------------- */

function checkRequiredFields() {
  const DATE = /^[A-Z][a-z]+ \d{1,2}, \d{4}$/;

  const newsFields = [
    'id',
    'slug',
    'title',
    'category',
    'summary',
    'heroImage',
    'imageAlt',
    'publishedAt',
    'readTime',
    'authorId',
    'introduction',
    'mainStory',
    'whatWeKnow',
    'whyItMatters',
    'whatHappensNext',
  ];

  for (const article of newsArticles) {
    for (const field of newsFields) {
      const value = article[field];
      if (!value || (typeof value === 'string' && !value.trim())) {
        errors.push(`news/${article.slug}: missing required field "${field}"`);
      }
    }
    if (!DATE.test(article.publishedAt)) {
      errors.push(
        `news/${article.slug}: publishedAt "${article.publishedAt}" must be "Month D, YYYY" so it sorts correctly`,
      );
    }
    if (article.updatedAt && !DATE.test(article.updatedAt)) {
      errors.push(`news/${article.slug}: updatedAt "${article.updatedAt}" must be "Month D, YYYY"`);
    }
    // A pull quote must be attributable.
    if (article.pullQuote && !article.pullQuote.attribution?.trim()) {
      errors.push(
        `news/${article.slug}: pullQuote is set but has no attribution — an unattributed quotation must not be rendered as one`,
      );
    }
  }

  const reviewFields = [
    'id',
    'slug',
    'gameTitle',
    'gameSlug',
    'coverImage',
    'imageAlt',
    'genre',
    'platforms',
    'score',
    'summary',
    'authorId',
    'publishedAt',
    'verdict',
    'breakdown',
  ];

  for (const review of reviewsData) {
    for (const field of reviewFields) {
      const value = review[field];
      if (value === undefined || value === null || value === '') {
        errors.push(`reviews/${review.slug}: missing required field "${field}"`);
      }
    }
    if (review.imageAlt === review.gameTitle) {
      warnings.push(
        `reviews/${review.slug}: imageAlt is just the game title — describe what the image actually shows`,
      );
    }
  }

  const guideFields = [
    'id',
    'slug',
    'title',
    'category',
    'summary',
    'heroImage',
    'imageAlt',
    'publishedAt',
    'readTime',
    'authorId',
    'gameTitle',
    'sections',
    'keyTips',
  ];

  for (const guide of guidesData) {
    for (const field of guideFields) {
      const value = guide[field];
      if (value === undefined || value === null || value === '') {
        errors.push(`guides/${guide.slug}: missing required field "${field}"`);
      }
    }
    if (Array.isArray(guide.sections) && guide.sections.length === 0) {
      errors.push(`guides/${guide.slug}: has no sections`);
    }
    if (!DATE.test(guide.publishedAt)) {
      errors.push(
        `guides/${guide.slug}: publishedAt "${guide.publishedAt}" must be "Month D, YYYY"`,
      );
    }
  }

  const gameFields = [
    'id',
    'slug',
    'title',
    'coverImage',
    'heroImage',
    'imageAlt',
    'genre',
    'platforms',
    'releaseDate',
    'developer',
    'publisher',
    'description',
    'overview',
  ];

  for (const game of gamesData) {
    for (const field of gameFields) {
      const value = game[field];
      if (value === undefined || value === null || value === '') {
        errors.push(`games/${game.slug}: missing required field "${field}"`);
      }
    }
    if (!DATE.test(game.releaseDate)) {
      errors.push(
        `games/${game.slug}: releaseDate "${game.releaseDate}" must be "Month D, YYYY" (put any qualifier such as "Early Access" in releaseNote, not in the date)`,
      );
    }
    if (game.rating !== undefined && (game.rating < 0 || game.rating > 10)) {
      errors.push(`games/${game.slug}: rating ${game.rating} is outside 0-10`);
    }
  }
}

/* -------------------------------------------------------------------------- */

function checkAuthorReferences() {
  const authorIds = new Set(authors.getAllAuthors().map((a) => a.slug));

  const all = [
    ...newsArticles.map((a) => [`news/${a.slug}`, a.authorId]),
    ...reviewsData.map((r) => [`reviews/${r.slug}`, r.authorId]),
    ...guidesData.map((g) => [`guides/${g.slug}`, g.authorId]),
  ];

  for (const [where, authorId] of all) {
    if (!authorIds.has(authorId)) {
      errors.push(
        `${where}: authorId "${authorId}" does not exist in data/authors.ts`,
      );
    }
  }
}

/* -------------------------------------------------------------------------- */

function checkReferences() {
  const resolve = (id, where, field) => {
    if (!slugs.has(id)) {
      errors.push(`${where}: ${field} references "${id}", which does not exist`);
    }
  };

  for (const game of gamesData) {
    game.relatedNewsSlugs.forEach((s) => resolve(s, `games/${game.slug}`, 'relatedNewsSlugs'));
    game.relatedGuideSlugs.forEach((s) => resolve(s, `games/${game.slug}`, 'relatedGuideSlugs'));
    game.relatedGameSlugs.forEach((s) => resolve(s, `games/${game.slug}`, 'relatedGameSlugs'));
  }

  for (const article of newsArticles) {
    article.relatedArticleSlugs.forEach((s) =>
      resolve(s, `news/${article.slug}`, 'relatedArticleSlugs'),
    );
    article.relatedGameSlugs.forEach((s) => resolve(s, `news/${article.slug}`, 'relatedGameSlugs'));
  }

  for (const guide of guidesData) {
    guide.relatedGuideSlugs.forEach((s) => resolve(s, `guides/${guide.slug}`, 'relatedGuideSlugs'));
    guide.relatedGameSlugs.forEach((s) => resolve(s, `guides/${guide.slug}`, 'relatedGameSlugs'));
  }

  const gameSlugs = new Set(gamesData.map((g) => g.slug));

  for (const review of reviewsData) {
    if (!gameSlugs.has(review.gameSlug)) {
      errors.push(`reviews/${review.slug}: gameSlug "${review.gameSlug}" does not exist`);
    }
  }

  for (const guide of guidesData) {
    if (!gameSlugs.has(guide.gameSlug)) {
      errors.push(`guides/${guide.slug}: gameSlug "${guide.gameSlug}" does not exist`);
    }
  }
}

/* -------------------------------------------------------------------------- */

function checkScoresHaveReviews() {
  const reviewedGames = new Set(reviewsData.map((r) => r.gameSlug));

  for (const game of gamesData) {
    if (game.rating !== undefined && !reviewedGames.has(game.slug)) {
      // A score on a game page with no review would be a fabricated rating.
      errors.push(
        `games/${game.slug}: has rating ${game.rating} but no review exists. A score may only appear where a real review was written.`,
      );
    }
  }
}

function checkImageAltText() {
  const all = [
    ...newsArticles.map((a) => [`news/${a.slug}`, a.imageAlt]),
    ...reviewsData.map((r) => [`reviews/${r.slug}`, r.imageAlt]),
    ...guidesData.map((g) => [`guides/${g.slug}`, g.imageAlt]),
    ...gamesData.map((g) => [`games/${g.slug}`, g.imageAlt]),
  ];

  for (const [where, alt] of all) {
    if (!alt || alt.trim().length < 5) {
      errors.push(`${where}: imageAlt is too short to be useful`);
    }
  }
}

function checkDuplicatedImages() {
  const byUrl = new Map();

  const register = (url, where) => {
    const list = byUrl.get(url) ?? [];
    list.push(where);
    byUrl.set(url, list);
  };

  for (const a of newsArticles) register(a.heroImage, `news/${a.slug}`);
  for (const r of reviewsData) register(r.coverImage, `reviews/${r.slug}`);
  for (const g of guidesData) register(g.heroImage, `guides/${g.slug}`);
  for (const g of gamesData) {
    register(g.coverImage, `games/${g.slug} (cover)`);
    register(g.heroImage, `games/${g.slug} (hero)`);
  }

  for (const [url, where] of byUrl) {
    if (where.length > 1) {
      warnings.push(`Image reused across ${where.length} places: ${where.join(', ')}`);
    }
  }
}

/* -------------------------------------------------------------------------- */

checkRequiredFields();
checkAuthorReferences();
checkReferences();
checkScoresHaveReviews();
checkImageAltText();
checkDuplicatedImages();

/* -------------------------------------------------------------------------- */

console.log(
  `Checked ${gamesData.length} games, ${reviewsData.length} reviews, ${newsArticles.length} news articles, ${guidesData.length} guides.`,
);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const warning of warnings) console.log(`  ! ${warning}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const error of errors) console.error(`  x ${error}`);
  process.exit(1);
}

console.log('\nContent OK.');

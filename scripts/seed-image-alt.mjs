/**
 * One-off maintenance script: insert an `imageAlt` field into every content
 * record in data/*.ts.
 *
 * The images currently used across the site are generic stock photography from
 * Unsplash, reused across unrelated games. Describing them as if they were
 * screenshots of the specific game would mislead screen-reader users, so the
 * alt text states what the image actually is.
 *
 * When real artwork is supplied, replace the image URL and `imageAlt` together.
 *
 * Run: node scripts/seed-image-alt.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

/**
 * For each file: which URL field ends the image group, and which field holds
 * the record's display title.
 */
const TARGETS = [
  { file: 'data/games.ts', lastImageField: 'heroImage', titleField: 'title' },
  { file: 'data/reviews.ts', lastImageField: 'coverImage', titleField: 'gameTitle' },
  { file: 'data/news.ts', lastImageField: 'heroImage', titleField: 'title' },
  { file: 'data/guides.ts', lastImageField: 'heroImage', titleField: 'title' },
];

for (const { file, lastImageField, titleField } of TARGETS) {
  const path = join(ROOT, file);
  const lines = readFileSync(path, 'utf8').split('\n');

  const out = [];
  let title = null;
  let done = false;
  let inserted = 0;

  for (const line of lines) {
    // A new record begins at `id:`; reset per-record state.
    if (/^\s*id:\s*'/.test(line)) {
      title = null;
      done = false;
    }

    // Titles containing an apostrophe are written with double quotes, so both
    // quoting styles must be accepted.
    const titleMatch = line.match(new RegExp(`^\\s*${titleField}:\\s*["'](.*)["'],?\\s*$`));
    if (titleMatch) title = titleMatch[1];

    out.push(line);

    if (done) continue;

    const isLastImage = new RegExp(`^\\s*${lastImageField}:\\s*'https://images\\.unsplash\\.com/`);
    if (!isLastImage.test(line)) continue;

    if (!title) throw new Error(`No ${titleField} seen before ${lastImageField} in ${file}`);

    // JSON.stringify picks safe quoting for titles containing apostrophes.
    out.push(`    imageAlt: ${JSON.stringify(`Illustrative gaming photograph for ${title}`)},`);
    done = true;
    inserted += 1;
  }

  writeFileSync(path, out.join('\n'));
  console.log(`${file}: inserted ${inserted} imageAlt field(s)`);
}
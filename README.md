# GamersPulse

An independent gaming news, reviews and guides publication. Next.js 14 App
Router, TypeScript, Tailwind CSS.

```bash
npm install
cp .env.example .env.local     # then fill in the values you have
npm run dev                    # http://localhost:3000

npm run validate:content       # content integrity checks
npm run build                  # validate + production build
npm run start
npm run lint
```

---

## Adding an article

See **[`content/README.md`](content/README.md)**. In short: edit one file in
`data/`, and everything else — route, canonical, Open Graph, structured data,
category page, homepage feed, related content and `sitemap.xml` — is generated
automatically.

---

## Configuration

All configuration is environment-driven. See [`.env.example`](.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` | Real AdSense publisher ID (`ca-pub-…`). Drives `/ads.txt` and the AdSense script. Never hard-coded. |
| `NEXT_PUBLIC_ADSENSE_SLOT_*` | Real ad unit IDs, one per named slot in `lib/ads.ts`. Until these are set, slots render a labelled placeholder and no request is made to Google. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The editorial address shown on `/contact` and `/corrections`. Until set, those pages say so plainly rather than printing a fabricated address. |

Neither ID is invented anywhere in the codebase. Both the publisher ID and the
AdSense script value must come from your own AdSense dashboard.

The AdSense snippet is server-rendered by the root layout (`app/layout.tsx`)
straight into `<head>`, on every page, which is where the AdSense account
instructs it to be placed. The other copy of the tag in the document body of the
served HTML is only the React Server Component payload, not a second script.

### Production

```bash
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=you@yourdomain.com
npm run build && npm run start
```

`NEXT_PUBLIC_*` values are inlined at build time, so they must be present in the
build environment, not just at runtime.

---

## SEO infrastructure

| Endpoint | Implementation |
| --- | --- |
| `/robots.txt` | `app/robots.ts` — allows all public content, disallows only `/search` |
| `/sitemap.xml` | `app/sitemap.ts` — generated from the content store, real `lastModified` dates, no duplicates, no empty categories |
| `/ads.txt` | `app/ads.txt/route.ts` — generated from the publisher ID env var |
| `/feed.xml` | `app/feed.xml/route.ts` — RSS 2.0 |

Canonical URLs, Open Graph and Twitter metadata are produced by
`buildPageMetadata()` in `lib/seo.ts`. Every indexable page calls it, so no page
can silently fall back to the site-wide default.

Structured data (`WebSite`, `NewsMediaOrganization`, `NewsArticle`, `TechArticle`,
`Review`, `VideoGame`, `BreadcrumbList`, `Person`, `ItemList`) is emitted only
where it accurately describes the page. See the notes on ratings below.

---

## Architecture

```
app/                     routes (App Router)
  [slug]/…               content detail pages, all with generateStaticParams
  news/category/[…]/     indexable news category pages, only non-empty ones
  pc-gaming playstation xbox   platform pages (content-gated, see lib/platforms.ts)
  authors/[slug]/        author profiles from data/authors.ts
components/              presentational components
data/                    the content store — one file per content type
lib/                     data access, SEO helpers, ads config, site config
scripts/                 content validator
types/                   content model
```

- **`lib/site.ts`** — domain, name, navigation, contact, AdSense config.
- **`lib/data.ts`** — all queries and ranked search. Nothing else touches `data/`.
- **`lib/seo.ts`** — `buildPageMetadata`, JSON-LD helpers.
- **`lib/ads.ts`** — named ad slots and their env var mapping.

### Author model

Articles carry `authorId`, resolved through `data/authors.ts`. A missing id
falls back to the desk profile rather than rendering an empty byline or a broken
link. To add a real contributor, add one entry to that file — their profile page,
byline, `Person` schema and sitemap entry are then automatic.

---

## Content integrity

`npm run validate:content` runs as part of `npm run build` and fails on:

- a missing required field (including `imageAlt`)
- a duplicate slug across any content type
- a `relatedXSlugs` reference that does not exist
- a date not in `Month D, YYYY` form
- an unattributed pull quote
- **a game rating with no published review behind it**

The last check exists because six games were displaying scores (9.1–9.7) with no
corresponding review. Those were removed. Scores are only ever displayed where a
real review exists.

Dates are stored as written and rendered verbatim. Nothing back-dates or
forward-dates content. `updatedAt` is shown only when an article has genuinely
been revised.

### Images

Every image carries alt text. The current images are generic stock photography
from Unsplash, reused across unrelated titles; the alt text says what the image
actually is rather than implying it depicts the specific game. **Replace them
with real artwork before applying to AdSense.** The validator reports every
reuse as a warning.

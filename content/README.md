# Adding an article to GamersPulse

You do not need to touch any template, component, sitemap or metadata file.
Adding a piece of content means editing **one file** and, if it is genuinely new,
**one image**.

Everything else — route, canonical URL, Open Graph and Twitter tags,
`NewsArticle` structured data, breadcrumbs, category page, homepage feed, related
content and `sitemap.xml` — is generated from the content store automatically.

---

## 1. Give me this, and I will do the rest

Paste a message in this shape:

```
Add this article to GamersPulse.

TITLE: Nanite Tessellation and What Next-Gen Geometry Means for Open-World Performance
CATEGORY: Industry
AUTHOR: GamersPulse Editorial
PUBLISHED DATE: October 2, 2026
UPDATED DATE: (leave blank if not updated)
FEATURED IMAGE: /images/nanite-tessellation.jpg
IMAGE ALT: Screenshot of Unreal Engine 5 tessellation viewport showing displaced micro-polygons
DESCRIPTION: A deep look at runtime displacement mapping and what it costs in memory bandwidth.
TAGS: Unreal Engine, graphics, performance
GAME (optional, for a game-related piece): elden-ring-shadow-of-the-erdtree
RELATED NEWS (optional): unreal-engine-5-nanite-tessellation-performance

ARTICLE CONTENT:
<the article body>
```

### Required fields

| Field | Notes |
| --- | --- |
| `TITLE` | The headline, in sentence case. Not Title Case shouting. |
| `CATEGORY` | Must be an existing category. Currently: `Gaming News`, `Industry`, `PC`, `PlayStation`, `Nintendo`. |
| `AUTHOR` | Currently only `GamersPulse Editorial`. Use your real name only if you have added it to `data/authors.ts`. |
| `PUBLISHED DATE` | `Month D, YYYY`, e.g. `October 2, 2026`. The real publication date — never back- or forward-dated. |
| `FEATURED IMAGE` | Path or URL of the image. Supply it or say so; I will not pick one for you. |
| `IMAGE ALT` | Required. Describe what the image actually shows. |
| `DESCRIPTION` | One or two sentences, used for the meta description and social cards. Written by you, not auto-generated filler. |
| `ARTICLE CONTENT` | The body. See the section format below. |

### Optional fields

| Field | Notes |
| --- | --- |
| `UPDATED DATE` | Only if the piece has genuinely been revised. Omit for a brand new article. |
| `TAGS` | Comma separated. Used for the tag list and `keywords`. |
| `GAME` | A slug from the catalogue, to link the piece from a game page. |
| `RELATED NEWS` / `RELATED GUIDES` | Slugs. Only link things that are genuinely related — an irrelevant link is worse than no link. |

**If anything required is missing, I will tell you exactly what is missing
rather than inventing it.** I will not guess a date, an author, a score, a
quotation, a source or an image.

---

## 2. Where the article is stored

| Content type | File |
| --- | --- |
| News / analysis | `data/news.ts` |
| Reviews | `data/reviews.ts` |
| Guides | `data/guides.ts` |
| Games | `data/games.ts` |
| Authors | `data/authors.ts` |
| Game genres | `data/categories.ts` |

One file per content type. Adding a news article means appending one object to
the `newsArticles` array in `data/news.ts`. Nothing else changes.

---

## 3. Article body format

News articles have five fixed sections, matching `NewsArticle` in
`types/index.ts`:

```ts
{
  id: 'unique-slug',
  slug: 'unique-slug',            // must be unique across the site
  title: 'The headline',
  category: 'Industry',
  summary: 'One or two sentences. This is also the meta description.',
  heroImage: '/images/your-image.jpg',
  imageAlt: 'What the image actually shows',
  publishedAt: 'October 2, 2026',
  updatedAt: undefined,           // only when genuinely revised
  readTime: '6 min read',
  authorId: 'gamerspulse-editorial',
  introduction: 'Opening paragraph.',
  mainStory: 'The body of the piece.',
  pullQuote: {                    // omit entirely if there is no real,
    text: 'A real quotation.',   // attributable quote. Never reused
    attribution: 'Name, Role',   // across articles.
  },
  whatWeKnow: 'What is established.',
  whyItMatters: 'Why the reader should care.',
  whatHappensNext: 'What to watch.',
  relatedArticleSlugs: [],
  relatedGameSlugs: [],
  tags: ['graphics', 'performance'],
}
```

Guides use `sections: [{ title, content, keyPoints }]` instead.

## 4. Before publishing

```bash
npm run validate:content   # checks required fields, unique slugs, broken references
npm run build             # regenerates all routes and the sitemap
```

`validate:content` will fail the build on a missing required field, a duplicate
slug, or a `relatedXSlugs` entry pointing at something that does not exist.

## 5. Images

- Put the file in `public/images/`.
- Always give it alt text. The validator will not accept an article without it.
- Supply images you have the right to use. Do not scrape images from Google
  search or another publisher's site. Official press assets are fine where the
  rights holder permits editorial use.
- Give the image real width and height so the layout does not shift.

## 6. What is deliberately not automated

These are not generated for you, on purpose:

- **Review scores.** A score only exists if a real review was written.
- **Author names and bios.** Only real people go in `data/authors.ts`.
- **Publication dates.** Supplied by you, used verbatim.
- **Quotations and sources.** Must come from a real, attributable source.
- **`aggregateRating` markup.** GamersPulse scores are its own editorial
  judgement, not an aggregate, so they are never marked up as one.

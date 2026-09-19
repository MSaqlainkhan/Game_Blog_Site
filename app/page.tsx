import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllGames,
  getAllReviews,
  getAllNews,
  getAllGuides,
  getAllCategories
} from '@/lib/data';
import { SectionHeader } from '@/components/SectionHeader';
import { GameCard } from '@/components/GameCard';
import { ReviewCard } from '@/components/ReviewCard';
import { NewsCard } from '@/components/NewsCard';
import { GuideCard } from '@/components/GuideCard';
import { CategoryCard } from '@/components/CategoryCard';
import { Newsletter } from '@/components/Newsletter';
import { AdSlot } from '@/components/AdSlot';
import { ArrowRight, Clock, Calendar, Sparkles, TrendingUp, Compass } from 'lucide-react';

export default function HomePage() {
  const allGames = getAllGames();
  const allReviews = getAllReviews();
  const allNews = getAllNews();
  const allGuides = getAllGuides();
  const allCategories = getAllCategories();

  // Featured Hero Story (top news/editorial)
  const heroStory = allNews[0];

  // Trending Now items (mix of acclaimed games and hot guides)
  const trendingItems = [
    {
      type: 'Game',
      title: allGames[0].title,
      summary: allGames[0].description,
      image: allGames[0].coverImage,
      category: allGames[0].genre,
      url: `/games/${allGames[0].slug}`,
      badge: '9.6 Rating',
    },
    {
      type: 'Guide',
      title: allGuides[0].title,
      summary: allGuides[0].summary,
      image: allGuides[0].heroImage,
      category: allGuides[0].category,
      url: `/guides/${allGuides[0].slug}`,
      badge: allGuides[0].readTime,
    },
    {
      type: 'Review',
      title: `${allReviews[2].gameTitle} Review`,
      summary: allReviews[2].summary,
      image: allReviews[2].coverImage,
      category: '9.8 Masterpiece',
      url: `/reviews/${allReviews[2].slug}`,
      badge: 'Score: 9.8',
    },
    {
      type: 'News',
      title: allNews[1].title,
      summary: allNews[1].summary,
      image: allNews[1].heroImage,
      category: allNews[1].category,
      url: `/news/${allNews[1].slug}`,
      badge: allNews[1].readTime,
    },
  ];

  // News section: 1 featured + 4 smaller
  const featuredNews = allNews[0];
  const secondaryNews = allNews.slice(1, 5);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-surface border border-surface-border overflow-hidden shadow-2xl">
            {/* Background Hero Image */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[380px] md:min-h-[520px]">
              <Image
                src={heroStory.heroImage}
                alt={heroStory.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-300 mb-3">
                  <span className="px-3 py-1 rounded-full bg-pulse text-background font-black uppercase tracking-wider text-xs shadow-pulse-glow">
                    {heroStory.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-4 h-4 text-pulse" />
                    {heroStory.publishedAt}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-4 h-4 text-pulse" />
                    {heroStory.readTime}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  {heroStory.title}
                </h1>

                <p className="text-sm md:text-base text-slate-300 line-clamp-3 md:line-clamp-2 mb-6 leading-relaxed">
                  {heroStory.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/news/${heroStory.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pulse text-background font-bold text-sm hover:bg-pulse-hover transition-all duration-200 shadow-pulse-glow"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/games"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-subtle/80 hover:bg-surface border border-surface-border hover:border-pulse/40 text-white font-bold text-sm transition-all duration-200"
                  >
                    <Compass className="w-4 h-4 text-pulse" />
                    <span>Explore Games</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING NOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="In The Spotlight"
          title="Trending Now"
          description="High-interest gaming stories, landmark release guides, and critical review scores."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="group relative flex flex-col rounded-2xl bg-surface border border-surface-border overflow-hidden hover:border-pulse/40 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-background/80 text-pulse border border-pulse/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded bg-surface/80 border border-surface-border text-[11px] font-mono text-slate-300 backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <span className="text-[11px] font-bold text-pulse uppercase tracking-wider mb-1">
                  {item.type}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white group-hover:text-pulse transition-colors line-clamp-2 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                  {item.summary}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-pulse mt-3 pt-2 border-t border-surface-border/60">
                  <span>View content</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ADVERTISING READINESS CONTAINER 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot format="horizontal" slotId="home-leaderboard-top" />
      </div>

      {/* 3. EXPLORE GAMES BY GENRE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Game Discovery"
          title="Explore Games by Genre"
          description="Browse our curated index across varied game mechanics, from tactical roleplaying epics to cozy deckbuilders."
          viewAllHref="/games"
          viewAllText="View Full Catalog"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED GAMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Curated Index"
          title="Featured Games"
          description="Hand-picked modern titles with exceptional gameplay mechanics, technical ambition, and high critical acclaim."
          viewAllHref="/games"
          viewAllText="Browse All Games"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGames.slice(0, 6).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 5. LATEST GAMING NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Journalism & Tech"
          title="Latest Gaming News & Analysis"
          description="Thoughtful coverage of engine architecture, portable hardware shifts, and player-first game design."
          viewAllHref="/news"
          viewAllText="More News"
        />

        <div className="space-y-8">
          {/* Featured Large Article */}
          <NewsCard article={featuredNews} featured />

          {/* 4 Smaller Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Editorial Verdicts"
          title="Latest Game Reviews"
          description="Uncompromised evaluations measuring gameplay loops, performance stability, and overall value."
          viewAllHref="/reviews"
          viewAllText="All Reviews"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 7. GAMING GUIDES (LEVEL UP YOUR GAME) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Level Up Your Game"
          title="Actionable Gaming Guides"
          description="In-depth build optimization, boss survival tactics, and mathematical breakdowns to conquer your games."
          viewAllHref="/guides"
          viewAllText="Explore All Guides"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGuides.slice(0, 6).map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Newsletter />
      </div>
    </div>
  );
}

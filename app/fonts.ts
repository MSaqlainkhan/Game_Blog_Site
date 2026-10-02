import { Inter, Newsreader } from 'next/font/google';

/**
 * Self-hosted fonts via next/font.
 *
 * This replaces a render-blocking <link> to fonts.googleapis.com that caused a
 * third-party round trip and a flash of unstyled text on every page load.
 * next/font downloads the font files at build time, self-hosts them, emits
 * preload hints and a stylesheet that is served from the same origin.
 *
 * Weight and style coverage matches the design specification:
 *  - Newsreader: 400/500/600 upright + italic (display, headlines, pull quotes)
 *  - Inter: 400/500/600/700 (body prose, metadata, UI)
 */

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
  // Preload only the upright 400 face; the rest is fetched on demand.
  preload: true,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

/** Class list to place on <html> so both CSS variables are defined. */
export const fontVariables = `${newsreader.variable} ${inter.variable}`;
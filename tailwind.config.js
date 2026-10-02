/**
 * GamersPulse editorial design system.
 *
 * Source of truth: the approved "GamersPulse Editorial" design specification
 * (Editorial Minimalism with Classic Broadsheet Cadence).
 *
 * Principles encoded here:
 *  - Pure white / off-white canvas. The site is never dark.
 *  - Green (#16A34A) is a restrained accent only: rules, score badges, kickers,
 *    focus states. It never fills large regions.
 *  - Depth comes from 1px hairline borders (#E5E7EB), never from drop shadows.
 *  - Corner radii stay tight (2px / 4px / 8px). No pills, no bubbles.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // --- Canvas & surfaces ------------------------------------------------
        background: '#ffffff',
        canvas: '#f7f8fa',
        surface: {
          DEFAULT: '#faf9fd',
          lowest: '#ffffff', // Level 1 — editorial cards & reading panels
          low: '#f4f3f7',
          base: '#efedf1',
          high: '#e9e7eb',
          highest: '#e3e2e6',
          border: '#e5e7eb', // Hairline rules & column dividers
        },

        // --- Text & hierarchy -------------------------------------------------
        ink: {
          DEFAULT: '#202124', // Charcoal Slate — headlines & longform body
          muted: '#5f6368', // Metadata, captions, bylines
          faint: '#9ca3af', // Timestamps & utility labels
        },

        // --- Editorial accent (surgical use only) -----------------------------
        accent: {
          DEFAULT: '#16a34a',
          hover: '#15803d',
          tint: '#f0fdf4', // Scorecards, active tabs, selected callouts
        },

        primary: {
          DEFAULT: '#006b2c',
          container: '#00873a',
        },
        outline: {
          DEFAULT: '#6e7b6c',
          variant: '#bdcaba',
        },
        tertiary: {
          DEFAULT: '#535f58',
          container: '#6b7770',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        inverse: {
          surface: '#2f3033',
          onSurface: '#f1f0f4',
        },
      },

      fontFamily: {
        // Newsreader — display, headlines, pull quotes.
        // Provided by next/font as a CSS variable (see app/fonts.ts).
        serif: ['var(--font-newsreader)', 'Georgia', 'Cambria', "'Times New Roman'", 'serif'],
        // Inter — body prose, metadata, UI.
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },

      // Editorial type scale (px values match the design specification).
      fontSize: {
        'display-hero': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.02em' }],
        'headline-lg': ['2.375rem', { lineHeight: '2.875rem', letterSpacing: '-0.015em' }],
        'headline-md': ['1.625rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }],
        'headline-sm': ['1.25rem', { lineHeight: '1.75rem' }],
        'subhead-editorial': ['1.375rem', { lineHeight: '2rem', letterSpacing: '-0.005em' }],
        'body-editorial': ['1.1875rem', { lineHeight: '2rem', letterSpacing: '-0.005em' }],
        'body-default': ['0.9375rem', { lineHeight: '1.5rem' }],
        'body-compact': ['0.875rem', { lineHeight: '1.25rem' }],
      },

      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '8px',
        xl: '8px',
        full: '9999px',
      },

      // Horizontal rhythm between a picture and its adjacent text column.
      spacing: {
        'gutter-desktop': '2rem',
        gutter: '1.25rem',
      },

      maxWidth: {
        editorial: '1320px',
        prose: '720px',
        'prose-wide': '980px',
      },

      boxShadow: {
        // Level 2 only — dropdowns, overlays and modals. Never coloured.
        overlay: '0 4px 20px -2px rgba(32, 33, 36, 0.06)',
        // Editorial cards are separated by hairline borders, not shadows.
        none: 'none',
      },

      letterSpacing: {
        label: '0.08em',
        widest: '0.14em',
      },
    },
  },
  plugins: [],
};
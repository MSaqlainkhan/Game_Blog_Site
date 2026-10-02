import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — Gaming News, Reviews & Guides`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default Open Graph / Twitter card image.
 *
 * Served from this origin at /opengraph-image, so every page has a social card
 * that resolves without a third-party image host. Individual articles override
 * it with their own featured image.
 *
 * The layout follows the editorial design system: white canvas, hairline rule,
 * charcoal type and a single restrained green accent.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Hairline border frame */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: '2px solid #e5e7eb',
            borderRadius: 8,
            display: 'flex',
          }}
        />

        {/* Restrained green accent rule */}
        <div style={{ display: 'flex', width: 96, height: 6, backgroundColor: '#16a34a' }} />

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 84,
            fontWeight: 700,
            color: '#202124',
            letterSpacing: -2,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 40,
            color: '#5f6368',
          }}
        >
          Gaming News, Reviews & Guides
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            paddingTop: 28,
            borderTop: '2px solid #e5e7eb',
            fontSize: 26,
            lineHeight: 1.4,
            color: '#5f6368',
            maxWidth: 880,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  );
}
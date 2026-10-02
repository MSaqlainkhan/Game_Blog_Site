import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Production domain. The apex `gamerspulse.site` permanently redirects to the
 * canonical `www` host so that every URL has exactly one canonical form.
 */
const CANONICAL_HOST = 'www.gamerspulse.site';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],

    /**
     * The stock Tailwind defaults top out at 3840w. Every `<Image>` on the site
     * advertises that candidate in its srcset — so a 128px thumbnail and the
     * LCP hero both offer a 3840w variant that no viewport ever selects.
     * Capping the ladder at 1600w removes those candidates entirely; the
     * editorial container is 1320px wide, so nothing is lost.
     */
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1600],
    /** Covers the 48px search results and 128px news-row thumbnails. */
    imageSizes: [32, 48, 64, 96, 128, 256],

    // Editorial content is dated and immutable, so re-optimising rarely helps.
    minimumCacheTTL: 60 * 60 * 24 * 30,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  /**
   * lucide-react ships a barrel file. Without this, client chunks can pull the
   * whole icon set instead of only the icons actually imported.
   */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // ads.txt must never be cached for long so a publisher ID change
        // propagates quickly.
        source: '/ads.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
    ];
  },

  async redirects() {
    return [
      // Apex -> canonical www host. Excluded in development so localhost works.
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/',
              has: [
                {
                type: 'host',
                value: 'gamerspulse.site',
              },
              ],
              destination: `https://${CANONICAL_HOST}/`,
              permanent: true,
            },
          ]
        : []),

      // One content slug promised "2026" in the URL while the article is
      // dated 2024. The old URL is preserved permanently for existing links.
      {
        source: '/news/handheld-gaming-pcs-in-2026-linux-proton-status',
        destination: '/news/handheld-gaming-pcs-linux-proton-status',
        permanent: true,
      },
    ];
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

export default nextConfig;
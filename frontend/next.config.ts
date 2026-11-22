import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // next/image + pictures uploaded in Sanity.
  // The custom loader sends the browser straight to Sanity's image CDN, so the
  // Next.js server never has to download the originals (see sanity/imageLoader.ts).
  images: {
    loader: 'custom',
    loaderFile: './sanity/imageLoader.ts',
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },
  // Old /services URLs (bookmarks, search results, links saved in Sanity content)
  async redirects() {
    return [
      {source: '/services', destination: '/explore-collections', permanent: true},
      {source: '/services/:slug', destination: '/explore-collections/:slug', permanent: true},
      // The "Craft Stories" page (formerly "Digital Footprint") was removed
      {source: '/craft-stories', destination: '/', permanent: true},
      {source: '/digital-footprint', destination: '/', permanent: true},
      // Old "Our Technology" page, now "Instagram Feed"
      {source: '/our-technology', destination: '/instagram-feed', permanent: true},
      // Old "Digital Digest" section, now "Design Guide"
      {source: '/digital-digest', destination: '/design-guide', permanent: true},
      {source: '/digital-digest/:slug', destination: '/design-guide/:slug', permanent: true},
      // Common alternative addresses of the footer's legal pages
      {source: '/privacy', destination: '/privacy-policy', permanent: true},
      {source: '/terms', destination: '/terms-and-conditions', permanent: true},
      {source: '/terms-conditions', destination: '/terms-and-conditions', permanent: true},
    ]
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig

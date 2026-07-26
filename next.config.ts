import path from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The floating dev-tools badge, bottom-left. Development only — it never
  // shipped to production — but it sits over the page while working on it.
  devIndicators: false,
  // An unrelated yarn.lock sits in the home directory; without this, Turbopack
  // walks up and picks that as the workspace root.
  turbopack: { root: path.resolve(process.cwd()) },
  async redirects() {
    // /projects was folded into /work — they had become the same page.
    return [{ source: '/projects', destination: '/work', permanent: true }]
  },
  experimental: {
    // Inlines the stylesheet into the document, removing a render-blocking
    // round trip. The CSS is ~21 KB and every route is static, so there is no
    // cache benefit being given up.
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      // YouTube thumbnails, once the channel feed is wired up.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

export default nextConfig

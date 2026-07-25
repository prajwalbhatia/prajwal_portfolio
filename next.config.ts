import path from 'node:path'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // An unrelated yarn.lock sits in the home directory; without this, Turbopack
  // walks up and picks that as the workspace root.
  turbopack: { root: path.resolve(process.cwd()) },
  images: {
    remotePatterns: [
      // YouTube thumbnails, once the channel feed is wired up.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

export default nextConfig

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    cacheComponents: true,
    useCache: true,
  },
}

export default nextConfig

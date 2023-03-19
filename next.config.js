/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['i.seadn.io','api.reservoir.tools', 'raw.githubusercontent.com', 'blur.io', 'www.loot.exchange'],
  }
}

module.exports = nextConfig

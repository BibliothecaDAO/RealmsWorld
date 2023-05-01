/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['i.seadn.io', 'api.reservoir.tools', 'raw.githubusercontent.com', 'blur.io', 'www.loot.exchange', 'gem.xyz', 'sudoswap.xyz', 'openseauserdata.com', 'alienswap.xyz', 'www.ens.vision', 'lh3.googleusercontent.com', 'magically.gg'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      //issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config
  },
}

module.exports = nextConfig
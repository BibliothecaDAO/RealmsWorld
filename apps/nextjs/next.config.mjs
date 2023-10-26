// Importing env files here to validate on build
import "./src/env.mjs";
import "@realms-world/auth/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@realms-world/api",
    "@realms-world/auth",
    "@realms-world/db",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        dns: false,
        tls: false,
        net: false,
      };
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    config.module.rules.push({
      test: /\.svgr$/i,
      //issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svgr": ["@svgr/webpack"],
      },
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "loot-survivor.vercel.app",
      "i.seadn.io",
      "api.reservoir.tools",
      "raw.githubusercontent.com",
      "blur.io",
      "www.loot.exchange",
      "gem.xyz",
      "sudoswap.xyz",
      "openseauserdata.com",
      "alienswap.xyz",
      "www.ens.vision",
      "lh3.googleusercontent.com",
      "magically.gg",
      "pro.opensea.io",
    ],
  },
};

export default config;

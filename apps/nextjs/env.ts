/* eslint-disable no-restricted-properties */
import { env as authEnv } from "@realms-world/auth/env";
import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

export const env = createEnv({
  extends: [authEnv, vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    KEYSTATIC_GITHUB_CLIENT_ID: z.string().optional(),
    KEYSTATIC_GITHUB_CLIENT_SECRET: z.string().optional(),
    KEYSTATIC_SECRET: z.string().optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    DUNE_API_KEY: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_RESERVOIR_API_KEY: z.string(),
    NEXT_PUBLIC_IS_TESTNET: z.enum(["true", "false"]).default("false"),
    NEXT_PUBLIC_ETHERSCAN_URL: z.string().url(),
    NEXT_PUBLIC_VOYAGER_URL: z.string().url(),
    NEXT_PUBLIC_STARKSCAN_URL: z.string().url(),
    NEXT_PUBLIC_APIBARA_HANDLE: z.string(),
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
    NEXT_PUBLIC_BLAST_API: z.string().optional(),
    NEXT_PUBLIC_SUBGRAPH_NAME: z.string().url(),
    NEXT_PUBLIC_REALMS_SUBGRAPH_NAME: z.string().url(),
    NEXT_PUBLIC_REALMS_LEGACY_REWARD_SUBGRAPH_NAME: z.string().url(),
    NEXT_PUBLIC_REALMS_BRIDGE_SUBGRAPH_NAME: z.string().url(),
    NEXT_PUBLIC_ALCHEMY_API: z.string(),
    NEXT_PUBLIC_ETHPLORER_APIKEY: z.string(),
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_GITHUB_REPO_NAME: z.string().optional(),
    NEXT_PUBLIC_GITHUB_REPO_OWNER: z.string().optional(),
    NEXT_PUBLIC_ARK_MARKETPLACE_API: z.string().url(),
    NEXT_PUBLIC_ARK_ORDERBOOK_API: z.string().url(),
    NEXT_PUBLIC_MOBULA_API_KEY: z.string(),
    NEXT_PUBLIC_TESTNET_RPC_URL: z.string().url(),
    NEXT_PUBLIC_MAINNET_RPC_URL: z.string().url(),
    NEXT_PUBLIC_IPFS_GATEWAY: z.string().url(),
    NEXT_PUBLIC_RPC_API_KEY: z.string(),
    NEXT_PUBLIC_IMAGE_PROXY_URL: z.string().url(),
    NEXT_PUBLIC_IMAGE_CDN_URL: z.string().url(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_IS_TESTNET: process.env.NEXT_PUBLIC_IS_TESTNET,
    NEXT_PUBLIC_ETHERSCAN_URL: process.env.NEXT_PUBLIC_ETHERSCAN_URL,
    NEXT_PUBLIC_VOYAGER_URL: process.env.NEXT_PUBLIC_VOYAGER_URL,
    NEXT_PUBLIC_STARKSCAN_URL: process.env.NEXT_PUBLIC_STARKSCAN_URL,
    NEXT_PUBLIC_SUBGRAPH_NAME: process.env.NEXT_PUBLIC_SUBGRAPH_NAME,
    NEXT_PUBLIC_REALMS_BRIDGE_SUBGRAPH_NAME:
      process.env.NEXT_PUBLIC_REALMS_BRIDGE_SUBGRAPH_NAME,
    NEXT_PUBLIC_APIBARA_HANDLE: process.env.NEXT_PUBLIC_APIBARA_HANDLE,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_BLAST_API: process.env.NEXT_PUBLIC_BLAST_API,
    NEXT_PUBLIC_REALMS_SUBGRAPH_NAME:
      process.env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME,
    NEXT_PUBLIC_REALMS_LEGACY_REWARD_SUBGRAPH_NAME:
      process.env.NEXT_PUBLIC_REALMS_LEGACY_REWARD_SUBGRAPH_NAME,
    NEXT_PUBLIC_ALCHEMY_API: process.env.NEXT_PUBLIC_ALCHEMY_API,
    NEXT_PUBLIC_ETHPLORER_APIKEY: process.env.NEXT_PUBLIC_ETHPLORER_APIKEY,
    NEXT_PUBLIC_RESERVOIR_API_KEY: process.env.NEXT_PUBLIC_RESERVOIR_API_KEY,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    NEXT_PUBLIC_GITHUB_REPO_NAME: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME,
    NEXT_PUBLIC_GITHUB_REPO_OWNER: process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER,
    KEYSTATIC_GITHUB_CLIENT_ID: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    KEYSTATIC_GITHUB_CLIENT_SECRET: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    KEYSTATIC_SECRET: process.env.KEYSTATIC_SECRET,
    NEXT_PUBLIC_ARK_MARKETPLACE_API:
      process.env.NEXT_PUBLIC_ARK_MARKETPLACE_API,
    NEXT_PUBLIC_ARK_ORDERBOOK_API: process.env.NEXT_PUBLIC_ARK_ORDERBOOK_API,
    NEXT_PUBLIC_MOBULA_API_KEY: process.env.NEXT_PUBLIC_MOBULA_API_KEY,
    NEXT_PUBLIC_TESTNET_RPC_URL: process.env.NEXT_PUBLIC_TESTNET_RPC_URL,
    NEXT_PUBLIC_MAINNET_RPC_URL: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
    NEXT_PUBLIC_RPC_API_KEY: process.env.NEXT_PUBLIC_RPC_API_KEY,
    NEXT_PUBLIC_IPFS_GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    NEXT_PUBLIC_IMAGE_PROXY_URL: process.env.NEXT_PUBLIC_IMAGE_PROXY_URL,
    NEXT_PUBLIC_IMAGE_CDN_URL: process.env.NEXT_PUBLIC_IMAGE_CDN_URL,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});

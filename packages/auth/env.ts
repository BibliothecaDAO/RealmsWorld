import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*shared: {
    AUTH_URL: z.string().url().optional(),
  },*/
  server: {
    AUTH_DISCORD_ID: z.string().min(1),
    AUTH_DISCORD_SECRET: z.string().min(1),
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NODE_ENV: z.enum(["development", "production"]).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
  },
  client: {},
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});

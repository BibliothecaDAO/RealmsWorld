import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    KEYSTATIC_GITHUB_REPO_OWNER: z.string().optional(),
    KEYSTATIC_GITHUB_REPO_NAME: z.string().optional(),
  },
  client: {},
  experimental__runtimeEnv: {
    KEYSTATIC_GITHUB_REPO_OWNER: process.env.KEYSTATIC_GITHUB_REPO_OWNER,
    KEYSTATIC_GITHUB_REPO_NAME: process.env.KEYSTATIC_GITHUB_REPO_NAME,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});

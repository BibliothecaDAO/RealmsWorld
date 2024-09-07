import path from "path";
import type { Entry } from "@keystatic/core/reader";
import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from '@keystatic/core/reader/github';

import config from "../../keystatic.config";

/**
 * Instruct Next.js to include content directory in serverless function 😵
 * Without this Next.js wont be able to do static analysis and "content" directory will not be available in serverless function
 */
//path.join(process.cwd(), "content");

export const reader = createReader(process.cwd(), config);

export type CollectionEntry<
  T extends keyof (typeof config)["collections"],
> = Entry<(typeof config)["collections"][T]>;

import path from "path";
import type { Entry } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import { cookies, draftMode } from "next/headers";

import config from "../../keystatic.config";
import { env } from "env";

path.join(process.cwd(), "content");

export const reader = cache(() => {
  let isDraftModeEnabled = false;
  // draftMode throws in e.g. generateStaticParams
  try {
    isDraftModeEnabled = draftMode().isEnabled;
  } catch {}

  if (isDraftModeEnabled) {
    const branch = cookies().get("ks-branch")?.value;

    if (branch) {
      return createGitHubReader(config, {
        // Replace the below with your repo org an name
        repo: `${env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/${env.NEXT_PUBLIC_GITHUB_REPO_NAME}`,
        ref: branch,
        pathPrefix: "apps/nextjs",
        // Assuming an existing GitHub app
        token: cookies().get("keystatic-gh-access-token")?.value,
      });
    }
  }
  // If draft mode is off, use the regular reader
  return createReader(process.cwd(), config);
});

export type CollectionEntry<T extends keyof (typeof config)["collections"]> =
  Entry<(typeof config)["collections"][T]>;

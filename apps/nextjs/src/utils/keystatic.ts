import path from "path";
import type { Entry } from "@keystatic/core/reader";
import { cache } from "react";
import { cookies, draftMode } from "next/headers";
import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import { env } from "env";

import type config from "../../keystatic.config";

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
        repo: "REPO_ORG/REPO_NAME",
        ref: branch,
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

export const sortPostsByPublishDate = (
  posts: Entry<(typeof config)["collections"]["blogs"]>[],
): Entry<(typeof config)["collections"]["blogs"]>[] => {
  return posts.slice().sort((postA, postB) => {
    // Handle cases where publishDate is missing
    if (!postA.publishDate) {
      return 1; // Move posts without publishDate to the end
    }
    if (!postB.publishDate) {
      return -1;
    }

    // Convert dates to comparable values
    const dateA = new Date(postA.publishDate);
    const dateB = new Date(postB.publishDate);

    // Compare dates and return sort order
    return dateB.getTime() - dateA.getTime();
  });
};

import type { Entry } from "@keystatic/core/reader";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);

export type CollectionEntry<
  T extends keyof (typeof keystaticConfig)["collections"],
> = Entry<(typeof keystaticConfig)["collections"][T]>;

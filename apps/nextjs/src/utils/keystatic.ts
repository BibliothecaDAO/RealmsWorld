import path from "path";
import type { Entry } from "@keystatic/core/reader";
import { createReader } from "@keystatic/core/reader";

import config from "../../keystatic.config";

path.join(process.cwd(), "content");

export const reader = createReader(process.cwd(), config);

export type CollectionEntry<T extends keyof (typeof config)["collections"]> =
  Entry<(typeof config)["collections"][T]>;

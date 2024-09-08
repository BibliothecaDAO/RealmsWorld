import { env } from "@/env";
import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({
  clientId: env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: env.KEYSTATIC_SECRET,
  config,
});

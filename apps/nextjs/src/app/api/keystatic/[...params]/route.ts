import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../../keystatic.config";
import { env } from "../../../../env";

export const { POST, GET } = makeRouteHandler({
  clientId: env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: env.KEYSTATIC_SECRET,
  config,
});

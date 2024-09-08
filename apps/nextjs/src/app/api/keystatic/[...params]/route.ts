import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../../keystatic.config";
import { env } from "../../../../env";

export const { POST, GET } = makeRouteHandler({
  clientId: "Iv23liWEhighTBlYtJld",
  clientSecret: "6e1f200daa8cd50768cb0efbe32d295c3628189f",
  secret: "gibberish",
  config,
});

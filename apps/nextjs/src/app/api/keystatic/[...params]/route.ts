import { env } from "@/env";
import { makeRouteHandler } from "@keystatic/next/route-handler";

import config from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({ config });

import { makeRouteHandler } from "@keystatic/next/route-handler";

import keyStaticConfig from "../../../../../keystatic.config";
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
    responseLimit: false, 
    
  },
}
export const { POST, GET } = makeRouteHandler({
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  config: keyStaticConfig
});

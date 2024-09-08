import { makeAPIRouteHandler } from '@keystatic/next/api'

import keyStaticConfig from "../../../../../keystatic.config";

export default makeAPIRouteHandler({
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  config: keyStaticConfig
});

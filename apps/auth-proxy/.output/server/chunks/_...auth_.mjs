import { Auth } from '@auth/core';
import Discord from '@auth/core/providers/discord';
import { e as eventHandler, t as toWebRequest } from './nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const ____auth_ = eventHandler(
  async (event) => Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET
      })
    ]
  })
);

export { ____auth_ as default };
//# sourceMappingURL=_...auth_.mjs.map

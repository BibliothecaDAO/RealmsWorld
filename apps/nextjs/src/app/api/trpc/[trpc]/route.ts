import { env } from "@/env.mjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@realms-world/api";
import { auth } from "@realms-world/auth";

export const runtime = "edge";

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Request-Method", "*");
  res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
  const response = new Response(null, {
    status: 204,
  });
  setCorsHeaders(response);
  return response;
}

const handler = auth(async (req): Promise<Response> => {
  const response: Response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createTRPCContext({ auth: req.auth, req }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

  setCorsHeaders(response);
  return response;
});

export { handler as GET, handler as POST };

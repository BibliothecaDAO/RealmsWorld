import { createYoga } from "graphql-yoga";

import { schema } from "@realms-world/graphql-server";

export const runtime = "edge";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  cors: {
    credentials: true,
    origin: "*",
  },
  maskedErrors: false,
  logging: "debug",
});

export { handleRequest as GET, handleRequest as POST };

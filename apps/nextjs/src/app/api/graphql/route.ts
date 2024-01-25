import { createYoga } from "graphql-yoga";

import { schema } from "@realms-world/graphql-server";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  cors: {
    credentials: true,
    origin: "*",
  },
  maskedErrors: false,
});

export { handleRequest as GET, handleRequest as POST };

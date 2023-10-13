import { serve } from "inngest/next";

import { inngest } from "../../../inngest/client";
import { fetchMetadata } from "../../../inngest/fetch_metadata"; // Your own functions

export const runtime = "edge";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [fetchMetadata],
  streaming: "allow",
});

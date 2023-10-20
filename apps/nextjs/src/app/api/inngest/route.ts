import { inngest } from "@/inngest/client";
import { fetchMetadata } from "@/inngest/fetch_metadata"; // Your own functions
import { serve } from "inngest/next";

export const runtime = "edge";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [fetchMetadata],
  //streaming: "allow",
});

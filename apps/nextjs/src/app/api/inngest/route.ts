import { serve } from "inngest/next";

import { inngest } from "../../../inngest/client";
import { fetchMetadata } from "../../../inngest/fetch_metadata"; // Your own functions

export const { GET, POST, PUT } = serve(inngest, [fetchMetadata]);

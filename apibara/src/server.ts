import express from "https://esm.sh/express";
import { serve } from "https://esm.sh/inngest/express";
import { inngest } from "./inngest/client.ts";
import { fetchMetadata } from "./inngest/fetch_metadata.ts";

const app = express();

// @ts-ignore - express types are wrong
app.use(express.json());

app.use("/api/inngest", serve(inngest, [fetchMetadata]));

app.get("/health", (_req, res) => {
    res.send("OK");
});

app.listen(8000, () => {
    console.log("Started server on port 8000");
});
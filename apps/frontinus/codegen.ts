import { METADATA } from "./app/queries";
import type { CodegenConfig } from "@graphql-codegen/cli";

const apiUrl = METADATA["sn"]?.apiUrl ?? "";

const config: CodegenConfig = {
  schema: apiUrl,
  documents: ["src/**/*.tsx", "src/**/*.ts", "!src/gql/**/*"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;

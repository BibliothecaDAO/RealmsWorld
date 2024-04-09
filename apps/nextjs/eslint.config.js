import baseConfig from "@realms-world/eslint-config/base";
import nextjsConfig from "@realms-world/eslint-config/nextjs";
import reactConfig from "@realms-world/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
];
import baseConfig, {
  restrictEnvAccess,
} from "@realms-world/eslint-config/base";
import nextjsConfig from "@realms-world/eslint-config/nextjs";
import reactConfig from "@realms-world/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**", "src/.graphclient/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

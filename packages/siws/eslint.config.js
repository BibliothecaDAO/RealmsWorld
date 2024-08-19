import baseConfig, {
  restrictEnvAccess,
} from "@realms-world/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**", "src/.graphclient/**"],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];

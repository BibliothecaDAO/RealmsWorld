import baseConfig, {
  restrictEnvAccess,
} from "@realms-world/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "drizzle/**"],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];

import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ root: "apps/nextjs" }),
    magicalSvg({
      target: "react",
    }),
  ],
  test: {
    environment: "jsdom",
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      enabled: true,
    },
  },
});

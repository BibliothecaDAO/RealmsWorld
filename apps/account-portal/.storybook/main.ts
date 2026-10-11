import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "node:url";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: fileURLToPath(new URL("./vite.config.ts", import.meta.url)),
      },
    },
  },
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), "storybook/theming/create"],
    };
    return config;
  },
};
export default config;

import type { Preview } from "@storybook/react";

import "./tailwind-imports.css";
import "@realms-world/styles/globals.css";

import * as React from "react";

import { ToastProvider } from "../src/components/ui/toast";
import { Toaster } from "../src/components/ui/toaster";

export const decorators = [
  (Story) => (
    <ToastProvider>
      <Story />
      <Toaster />
    </ToastProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      darkClass: "dark",
      lightClass: "light",
      stylePreview: true,
    },
  },
  decorators: decorators,
};

export default preview;

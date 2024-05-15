import type { Preview } from "@storybook/react";

import "@realms-world/styles/globals.css";

import * as React from "react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "@storybook/theming";

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
const THEME = {
  typography: {
    fonts: {
      base: "Arial, sans-serif",
      mono: "Courier, monospace",
    },
  },
};
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
  decorators: [
    ...decorators,
    withThemeFromJSXProvider({
      themes: {
        dark: THEME,
        light: THEME,
      },
      defaultTheme: "dark",
      Provider: ThemeProvider,
    }),
  ],
};

export default preview;

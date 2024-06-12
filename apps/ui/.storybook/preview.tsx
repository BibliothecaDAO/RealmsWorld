import type { Preview } from "@storybook/react";
import { Inconsolata, Silkscreen } from "next/font/google";

import "./tailwind-imports.css";
import "@realms-world/styles/globals.css";

import * as React from "react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "@storybook/theming";

import { ToastProvider } from "../src/components/ui/toast";
import { Toaster } from "../src/components/ui/toaster";

import "./globals.css";

const baiJamjuree = Silkscreen({
  subsets: ["latin"],
  variable: "--font-bai-jamjuree",
  weight: ["400"],
  display: "swap",
});

const karla = Inconsolata({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "400",
  display: "swap",
});

export const decorators = [
  (Story) => (
    <div className={`${baiJamjuree.variable} ${karla.variable}`}>
      <ToastProvider>
        <Story />
        <Toaster />
      </ToastProvider>
    </div>
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: "dark",
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

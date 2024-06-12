import type { Preview } from "@storybook/react";
//import "./tailwind-imports.css";
//import "@realms-world/styles/globals.css";

import * as React from "react";
import { Inconsolata, Silkscreen } from "next/font/google";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "@storybook/theming";

import { ToastProvider } from "../src/components/ui/toast";
import { Toaster } from "../src/components/ui/toaster";

import "./globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400"],
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  weight: "400",
  display: "swap",
});

export const decorators = [
  (Story) => (
    <div className={`${silkscreen.variable} ${inconsolata.variable} dark`}>
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

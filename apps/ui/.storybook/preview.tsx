import type { Preview } from "@storybook/react";
import { Inconsolata, Silkscreen } from "next/font/google";

import "./tailwind-imports.css";
import "@realms-world/styles/globals.css";

import * as React from "react";

import { ToastProvider } from "../src/components/ui/toast";
import { Toaster } from "../src/components/ui/toaster";

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

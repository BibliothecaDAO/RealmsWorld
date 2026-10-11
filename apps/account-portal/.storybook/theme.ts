import { create } from "storybook/theming/create";

// Storybook chrome uses the Realms graphite + brass palette. Production tokens live in src/styles.css.
export const storybookTheme = create({
  base: "dark",
  brandTitle: "Realms · Account Portal",
  brandImage: "/icon.svg",
  brandUrl: "/?path=/docs/foundations-tokens--docs",
  colorPrimary: "#e7cf88",
  colorSecondary: "#e7cf88",
  appBg: "#0b0c0f",
  appContentBg: "#14161a",
  appBorderColor: "#26282d",
  textColor: "#e7e9ed",
  barBg: "#14161a",
  barTextColor: "#8d939d",
  barSelectedColor: "#e7cf88",
  fontBase: '"Exo 2", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"Monaspace Xenon", ui-monospace, monospace',
});

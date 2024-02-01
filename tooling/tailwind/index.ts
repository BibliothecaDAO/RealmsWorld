import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../apps/ui/src/components/**/*.{ts,tsx}",
    "../../apps/ui/.storybook/**/*.{ts,tsx}",
    "../../apps/ui/stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-gray": "#050505",
        "theme-gray-light": "#343531",
        "bright-yellow": "#FBE1BB",
        "medium-dark-green": "#4D4E46",
        "dark-green": "#2A2B24",
        flamingo: "#FF93BA",
      },
      //@ts-expect-error tailwind
      borderColor: ({ theme }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        DEFAULT: theme("colors.medium-dark-green"),
      }),
      fontFamily: {
        sans: ["var(--font-bai-jamjuree)", ...fontFamily.sans],
        "sans-serif": ["var(--font-karla)", ...fontFamily.serif],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:bright-yellow|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:flamingo|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
  ],
  //plugins: [require("@tailwindcss/typography")],
};

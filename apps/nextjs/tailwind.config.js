const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
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
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.medium-dark-green"),
      }),
      fontFamily: {
        sans: ["var(--font-bai-jamjuree)", ...fontFamily.sans],
        "sans-serif": ["var(--font-karla)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};

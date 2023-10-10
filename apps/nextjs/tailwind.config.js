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
        "dark-green": "#2A2B24",
      },
      fontFamily: {
        sans: ["var(--font-inconsolata)", ...fontFamily.sans],
        "sans-serif": ["var(--font-karla)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};

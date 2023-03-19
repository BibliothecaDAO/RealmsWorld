const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme-gray': '#202020',
        'theme-gray-light': '#343531',
      },
      fontFamily: {
        sans: ['var(--font-inconsolata)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}

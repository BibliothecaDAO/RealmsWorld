/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme-gray': '#202020',
        'theme-gray-light': '#343531',
      }
    },
  },
  plugins: [],
}

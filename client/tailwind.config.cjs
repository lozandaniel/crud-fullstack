/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lilita-one': ['Lilita One', 'cursive', 'system-ui']
      }
    },
  },
  plugins: [],
}

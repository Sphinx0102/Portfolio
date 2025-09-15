/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'console-green': '#33FF77',
        'console-orange': '#FF8F00'
      },
    },
  },
  plugins: [],
}

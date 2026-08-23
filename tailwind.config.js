/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./*.html",
  "./*.js", // <-- ye add kar do
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', // <--- CHANGE THIS from 'class' to 'selector'
  theme: {
    extend: {},
  },
  plugins: [],
}
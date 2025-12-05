/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'daves-red': '#E31837',
        'daves-yellow': '#FFD700',
      },
      fontFamily: {
        'graffiti': ['Arial Black', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


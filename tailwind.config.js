/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink-light': '#F8D7DA',
        'romantic-pink': '#F5C6CB',
        'romantic-cream-light': '#FFF8E7',
        'romantic-cream': '#FDF5E6',
        'romantic-red': '#C41E3A',
        'romantic-red-dark': '#8B0000',
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

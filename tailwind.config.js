/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#93c5fd',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',
        'dark-secondary': '#1a1a1a',
        'accent-green': '#4ade80',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 
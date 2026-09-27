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
        'dark-surface': '#111111',
        'dark-border': '#1F1F1F',
        'dark-muted': '#A3A3A3',
        'dark-secondary': '#D4D4D4',
        'apple-red': '#FF3B30',
        'accent-green': '#FF3B30',
        'light-bg': '#f6f6f4',
        'light-surface': '#ffffff',
        'light-primary': '#18181b',
        'light-secondary': '#3f3f46',
        'light-muted': '#62626b',
        'light-border': '#dededb',
        'light-accent': '#7655b8',
        'light-accent-soft': '#a991d6',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 
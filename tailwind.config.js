/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        accent: '#06b6d4',
        surface: '#f8fafc',
      },
    },
  },
  plugins: [],
}
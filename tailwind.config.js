/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        remax: {
          red: '#E2001A',
          blue: '#003DA5',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          dark: '#1A1A2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

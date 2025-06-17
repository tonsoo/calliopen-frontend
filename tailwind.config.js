/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ['"Quicksand"', 'serif'],
      },
      colors: {
        main: '#485696',
        'main-light': '#609EAF',
        white: {
          pure: '#f7f7f7',
          mid: '#bfbfbf',
        },
        orange: {
          weak: '#f9c784',
          mid: '#fc7a1e',
          pure: '#f24c00',
        },
        black: {
          pure: '#020122',
          '100': '#12113d',
        },
        gray: '#b5b5b5',
        'gray-light': '#e7e7e7'
      }
    },
  },
  plugins: [],
}


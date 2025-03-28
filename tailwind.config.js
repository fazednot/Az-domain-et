/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2cbcd7',
          50: '#f0fafb',
          100: '#d9f3f7',
          200: '#b8e8ef',
          300: '#86d7e4',
          400: '#4dc0d3',
          500: '#2cbcd7',
          600: '#1d95ae',
          700: '#1b768c',
          800: '#1c6274',
          900: '#1c5362',
          950: '#0d343f',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
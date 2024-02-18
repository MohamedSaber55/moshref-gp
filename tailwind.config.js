/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
        }
      },
      colors: {
        main: {
          DEFAULT: "#3caa3c"
        },
        second: {
          DEFAULT: "#3caa3c"
        },
        warning: {
          DEFAULT: "#e11",
        },
      }
    },
  },
  plugins: [],
}


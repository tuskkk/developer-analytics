/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      maxWidth: {
        layout: '290px',
        layoutXl: '1170px',
        layout2Xl: '1360px',
      },
      screens: {
        md: '768px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        gutterXl: '30px',
      },
    },
  },
  plugins: [],
}


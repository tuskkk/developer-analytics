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
      colors: {
        primary: '#CED4DA',
        secondary: '#8B03F0',
        tertiary: '#9CA3AF',
        primaryText: '#111928',
        secondaryText: '#6B7280',
        stroke: '#F9FAFB',
        alert: '#FF0000',
        white: '#FFFFFF',
      },
      screens: {
        md: '768px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        gutterXl: '30px',
      },
      backgroundImage: {
        'hero-mobile': 'url(/images/hero_mobile.png)',
        'hero-desktop': 'url(/images/hero_desktop.png)',
      },
    },
  },
  plugins: [],
}


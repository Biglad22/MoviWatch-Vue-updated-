/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'primary' : '#D90000',
        'secondary' : '#ff9494'
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        none: 'none',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const textShadow = theme('textShadow');
      const textShadowUtilities = Object.entries(textShadow).map(([key, value]) => {
        return {
          [`.text-shadow-${key}`]: { textShadow: value },
        };
      });
      addUtilities(textShadowUtilities);
    }
  ],
}


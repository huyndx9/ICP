/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Inter',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        canvas: '#FBFBFD',
        ink: '#0A1931',
        flowA: '#2B5CFF',
        flowB: '#2ECC8F',
        flowC: '#FF8C21',
        flowD: '#7C5CFF',
        flowE: '#00B8D9',
        flowF: '#1A2B6B',
      },
      borderRadius: {
        ios: '20px',
        '4xl': '2rem',
      },
      boxShadow: {
        ios: '0 1px 2px rgba(10,25,49,.04), 0 8px 24px rgba(10,25,49,.06)',
        'ios-lg': '0 2px 4px rgba(10,25,49,.04), 0 18px 48px rgba(10,25,49,.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .35s cubic-bezier(.22,1,.36,1) both',
        'pop-in': 'pop-in .22s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
};

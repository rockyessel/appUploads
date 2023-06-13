/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(1.2)' },
          opacity: 0,
        },
      },
      animation: {
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        cascadia: ['Cascadia'],
      },
    },
  },
  plugins: [typography, daisyui],
};

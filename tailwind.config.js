/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-burgundy': '#9E1C32',
        'dark-bg': '#07080c',
        'dark-card': '#0d0f16',
        'brand-warm-gray': '#f3efe6',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        jp: ['Shippori Mincho B1', 'Yu Mincho', 'serif'],
      },
    },
  },
  plugins: [],
};


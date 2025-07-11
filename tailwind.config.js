/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          light: '#eef2ff',
        },
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bowlby-one': ['"Bowlby One"', 'cursive'],
        'press-start': ['"Press Start 2P"', 'cursive']
      }
    },
  },
  plugins: [],
};

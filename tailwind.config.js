/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "white": "#E9EFEC",
        "green": "#16423C",
      },
      fontFamily: {
        "default": ["'Press Start 2P'", "cursive"],
      },
    },
  },
  plugins: [],
}


//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    fontFamily: {
      advent: ["Advent Pro", "sans-serif"],
    },
    extend: {
      fontFamily: {
        anta: ["Anta"],
        opensans: ["Open Sans"],
        mont: ["Montserrat"],
      },
      colors: {
        'primary': '#292F36',
        'secondary': '#136F63',
      },
    },
  },
  plugins: [],
};

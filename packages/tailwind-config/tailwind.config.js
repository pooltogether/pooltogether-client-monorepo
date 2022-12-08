const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "src/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.purple[500],
        secondary: colors.cyan[500],
        tertiary: colors.indigo[500],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

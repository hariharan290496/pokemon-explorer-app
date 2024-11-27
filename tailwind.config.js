/** @type {import('tailwindcss').Config} */
const colors = require("./src/utils/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        type: colors.type,
        neutral: colors.neutral,
      },
    },
  },
  plugins: [],
};

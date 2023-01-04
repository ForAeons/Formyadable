/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Raleway: ["Raleway", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

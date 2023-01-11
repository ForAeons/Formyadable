/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      keyframes: {
        slideInKeyFrame: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        SlideIn: "slideInKeyFrame 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

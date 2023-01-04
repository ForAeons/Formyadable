/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    keyframes: {
      "open-menu": {
        "0%": { transform: "scaleX(0)" },
        "100%": { transform: "scaleX(100%)" },
      },
    },
    animation: {
      "open-menu": "open-menu 0.2s ease-in-out forwards",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};

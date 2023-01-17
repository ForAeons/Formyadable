/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    transitionDuration: {
      DEFAULT: "150ms",
    },
    transitionTimingFunction: {
      DEFAULT: "ease-in-out",
    },
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      keyframes: {
        slideInKeyFrame: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" },
        },
        slideDownKeyFrame: {
          "0%": {
            transform: "translateY(-50%)",
            opacity: "0",
          },
          "100%": {
            transform: "translatY(0px)",
            opacity: "1",
          },
        },
        FadeInKeyframe: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        WiggleKeyframe: {
          "0%": {
            transform: "rotate(-2deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
          },
          "100%": {
            transform: "rotate(-2deg)",
          },
        },
        WiggleOnceKeyframe: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1.3deg)",
          },
          "50%": {
            transform: "rotate(0deg)",
          },
          "75%": {
            transform: "rotate(-1.3deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        Bouncy: {
          "0%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(-12.5%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "100%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        SlideIn: "slideInKeyFrame 0.2s cubic-bezier(0, 0.1, 0.6, 1) forwards",
        FadeIn: "FadeInKeyframe 1s cubic-bezier(0, 0.3, 0.9, 1) forwards",
        Wiggle: "WiggleKeyframe 0.2s cubic-bezier(0, 0.4, 0.6, 1) infinite",
        WiggleOnce: "WiggleOnceKeyframe 0.3s ease-in-out forwards",
        customBounce: "Bouncy 0.7s infinite",
      },
    },
  },
  plugins: [],
};

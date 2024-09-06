/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        bounceIn: "bounceIn 1s ease 0s 1 normal",
        bounceOut: "bounceOut 1s ease 0s 1 normal",
        scrollImage: "scroll 120s linear infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-900px * 7))" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(.3)" },
          "50%": { opacity: "1", transform: "scale(1.0)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        bounceOut: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.90)" },
          "70%": { opacity: "1", transform: "scale(1.1)" },
          "100%": { opacity: "0", transform: "scale(0.3)" },
        },
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [],
};

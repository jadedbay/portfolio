const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "9vw": "9vw",
      },
      colors: {
        "off-black": "#141414",
      },
      animation: {
        "title-slide-in": "title-slide-in 1.5s",
        "socials-slide-in": "socials-slide-in 1.5s forwards",
      },
      keyframes: {
        "title-slide-in": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "socials-slide-in": {
          "0%": { transform: "translateX(-178px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
    screens: {
      xs: "420px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      zIndex: {
        sidebar: 60,
        overlay: 50,
        navbar: 30,
        dropdown: 20,
      },
      container: {
        center: true,
      },
      colors: {
        primary: {
          DEFAULT: "#0ba3ec", 
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e5fe",
          300: "#7bd2fe",
          400: "#35bbfb",
          500: "#0ba3ec",
          600: "#0082ca",
          700: "#0168a3",
          800: "#055887",
          900: "#083754",
        },
      },
      fontFamily: {
        siliguri: ["Hind Siliguri"],
      },
      transitionDuration: {
        DEFAULT: "300px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        appbg: "#F8FAFB",
        primary: {
          DEFAULT: "#F85402", // base
          50: "#FFF4ED",
          100: "#FFE6D5",
          200: "#FFC9A8",
          300: "#FFAB7A",
          400: "#FF8C4D",
          500: "#F85402", // base
          600: "#E14A00", // hover / pressed
          700: "#C63F00",
          800: "#A33300",
          900: "#7A2600",
        },

        secondary: {
          DEFAULT: "#9333ea",
          50: "#F5E1FF",
          100: "#E6B3FF",
          200: "#D685FF",
          300: "#C857FF",
          400: "#B92AFF",
          500: "#9333EA",
          600: "#7A2CCC",
          700: "#fff",
        },  
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#facc15",
      },

      fontFamily: {
        sans: ["Inter", "System"],
        heading: ["Inter-Bold", "System"],
      },

      borderRadius: {
        xl: 16,
        "2xl": 24,
      },

      spacing: {
        18: 72,
        22: 88,
        30: 120,
      },
    },
  },

  plugins: [],
};

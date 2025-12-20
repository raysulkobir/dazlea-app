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
          DEFAULT: "#007E85", // main brand color
          50: "#E0F7F8",
          100: "#B3ECEE",
          200: "#80E1E4",
          300: "#4DD6D9",
          400: "#26CBD0",
          500: "#00BFC6",
          600: "#009AA0",
          700: "#007E85",
          800: "#005E63",
          900: "#003F42",
        },

        secondary: {
          DEFAULT: "#9333ea",
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

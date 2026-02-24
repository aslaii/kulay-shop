/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // blue-600
          light: "#E6F0FF",   // blue-50 equivalent
          dark: "#1D4ED8",    // blue-700
        },
        accent: "#16A34A",    // green-600
        surface: "#FFFFFF",
        background: "#F9FAFB", // gray-50
      },
      borderRadius: {
        card: "24px",   // 3xl equivalent
        section: "16px", // 2xl equivalent
        item: "12px",    // xl equivalent
      }
    },
  },
  plugins: [],
};

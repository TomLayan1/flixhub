/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: { 
    extend: {
      colors: {
        darkBg: "#131213",
        lightBg: "#FFFFFF",
        grayBg: "#222020",
        blueColor: "#0077B6",
        pinkColor: "#9ECAE1",
        lightText: "#FFFFFF",
        darkText: "#000000",
        grayText: "#4B5563",
        lightBorder: "#FFFFFF25",
      }
    } 
  },
  plugins: [],
};
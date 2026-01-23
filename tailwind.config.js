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
        blueColor: "#0077B6",
        pinkColor: "#9ECAE1",
        textDark: "#FFFFFF",
        textLight: "#000000",
        grayText: "#4B5563"
      }
    } 
  },
  plugins: [],
};
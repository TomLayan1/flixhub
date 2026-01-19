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
        darkBg: "#000000",
        lightBg: "#FFFFFF",
        primaryColor: "#0077B6",
        textDark: "#FFFFFF",
        textLight: "#000000",
        greyText: "#AB8BFF"
      }
    } 
  },
  plugins: [],
};
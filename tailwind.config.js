/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": ['"Work Sans"', "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

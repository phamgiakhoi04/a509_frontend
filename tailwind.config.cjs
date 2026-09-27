/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FBF9F5",
          red: "#9A1B1E",
          redDark: "#741417",
          yellow: "#F1C40F",   
          text: "#2B2927",
        },
      },
      fontFamily: {
        display: ['"Merriweather"', 'Georgia', 'serif'],
        body: ['"Inter"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'pop': '4px 4px 0px 0px rgba(146, 43, 33, 0.2)',
        'pop-hover': '6px 6px 0px 0px rgba(146, 43, 33, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

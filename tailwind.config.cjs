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
          bg: "#FFFBEB",      
          red: "#C0392B",      
          redDark: "#922B21",  
          yellow: "#F1C40F",   
          text: "#5D4037",     
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'], 
        body: ['"Nunito"', 'sans-serif'],
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
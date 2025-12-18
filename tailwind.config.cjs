/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FFFBEB",       // Màu kem vàng sáng (giống mây/bọt cafe)
          red: "#C0392B",      // Đỏ đậm chủ đạo
          redDark: "#922B21",  // Đỏ tối (cho Header)
          yellow: "#F1C40F",   // Vàng tươi (làm điểm nhấn như web Chú Long)
          text: "#5D4037",     // Nâu cafe
        }
      },
      fontFamily: {
        // Font tiêu đề to, tròn, đậm
        display: ['"Baloo 2"', 'cursive'], 
        // Font nội dung dễ đọc
        body: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        // Bóng cứng (Hard shadow) kiểu retro/pop art
        'pop': '4px 4px 0px 0px rgba(146, 43, 33, 0.2)',
        'pop-hover': '6px 6px 0px 0px rgba(146, 43, 33, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
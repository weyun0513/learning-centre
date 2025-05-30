export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Microsoft JhengHei"', 'sans-serif'],
      },
      colors: {
        'goose-yellow': '#f9e27a',  // 自定义鹅黄色
      },
    },
  },
  plugins: [],
};
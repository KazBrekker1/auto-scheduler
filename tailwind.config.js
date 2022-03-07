module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#b2820a",
          "secondary": "#3b7ba0",
          "accent": "#a678c9",
          "neutral": "#212836",
          "base-100": "#2A2E4C",
          "info": "#B0DFE8",
          "success": "#21DE69",
          "warning": "#F7CB08",
          "error": "#F7735F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
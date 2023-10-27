/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linearGradientColors: {
          custom: [
            "rgba(118, 9, 121, 1) 10%",
            "rgba(2, 0, 36, 1) 76%",
            "rgba(118, 9, 121, 1) 88%",
          ],
        },
      },
    },
  },
  plugins: [],
};

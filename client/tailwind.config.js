/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Product Sans", "sans-serif"],
      primarySub: ["Open Sans", "sans-serif"],
      secondary: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#800000",
        tertiary: "#C0C0C0",
      },
    },
  },
  plugins: [],
};

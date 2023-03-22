/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#443C68",
        primaryDark: "#393053",
        primaryLight: "#635985",
        secondary: "#9D3C72",
        secondaryDark: "#7B2869",
        secondaryLight: "#C85C8E",
        success: "#54B435",
        error: "#E83A14",
        info: "#F99417",
      },
    },
  },
  plugins: [],
};

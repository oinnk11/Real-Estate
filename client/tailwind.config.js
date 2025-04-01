/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#80C4E9",
        muted: "#71717a",
      },
    },
  },
  plugins: [],
};

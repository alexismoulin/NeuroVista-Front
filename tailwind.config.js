/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'basic': "url('src/assets/bg.jpg')",
        'section-gradient': 'linear-gradient(180deg, #212931, #1a1e24)',
        "infos": "linear-gradient(45deg, #5f796b, #3a4e59, #2f394e)"
      },
      fontFamily: {
        'merriweather': ["Merriweather", "serif"],
        "opensans": ["Open Sans", "sans-serif"]
      },
      colors: {
        "tahiti": {
          DEFAULT: '#18bfef',
        },
        "slatey": {
          DEFAULT: '#212931',
        }
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
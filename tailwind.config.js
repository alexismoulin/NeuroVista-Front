/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'basic': "url('src/assets/images/bg.jpg')",
        'section-gradient': 'linear-gradient(180deg, #212931, #1a1e24)'
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
  plugins: [],
}
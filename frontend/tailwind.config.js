/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['sans-serif'],
        'roboto':['Roboto'],
        'inter':['Inter'],
        'sarabun':['Sarabun']
      },
    },
  },
  plugins: [],
}




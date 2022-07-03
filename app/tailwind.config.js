/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'phantom': '#512da8',
        'phantom-hover': '#1a1f2e',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

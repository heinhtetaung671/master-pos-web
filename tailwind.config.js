/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
    "lib/*.js"
  ],
    theme: {
  },
  plugins: [
    require('preline/plugin'),  ],
}


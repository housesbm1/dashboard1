const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8'
        },
        dgii: {
          green: '#16a34a',
          red: '#dc2626',
          yellow: '#d97706'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
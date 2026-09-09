/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5722',
          orangeHover: '#E64A19',
          yellow: '#FFC107',
          amber: '#FF9800',
          golden: '#FFB300',
          cream: '#FFFBF5',
          creamDark: '#F7F1E5',
          charcoal: '#1E293B',
          muted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 10px 30px -5px rgba(255, 87, 34, 0.2)',
        'glow-yellow': '0 10px 30px -5px rgba(255, 179, 0, 0.25)',
        'card-hover': '0 20px 35px -10px rgba(30, 41, 59, 0.1)'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFF5F5',         // Soft Warm Cream / Blush White
          peach: '#F7D6D0',      // Warm Peach Rose / Dusty Blush
          rose: '#E2B4BD',       // Rose Dust / Elegant Coral Mauve
          roseDark: '#C7929E',   // Darker accent rose
          text: '#4A4A4A',       // Charcoal Slate / Dark Neutral Text
          textLight: '#737373'   // Muted charcoal
        },
        brand: {
          orange: '#E2B4BD',
          orangeHover: '#C7929E',
          yellow: '#F7D6D0',
          amber: '#E2B4BD',
          golden: '#F7D6D0',
          cream: '#FFF5F5',
          creamDark: '#F7D6D0',
          charcoal: '#4A4A4A',
          muted: '#737373'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 10px 30px -5px rgba(226, 180, 189, 0.35)',
        'glow-rose': '0 10px 30px -5px rgba(247, 214, 208, 0.45)',
        'card-hover': '0 20px 35px -10px rgba(74, 74, 74, 0.1)'
      }
    },
  },
  plugins: [],
}

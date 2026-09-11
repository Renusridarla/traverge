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
          warmYellow: '#FED24F',
          brightYellow: '#FFF449',
          limeGreen: '#B2D959',
          freshGreen: '#7EC151',
          darkBg: '#0B0F14',       // Near-black main background
          darkCard: '#131920',     // Dark card surface
          darkSurface: '#1A222C',  // Dark elevated surface
          darkBorder: '#232E3C',   // Subtle border
          text: '#F3F4F6',         // White/off-white text
          muted: '#9CA3AF'         // Muted gray text
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -4px rgba(255, 244, 73, 0.35)',
        'glow-green': '0 0 25px -4px rgba(126, 193, 81, 0.35)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [],
}

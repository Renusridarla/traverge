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
          dark: '#2C2C2C',       // Primary dark / text / dark sections
          primary: '#853953',    // Primary brand accent
          secondary: '#612D53',  // Secondary brand accent
          bg: '#F3F4F4',         // Main light background
          muted: '#666666',      // Muted text
          border: '#E2E8F0',     // Subtle border
          card: '#FFFFFF'        // Card background
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(44, 44, 44, 0.05)',
        'card': '0 10px 30px -5px rgba(44, 44, 44, 0.08)',
        'glow': '0 8px 25px -4px rgba(133, 57, 83, 0.3)'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#0D0D0D',
        border: '#1A1A1A',
        primaryText: '#F3F1EB',
        secondaryText: '#7A7A7A',
        astraRed: '#CC2B2B',
        signalRed: '#E03333',
        amber: '#D4811A',
        monospaceGreen: '#3D9970',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['monospace'],
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '40px 40px',
      },
    },
  },
  plugins: [],
}

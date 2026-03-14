/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-gradient': 'linear-gradient(135deg, #151515 0%, #1a1a1a 50%, #121212 100%)',
        'nav-bg': 'rgba(28, 28, 28, 0.9)',
        'content-bg': 'rgba(26, 26, 26, 0.8)',
        'flyout-bg': 'rgba(28, 28, 28, 0.95)',
        'tile-bg': 'rgba(38, 38, 38, 0.6)',
        'tile-hover': 'rgba(52, 52, 52, 0.7)',
        'accent': '#9b4dca',
        'accent-hover': '#b366d9',
        'accent-secondary': '#7a2ba8',
        'accent-glow': 'rgba(155, 77, 202, 0.3)',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'border': 'rgba(155, 77, 202, 0.2)',
      },
      borderRadius: {
        'DEFAULT': '12px',
        'sm': '6px',
        'lg': '16px',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Neumorphism
        'neo-bg': '#E8EEF1',
        'neo-light': '#F0F4F7',
        'neo-dark': '#2C3E50',
        'neo-primary': '#6C7DBA',
        'neo-secondary': '#A8DADC',
        'neo-accent': '#E63946',
        'neo-success': '#06A77D',
        'neo-warning': '#F4A261',
        'neo-info': '#457B9D',
      },
      boxShadow: {
        // Sombras Neumorphism
        'neo-flat': '0 0 0 0 rgba(0,0,0,0)',
        'neo-inset': 'inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.7)',
        'neo-convex': '3px 3px 7px rgba(0,0,0,0.1), -3px -3px 7px rgba(255,255,255,0.7)',
        'neo-concave': '3px 3px 7px rgba(0,0,0,0.1) inset, -3px -3px 7px rgba(255,255,255,0.7) inset',
        'neo-lg': '5px 5px 15px rgba(0,0,0,0.1), -5px -5px 15px rgba(255,255,255,0.7)',
        'neo-button': '2px 2px 5px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.7)',
        'neo-button-pressed': '1px 1px 3px rgba(0,0,0,0.15) inset, -1px -1px 3px rgba(255,255,255,0.5) inset',
      },
      borderRadius: {
        'neo': '12px',
        'neo-lg': '16px',
        'neo-xl': '20px',
      },
      animation: {
        'pulse-neo': 'pulse-neo 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-neo': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        }
      }
    },
  },
  plugins: [],
}

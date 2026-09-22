/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Neumorphism — valores reales en CSS vars (src/index.css),
        // que cambian con la clase .dark en <html> para soportar modo oscuro.
        'neo-bg': 'rgb(var(--neo-bg) / <alpha-value>)',
        'neo-light': 'rgb(var(--neo-light) / <alpha-value>)',
        'neo-dark': 'rgb(var(--neo-dark) / <alpha-value>)',
        'neo-primary': 'rgb(var(--neo-primary) / <alpha-value>)',
        'neo-secondary': 'rgb(var(--neo-secondary) / <alpha-value>)',
        'neo-accent': 'rgb(var(--neo-accent) / <alpha-value>)',
        'neo-success': 'rgb(var(--neo-success) / <alpha-value>)',
        'neo-warning': 'rgb(var(--neo-warning) / <alpha-value>)',
        'neo-info': 'rgb(var(--neo-info) / <alpha-value>)',
      },
      boxShadow: {
        // Sombras Neumorphism — también en CSS vars para que el "highlight"
        // claro se invierta correctamente en modo oscuro.
        'neo-flat': '0 0 0 0 rgba(0,0,0,0)',
        'neo-inset': 'inset 2px 2px 5px rgb(var(--neo-shadow-dark) / 0.1), inset -2px -2px 5px rgb(var(--neo-shadow-light) / 0.7)',
        'neo-convex': '3px 3px 7px rgb(var(--neo-shadow-dark) / 0.1), -3px -3px 7px rgb(var(--neo-shadow-light) / 0.7)',
        'neo-concave': '3px 3px 7px rgb(var(--neo-shadow-dark) / 0.1) inset, -3px -3px 7px rgb(var(--neo-shadow-light) / 0.7) inset',
        'neo-lg': '5px 5px 15px rgb(var(--neo-shadow-dark) / 0.1), -5px -5px 15px rgb(var(--neo-shadow-light) / 0.7)',
        'neo-button': '2px 2px 5px rgb(var(--neo-shadow-dark) / 0.1), -2px -2px 5px rgb(var(--neo-shadow-light) / 0.7)',
        'neo-button-pressed': '1px 1px 3px rgb(var(--neo-shadow-dark) / 0.15) inset, -1px -1px 3px rgb(var(--neo-shadow-light) / 0.5) inset',
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

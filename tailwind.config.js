/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'background-card': 'var(--background-card)',
        'background-dark': 'var(--background-dark)',
        'background-glass': 'var(--background-glass)',
      },
      boxShadow: {
        'glass': 'var(--glass-shadow)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(253, 253, 253, 0.015) 0%, rgba(253, 253, 253, 0.05) 100%)',
        'button-gradient': 'linear-gradient(180deg, #404040 -27.27%, #2C2D2D 127.27%)',
        'card-gradient': 'linear-gradient(180deg, var(--background-glass) 0%, rgba(20, 20, 20, 0.9) 100%)',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};

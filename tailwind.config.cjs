/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Solo Leveling Dark Theme
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#0f7fe6',
          700: '#096dd9',
          800: '#0050b3',
          900: '#003a8c',
        },
        // Neon Cyan/Blue Accents
        neon: {
          blue: '#00f0ff',
          cyan: '#00ffff',
          purple: '#b19cd9',
          pink: '#ff10f0',
        },
        // Dark Background Palette
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#242424',
          500: '#2e2e2e',
          400: '#383838',
        },
        // Rank Colors
        rank: {
          E: '#8b8b8b',
          D: '#4ade80',
          C: '#3b82f6',
          B: '#a855f7',
          A: '#f59e0b',
          S: '#ef4444',
        },
        // Status Colors
        status: {
          hp: '#ef4444',
          stamina: '#22c55e',
          mana: '#3b82f6',
          xp: '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        gaming: ['Rajdhani', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'glow': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 240, 255, 0.7)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(0, 240, 255, 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'stat-fill': 'stat-fill 1s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'stat-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--stat-width)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
}

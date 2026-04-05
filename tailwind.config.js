/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#0f172a',
        'navy-950': '#020617',
        'navy-900': '#0f172a',
        'accent-purple': '#8b5cf6',
        'gradient-emerald': '#10b981',
        'gradient-teal': '#06b6d4',
        'gradient-cyan': '#0891b2',
        'gradient-lime': '#22c55e',
        'gradient-purple': '#a855f7',
        'gradient-pink': '#ec4899',
        'gradient-orange': '#f97316',
        'gradient-amber': '#f59e0b',
      },
      backgroundImage: {
        'gradient-card-1': 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)',
        'gradient-card-2': 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
        'gradient-card-3': 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
        'gradient-card-4': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-text': 'linear-gradient(90deg, #10b981, #06b6d4, #ec4899)',
      },
      boxShadow: {
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.3)',
        'glow-emerald-lg': '0 0 60px rgba(16, 185, 129, 0.4)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-teal': '0 0 30px rgba(6, 182, 212, 0.3)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}

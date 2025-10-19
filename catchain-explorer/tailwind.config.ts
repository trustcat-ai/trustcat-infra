import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          card: '#0a0a0f',
          border: 'rgba(102, 126, 234, 0.15)',
          text: '#e0e0e0',
          muted: '#6b7280',
        },
        primary: {
          purple: '#667eea',
          violet: '#764ba2',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f59e0b',
          cat: '#4a9eff',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(180deg, #050505 0%, #0a0a0f 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(102,126,234,0.03) 0%, rgba(102,126,234,0.01) 100%)',
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cat': 'linear-gradient(135deg, #4a9eff 0%, #667eea 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

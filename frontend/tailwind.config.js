/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A192F',
          800: '#11243A',
          700: '#1B3A5B',
          600: '#234C75',
          500: '#2C5E8F',
        },
        primary: {
          DEFAULT: '#1E40AF',
          hover: '#1D4ED8',
          light: '#3B82F6',
          subtle: '#EFF6FF',
        },
        teal: {
          DEFAULT: '#0D9488',
          dark: '#0F766E',
          light: '#14B8A6',
          subtle: '#F0FDFA',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          accent: '#22D3EE',
        },
        canvas: '#F4F7FB',
        surface: '#FFFFFF',
        'app-text': {
          primary: '#172033',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        'app-border': '#E2E8F0',
        'app-success': '#16A34A',
        'app-warning': '#F59E0B',
        'app-error': '#DC2626',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          'monospace'
        ]
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'nav': '0 2px 4px 0 rgba(10, 25, 47, 0.08)',
      }
    },
  },
  plugins: [],
}

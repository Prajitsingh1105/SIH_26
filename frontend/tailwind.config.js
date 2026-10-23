/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        panel: '#121215',
        subtle: '#18181B',
        hover: '#222227',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-subtle': 'rgba(255, 255, 255, 0.04)',
        'border-strong': 'rgba(255, 255, 255, 0.14)',
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          subtle: 'rgba(59, 130, 246, 0.08)',
          border: 'rgba(59, 130, 246, 0.25)'
        },
        success: {
          DEFAULT: '#10B981',
          subtle: 'rgba(16, 185, 129, 0.08)',
          border: 'rgba(16, 185, 129, 0.2)'
        },
        warning: {
          DEFAULT: '#F59E0B',
          subtle: 'rgba(245, 158, 11, 0.08)',
          border: 'rgba(245, 158, 11, 0.25)'
        },
        danger: {
          DEFAULT: '#EF4444',
          subtle: 'rgba(239, 68, 68, 0.08)',
          border: 'rgba(239, 68, 68, 0.3)'
        }
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
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      boxShadow: {
        'bezel': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.5)',
        'bezel-hover': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), 0 4px 12px 0 rgba(0, 0, 0, 0.6)',
        'modal': '0 20px 48px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'subtle-blue': '0 0 20px -3px rgba(59, 130, 246, 0.15)',
        'alert-glow': '0 0 24px -2px rgba(239, 68, 68, 0.25)'
      }
    },
  },
  plugins: [],
}

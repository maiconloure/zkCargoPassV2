/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
        dm: ['DM Sans', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        bitcount: ['Bitcount Prop Single', 'monospace'],
        fira: ['Fira Sans', 'sans-serif'],
        titillium: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        light: {
          bg: {
            primary: '#f8fafc',
            secondary: '#f1f5f9',
            card: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#475569',
            muted: '#64748b',
          },
          border: '#e2e8f0',
          accent: {
            primary: '#3b82f6',
            secondary: '#1d4ed8',
            muted: '#93c5fd',
          },
        },
        dark: {
          bg: {
            primary: '#0a1929',
            secondary: '#102a43',
            card: '#1e3a5f',
          },
          text: {
            primary: '#ffffff',
            secondary: '#a9c1d9',
            muted: '#8badc9',
          },
          border: '#172b44',
          accent: {
            primary: '#0055ff',
            secondary: '#0044cc',
            muted: '#4a90e2',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
}

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
        momo: ['Momo Trust Display', 'sans-serif'],
      },
      colors: {
        blue: '#5E63BD',
        light: {
          bg: {
            primary: '#f0f9ff',
            secondary: '#e0f2fe',
            card: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#475569',
            muted: '#64748b',
          },
          border: '#bae6fd',
          accent: {
            primary: '#5E63BD',
            secondary: '#5E63BD',
            muted: '#5E63BD',
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
            primary: '#5E63BD',
            secondary: '#5E63BD',
            muted: '#5E63BD',
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

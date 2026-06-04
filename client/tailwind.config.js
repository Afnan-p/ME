/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A0A0A",
        border: "#171717",
        foreground: "#ffffff",
        muted: "#A0A0A0",
        primary: {
          DEFAULT: "#B11226",
          hover: "#D91F3A"
        },
        maroon: {
          500: "#B11226",
          600: "#D91F3A",
        },
        charcoal: {
          900: "#0A0A0A",
          800: "#171717",
          700: "#222222"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

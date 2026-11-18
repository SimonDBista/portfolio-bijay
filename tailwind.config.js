/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#070709',
          900: '#0d0d10',
          850: '#131317',
          800: '#18181e',
          700: '#23232c',
          600: '#32323e',
        },
        gold: {
          50: '#faf7ed',
          100: '#f4ebd4',
          200: '#ebd8ad',
          300: '#debe7c',
          400: '#c9a96e',
          500: '#b89255',
          600: '#9d7640',
          700: '#7c5831',
        },
        ivory: {
          50: '#ffffff',
          100: '#faf8f5',
          200: '#f3efe6',
          300: '#e5ded1',
          400: '#c8bea9',
          500: '#9e937d',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Didot', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-zoom': 'subtleZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}

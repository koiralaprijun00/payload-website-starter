import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'media',
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'bg-blue-900',
    'bg-red-500',
    'bg-green-700',
    'bg-yellow-400',
    'bg-orange-500',
    'bg-lime-500',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-50',
    'bg-gray-600',
    'bg-gray-700',
    // Blue
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
    // Red
    'bg-red-50',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
    // Green
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    // Yellow
    'bg-yellow-50',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-yellow-700',
    'bg-yellow-800',
    'bg-yellow-900',
    // Orange
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    // Lime
    'bg-lime-50',
    'bg-lime-100',
    'bg-lime-200',
    'bg-lime-300',
    'bg-lime-400',
    'bg-lime-500',
    'bg-lime-600',
    'bg-lime-700',
    'bg-lime-800',
    'bg-lime-900',
    // Gray
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    // Purple
    'bg-purple-50',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-purple-700',
    'bg-purple-800',
    'bg-purple-900',
    // Pink
    'bg-pink-50',
    'bg-pink-100',
    'bg-pink-200',
    'bg-pink-300',
    'bg-pink-400',
    'bg-pink-500',
    'bg-pink-600',
    'bg-pink-700',
    'bg-pink-800',
    'bg-pink-900',
    // Indigo
    'bg-indigo-50',
    'bg-indigo-100',
    'bg-indigo-200',
    'bg-indigo-300',
    'bg-indigo-400',
    'bg-indigo-500',
    'bg-indigo-600',
    'bg-indigo-700',
    'bg-indigo-800',
    'bg-indigo-900',
    // Teal
    'bg-teal-50',
    'bg-teal-100',
    'bg-teal-200',
    'bg-teal-300',
    'bg-teal-400',
    'bg-teal-500',
    'bg-teal-600',
    'bg-teal-700',
    'bg-teal-800',
    'bg-teal-900',
    // Cyan
    'bg-cyan-50',
    'bg-cyan-100',
    'bg-cyan-200',
    'bg-cyan-300',
    'bg-cyan-400',
    'bg-cyan-500',
    'bg-cyan-600',
    'bg-cyan-700',
    'bg-cyan-800',
    'bg-cyan-900',
    // Amber
    'bg-amber-50',
    'bg-amber-100',
    'bg-amber-200',
    'bg-amber-300',
    'bg-amber-400',
    'bg-amber-500',
    'bg-amber-600',
    'bg-amber-700',
    'bg-amber-800',
    'bg-amber-900',
    // Emerald
    'bg-emerald-50',
    'bg-emerald-100',
    'bg-emerald-200',
    'bg-emerald-300',
    'bg-emerald-400',
    'bg-emerald-500',
    'bg-emerald-600',
    'bg-emerald-700',
    'bg-emerald-800',
    'bg-emerald-900',
    // Violet
    'bg-violet-50',
    'bg-violet-100',
    'bg-violet-200',
    'bg-violet-300',
    'bg-violet-400',
    'bg-violet-500',
    'bg-violet-600',
    'bg-violet-700',
    'bg-violet-800',
    'bg-violet-900',
    // Fuchsia
    'bg-fuchsia-50',
    'bg-fuchsia-100',
    'bg-fuchsia-200',
    'bg-fuchsia-300',
    'bg-fuchsia-400',
    'bg-fuchsia-500',
    'bg-fuchsia-600',
    'bg-fuchsia-700',
    'bg-fuchsia-800',
    'bg-fuchsia-900',
    // Rose
    'bg-rose-50',
    'bg-rose-100',
    'bg-rose-200',
    'bg-rose-300',
    'bg-rose-400',
    'bg-rose-500',
    'bg-rose-600',
    'bg-rose-700',
    'bg-rose-800',
    'bg-rose-900',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        16: '16px',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        mainGreen: '#DDEB9D',
        mainBlue: '#143D60',
        mainOrange: '#EB5B00',
        mainLime: '#A0C878',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config

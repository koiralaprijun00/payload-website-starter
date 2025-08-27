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
    // Grid layout classes (used in Content blocks)
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',

    // UI state classes (used for form validation, etc.)
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',

    // Dynamic background colors (used in Components and CMS)
    // Blue colors
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
    'hover:bg-blue-50',
    'hover:bg-blue-100',
    'hover:bg-blue-500',
    'hover:bg-blue-700',
    'hover:bg-blue-800',

    // Orange colors
    'bg-orange-50',
    'bg-orange-500',
    'bg-orange-600',
    'hover:bg-orange-500',
    'hover:bg-orange-600',

    // Main custom colors
    'bg-mainBlue',
    'bg-mainGreen',
    'bg-mainOrange',
    'bg-mainLime',

    // Green colors
    'bg-green-200',
    'bg-green-300',
    'bg-green-700',
    'hover:bg-green-300',

    // Gray colors
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-700',
    'hover:bg-gray-50',
    'hover:bg-gray-100',
    'hover:bg-gray-200',

    // Other colors (used in notices and themes)
    'bg-red-100',
    'bg-red-500',
    'bg-purple-50',
    'bg-purple-500',
    'hover:bg-purple-500',
    'bg-emerald-50',
    'bg-emerald-500',
    'hover:bg-emerald-500',
    'bg-amber-50',
    'bg-amber-500',
    'hover:bg-amber-500',
    'bg-yellow-400',
    'bg-lime-200',

    // Dynamic text colors (used in Components and CMS)
    'text-blue-100',
    'text-blue-600',
    'text-blue-700',
    'text-blue-800',
    'text-blue-900',
    'text-gray-200',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'text-green-800',
    'text-green-900',
    'text-orange-400',
    'text-orange-500',
    'text-orange-600',
    'text-red-500',
    'text-red-600',
    'text-emerald-700',
    'text-purple-700',
    'text-amber-700',

    // Hover text colors
    'hover:text-blue-400',
    'hover:text-blue-600',
    'hover:text-blue-800',
    'hover:text-orange-200',
    'hover:text-orange-400',
    'hover:text-orange-500',
    'hover:text-gray-700',

    // Dynamic border colors (used in Components and CMS)
    'border-blue-200',
    'border-blue-300',
    'border-blue-500',
    'border-gray-100',
    'border-gray-200',
    'border-gray-300',
    'border-orange-500',
    'border-mainBlue',
    'hover:border-gray-300',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '1.5rem', // Reduced from 2rem to 1.5rem for better medium laptop fit
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '58rem', // Reduced from 64rem to 58rem (928px) for 1024px screens
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      mlg: '1200px', // New breakpoint for medium-large screens
      xl: '1280px',
      '2xl': '1536px',
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
        'fira-sans': ['var(--font-fira-sans)', 'sans-serif'],
        sansita: ['var(--font-sansita)', 'sans-serif'],
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

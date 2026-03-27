/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['DM Sans', 'Arial', 'sans-serif'],
        body: ['DM Sans', 'Arial', 'sans-serif'],
        sans: ['DM Sans', 'Arial', 'sans-serif'],
      },
      colors: {
        // Amazon colors
        'amz-dark': '#131921',
        'amz-nav': '#232F3E',
        'amz-orange': '#F08804',
        'amz-orange2': '#FFA41C',
        'amz-yellow': '#FFD814',
        'amz-yellow-hover': '#F0C14B',
        'amz-red': '#CC0C39',
        'amz-teal': '#007185',
        'amz-star': '#F0A500',
        'amz-price': '#B12704',
        'amz-text': '#0F1111',
        'amz-muted': '#565959',
        'amz-gray': '#EAEDED',
        'amz-section': '#F3F3F3',
        'amz-border': '#D5D9D9',
        // Legacy luxury tokens (for admin/other pages)
        gold: '#C9A84C',
        'gold-light': '#E8C97E',
        'gold-dark': '#9A7A28',
        burgundy: '#6B1A3A',
        'burgundy-deep': '#4E1029',
        ivory: '#FAF5F0',
        // shadcn tokens
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

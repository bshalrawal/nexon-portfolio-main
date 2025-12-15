<<<<<<< HEAD
import type { Config } from 'tailwindcss';
=======
import type {Config} from 'tailwindcss';
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
<<<<<<< HEAD
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      /* ------------------------------
         COLORS, FONTS, RADIUS, SHADOW
      ------------------------------ */
      boxShadow: {
        bluish: '0 4px 14px 0 rgba(9, 166, 194, 0.25)',
      },

      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },

      colors: {
        'blue-100': '#b8dfff',
        'blue-50': '#d7ecff',

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

=======
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
<<<<<<< HEAD

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

=======
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
<<<<<<< HEAD

=======
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
<<<<<<< HEAD

      /* ------------------------------
         KEYFRAMES
      ------------------------------ */
      keyframes: {
        // Accordion animations
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },

        // Your flare animations
        'flare-a': {
          '0%': { left: '-20%', scale: '0.5', opacity: '1', top: '-90%' },
          '30%': { left: '0%', scale: '0.9', opacity: '0.5', top: '-50%' },
          '50%': { left: '40%', scale: '1.3', opacity: '0.6', top: '0%' },
          '100%': { left: '-20%', scale: '0.5', opacity: '1', top: '-90%' },
        },
        'flare-b': {
          '0%': { left: '-18%', scale: '0.3', opacity: '1', top: '-40%' },
          '30%': { left: '8%', scale: '1.3', opacity: '1', top: '10%' },
          '50%': { left: '50%', scale: '1.5', opacity: '1', top: '30%' },
          '100%': { left: '-18%', scale: '0.3', opacity: '1', top: '-40%' },
        },

        // ⭐ Marquee animation (THIS IS THE NEW ONE)
        marqueex: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      /* ------------------------------
         ANIMATIONS
      ------------------------------ */
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'flare-a': 'flare-a 10s ease-in-out infinite',
        'flare-b': 'flare-b 10s ease-in-out infinite',

        // ⭐ Marquee animation
        marqueex: 'marqueex 20s linear infinite',
      },
    },
  },

=======
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
>>>>>>> 6452628f11dbbbea92fd12e01cda9034198962f3
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

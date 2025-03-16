import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animationPlugin from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['30px', { lineHeight: '40px', fontWeight: '700' }],
        h3: ['20px', { lineHeight: '28px', fontWeight: '700' }],

        'p1-regular': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'p1-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'p1-semibold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'p1-bold': ['16px', { lineHeight: '24px', fontWeight: '700' }],

        'p2-regular': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'p2-medium': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'p2-semibold': ['14px', { lineHeight: '22px', fontWeight: '600' }],
        'p2-bold': ['14px', { lineHeight: '22px', fontWeight: '700' }],

        'c1-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'c2-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'c3-bold': ['12px', { lineHeight: '18px', fontWeight: '700' }],

        label: ['12px', { lineHeight: '16px', fontWeight: '500' }],
      },
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          card: 'var(--card-background)',
          input: 'var(--input-background)',
          opacity: 'var(--background-opacity)',
          notification: 'var(--notification-background)',
          'inactive-opacity': 'var(--background-inactive-opacity)',
        },
        border: {
          card: 'var(--card-border)',
          input: 'var(--input-border)',
          focus: 'var(--focus-outline)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          white: 'var(--text-white)',
          hint: 'var(--text-hint)',
          disabled: 'var(--text-disabled)',
          black: 'var(--text-black)',
        },
        branding: {
          primary: {
            default: 'var(--branding-primary-default)',
            hover: 'var(--branding-primary-hover)',
            pressed: 'var(--branding-primary-pressed)',
            'on-surface': 'var(--branding-primary-on-surface)',
            background: 'var(--branding-primary-background)',
          },
          secondary: {
            default: 'var(--branding-secondary-default)',
            hover: 'var(--branding-secondary-hover)',
            pressed: 'var(--branding-secondary-pressed)',
          },
        },
        semantic: {
          danger: {
            primary: 'var(--semantic-danger-primary)',
            hover: 'var(--semantic-danger-hover)',
            pressed: 'var(--semantic-danger-pressed)',
            background: 'var(--semantic-danger-background)',
          },
          success: {
            primary: 'var(--semantic-success-primary)',
            hover: 'var(--semantic-success-hover)',
            pressed: 'var(--semantic-success-pressed)',
            background: 'var(--semantic-success-background)',
          },
          warning: {
            primary: 'var(--semantic-warning-primary)',
            hover: 'var(--semantic-warning-hover)',
            pressed: 'var(--semantic-warning-pressed)',
            background: 'var(--semantic-warning-background)',
          },
          info: {
            primary: 'var(--semantic-info-primary)',
            hover: 'var(--semantic-info-hover)',
            pressed: 'var(--semantic-info-pressed)',
            background: 'var(--semantic-info-background)',
          },
        },
        underlay: {
          popup: 'var(--underlay-popup)',
          media: 'var(--underlay-media)',
        },
        selected: {
          list: {
            lvl1: 'var(--selected-list-lvl1)',
            lvl2: 'var(--selected-list-lvl2)',
          },
        },
        table: {
          header: {
            group: 'var(--table-header-group)',
            legend: 'var(--table-header-legend)',
          },
          row: {
            border: 'var(--table-row-border)',
            background: 'var(--table-row-background)',
            hover: 'var(--table-row-hover)',
          },
        },
        divider: 'var(--divider)',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'gradient-animation': {
          '0%': {background: 'linearGradient(45deg, #6a5be9 0%, #aa5be2 100%)'},
          '100%': {background: 'linearGradient(-45deg, #6a5be9 0%, #aa5be2 100%)'},
        }
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'animate-gradient': 'gradient-animation 0.5s ease-in-out forwards'
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addVariant, addComponents }) {
      addUtilities({
        /* 100vh is a fallback for Opera, IE and etc. */
        '.h-full-screen': {
          height: ['100vh', '100dvh'],
        },
        '.min-h-full-screen': {
          minHeight: ['100vh', '100dvh'],
        },
      });

      addVariant('aria-invalid', '&[aria-invalid="true"]');
      addVariant('aria-weekend', [
        '&[aria-label="Saturday"]',
        '&[aria-label="Sunday"]',
      ]);

      addComponents({
        '.highlightable-border': {
          position: 'relative',
          '&::before': {
            content: '""',
            pointerEvents: 'none',
            position: 'absolute',
            inset: '0',
            borderWidth: '2px',
            borderColor: 'transparent',
            transitionProperty: 'colors',
          },
          '&.highlighted-border::before': {
            borderColor: 'var(--branding-primary-default)',
          },
        },
      });
    }),
    animationPlugin,
  ],
};

export default config;
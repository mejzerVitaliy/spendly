import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animationPlugin from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  safelist: [
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95',
    'data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '500' }],
        h2: ['28px', { lineHeight: '40px', fontWeight: '400' }],
        h3: ['24px', { lineHeight: '28px', fontWeight: '400' }],

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
      borderRadius: {
        card: '12px',
      },
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          card: 'var(--card-background)',
          input: 'var(--input-background)',
          opacity: 'var(--background-opacity)',
          notification: 'var(--notification-background)',
          white: 'var(--background-white)',
          checked: 'var(--background-checked)',
          'inactive-opacity': 'var(--background-inactive-opacity)',
        },
        border: {
          DEFAULT: 'var(--border)',
          card: 'var(--card-border)',
          input: 'var(--input-border)',
          focus: 'var(--focus-outline)',
          button: 'var(--border-button)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          white: 'var(--text-white)',
          hint: 'var(--text-hint)',
          disabled: 'var(--text-disabled)',
          black: 'var(--text-black)',
          checked: 'var(--text-checked)',
          positive: 'var(--text-positive)',
          negative: 'var(--text-negative)',
        },
        branding: {
          primary: {
            default: 'var(--branding-primary-default)',
            hover: 'var(--branding-primary-hover)',
            // pressed: 'var(--branding-primary-pressed)',
            // 'on-surface': 'var(--branding-primary-on-surface)',
            // background: 'var(--branding-primary-background)',
          },
          secondary: {
            default: 'var(--branding-secondary-default)',
            hover: 'var(--branding-secondary-hover)',
            // pressed: 'var(--branding-secondary-pressed)',
          },
        },
        disabled: 'var(--disabled)',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'gradient-animation': {
          '0%': {background: 'linearGradient(45deg, #6a5be9 0%, #aa5be2 100%)'},
          '100%': {background: 'linearGradient(-45deg, #6a5be9 0%, #aa5be2 100%)'},
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'zoom-in-95': { from: { transform: 'scale(0.95)' }, to: { transform: 'scale(1)' } },
        'zoom-out-95': { from: { transform: 'scale(1)' }, to: { transform: 'scale(0.95)' } },
        slideUpAndFade: {
          '0%': { opacity: '0', transform: 'translateY(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          '0%': { opacity: '0', transform: 'translateX(-2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDownAndFade: {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: '0', transform: 'translateX(2px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'animate-gradient': 'gradient-animation 0.5s ease-in-out forwards',
        'fade-in-0': 'fade-in 150ms ease-out',
        'fade-out-0': 'fade-out 150ms ease-in',
        'zoom-in-95': 'zoom-in-95 150ms ease-out',
        'zoom-out-95': 'zoom-out-95 150ms ease-in',
        slideUpAndFade: 'slideUpAndFade 0.2s ease-out',
        slideRightAndFade: 'slideRightAndFade 0.2s ease-out',
        slideDownAndFade: 'slideDownAndFade 0.2s ease-out',
        slideLeftAndFade: 'slideLeftAndFade 0.2s ease-out',
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
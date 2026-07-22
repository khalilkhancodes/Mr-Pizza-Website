import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: 'var(--color-charcoal)',
          50: 'var(--color-charcoal-50)',
          100: 'var(--color-charcoal-100)',
          300: 'var(--color-charcoal-300)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          dim: 'var(--color-gold-dim)',
          hover: 'var(--color-gold-hover)',
        },
        cream: 'var(--color-cream)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        background: 'var(--color-background)',
        border: 'var(--color-border)',
        error: 'var(--color-error)',
        whatsapp: 'var(--color-whatsapp)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        'display-lg': ['var(--text-display-lg)', { lineHeight: 'var(--text-display-lg-lh)', letterSpacing: 'var(--text-display-lg-ls)', fontWeight: 'var(--text-display-lg-weight)' }],
        'headline-lg': ['var(--text-headline-lg)', { lineHeight: 'var(--text-headline-lg-lh)', fontWeight: 'var(--text-headline-lg-weight)' }],
        'headline-lg-mobile': ['var(--text-headline-lg-mobile)', { lineHeight: 'var(--text-headline-lg-mobile-lh)', fontWeight: 'var(--text-headline-lg-mobile-weight)' }],
        'headline-md': ['var(--text-headline-md)', { lineHeight: 'var(--text-headline-md-lh)', fontWeight: 'var(--text-headline-md-weight)' }],
        'headline-sm': ['var(--text-headline-sm)', { lineHeight: 'var(--text-headline-sm-lh)', fontWeight: 'var(--text-headline-sm-weight)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--text-body-lg-lh)', fontWeight: 'var(--text-body-lg-weight)' }],
        'body-md': ['var(--text-body-md)', { lineHeight: 'var(--text-body-md-lh)', fontWeight: 'var(--text-body-md-weight)' }],
        'body-sm': ['var(--text-body-sm)', { lineHeight: 'var(--text-body-sm-lh)', fontWeight: 'var(--text-body-sm-weight)' }],
        'label-lg': ['var(--text-label-lg)', { lineHeight: 'var(--text-label-lg-lh)', letterSpacing: 'var(--text-label-lg-ls)', fontWeight: 'var(--text-label-lg-weight)' }],
        'label-md': ['var(--text-label-md)', { lineHeight: 'var(--text-label-md-lh)', letterSpacing: 'var(--text-label-md-ls)', fontWeight: 'var(--text-label-md-weight)' }],
      },
      spacing: {
        '4': 'var(--space-4)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '28': 'var(--space-28)',
        '32': 'var(--space-32)',
        '40': 'var(--space-40)',
        '48': 'var(--space-48)',
        '64': 'var(--space-64)',
        '80': 'var(--space-80)',
        '96': 'var(--space-96)',
        '120': 'var(--space-120)',
        gutter: 'var(--space-gutter)',
        'margin-mobile': 'var(--space-margin-mobile)',
        'margin-desktop': 'var(--space-margin-desktop)',
      },
      borderRadius: {
        sharp: 'var(--radius-sharp)',
        'soft-sm': 'var(--radius-soft-sm)',
        'soft-md': 'var(--radius-soft-md)',
        'soft-lg': 'var(--radius-soft-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'gold-glow': 'var(--shadow-gold-glow)',
        'whatsapp-glow': 'var(--shadow-whatsapp-glow)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      maxWidth: {
        container: 'var(--layout-container-max)',
        content: 'var(--layout-content-max)',
      },
      zIndex: {
        nav: '999',
        'cart-drawer': '60',
        modal: '70',
        toast: '80',
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
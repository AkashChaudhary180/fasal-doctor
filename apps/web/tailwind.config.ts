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
        kisan: {
          dark: '#0e2d1d',      // Deep forest green
          emerald: '#16a34a',   // Lush leaf green
          light: '#dcfce7',     // Fresh sprout tint
          accent: '#eab308',    // Golden crop amber
          alert: '#dc2626',     // Warning disease red
          earth: '#78350f',     // Rich fertile soil brown
          card: '#ffffff',
          surface: '#f0fdf4',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'kisan': '0 10px 25px -5px rgba(22, 163, 74, 0.2), 0 8px 10px -6px rgba(22, 163, 74, 0.2)',
        'touch': '0 6px 0px 0px rgba(15, 118, 54, 0.8)',
      },
    },
  },
  plugins: [],
};

export default config;

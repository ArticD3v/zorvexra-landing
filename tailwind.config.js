import defaultConfig from 'tailwindcss/defaultConfig'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-open-sans)',
          'var(--font-geist-sans)',
          ...defaultConfig.theme.fontFamily.sans,
        ],
        serif: [
          'var(--font-instrument)',
          ...defaultConfig.theme.fontFamily.serif,
        ],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

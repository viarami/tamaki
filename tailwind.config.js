/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' }
      },
      colors: {
        gray: {
          '100': '#F8F8F8',
          '200': '#F5F5F5',
          '300': '#C8C8C8',
          '400': '#888888',
          '500': '#707070',
          '600': '#505050',
          '700': '#383838',
          '800': '#282828',
          '900': '#101010'
        },
        black: '#111',
        primary: '#3070CB',
        secondary: '#265aa2',
        'accent-light': '#e0ba4f',
        'accent-dark': '#DF744A'
      }
    }
  },
  variants: {},
  plugins: []
}

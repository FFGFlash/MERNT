/* eslint-disable @typescript-eslint/no-var-requires */
const TailwindCSS = require('tailwindcss')
const CSSNano = require('cssnano')
const AutoPrefixer = require('autoprefixer')

module.exports = {
  plugins: [
    'postcss-preset-env',
    TailwindCSS('./tailwind.config.js'),
    CSSNano({ preset: 'default' }),
    AutoPrefixer
  ]
}

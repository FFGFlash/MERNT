/* eslint-disable @typescript-eslint/no-var-requires */
const TailwindCSS = require("tailwindcss")
const CSSNano = require("cssnano")
const AutoPrefixer = require("autoprefixer")

module.exports = {
  plugins: [
    TailwindCSS("./tailwind.config.js"),
    CSSNano({ preset: "default" }),
    AutoPrefixer
  ]
}

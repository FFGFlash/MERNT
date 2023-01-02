/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "modules"],
  rootDir: "../../",
  transform: {
    "\\.m?[jt]sx?$": ["babel-jest"]
  },
  testMatch: [
    "<rootDir>/src/client/**/*.test.{tsx,ts,jsx,js}",
    "<rootDir>/test/client/**/*.test.{tsx,ts,jsx,js}"
  ]
}

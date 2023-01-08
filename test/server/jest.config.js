/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'modules'],
  rootDir: '../../',
  transform: {
    '\\.m?[jt]sx?$': ['ts-jest', { babelConfig: true }]
  },
  testMatch: [
    '<rootDir>/src/server/**/*.test.{ts,js}',
    '<rootDir>/test/server/**/*.test.{ts,js}'
  ]
}

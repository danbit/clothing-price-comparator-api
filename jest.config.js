module.exports = {
  roots: ['<rootDir>/test'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
}

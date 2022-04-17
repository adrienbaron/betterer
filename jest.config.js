const path = require('path');
const { lstatSync, readdirSync } = require('fs');
// get listing of packages in the mono repo
const basePath = path.resolve(__dirname, 'packages');
const packages = readdirSync(basePath).filter((name) => {
  return lstatSync(path.join(basePath, name)).isDirectory();
});

module.exports = {
  setupFilesAfterEnv: ['./test/setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/**/dist/**/*.js',
    '!<rootDir>/packages/**/dist/**/types.js',
    '!<rootDir>/packages/**/dist/**/public.js',
    '!<rootDir>/packages/extension/.vscode-test/**/*',
    '!<rootDir>/packages/extension/dist/**/*.js',
    '!<rootDir>/packages/fixture/dist/**/*.js'
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: ['clover', 'json', 'json-summary', 'lcov', 'text'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '!**/*.e2e.spec.ts', '!**/workers.spec.ts'],
  watchPathIgnorePatterns: ['<rootDir>/fixtures', '<rootDir>/packages/[^/]+/src'],
  modulePathIgnorePatterns: ['<rootDir>/packages/extension'],
  moduleNameMapper: {
    ...packages.reduce(
      (acc, name) => ({
        ...acc,
        [`@betterer/${name}(.*)$`]:
          `<rootDir>/packages/./${name}/src/$1`,
      }),
      {},
    ),
  },
};

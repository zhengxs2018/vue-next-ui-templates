'use strict'

const { resolve, dirname } = require('path')

const { sync } = require('globby')

const pkg = require('./package.json')

const packageFolder = resolve(__dirname, 'packages')
const packages = sync(['*/package.json', '!examples/package.json', '@storybook'], {
  cwd: packageFolder,
  onlyFiles: true,
  absolute: false,
})

module.exports = {
  name: pkg.name,
  preset: 'ts-jest',
  rootDir: __dirname,
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: packages.reduce((mapping, file) => {
    const pkg = require(resolve(packageFolder, file))
    if (pkg.private === true) return mapping

    return Object.assign(mapping, {
      [`^${pkg.name}$`]: `<rootDir>/packages/${dirname(file)}/src`,
    })
  }, {}),
  watchPathIgnorePatterns: ['/node_modules/', 'examples', 'dist', '.git', '.history'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'packages/examples/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts', '!packages/examples/**/*.ts'],
}

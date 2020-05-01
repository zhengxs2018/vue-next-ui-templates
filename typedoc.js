const pkg = require('./package.json')
const CI = process.env.CI

module.exports = {
  name: pkg.name,
  mode: 'modules',
  gitRevision: 'master',
  readme: 'packages/README.md',
  out: CI ? 'dist-docs/api' : 'docs/api',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  ignoreCompilerErrors: true,
  exclude: [
    '**/node_modules/**',
    '**/@storybook/**',
    '**/examples/**',
    '**/dist/**',
    '**/.history/**',
    '**/*.spec.ts',
    '**/__tests__/**/*.ts',
  ],
  lernaExclude: ['@vue-next-ui/examples', '@storybook/vue-next'],
}

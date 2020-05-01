const { resolve, basename, extname } = require('path')
const { readdirSync } = require('fs')

const flatten = require('lodash/flatten')

const scopes = [
  createScopes('package', readdirSync(resolve(__dirname, 'packages'))),
  createScopes('builtin', readdirSync(resolve(__dirname, 'packages/builtin/src'))),
  createScopes('plugins', readdirSync(resolve(__dirname, 'packages/internal-plugins/src'))),
]

module.exports = {
  types: [
    {
      value: 'WIP',
      name: '💪  WIP:      Work in progress',
    },
    {
      value: 'feat',
      name: '✨  feat:     A new feature',
    },
    {
      value: 'fix',
      name: '🐞  fix:      A bug fix',
    },
    {
      value: 'refactor',
      name: '🛠  refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'docs',
      name: '📚  docs:     Documentation only changes',
    },
    {
      value: 'test',
      name: '🏁  test:     Add missing tests or correcting existing tests',
    },
    {
      value: 'chore',
      name: "🗯  chore:    Changes that don't modify src or test files. Such as updating build tasks, package manager",
    },
    {
      value: 'style',
      name:
        '💅  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'revert',
      name: '⏪  revert:   Revert to a commit',
    },
  ],

  scopes: scopes.flat(),

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
}

function createScopes(namespace, items) {
  return items.reduce((scopes, filename) => {
    if (filename.indexOf('index') === 0 || filename.indexOf('_') === 0) return scopes
    return scopes.concat(`${namespace}:${basename(filename, extname(filename))}`)
  }, [])
}

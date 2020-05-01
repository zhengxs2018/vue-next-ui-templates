const pkg = require('../package.json')

module.exports = {
  packageJson: pkg,
  framework: pkg.name,
  frameworkPresets: [
    require.resolve('./preset.js')
  ]
}

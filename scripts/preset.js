const webpackMerge = require('webpack-merge')
const babelMerge = require('babel-merge')

const babelConfig = require('./config/babel.config')
const webpackConfig = require('./config/webpack.config')


module.exports = {
  webpack(config){
    return webpackMerge(config, webpackConfig)
  },
  babelDefault(config){
    return babelMerge(config, babelConfig)
  }
}

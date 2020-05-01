const { resolve } = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',

  entry: resolve(__dirname, './src/main.ts'),
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.vue', 'json'],
    alias: {
      vue$: require.resolve('vue/dist/vue.esm-bundler.js')
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin()],
  devServer: {
    inline: true,
    overlay: true,
    progress: true,
    host: '0.0.0.0',
    useLocalIp: true,
    stats: 'errors-only',
    contentBase: resolve(__dirname, 'public'),
    historyApiFallback: {
      disableDotRule: true,
    },
  },
})

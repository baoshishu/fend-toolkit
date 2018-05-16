const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const paths = require('./paths')
const pkg = require(path.join(paths.appPath, 'package.json'))

if (!pkg.dllDependencies || !pkg.dllDependencies.length) {
  throw 'dllDependencies must be set in package.json for dll to work'
}

module.exports = {
  name: 'vendor',
  mode: 'production',
  entry: {
    vendor: pkg.dllDependencies,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(paths.appPath, 'dll'),
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new CleanWebpackPlugin(['dll'], {
      root: paths.appPath,
    }),
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]',
      path: path.resolve(paths.appPath, 'dll/manifest.json'),
    }),
  ],
}

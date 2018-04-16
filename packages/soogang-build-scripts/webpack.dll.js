const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pkg = require(path.join(process.cwd(), 'package.json'))

if (!pkg.dllDependencies || !pkg.dllDependencies.length) {
  throw 'dllDependencies must be set in package.json for dll to work'
}

module.exports = {
  name: 'vendor',
  entry: {
    vendor: pkg.dllDependencies,
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(), 'dll'),
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new CleanWebpackPlugin(['dll']),
    new webpack.DllPlugin({
      name: '[name]_[chunkhash]',
      path: path.resolve(__dirname, 'dll/manifest.json'),
    }),
  ],
}

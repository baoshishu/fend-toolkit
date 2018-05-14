const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const autoprefixer = require('autoprefixer')

const postCSSLoaderOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
}

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['preset-soogang'],
              cacheDirectory: true,
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCSSLoaderOptions,
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
    ],
  },
  dependencies: ['vendor'],
  devtool: 'source-map',
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: process.cwd(),
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: path.resolve(process.cwd(), 'dll/manifest.json'),
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new InlineManifestWebpackPlugin('manifest'),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].css',
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(process.cwd(), './dll/vendor**.js'),
      includeSourcemap: true,
    }),
    new MomentLocalesPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  ],
})

/**
 * Webpack development configuration.
 * Used with webpack.base.config
 */
var webpack = require('webpack')
var path = require('path')

var baseConfig = require('./webpack.base.config')

var styleLoaders = [{
  test: /\.css$/,
  use: [
    'style-loader?singleton',
    'css-loader', {
      loader: 'postcss-loader',
      options: {
        config: {
          path: 'config/postcss.config.js'
        }
      }
    }
  ]
}, {
  test: /\.less$/,
  use: [
    'style-loader?singleton',
    'css-loader', {
      loader: 'postcss-loader',
      options: {
        config: {
          path: 'config/postcss.config.js'
        }
      }
    },
    'less-loader'
  ]
}]

var devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

var othersDevConfig = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    compress: true,
    port: 8080,
    hot: true
  }
}

baseConfig.module.rules = baseConfig.module.rules.concat(styleLoaders)
baseConfig.plugins = baseConfig.plugins.concat(devPlugins)

module.exports = Object.assign({}, baseConfig, othersDevConfig)
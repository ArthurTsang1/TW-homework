/**
 * Webpack development configuration.
 * Used with webpack.base.config
 */
var webpack = require('webpack')
var path = require('path')
var baseConfig = require('./webpack.base.config')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractCSS = new ExtractTextPlugin('css/[name].[contenthash:6]-one.css')
var extractLess = new ExtractTextPlugin('css/[name].[contenthash:6]-two.css')


var styleLoaders = [{
    test: /\.css$/,
    use: extractCSS.extract({
      fallback: 'style-loader?singleton',
      use: [
        'css-loader?minimize',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'config/postcss.config.js'
            }
          }
        }
      ]
    })
  },
  {
    test: /\.less$/,
    use: extractLess.extract({
      fallback: 'style-loader?singleton',
      use: [
        'css-loader?minimize',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: 'config/postcss.config.js'
            }
          }
        },
        'less-loader'
      ]
    })
  }
]

baseConfig.module.rules = baseConfig.module.rules.concat(styleLoaders)

baseConfig.plugins.push(extractCSS)
baseConfig.plugins.push(extractLess)
baseConfig.plugins.push(new CleanWebpackPlugin(['dist'], {
  root: path.resolve(__dirname, '../')
}))
baseConfig.plugins.push(new webpack.DefinePlugin({
  'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}))

var othersDevConfig = {
  devtool: 'cheap-source-map'
}


module.exports = Object.assign({}, baseConfig, othersDevConfig)
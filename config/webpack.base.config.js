/**
 * Webpack configuration.
 * Basic config, to used with webpack.dev.config and webpack.prod.config
 */

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'), // 设置 entry 和 loader 里面的根目录
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(woff|woff2|svg|tff|eot)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=1000&name=assets/fonts/[name].[hash:6].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|bmp|gif|ico)$/,
        exclude: /node_modules/,
        use : 'url-loader?limit=1000&name=assets/imgs/[name].[hash:6].[ext]'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            attrs: ['img:src', 'link:href']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
const path = require('path')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

module.exports = {
  entry: {
    client: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.html', '.css', '.json'],
    alias: {
      '~': path.join(__dirname, '../src')
    }
  },
  performance: {},
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['happypack/loader?id=babel', 'svelte-loader'],
        exclude: [/build/]
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader'],
      threads: 4
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      template: path.resolve(__dirname, './index.html'),
      favicon: path.resolve(__dirname, './favicon.png'),
      filename: './index.html'
    })
  ]
}

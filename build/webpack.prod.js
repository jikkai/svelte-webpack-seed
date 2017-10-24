const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const base = require('./webpack.base')
const config = require('./config')

base.entry.vendor = config.vendor
base.stats = { children: false }

// Plugins Configuration
base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractTextPlugin('index.css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:8].js'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  })
)

// Rules Configuration
base.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    use: [{ loader: 'css-loader?minimize=true' }, 'postcss-loader'],
    fallback: 'style-loader'
  })
})

module.exports = base

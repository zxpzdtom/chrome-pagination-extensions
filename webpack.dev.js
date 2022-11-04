const path = require('path')
const { merge } = require('webpack-merge')
const config = require('./webpack.common.js')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 9000,
    compress: false,
    open: ['/popup.html'],
    hot: true,
    client: {
      progress: true,
      reconnect: true,
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
  }
})

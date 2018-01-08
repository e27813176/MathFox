const path = require('path')
const webpack = require('webpack')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'public/javascript/math_game/js/main.js')
    ],
    vendor: ['pixi', 'p2', 'phaser']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: '[hash].vendor.bundle.js'/* filename= */ })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, 'public')
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name]_[hash:7].[ext]',
            }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          }
        ]
      },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    jquery: 'jQuery',
    Analytics: 'Analytics',
    globalUser: 'globalUser',
    getPassedStageIDList: 'getPassedStageIDList',
    path_prefix: 'path_prefix'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}

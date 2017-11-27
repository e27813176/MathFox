const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const common = require('./webpack.common.js');

module.exports = merge(common, {
    watch: true,
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 5555,
            server: {
                baseDir: ['./', './build']
            }
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
        })
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: './dist'
    }
});

const path = require('path')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/javascript/game/dist',
        filename: '[hash].bundle.js'
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});


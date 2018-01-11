const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = merge(common, {
	watch: true,
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist/',
		filename: 'bundle.js'
	},
	plugins: [
		new BrowserSyncPlugin({
			host: process.env.IP || 'localhost',
			port: process.env.PORT || 5555,
			server: {
				baseDir: ['./', './dist']
			}
		}),
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
		}),
		new HtmlWebpackPlugin({
			title: 'FoxieFox',
			filename: 'index.html'
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{
					module: 'mocks',
					entry: 'http://localhost:5555/mocks.js',
				}
			]
		})
	],
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		historyApiFallback: true
	}
});

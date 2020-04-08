const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const base = require('./webpack.base.config.js');

const libraryName = pkg.name;
const port = 9000;
// extractLESS for ant design lib
const extractLESS = new ExtractTextPlugin('bundle-global.[hash].css');
const extractStylus = new ExtractTextPlugin('bundle.[hash].css');

module.exports = merge(base, {
	devtool: 'source-map',
	mode: 'development',
	entry: './demo/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[hash].js',
		publicPath: '/',
	},
	devServer: {
		port,
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							['import', {
								'libraryName': 'antd',
								'libraryDirectory': 'es',
								'style': true,
							},],
						],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				include: /node_modules\/antd/,
				use : extractLESS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'less-loader',
							options: {
								javascriptEnabled: true,
							},
						},
					],
				}),
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				use : extractStylus.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'stylus-loader',
						},
					],
				}),
			},
			{
				test: /\.svg$/,
				include: /src\/components/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: '@svgr/webpack',
						options: {
							babel: false,
							icon: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Demo',
			template: './demo/index.html',
		}),
		extractLESS,
		extractStylus,
	],
	resolve: {
		alias: {
			[libraryName]: path.join(__dirname, './src'),
		},
	},
});

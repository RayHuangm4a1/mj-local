const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const extractRoot = new MiniCssExtractPlugin({
	filename: 'css/admin.css',
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CLIENT_PORT = 3003;

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		'management-console': path.join(__dirname, './app/management-console/index.js'),
		'client-console': path.join(__dirname, './app/client-console/index.js'),
		'client-mobile-console': path.join(__dirname, './app/client-console/index.mobile.js'),
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: 'js/[name].js',
		publicPath: '/',
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /\.css$/,
				exclude: /(node_modules(?!\/antd)|bower_components)/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',

					},
				],
			},
			{
				test: /\.css$/,
				include: /node_modules\/onsenui/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',

					},
				],
			},
			{
				test: /\.styl$/,
				include: [
					path.resolve('./app/client-console/styling/with-css-module',),
					path.resolve('./app/client-console/product-configs',),
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]-[hash:base64:5]',
						}
					},
					{
						loader: 'stylus-loader',
					}
				],
			},
			{
				test: /\.styl$/,
				exclude:[
					/(node_modules|bower_components)/,
					path.resolve('./app/client-console/styling/with-css-module',),
					path.resolve('./app/client-console/product-configs',),
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'stylus-loader',
					},
				],
			},
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		port: CLIENT_PORT,
		contentBase: 'public',
		historyApiFallback: {
			rewrites: [
				{ from: /^\/management/, to: '/management-app.html', },
				{ from: /^\/client/, to: '/client-app.html', },
				{ from: /^\/m-client/, to: '/client-mobile-app.html', },
			]
		},
		proxy: {
			'/api/management': 'http://localhost:' + global.MANAGEMENT_PORT,
		}
	},
	plugins: [
		extractRoot,
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new HtmlWebpackPlugin({
			filename: 'management-app.html',
			chunks: ['management-console'],
			template: 'views/management-app.pug',
		},),
		new HtmlWebpackPlugin({
			filename: 'client-app.html',
			chunks: ['client-console'],
			template: 'views/client-app.pug',
		}),
		new HtmlWebpackPlugin({
			filename: 'client-mobile-app.html',
			chunks: ['client-mobile-console'],
			template: 'views/client-mobile-app.pug',
		}),
	],
	resolve: {
		alias: {
			'ljit-react-components': path.join(__dirname, './app/ljit-react-components/'),
			'ljit-react-mobile-navigation': path.join(__dirname, './app/ljit-react-mobile-navigation/'),
			'ljit-store-connecter': path.join(__dirname, './app/ljit-store-connecter/'),
			'ljit-observable': path.join(__dirname, './app/ljit-observable/'),
			'ljit-i18n': path.join(__dirname, './app/ljit-i18n/'),
			'management-console': path.join(__dirname, './app/management-console/'),
			'client-console':  path.join(__dirname, './app/client-console/'),
			'react': path.resolve('./node_modules/react'),
		},
	},
};

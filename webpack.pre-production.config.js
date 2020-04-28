const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const extractRoot = new MiniCssExtractPlugin({
	filename: 'css/admin.[hash].css',
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PRODUCT = 'mj';

module.exports = {
	mode: 'production',
	entry: {
		'management-console': path.join(__dirname, './app/management-console/index.js'),
		'client-console': path.join(__dirname, './app/client-console/index.js'),
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash].js',
		publicPath: '/',
	},
	optimization: {
		runtimeChunk: {
			name: 'manifest',
		},
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		minimizer: [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({}),
		],
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
	plugins: [
		extractRoot,
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
		}),
		new HtmlWebpackPlugin({
			filename: 'management-app.html',
			chunks: ['management-console'],
			template: 'views/management-app.pug',
		}),
		new HtmlWebpackPlugin({
			filename: 'client-app.html',
			chunks: ['client-console'],
			template: 'views/client-app.pug',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CopyWebpackPlugin([
			{ from: './app/client-console/pwa' },
		]),
		new WorkboxPlugin.GenerateSW({
			swDest: 'service-worker.js',
			clientsClaim: true,
			skipWaiting: true,
			navigateFallback: '/client-app.html',
			runtimeCaching: [{
				urlPattern: new RegExp(config.getClient(PRODUCT).pwaCacheUrl),
				handler: 'StaleWhileRevalidate'
			}]
		})
	],
	resolve: {
		alias: {
			'ljit-react-components': path.join(__dirname, './app/ljit-react-components/'),
			'ljit-store-connecter': path.join(__dirname, './app/ljit-store-connecter/'),
			'ljit-observable': path.join(__dirname, './app/ljit-observable/'),
			'ljit-i18n': path.join(__dirname, './app/ljit-i18n/'),
			'management-console': path.join(__dirname, './app/management-console/'),
			'client-console': path.join(__dirname, './app/client-console/'),
			'react': path.resolve('./node_modules/react'),
		},
	},
};

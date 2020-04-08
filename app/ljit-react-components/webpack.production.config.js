const merge = require('webpack-merge');
const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const base = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rootCss = new ExtractTextPlugin({
	filename: 'index.css',
	allChunks: true,
	ignoreOrder: true,
});
const libraryName = pkg.name;

module.exports = merge(base, {
	mode: 'production',
	entry: path.join(__dirname, './src/index.js'),
	output: {
		path: path.join(__dirname, './dest/'),
		filename: 'index.js',
		library: libraryName,
		libraryTarget: 'umd',
		publicPath: '/',
		umdNamedDefine: true,
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				include: /node_modules\/antd/,
				use : rootCss.extract({
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
				use : rootCss.extract({
					fallback: 'style-loader',
					use : [
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
		rootCss,
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BundleAnalyzerPlugin(),
	],
	externals: {
		react: {
			root: 'React',
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			umd: 'react',
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom',
			umd: 'react-dom',
		},
		'react-router-dom': {
			root: 'ReactRouterDOM',
			commonjs2: 'react-router-dom',
			commonjs: 'react-router-dom',
			amd: 'react-router-dom',
			umd: 'react-router-dom',
		},
		'antd': {
			root: 'antd',
			commonjs: 'antd',
			commonjs2: 'antd',
			amd: 'antd',
			umd: 'antd',
		},
	},
});

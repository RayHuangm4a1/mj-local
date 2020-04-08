const path = require('path');
const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
	resolve: {
		alias: {
			'react': path.resolve(__dirname, './node_modules/react'),
			'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
			'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
			'antd': path.resolve(__dirname, './node_modules/antd'),
			'lodash': path.resolve(__dirname, './node_modules/lodash'),
			'classnames': path.resolve(__dirname, './node_modules/classnames'),
			'@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/components/icon/icons.js'),
		},
	},
};

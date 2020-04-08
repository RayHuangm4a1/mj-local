import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Layout as AntdLayout, } from 'antd';
import './style.styl';

const { Sider: AntdSider, Header: AntdHeader, Content: AntdContent, Footer: AntdFooter, } = AntdLayout;

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	style: PropTypes.object,
};
const defaultProps = {};

const Layout = ({ className, children, style, }) => {
	return (
		<AntdLayout className={cx('ljit-layout', className)} style={style}>
			{children}
		</AntdLayout>
	);
};

Layout.Sider = AntdSider;

Layout.Header = ({ className, children, style, }) => {
	return (
		<AntdHeader className={cx('ljit-layout-header', className)} style={style}>
			{children}
		</AntdHeader>
	);
};

Layout.Footer = ({ className, children, style, }) => {
	return (
		<AntdFooter className={cx('ljit-layout-footer', className)} style={style}>
			{children}
		</AntdFooter>
	);
};

Layout.Content = ({ className, children, style, }) => {
	return (
		<AntdContent className={cx('ljit-layout-content', className)} style={style}>
			{children}
		</AntdContent>
	);
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

Layout.Header.propTypes = propTypes;
Layout.Header.defaultProps = {};
Layout.Header.displayName = 'Header';

Layout.Content.propTypes = propTypes;
Layout.Content.defaultProps = {};
Layout.Content.displayName = 'Content';

Layout.Footer.propTypes = propTypes;
Layout.Footer.defaultProps = {};
Layout.Footer.displayName = 'Footer';

export default Layout;

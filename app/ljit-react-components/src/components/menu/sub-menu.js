import React from 'react';
import PropTypes from 'prop-types';
import AntdMenu from 'antd/lib/menu';
import omit from 'lodash/omit';
import { PREFIX_CLASS, } from './';

const AntdSubMenu = AntdMenu.SubMenu;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.array,
	]),
};

const SubMenu = (props) => {
	// antd need additional props itself
	const childProps = omit(props, ['title', 'children',]);

	return (
		<AntdSubMenu
			{...childProps}
			className={`${PREFIX_CLASS}__sub`}
			title={props.title}
		>
			{props.children}
		</AntdSubMenu>
	);
};

SubMenu.propTypes = propTypes;

export default SubMenu;

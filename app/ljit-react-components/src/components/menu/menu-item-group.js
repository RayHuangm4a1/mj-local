import React from 'react';
import PropTypes from 'prop-types';
import AntdMenu from 'antd/lib/menu';
import omit from 'lodash/omit';
import { PREFIX_CLASS, } from './';

const AntdMenuItemGroup = AntdMenu.ItemGroup;

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

const MenuItemGroup = (props) => {
	// antd need additional props itself
	const childProps = omit(props, ['title', 'children',]);

	return (
		<AntdMenuItemGroup
			{...childProps}
			className={`${PREFIX_CLASS}__group`}
			title={props.title}
		>
			{props.children}
		</AntdMenuItemGroup>
	);
};

MenuItemGroup.propTypes = propTypes;

export default MenuItemGroup;


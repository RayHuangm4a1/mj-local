import React from 'react';
import PropTypes from 'prop-types';
import AntdMenu from 'antd/lib/menu';
import omit from 'lodash/omit';
import { PREFIX_CLASS, } from './';

const AntdMenuItem = AntdMenu.Item;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const MenuItem = (props) => {
	// antd need additional props itself
	const childProps = omit(props, ['title',]);

	return (
		<AntdMenuItem
			{...childProps}
			className={`${PREFIX_CLASS}__item`}
			title={props.title}
		/>
	);
};

MenuItem.propTypes = propTypes;

export default MenuItem;

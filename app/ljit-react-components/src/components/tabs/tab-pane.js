import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash/omit';
import { Tabs as AntdTab, } from 'antd';
import {
	PREFIX_CLASS,
} from './utils';

const AntdTabPane = AntdTab.TabPane;

const omitPropNames = [
	'tab',
	'className',
	'children',
];

const propTypes = {
	tab: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	className: PropTypes.string,
	children: PropTypes.node,
};

const TabPane = (props) => {
	const {
		tab,
		className,
		children,
	} = props;
	const childProps = omit(props, omitPropNames);

	return (
		<AntdTabPane
			{...childProps}
			className={cx(`${PREFIX_CLASS}__tabpane`, className)}
			tab={tab}
		>
			{children}
		</AntdTabPane>
	);
};

TabPane.propTypes = propTypes;

export default TabPane;

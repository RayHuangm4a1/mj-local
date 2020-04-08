import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tabs from '../tabs';

const TabsTabPane = Tabs.TabPane;

const propTypes = {
	tab: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.array,
	]),
};

const TabPane = (props) => {
	const {
		tab,
		className,
		children,
	} = props;

	return (
		<TabsTabPane
			{...props}
			tab={tab}
			className={cx('ljit-horizontal-tabs__tabpane', className)}
		>
			{children}
		</TabsTabPane>
	);
};

TabPane.propTypes = propTypes;

export default TabPane;

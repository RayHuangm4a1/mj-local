import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tabs, } from 'ljit-react-components';

const TabsTabPane = Tabs.TabPane;

const propTypes = {
	tab: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]).isRequired,
	className: PropTypes.string,
	children: PropTypes.node,
};

const TabPane = (props) => (
	<TabsTabPane
		{...props}
		className={cx('card-tabs__tabpane', props.className)}
	/>
);

TabPane.propTypes = propTypes;

export default TabPane;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tabs, } from 'ljit-react-components';
import TabPane from './tab-pane';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	activeKey: PropTypes.string,
	onChange: PropTypes.func,
};

const PlainTabs = (props) => (
	<Tabs
		{...props}
		tabPosition={Tabs.TabPositionEnum.TOP}
		tabType={Tabs.TabTypeEnum.LINE}
		isTabBordered={false}
		hasTabInkBar={false}
		className={cx('plain-tabs', props.className)}
	/>
);

PlainTabs.propTypes = propTypes;

PlainTabs.TabPane = TabPane;

export default PlainTabs;

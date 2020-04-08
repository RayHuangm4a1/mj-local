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

const CardTabs = (props) => (
	<Tabs
		{...props}
		tabPosition={Tabs.TabPositionEnum.TOP}
		tabType={Tabs.TabTypeEnum.CARD_GROUP}
		isTabBordered={false}
		isTabFillWidth
		hasTabInkBar={false}
		className={cx('card-tabs', props.className)}
	/>
);

CardTabs.propTypes = propTypes;

CardTabs.TabPane = TabPane;

export default CardTabs;

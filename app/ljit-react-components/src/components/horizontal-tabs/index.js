import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tabs from '../tabs';
import TabPane from './tab-pane';

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.array,
	]),
	activeKey: PropTypes.string,
	onChange: PropTypes.func,
	isAnimated: PropTypes.bool,
};
const defaultProps = {
	onChange: () => {},
	isAnimated: true,
};

const HorizontalTabs = ({
	className,
	activeKey,
	onChange,
	children,
	isAnimated,
}) => (
	<Tabs
		tabPosition={Tabs.TabPositionEnum.TOP}
		tabType={Tabs.TabTypeEnum.LINE}
		className={cx('ljit-horizontal-tabs', className)}
		activeKey={activeKey}
		onChange={onChange}
		isAnimated={isAnimated}
	>
		{children}
	</Tabs>
);

HorizontalTabs.propTypes = propTypes;
HorizontalTabs.defaultProps = defaultProps;

HorizontalTabs.TabPane = TabPane;

export default HorizontalTabs;

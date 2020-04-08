import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tabs as AntdTabs, } from 'antd';
import {
	PREFIX_CLASS,
	TabPositionEnum,
	TabTypeEnum,
	TabTypeMap,
} from './utils';
import TabPane from './tab-pane';
import './style.styl';

const {
	TOP,
	RIGHT,
	BOTTOM,
	LEFT,
} = TabPositionEnum;
const {
	LINE,
	CARD,
	CARD_GROUP,
	LIST,
} = TabTypeEnum;

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	activeKey: PropTypes.string,
	onChange: PropTypes.func,
	tabPosition: PropTypes.oneOf([
		TOP,
		RIGHT,
		BOTTOM,
		LEFT,
	]),
	tabType: PropTypes.oneOf([
		LINE,
		CARD,
		CARD_GROUP,
	]),
	isTabBordered: PropTypes.bool,
	// only work position top, bottom
	isTabFillWidth: PropTypes.bool,
	hasTabInkBar: PropTypes.bool,
	// only work position left, right
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	isAnimated: PropTypes.bool,
};
const defaultProps = {
	tabPosition: TabPositionEnum.TOP,
	tabType: TabTypeEnum.LINE,
	isTabFillWidth: false,
	isTabBordered: true,
	hasTabInkBar: true,
	isAnimated: true,
	onChange: () => {},
};

class Tabs extends Component {
	constructor() {
		super();
		this._getTabsClassName = this._getTabsClassName.bind(this);
		this._renderTabBar = this._renderTabBar.bind(this);
		this._renderTitle = this._renderTitle.bind(this);
	}

	_getTabsClassName() {
		const {
			className,
			tabPosition,
			tabType,
			isTabBordered,
			isTabFillWidth,
			hasTabInkBar,
		} = this.props;

		return cx(PREFIX_CLASS, {
			[`${PREFIX_CLASS}--position-top`]: tabPosition === TOP,
			[`${PREFIX_CLASS}--position-right`]: tabPosition === RIGHT,
			[`${PREFIX_CLASS}--position-bottom`]: tabPosition === BOTTOM,
			[`${PREFIX_CLASS}--position-left`]: tabPosition === LEFT,
			[`${PREFIX_CLASS}--type-line`]: tabType === LINE,
			[`${PREFIX_CLASS}--type-card`]: tabType === CARD,
			[`${PREFIX_CLASS}--type-cardgroup`]: tabType === CARD_GROUP,
			[`${PREFIX_CLASS}--type-list`]: tabType === LIST,
			[`${PREFIX_CLASS}--bordered`]: isTabBordered,
			[`${PREFIX_CLASS}--no-bordered`]: !isTabBordered,
			[`${PREFIX_CLASS}--fillwidth`]: isTabFillWidth,
			[`${PREFIX_CLASS}--inkbar`]: hasTabInkBar,
			[`${PREFIX_CLASS}--no-inkbar`]: !hasTabInkBar,
		}, className);
	}

	_renderTabBar(props, DefaultTabBar) {
		const { tabPosition, } = this.props;
		const isTabOrientationVertical = tabPosition === LEFT || tabPosition === RIGHT;
		const style = {
			display: 'flex',
			flexDirection: 'column',
		};

		return (
			<DefaultTabBar
				{...props}
				style={isTabOrientationVertical ? style : {}}
			/>
		);
	}
	_renderTitle() {
		const { tabPosition, title, } = this.props;
		const isTabOrientationVertical = tabPosition === LEFT || tabPosition === RIGHT;

		if (title && isTabOrientationVertical) {
			return (
				<div className={`${PREFIX_CLASS}__title`}>
					{title}
				</div>
			);
		}
	}

	render() {
		const {
			activeKey,
			onChange,
			children,
			tabPosition,
			tabType,
			isAnimated,
		} = this.props;
		const { _renderTabBar, _renderTitle, } = this;
		const tabsClassName = this._getTabsClassName();
		const mappedTabType = TabTypeMap[tabType];

		return (
			<AntdTabs
				className={tabsClassName}
				tabPosition={tabPosition}
				activeKey={activeKey}
				onChange={onChange}
				type={mappedTabType}
				renderTabBar={_renderTabBar}
				tabBarExtraContent={_renderTitle()}
				animated={isAnimated}
			>
				{children}
			</AntdTabs>
		);
	}
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

Tabs.TabPositionEnum = TabPositionEnum;
Tabs.TabTypeEnum = TabTypeEnum;

Tabs.TabPane = TabPane;

export default Tabs;

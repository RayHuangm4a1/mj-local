import React, { Component, } from 'react';
import { Timeline as AntdTimeline, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';

const { Item, } = AntdTimeline;

const ColorEnums = {
	BRIGHTBLUE: 'brightBlue',
	GRASSGREEN: 'grassGreen',
	LIGHTRED: 'lightRed',
	WARMORANGE: 'warmOrange',
	LIGHTPURPLE: 'lightPurple',
	TIFFANYGREEN: 'tiffanyGreen',
	SALMONRED: 'salmonRed',
};

const {
	BRIGHTBLUE,
	GRASSGREEN,
	LIGHTRED,
	WARMORANGE,
	LIGHTPURPLE,
	TIFFANYGREEN,
	SALMONRED,
} = ColorEnums;

const ColorSettingEnums = {
	[BRIGHTBLUE]: '#5cb0ff',
	[GRASSGREEN]: '#52c41a',
	[LIGHTRED]: '#f5222d',
	[WARMORANGE]: '#faad14',
	[LIGHTPURPLE]: '#cc77ee',
	[TIFFANYGREEN]: '#3de2ca',
	[SALMONRED]: '#ff8667',
};

const propTypes = {
	nodeElement: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	nodeColor: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

class TimelineItem extends Component {
	render() {
		const { nodeElement, nodeColor, className, children, } = this.props;

		return (
			<Item
				dot={nodeElement}
				color={ColorSettingEnums[nodeColor]}
				className={cx('ljit-time-line-item', className,)}
			>
				{children}
			</Item>
		);
	}
}

TimelineItem.propTypes = propTypes;
TimelineItem.ColorEnums = ColorEnums;
TimelineItem.ColorSettingEnums = ColorSettingEnums;

export default TimelineItem;

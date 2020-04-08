import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash/omit';
import { Tooltip as AntdTooltip, } from 'antd';
import './style.styl';

const PlacementEnums = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
	BOTTOM: 'bottom',
	TOP_LEFT: 'topLeft',
	TOP_RIGHT: 'topRight',
	BOTTOM_LEFT: 'bottomLeft',
	BOTTOM_RIGHT: 'bottomRight',
	LEFT_TOP: 'leftTop',
	LEFT_BOTTOM: 'leftBottom',
	RIGHT_TOP: 'rightTop',
	RIGHT_BOTTOM: 'rightBottom',
};
const TriggerTypeEnums = {
	HOVER: 'hover',
	FOCUS: 'focus',
	CLICK: 'click',
	CONTEXT_MENU: 'contextMenu',
};
const ColorEnums = {
	DEFAULT: 'default',
	WHITE: 'white',
};
const { DEFAULT, WHITE, } = ColorEnums;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	placement: PropTypes.oneOf(Object.values(PlacementEnums).concat('')),
	trigger: PropTypes.oneOf(Object.values(TriggerTypeEnums).concat('')),
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	isArrowPointAtCenter: PropTypes.bool,
	overlayColor: PropTypes.oneOf(Object.values(ColorEnums).concat('')),
	overlayClassName: PropTypes.string,
	overlayStyle: PropTypes.object,
	isTooltipVisible: PropTypes.bool,
	onVisibleChange: PropTypes.func,
};
const defaultProps = {
	placement: PlacementEnums.TOP,
	trigger: TriggerTypeEnums.HOVER,
	isArrowPointAtCenter: false,
	isTooltipVisible: false,
	onVisibleChange: () => {},
};

const PREFIX_CLASS = 'ljit-tooltip';

class TooltipSample extends Component {
	render() {
		const {
			title,
			children,
			className,
			isArrowPointAtCenter,
			overlayColor,
			overlayClassName,
			overlayStyle,
			placement,
			trigger,
			isTooltipVisible,
			onVisibleChange,
		} = this.props;

		// antd need additional props itself
		const childProps = omit(this.props, ['placement', 'title',]);

		return (
			<AntdTooltip
				placement={this.props.placement}
				title={this.props.title}
				{...childProps}
			>
				<span style={{ margin: '2px 0 0 5px', }}>
					12345
				</span>
			</AntdTooltip>
		);
	}
}

TooltipSample.propTypes = propTypes;
TooltipSample.defaultProps = defaultProps;
TooltipSample.PlacementEnums = PlacementEnums;
TooltipSample.TriggerTypeEnums = TriggerTypeEnums;
TooltipSample.ColorEnums = ColorEnums;

export default TooltipSample;

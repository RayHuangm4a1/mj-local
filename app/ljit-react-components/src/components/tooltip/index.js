import React, { Component, } from 'react';
import cx from 'classnames';
import { Tooltip as AntdTooltip, } from 'antd';
import ControlledTooltip from './controlled-tooltip';
import {
	ColorEnums,
	PlacementEnums,
	TriggerTypeEnums,
	TooltipPropTypes,
} from './utils';
import './style.styl';

const propTypes = TooltipPropTypes;
const defaultProps = {
	placement: PlacementEnums.TOP,
	trigger: TriggerTypeEnums.HOVER,
	isArrowPointAtCenter: false,
};
const {
	DEFAULT,
	WHITE,
} = ColorEnums;

const PREFIX_CLASS = 'ljit-tooltip';

class Tooltip extends Component {
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
			...rest
		} = this.props;

		return (
			<AntdTooltip
				title={title}
				className={cx(PREFIX_CLASS, className)}
				arrowPointAtCenter={isArrowPointAtCenter}
				overlayClassName={cx(overlayClassName, `${PREFIX_CLASS}-overlay`, {
					[`${PREFIX_CLASS}-overlay--default`]: overlayColor === DEFAULT,
					[`${PREFIX_CLASS}-overlay--white`]: overlayColor === WHITE,
				})}
				overlayStyle={overlayStyle}
				placement={placement}
				trigger={trigger}
				{...rest}
			>
				{children}
			</AntdTooltip>
		);
	}
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.PlacementEnums = PlacementEnums;
Tooltip.TriggerTypeEnums = TriggerTypeEnums;
Tooltip.ColorEnums = ColorEnums;
Tooltip.ControlledTooltip = ControlledTooltip;

export default Tooltip;

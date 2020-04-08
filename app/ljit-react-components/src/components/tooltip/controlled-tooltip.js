import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cx from 'classnames';
import Tooltip from '.';
import {
	ColorEnums,
	PlacementEnums,
	TriggerTypeEnums,
	TooltipPropTypes,
} from './utils';
import './style.styl';

const propTypes = {
	...TooltipPropTypes,
	isVisible: PropTypes.bool,
	onVisibleChange: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onVisibleChange: () => {},
};
const PREFIX_CLASS = 'ljit-controlled-tooltip';

class ControlledTooltip extends Component {
	render() {
		const { 
			children,
			className,
			isVisible,
			onVisibleChange, 
		} = this.props;

		const restProps = omit(this.props, [
			'children',
			'className',
			'isVisible',
			'onVisibleChange',
		]);

		return (
			<Tooltip
				{...restProps}
				className={cx(PREFIX_CLASS, className)}
				visible={isVisible}
				onVisibleChange={onVisibleChange}
			>
				{children}
			</Tooltip>
		);
	}
}

ControlledTooltip.propTypes = propTypes;
ControlledTooltip.defaultProps = defaultProps;
ControlledTooltip.PlacementEnums = PlacementEnums;
ControlledTooltip.ColorEnums = ColorEnums;
ControlledTooltip.TriggerTypeEnums = TriggerTypeEnums;

export default ControlledTooltip;

import React, { Component, } from 'react';
import { Steps as AntdSteps, } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Step from './step';

const DirectionEnums = {
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal',
};
const {
	VERTICAL,
	HORIZONTAL,
} = DirectionEnums;

const SizeEnums = {
	DEFAULT: 'default',
	SMALL: 'small',
};
const {
	DEFAULT,
	SMALL,
} = SizeEnums;

const propTypes = {
	className: PropTypes.string,
	activeKey: PropTypes.number,
	direction: PropTypes.oneOf(Object.values(DirectionEnums).concat('')),
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	onChange: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const defaultProps = {
	direction: HORIZONTAL,
	size: DEFAULT,
	onChange: () => {},
};

class Steps extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			className,
			activeKey,
			direction,
			size,
			onChange,
			children,
		} = this.props;

		return (
			<AntdSteps
				className={cx('ljit-steps', className)}
				current={activeKey}
				direction={direction}
				size={size}
				onChange={onChange}
			>
				{children}
			</AntdSteps>
		);
	}
}

Steps.propTypes = propTypes;
Steps.defaultProps = defaultProps;

Steps.Step = Step;
Steps.DirectionEnums = DirectionEnums;
Steps.SizeEnums = SizeEnums;

export default Steps;

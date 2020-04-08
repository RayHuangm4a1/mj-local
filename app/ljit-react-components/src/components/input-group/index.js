import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Input as AntdInput, } from 'antd';

const InputSizeEnums = {
	DEFAULT: 'default',
	LARGE: 'large',
	SMALL: 'small',
};
const {
	DEFAULT,
	LARGE,
	SMALL,
} = InputSizeEnums;

const propTypes = {
	isCompact: PropTypes.bool,
	size: PropTypes.oneOf([
		DEFAULT,
		LARGE,
		SMALL,
		'',
	]),
	children: PropTypes.any,
	className: PropTypes.string,
	style: PropTypes.object,
};
const defaultProps = {
	isCompact: false,
	size: DEFAULT,
	className: '',
	style: {},
};

class InputGroup extends Component {
	render() {
		const {
			isCompact,
			size,
			className,
			style,
			children,
		} = this.props;

		return (
			<AntdInput.Group
				compact={isCompact}
				size={size}
				style={style}
				className={cx('ljit-input-group',
					`ljit-input-group-size--${size}`,
					isCompact ? `ljit-input-group-compact` : '',
					className
				)}
			>
				{children}
			</AntdInput.Group>
		);
	}
}

InputGroup.propTypes = propTypes;
InputGroup.defaultProps = defaultProps;
InputGroup.InputSizeEnums = InputSizeEnums;

export default InputGroup;

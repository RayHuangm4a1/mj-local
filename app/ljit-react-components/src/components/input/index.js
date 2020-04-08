import React, { Component, } from 'react';
import { Input as AntdInput, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onPressEnter: PropTypes.func,
	prefix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	suffix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};
const defaultProps = {
	disabled: false,
	readOnly: false,
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
	onPressEnter: () => {},
};

class Input extends Component {
	render() {
		const {
			disabled,
			id,
			type,
			value,
			placeholder,
			readOnly,
			className,
			style,
			onChange,
			onFocus,
			onBlur,
			onPressEnter,
			prefix,
			suffix,
		} = this.props;

		return (
			<AntdInput
				disabled={disabled}
				id={id}
				type={type}
				value={value}
				placeholder={placeholder}
				readOnly={readOnly}
				className={cx('ljit-input', className)}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onPressEnter={onPressEnter}
				prefix={prefix}
				suffix={suffix}
			/>
		);
	}
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;

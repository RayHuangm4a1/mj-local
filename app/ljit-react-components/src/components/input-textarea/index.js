import React, { Component, } from 'react';
import { Input as AntdInput, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
	maxRows: PropTypes.number,
	minRows: PropTypes.number,
	disabled: PropTypes.bool,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	readOnly: PropTypes.bool,
	style: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onPressEnter: PropTypes.func,
};
const defaultProps = {
	disabled: false,
	readOnly: false,
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
	onPressEnter: () => {},
};

class InputTextarea extends Component {
	render() {
		const {
			maxRows,
			minRows,
			disabled,
			id,
			value,
			placeholder,
			readOnly,
			className,
			style,
			onChange,
			onFocus,
			onBlur,
			onPressEnter,
		} = this.props;

		return (
			<AntdInput.TextArea
				autosize={{ maxRows, minRows, }}
				disabled={disabled}
				id={id}
				value={value}
				placeholder={placeholder}
				readOnly={readOnly}
				className={cx('ljit-input-textarea', className)}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onPressEnter={onPressEnter}
			/>
		);
	}
}

InputTextarea.propTypes = propTypes;
InputTextarea.defaultProps = defaultProps;

export default InputTextarea;

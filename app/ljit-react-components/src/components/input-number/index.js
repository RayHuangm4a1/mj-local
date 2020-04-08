import React, { Component, } from 'react';
import { InputNumber as AntdInputNumber, } from 'antd';
import PropTypes from 'prop-types';
import cx from 'classnames';

const FormatTypeEnums = {
	PERCENTAGE: 'percentage',
	CURRENCY: 'currency',
	YUAN: 'yuan',
	MULTIPLE: 'multiple',
};

const {
	PERCENTAGE,
	CURRENCY,
	YUAN,
	MULTIPLE,
} = FormatTypeEnums;

const FormatEnums = {
	[PERCENTAGE]: {
		formatter: value => `${value}%`,
		parser: value => value.replace('%', ''),
	},
	[CURRENCY]: {
		formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
		parser: value => value.replace(/\$\s?|(,*)/g, ''),
	},
	[YUAN]: {
		formatter: value => `${value}元`,
		parser: value => value.replace('元', ''),
	},
	[MULTIPLE]: {
		formatter: value => `${value}倍`,
		parser: value => value.replace('倍', ''),
	},
};

const propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string,
	defaultValue: PropTypes.number,
	value: PropTypes.number,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	readOnly: PropTypes.bool,
	formatType: PropTypes.oneOf([
		PERCENTAGE,
		CURRENCY,
		YUAN,
		MULTIPLE,
		'',
	]),
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	style: PropTypes.object,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};
const defaultProps = {
	disabled: false,
	readOnly: false,
	formatType: '',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

class InputNumber extends Component {
	render() {
		const {
			disabled,
			id,
			defaultValue,
			value,
			placeholder,
			readOnly,
			formatType,
			max,
			min,
			step,
			className,
			style,
			onChange,
		} = this.props;
		const valueFormatter = FormatEnums[formatType] || {};

		return (
			<AntdInputNumber
				disabled={disabled}
				id={id}
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholder}
				readOnly={readOnly}
				formatter={valueFormatter.formatter}
				parser={valueFormatter.parser}
				max={max}
				min={min}
				step={step}
				className={cx('ljit-input-number form-field', className)}
				style={style}
				onChange={onChange}
			/>
		);
	}
}

InputNumber.propTypes = propTypes;
InputNumber.defaultProps = defaultProps;
InputNumber.FormatTypeEnums = FormatTypeEnums;
InputNumber.FormatEnums = FormatEnums;

export default InputNumber;

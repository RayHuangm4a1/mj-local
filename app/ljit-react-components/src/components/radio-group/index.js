import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdRadio from 'antd/lib/radio';
import Radio from '../radio';
import cx from 'classnames';
import './style.styl';

const ButtonStyleEnums = {
	OUTLINE: 'outline',
	SOLID: 'solid',
};

const { RADIO, BUTTON, CHECK, } = Radio.RadioTypeEnums;
const { OUTLINE, SOLID, } = ButtonStyleEnums;

const propTypes = {
	defaultValue: PropTypes.any,
	value: PropTypes.any,
	name: PropTypes.string,
	radioType: PropTypes.oneOf([
		RADIO,
		BUTTON,
	]),
	options: PropTypes.arrayOf(PropTypes.shape({
		autoFocus: PropTypes.bool,
		checked: PropTypes.bool,
		defaultChecked: PropTypes.bool,
		value: PropTypes.any,
		disabled: PropTypes.bool,
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
	})),
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	buttonStyle: PropTypes.oneOf([
		OUTLINE,
		SOLID,
	]),
	className: PropTypes.string,
};
const defaultProps = {
	radioType: RADIO,
	buttonStyle: SOLID,
	disabled: false,
	onChange: () => {},
};

class RadioGroup extends Component {
	constructor() {
		super();
		this._renderOption = this._renderOption.bind(this);
	}

	_renderOption(radioType, {
		autoFocus,
		checked,
		defaultChecked,
		value,
		disabled,
		label,
	} = {}) {
		return (
			<Radio
				autoFocus={autoFocus}
				checked={checked}
				defaultChecked={defaultChecked}
				value={value}
				disabled={disabled}
				key={`${label}-${value}`}
				radioType={radioType}
				className={cx('ljit-radio-group__option', {
					[`ljit-radio-group__option--${RADIO}`]: radioType === RADIO,
					[`ljit-radio-group__option--${BUTTON}`]: radioType === BUTTON,
				})}
			>
				{label}
			</Radio>
		);
	}

	render() {
		const {
			name,
			options,
			defaultValue,
			value,
			radioType,
			disabled,
			onChange,
			buttonStyle,
			className,
		} = this.props;

		return (
			<AntdRadio.Group
				name={name}
				defaultValue={defaultValue}
				value={value}
				buttonStyle={radioType === CHECK ? '' : buttonStyle}
				onChange={onChange}
				disabled={disabled}
				className={cx('ljit-radio-group', className)}
			>
				{options && options.map(option => this._renderOption(radioType, option))}
			</AntdRadio.Group>
		);
	}
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
RadioGroup.RadioTypeEnums = Radio.RadioTypeEnums;
RadioGroup.ButtonStyleEnums = ButtonStyleEnums;

export default RadioGroup;

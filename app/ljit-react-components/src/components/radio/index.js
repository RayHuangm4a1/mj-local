import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import AntdRadio from 'antd/lib/radio';
import cx from 'classnames';
import 'antd/lib/radio/style';
import './style.styl';

const RadioTypeEnums = {
	RADIO: 'radio',
	BUTTON: 'button',
	CHECK: 'check',
	RADIO_S: 'radio-s',
};

const { RADIO, BUTTON, CHECK, RADIO_S, } = RadioTypeEnums;

const propTypes = {
	autoFocus: PropTypes.bool,
	checked: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	disabled: PropTypes.bool,
	value: PropTypes.any,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	radioType: PropTypes.oneOf([
		RADIO,
		BUTTON,
		CHECK,
		RADIO_S,
	]),
};
const defaultProps = {
	radioType: RADIO,
	defaultChecked: false,
	disabled: false,
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

class Radio extends Component {
	render() {
		const {
			autoFocus,
			checked,
			defaultChecked,
			disabled,
			value,
			children,
			className,
			name,
			onChange,
			onFocus,
			onBlur,
			radioType,
		} = this.props;
		const RadioElement = getRadioElement(radioType);

		return (
			<RadioElement
				autoFocus={autoFocus}
				checked={checked}
				defaultChecked={defaultChecked}
				value={value}
				disabled={disabled}
				name={name}
				className={cx('ljit-radio', {
					[`ljit-radio--${RADIO}`]: radioType === RADIO,
					[`ljit-radio--${BUTTON}`]: radioType === BUTTON,
					[`ljit-radio--${CHECK}`]: radioType === CHECK,
					[`ljit-radio--${RADIO_S}`]: radioType === RADIO_S,
				}, className)}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{children}
			</RadioElement>
		);
	}
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
Radio.RadioTypeEnums = RadioTypeEnums;

function getRadioElement(radioType) {
	let element = null;

	switch (radioType) {
		case RADIO:
			element = AntdRadio;
			break;
		case BUTTON:
			element = AntdRadio.Button;
			break;
		case CHECK:
			element = AntdRadio.Button;
			break;
		default:
			element = AntdRadio;
	}
	return element;
}

export default Radio;

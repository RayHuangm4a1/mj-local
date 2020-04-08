import React, { Component, } from 'react';
import { TimePicker as AntdTimePicker, } from 'antd';
import cx from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

const FormatTypeEnums = {
	HHmmss: 'HH:mm:ss',
	HHmm: 'HH:mm',
	mmss: 'mm:ss',
	HH: 'hh',
	MM: 'mm',
	SS: 'ss',
	Hmmssa: 'h:mm:ss a',
};
const {
	HHmmss,
	HHmm,
	mmss,
	HH,
	MM,
	SS,
	Hmmssa,
} = FormatTypeEnums;

const propTypes = {
	addon: PropTypes.node,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	isDisabled: PropTypes.bool,
	format: PropTypes.oneOf([
		HHmmss,
		HHmm,
		mmss,
		HH,
		MM,
		SS,
		Hmmssa,
	]),
	hourStep: PropTypes.number,
	minuteStep: PropTypes.number,
	secondStep: PropTypes.number,
	value: PropTypes.instanceOf(Date),
	disabledHours: PropTypes.arrayOf(PropTypes.number),
	calculateDisabledMinutes: PropTypes.func,
	calculateDisabledSeconds: PropTypes.func,
	onChange: PropTypes.func,
	style: PropTypes.object,
};
const defaultProps = {
	isDisabled: false,
	format: FormatTypeEnums.HHmmss,
	hourStep: 1,
	minuteStep: 1,
	secondStep: 1,
	disabledMinutes: () => {},
	disabledSeconds: () => {},
	onChange: () => {},
};

class TimePicker extends Component {
	render() {
		const {
			addon,
			className,
			placeholder,
			isDisabled,
			value,
			format,
			hourStep,
			minuteStep,
			secondStep,
			disabledHours,
			calculateDisabledMinutes,
			calculateDisabledSeconds,
			onChange,
			style,
		} = this.props;
		const isHmmssaFormat = (format === FormatTypeEnums.Hmmssa);

		return (
			<AntdTimePicker
				addon={() => addon}
				className={cx('ljit-time-picker', className)}
				placeholder={placeholder}
				disabled={isDisabled}
				value={momentValue(value)}
				format={format}
				hourStep={hourStep}
				minuteStep={minuteStep}
				secondStep={secondStep}
				disabledHours={() => disabledHours}
				disabledMinutes={calculateDisabledMinutes}
				disabledSeconds={calculateDisabledSeconds}
				onChange={onChange}
				use12Hours={isHmmssaFormat}
				style={style}
			/>
		);
	}
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;
TimePicker.FormatTypeEnums = FormatTypeEnums;

export default TimePicker;

function momentValue(date) {
	if (date) {
		return moment(date);
	}
	return null;
}

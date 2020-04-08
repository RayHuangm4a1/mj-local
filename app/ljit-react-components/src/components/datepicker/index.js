import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { DatePicker as AntdDatePicker, } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const propTypes = {
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	defaultValue: PropTypes.instanceOf(Date),
	format: PropTypes.string,
	isShowingTime: PropTypes.bool,
	value: PropTypes.instanceOf(Date),
	placeholder: PropTypes.string,
	style: PropTypes.object,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
};

const defaultProps = {
	isDisabled: false,
	format: 'YYYY/MM/DD',
	className: '',
	style: {},
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

class DatePicker extends Component {
	render() {
		const { className, isDisabled, defaultValue, format, isShowingTime,
			value, placeholder, style, onChange, onFocus, onBlur,
		} = this.props;

		return (
			<AntdDatePicker
				className={cx('ljit-date-picker', className)}
				disabled={isDisabled}
				defaultValue={defaultValue}
				locale={locale}
				format={format}
				showTime={isShowingTime}
				value={value}
				placeholder={placeholder}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				dropdownClassName="ljit-date-picker-popup"
			/>
		);
	}
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;

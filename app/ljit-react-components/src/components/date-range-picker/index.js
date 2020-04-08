import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import cx from 'classnames';
import './style.styl';

const AntRangePicker = DatePicker.RangePicker;

const RangesEnums = {
	TODAY: 'today',
	YESTERDAY: 'yesterday',
	THIS_WEEK: 'thisWeek',
	LAST_SEVEN_DAYS: 'lastSevenDays',
	LAST_THIRTY_DAYS: 'lastThirtyDays',
	PRESENT_PERIOD: 'presentPeriod',
	PREVIOUS_PERIOD: 'previousPeriod',
};
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS,
	PRESENT_PERIOD,
	PREVIOUS_PERIOD,
} = RangesEnums;

const DateEnums = {
	FORMER_THIRTY_DAYS: 30,
};

const propTypes = {
	ranges: PropTypes.arrayOf(PropTypes.oneOf([
		TODAY,
		YESTERDAY,
		THIS_WEEK,
		LAST_SEVEN_DAYS,
		LAST_THIRTY_DAYS,
		PRESENT_PERIOD,
		PREVIOUS_PERIOD,
	])),
	className: PropTypes.string,
	dropdownClassName: PropTypes.string,
	disabled: PropTypes.bool,
	format: PropTypes.string,
	inputStyle: PropTypes.object,
	value: PropTypes.array,
	renderExtraFooter: PropTypes.node,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	showTime: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.object,
	]),
	fromDate: PropTypes.instanceOf(moment),
	toDate: PropTypes.instanceOf(moment),
	hourOffset: PropTypes.number,
	onOverLimitDays: PropTypes.func,
	limitDays: function (props, propName, componentName) {
		if (props.showTime === false && props.limitDays !== undefined) {
			return new Error(
				`Invalid prop \`showTime\` value of \`false\` supplied to \`${componentName}\` expected true if using \`${propName}\`.`
			);
		}
		return PropTypes.checkPropTypes({ [propName]: PropTypes.number, }, props, 'prop', componentName);
	},
};

const defaultProps = {
	ranges: [],
	disabled: false,
	format: 'YYYY/MM/DD',
	className: '',
	dropdownClassName: '',
	inputStyle: {},
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
	showTime: false,
	hourOffset: 0,
	onOverLimitDays: () => {},
};
const PRESETTED_RANGES = {
	[TODAY]: { '今天': getToday, },
	[YESTERDAY]: { '昨天': getYesterday, },
	[THIS_WEEK]: { '本周': getThisWeek, },
	[LAST_SEVEN_DAYS]: { '七天': getLastSevenDay, },
	[LAST_THIRTY_DAYS]: { '三十天': getLastThirtyDay, },
	[PRESENT_PERIOD]: { '当前周期': getPresentPeriod, },
	[PREVIOUS_PERIOD]: { '上一周期': getPreviousPeriod, },
};

function cloneDate(date = []) {
	return date[0] ? [date[0].clone(), date[1].clone(), ] : [];
}

class DateRangePicker extends Component {
	constructor() {
		super();
		this.state = {
			dates: [],
			isOverLimitDays: false,
			isTaggerOnChange: false,
		};
		this.isTaggerOnChange = false;
		this.newDates = [];
		this.prevValidDates = [];
		this._getRanges = this._getRanges.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._handleOpenChange = this._handleOpenChange.bind(this);
		this._isOverLimitDays = this._isOverLimitDays.bind(this);
		this._getDisableDate = this._getDisableDate.bind(this);
	}

	_getRanges(ranges) {
		const presetRanges = ranges.reduce((accumulator, range) => {
			if (PRESETTED_RANGES[range]) {
				const key = Object.keys(PRESETTED_RANGES[range])[0];
				const value = PRESETTED_RANGES[range][key];
				const obj = {
					[key]: value.bind(this, this.props.hourOffset),
				};

				return Object.assign(accumulator, obj);
			}
			return accumulator;
		}, {});

		return presetRanges;
	}
	_getDisableDate(e) {
		const {
			fromDate,
			toDate,
		} = this.props;

		let beforeFirstDate = false;

		if (fromDate) {
			beforeFirstDate = e < fromDate.startOf('day');
		}
		let afterLastDate = false;

		if (toDate) {
			afterLastDate = e > toDate.endOf('day');
		}
		return beforeFirstDate || afterLastDate;
	}

	_isOverLimitDays(dates = []) {
		if (moment.isMoment(dates[0])) {
			const { limitDays, } = this.props;
			const diffDays = dates[1].diff(dates[0], 'days') + 1;

			return diffDays > limitDays;
		} else {
			return false;
		}
	}

	_handleChange(dates) {
		const {
			onChange,
			limitDays,
		} = this.props;
		const {
			_isOverLimitDays,
			prevValidDates = [],
		} = this;

		onChange(dates);

		if (limitDays) {
			this.setState({ isOverLimitDays: false,  });
			this.isTaggerOnChange = true;
			this.newDates = cloneDate(dates);
			this.prevValidDates = _isOverLimitDays(dates) ? cloneDate(prevValidDates) : cloneDate(dates);
		}
	}

	_handleOpenChange(openStatus) {
		const { onOverLimitDays, limitDays, onChange, } = this.props;
		const { _isOverLimitDays, newDates, prevValidDates, } = this;
		const isOverLimitDays = _isOverLimitDays(newDates);

		if (limitDays && !openStatus) {
			if (this.isTaggerOnChange === false) return ;
			this.isTaggerOnChange = false;
			if (isOverLimitDays) {
				this.setState({ isOverLimitDays: true, dates: cloneDate(prevValidDates), });
				onOverLimitDays();
				onChange(prevValidDates);
			}
		}
	}

	render() {
		const {
			ranges,
			format,
			className,
			dropdownClassName,
			value,
			onFocus,
			onBlur,
			renderExtraFooter,
			disabled,
			inputStyle,
			showTime,
		} = this.props;
		const {
			isOverLimitDays,
			dates,
		} = this.state;
		const {
			_handleChange,
			_handleOpenChange,
			_getRanges,
			_getDisableDate,
		} = this;

		const presettedRanges = _getRanges(ranges);

		return (
			<AntRangePicker
				onChange={_handleChange}
				onFocus={onFocus}
				onBlur={onBlur}
				locale={locale}
				renderExtraFooter={renderExtraFooter}
				format={format}
				ranges={presettedRanges}
				disabled={disabled}
				style={inputStyle}
				value={isOverLimitDays ? dates : value}
				className={cx('ljit-daterange-picker', className)}
				dropdownClassName={cx('ljit-daterange-picker-popup', dropdownClassName)}
				showTime={showTime}
				onOpenChange={_handleOpenChange}
				disabledDate={_getDisableDate}
			/>
		);
	}
	componentDidMount() {
		this.prevValidDates = this.props.value;
	}
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;
DateRangePicker.RangesEnums = RangesEnums;
DateRangePicker.PRESETTED_RANGES = PRESETTED_RANGES;
DateRangePicker.DateEnums = DateEnums;
DateRangePicker.getFormerDay = getFormerDay;
DateRangePicker.getLaterDay = getLaterDay;

export default DateRangePicker;

export function getToday(hourOffset = 0) {
	const today = moment();

	return [today.clone().startOf('day').add(hourOffset, 'hour'), today.clone().endOf('day').add(hourOffset, 'hour'),];
}
export function getYesterday(hourOffset = 0) {
	const today = moment();

	return [today.clone().subtract(1, 'days').startOf('day').add(hourOffset, 'hour'), today.clone().subtract(1, 'days').endOf('day').add(hourOffset, 'hour'),];
}
export function getThisWeek(hourOffset = 0) {
	const thisSunday = moment().day(0).startOf('day').add(hourOffset, 'hour');
	const thisSaturday = moment().day(6).endOf('day').add(hourOffset, 'hour');

	return [thisSunday, thisSaturday,];
}
export function getLastSevenDay(hourOffset = 0) {
	const today = moment();

	return [today.clone().subtract(6, 'days').startOf('day').add(hourOffset, 'hour'), today.clone().endOf('day').add(hourOffset, 'hour'),];
}
export function getLastThirtyDay(hourOffset = 0) {
	const today = moment();

	return [today.clone().subtract(29, 'days').startOf('day').add(hourOffset, 'hour'), today.clone().endOf('day').add(hourOffset, 'hour'),];
}
export function getPresentPeriod() {
	const today = moment();
	const thisMonthFirstHalfPeriodStart = today.clone().startOf('month').add(3, 'hour');
	const thisMonthLastHalfPeriodStart = today.clone().startOf('month').add(15, 'days').add(3, 'hour');
	const lastMonthLastHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(15, 'days').add(3, 'hour');
	const isLastMonthLastHalfPeriod = today.clone().isBefore(thisMonthFirstHalfPeriodStart);
	const isThisMonthFirstHalfPeriod = today.clone().isBefore(thisMonthLastHalfPeriodStart) && today.clone().isAfter(thisMonthFirstHalfPeriodStart);

	if (isLastMonthLastHalfPeriod) {
		return [lastMonthLastHalfPeriodStart, today,];
	} else {
		if (isThisMonthFirstHalfPeriod) {
			return [thisMonthFirstHalfPeriodStart, today,];
		}
		return [thisMonthLastHalfPeriodStart, today,];
	}
}
export function getPreviousPeriod() {
	const today = moment();
	const thisMonthFirstHalfPeriodStart = today.clone().startOf('month').add(3, 'hour');
	const thisMonthLastHalfPeriodStart = today.clone().startOf('month').add(15, 'days').add(3, 'hour');
	const lastMonthFirstHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(3, 'hour');
	const lastMonthLastHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(15, 'days').add(3, 'hour');
	const isLastMonthLastHalfPeriod = today.clone().isBefore(thisMonthFirstHalfPeriodStart);
	const isThisMonthFirstHalfPeriod = today.clone().isBefore(thisMonthLastHalfPeriodStart) && today.clone().isAfter(thisMonthFirstHalfPeriodStart);

	if (isLastMonthLastHalfPeriod) {
		return [lastMonthFirstHalfPeriodStart, lastMonthLastHalfPeriodStart,];
	} else {
		if (isThisMonthFirstHalfPeriod) {
			return [lastMonthLastHalfPeriodStart, thisMonthFirstHalfPeriodStart,];
		}
		return [thisMonthFirstHalfPeriodStart, thisMonthLastHalfPeriodStart,];
	}
}

export function getFormerDay(days) {
	const today = moment();

	return today.subtract(days, 'days');
}

export function getLaterDay(days) {
	const today = moment();

	return today.add(days, 'days');
}

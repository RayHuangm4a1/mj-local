import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateRangePicker } from 'ljit-react-components';
import { withTheme, } from '../../lib/theme-provider';
import { connect } from 'ljit-store-connecter';
import { notifyHandlingActions, } from '../../controller';
import { notifications, } from '../../../lib/notify-handler';

const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	errorNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;
const {
	PRESETTED_RANGES,
	RangesEnums,
} = DateRangePicker;

const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS,
	PRESENT_PERIOD,
	PREVIOUS_PERIOD,
} = RangesEnums;

const AvailableModeEnums = {
	MONTH: 'month',
	FORTY_FIVE_DAYS: 'forty-five-days',
};

const {
	MONTH,
	FORTY_FIVE_DAYS,
} = AvailableModeEnums;

const FORTY_FIVE = 45;
const HOUR_OFFSET = 3;

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
	theme: PropTypes.shape({
		onSwitchTheme: PropTypes.func,
		style: PropTypes.object,
	}),
	availableMode: PropTypes.oneOf([MONTH, FORTY_FIVE_DAYS]),
	limitDays: PropTypes.number,
	notifyErrorMessage: PropTypes.func,
};

const defaultProps = {
	ranges: [],
	disabled: false,
	format: 'YYYY/MM/DD HH:mm:ss',
	inputStyle: {},
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
	showTime: false,
	value: PRESETTED_RANGES[TODAY][Object.keys(PRESETTED_RANGES[TODAY])[0]](),
	availableMode: FORTY_FIVE_DAYS,
};

class ClientDateRangePicker extends Component {
	constructor() {
		super();

		this._getFromDate = this._getFromDate.bind(this);
		this._getToDate = this._getToDate.bind(this);
	}

	_getFromDate() {
		const { availableMode, } = this.props;

		switch (availableMode) {
			case MONTH:
				return DateRangePicker.getFormerDay(DateRangePicker.DateEnums.FORMER_THIRTY_DAYS);
			case FORTY_FIVE_DAYS: 
				return DateRangePicker.getFormerDay(FORTY_FIVE);
			default:
		}
	}

	_getToDate() {
		const { availableMode, } = this.props;

		switch (availableMode) {
			case MONTH:
				return DateRangePicker.getLaterDay(1);
			case FORTY_FIVE_DAYS: 
				return DateRangePicker.getLaterDay(1);
			default:
		}
	}

	render() {
		const { theme, notifyErrorMessage, limitDays } = this.props;
		const { _getFromDate, _getToDate, } = this;
		const { style } = theme;
		const message = `查询期间不可超过${limitDays}天`;

		return (
			<DateRangePicker
				{...this.props}
				className={style.themeDateRangePickerInput}
				dropdownClassName={style.themeDateRangePickerPopup}
				fromDate={_getFromDate()}
				toDate={_getToDate()}
				hourOffset={3}
				onOverLimitDays={() => {notifyErrorMessage(new GeneralError(message));}}
			/>
		);
	}
}

ClientDateRangePicker.propTypes = propTypes;
ClientDateRangePicker.defaultProps = defaultProps;

const WrapClientDateRangePicker = connect(mapStateToProps, mapDispatchToProps)(withTheme(ClientDateRangePicker));

WrapClientDateRangePicker.RangesEnums = DateRangePicker.RangesEnums;
WrapClientDateRangePicker.DateEnums = DateRangePicker.DateEnums;
WrapClientDateRangePicker.AvailableModeEnums = AvailableModeEnums;
WrapClientDateRangePicker.getTodayDateRange = () => {
	const now = new Date();

	if (now.getHours() > HOUR_OFFSET) {
		return PRESETTED_RANGES[TODAY][Object.keys(PRESETTED_RANGES[TODAY])[0]](HOUR_OFFSET);
	} else {
		return PRESETTED_RANGES[YESTERDAY][Object.keys(PRESETTED_RANGES[YESTERDAY])[0]](HOUR_OFFSET);
	}
};
function mapStateToProps() {}
function mapDispatchToProps(dispatch) {
	return {
		notifyErrorMessage: (error) => dispatch(notifyHandlingAction(error)),
	};
}

export default WrapClientDateRangePicker;

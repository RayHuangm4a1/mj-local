import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { cloneDeep, } from 'lodash';
import {
	Charts,
} from 'ljit-react-components';
import tooltips from './tooltips';

const DATE_MIN_MAX_LIMIT_LENGTH = 2;
const HOURS_OF_A_DAY = 24;
const TimeTypeEnums = {
	DAY: 'day',
	HOUR: 'hour',
};
const {
	DAY,
	HOUR,
} = TimeTypeEnums;
export const TimeConfigMap = {
	[DAY]: {
		displayFormats: {
			month: 'YYYY.M',
		},
		unit: 'month',
		minUnit: 'day',
		tooltipFormat: 'MM/DD',
	},
	[HOUR]: {
		displayFormats: {
			hour: 'HH',
		},
		unit: 'hour',
		minUnit: 'second',
		tooltipFormat: 'HH:mm:ss',
	},
};

const propTypes = {
	data: PropTypes.shape({
		// labels: [min, max]
		labels: PropTypes.arrayOf(checkLabelsPropTypes),
		datasets: PropTypes.arrayOf(PropTypes.shape({
			data: PropTypes.arrayOf(PropTypes.shape({
				x: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
				]),
				y: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number,
				]),
			})),
		})),
	}),
	timeType: PropTypes.oneOf([
		DAY,
		HOUR,
	]),
	id: PropTypes.string,
};
const defaultProps = {
	data: {},
	timeType: DAY,
};

class TimeLineChart extends Component {
	constructor() {
		super();
		this._getDataConfig = this._getDataConfig.bind(this);
	}

	_getDataConfig() {
		const {
			data,
			timeType,
		} = this.props;
		const {
			labels = [],
			datasets = [],
		} = data;
		const rangeDatasets = cloneDeep(datasets);
		let rangeLabels = getMonthsRange(labels[0], labels[1]);

		if (timeType === HOUR) {
			rangeLabels = getHoursRange(labels[0]);
		}
		return Object.assign({}, data, {
			labels: rangeLabels,
			datasets: rangeDatasets.map(getLineDatasetConfig),
		});
	}

	render() {
		const {
			timeType,
			id,
		} = this.props;
		const timeConfig = TimeConfigMap[timeType];
		const options = {
			scales: {
				xAxes: [
					{
						type: 'time',
						time: timeConfig,
						scaleLabel: {
							display: true,
						},
					}
				],
			},
			tooltips: {
				enabled: false,
				mode: 'index',
				position: 'nearest',
				intersect: false,
				custom: tooltips,
			},
		};

		return (
			<Charts.Chart
				id={id}
				type="line"
				data={this._getDataConfig()}
				options={options}
			/>
		);
	}
}

TimeLineChart.propTypes = propTypes;
TimeLineChart.defaultProps = defaultProps;

TimeLineChart.TimeTypeEnums = TimeTypeEnums;

function checkDaysOverLimit(array = []) {
	return array.length > DATE_MIN_MAX_LIMIT_LENGTH;
}

function checkDayValid(day) {
	return moment(day).isValid();
}

function checkDaysValid(array = []) {
	return array.every(checkDayValid);
}

function checkMoment(day) {
	return moment.isMoment(day);
}
function checkDate(day) {
	return moment.isDate(day);
}

function getDate(day) {
	let date = moment(day);

	if (checkMoment(day)) {
		date = day;
	} else if (checkDate(day) || typeof day === 'string') {
		date = moment(day);
	}

	return date;
}

function checkMinBeforeMax(min, max) {
	const minDate = getDate(min);
	const maxDate = getDate(max);

	return minDate.isSameOrBefore(maxDate);
}

function checkLabelsPropTypes(propValue, key, componentName, location, propFullName) {
	const [min, max] = propValue;
	const propName = 'labels';

	if (checkDaysOverLimit(propValue)) {
		return new Error(
			'Invalid prop ' + propName + ' supplied to `' + componentName + '`. ' +
			'Only min and max date in ' + propName + '.'
		);
	} else if (!checkDaysValid(propValue)) {
		return new Error(
			'Invalid prop ' + propFullName + ' supplied to `' + componentName + '`. ' +
			'Date validation failed.'
		);
	} else if (!checkMinBeforeMax(min, max)) {
		return new Error(
			'Invalid prop ' + propFullName + ' supplied to `' + componentName + '`. ' +
			'Min date must same or before max date.'
		);
	}
}

function getMonthsRange(min, max) {
	const months = [];
	let minDate = getDate(min);
	let maxDate = getDate(max);
	const monthDifference = maxDate.diff(minDate, 'month');

	minDate = minDate.startOf('month');

	for (let i = 0; i < monthDifference; i += 1) {
		const month = minDate.add(i, 'month');

		months.push(month);
	}

	return months;
}
function getHoursRange(min) {
	const hours = [];
	let minDate = getDate(min);

	minDate = minDate.startOf('day');

	for (let i = 0; i < HOURS_OF_A_DAY; i += 1) {
		const hour = minDate.add(1, 'hour');

		hours.push(hour);
	}

	return hours;
}

function getLineDatasetConfig(dataset = {}) {
	return Object.assign({
		fill: false,
		lineTension: 0,
		pointBorderWidth: 3,
		pointRadius: 3,
		pointHoverBorderColor: '#FFFFFF',
	}, dataset);
}

export default TimeLineChart;

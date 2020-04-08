import React, { Component } from 'react';
import PageBlock from '../../../components/page-block';
import SearchForm from './search-form';
import TimeLineChart from './time-line-chart';
import moment from 'moment';
import { cloneDeep, } from 'lodash';
import { UnitEnums, } from '../utils';
import './style.styl';

/**
 * TODO
 * get real data from api
 */

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandom() {
	return getRandomArbitrary(0, 100);
}

const { HOUR, DAY, } = UnitEnums;

function getData(unit) {
	if (unit === HOUR) {
		return cloneDeep(hours_data);
	}
	if (unit === DAY) {
		return cloneDeep(days_data);
	}
	return [];
}

const hours_data = [
	{
		label: '注冊人數',
		data: [
			{ x: "2019/05/03 12:30", y: getRandom(), },
			{ x: "2019/05/03 14:10", y: getRandom(), },
			{ x: "2019/05/03 16:15", y: getRandom(), },
			{ x: "2019/05/03 22:15", y: getRandom(), },
		],
	},
	{
		label: '投注人數',
		data: [
			{ x: "2019/05/03 12:30", y: getRandom(), },
			{ x: "2019/05/03 14:10", y: getRandom(), },
			{ x: "2019/05/03 16:15", y: getRandom(), },
			{ x: "2019/05/03 22:15", y: getRandom(), },
		],
	},
	{
		label: '存款人數',
		data: [
			{ x: "2019/05/03 12:30", y: getRandom(), },
			{ x: "2019/05/03 14:10", y: getRandom(), },
			{ x: "2019/05/03 16:15", y: getRandom(), },
			{ x: "2019/05/03 22:15", y: getRandom(), },
		],
	},
	{
		label: '在線人數',
		data: [
			{ x: "2019/05/03 12:30", y: getRandom(), },
			{ x: "2019/05/03 14:10", y: getRandom(), },
			{ x: "2019/05/03 16:15", y: getRandom(), },
			{ x: "2019/05/03 22:15", y: getRandom(), },
		],
	}
];

const days_data = [
	{
		label: '注冊人數',
		data: [
			{ x: "2019/04/01 19:15", y: getRandom(), },
			{ x: "2019/04/20 19:15", y: getRandom(), },
			{ x: "2019/05/03 19:15", y: getRandom(), },
			{ x: "2019/05/04 19:15", y: getRandom(), },
			{ x: "2019/05/05 19:15", y: getRandom(), },
			{ x: "2019/05/06 19:15", y: getRandom(), },
			{ x: "2019/05/07 19:15", y: getRandom(), },
			{ x: "2019/05/08 19:15", y: getRandom(), },
			{ x: "2019/05/20 19:15", y: getRandom(), },
			{ x: "2019/06/10 19:15", y: getRandom(), },
		]
	},
	{
		label: '投注人數',
		data: [
			{ x: "2019/04/01 19:15", y: getRandom(), },
			{ x: "2019/04/20 19:15", y: getRandom(), },
			{ x: "2019/05/03 19:15", y: getRandom(), },
			{ x: "2019/05/04 19:15", y: getRandom(), },
			{ x: "2019/05/05 19:15", y: getRandom(), },
			{ x: "2019/05/06 19:15", y: getRandom(), },
			{ x: "2019/05/07 19:15", y: getRandom(), },
			{ x: "2019/05/08 19:15", y: getRandom(), },
			{ x: "2019/05/20 19:15", y: getRandom(), },
			{ x: "2019/06/10 19:15", y: getRandom(), },
		],
	},
	{
		label: '存款人數',
		data: [
			{ x: "2019/04/01 19:15", y: 60 },
			{ x: "2019/04/20 19:15", y: 65 },
			{ x: "2019/05/03 19:15", y: 65 },
			{ x: "2019/05/04 19:15", y: 56 },
			{ x: "2019/05/05 19:15", y: 74 },
			{ x: "2019/05/06 19:15", y: 65 },
			{ x: "2019/05/07 19:15", y: 56 },
			{ x: "2019/05/08 19:15", y: 61 },
			{ x: "2019/05/20 19:15", y: 63 },
			{ x: "2019/06/10 19:15", y: 71 },
		],
	},
	{
		label: '在線人數',
		data: [
			{ x: "2019/04/01 19:15", y: 6 },
			{ x: "2019/04/20 19:15", y: 6 },
			{ x: "2019/05/03 19:15", y: 5 },
			{ x: "2019/05/04 19:15", y: 5 },
			{ x: "2019/05/05 19:15", y: 7 },
			{ x: "2019/05/06 19:15", y: 6 },
			{ x: "2019/05/07 19:15", y: 9 },
			{ x: "2019/05/08 19:15", y: 6 },
			{ x: "2019/05/20 19:15", y: 3 },
			{ x: "2019/06/10 19:15", y: 11 },
		],
	},
];

const propTypes = {};
const defaultProps = {};

class CompanyReportPeoplePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			unit: DAY,
			date: moment(),
			period: [moment(), moment()],
			isChartFetch: false,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderChart = this._renderChart.bind(this);
	}

	_handleSearch(formData) {
		const { unit, date, period } = formData;

		this.setState({
			unit,
			date,
			period,
			isChartFetch: true,
		});
	}

	_handleReset() {
		this.setState({
			unit: DAY,
			date: moment(),
			period: [moment(), moment()],
			isChartFetch: false,
		});
	}

	_renderChart() {
		const { unit, date, period, isChartFetch } = this.state;
		const datasets = getData(unit);
		let labelTime = unit === DAY ? period : date;
		if (isChartFetch) {
			return (
				<TimeLineChart
					unit={unit}
					labelTime={labelTime}
					datasets={datasets}
				/>
			);
		}
		return null;
	}

	render() {
		return (
			<div>
				<PageBlock noMinHeight>
					<SearchForm
						onSearch={this._handleSearch}
						onReset={this._handleReset}
						initialValues={{
							unit: DAY,
							period: [moment(), moment()],
							date: moment('2019/05/03', 'YYYY/MM/DD'),
						}}
						ref={(form) => this.formRef = form}
					/>
				</PageBlock>
				{this._renderChart()}
			</div>
		);
	}
}

CompanyReportPeoplePage.propTypes = propTypes;
CompanyReportPeoplePage.defaultProps = defaultProps;

export default CompanyReportPeoplePage;

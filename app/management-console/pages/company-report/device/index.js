import React, { Component, Fragment, } from 'react';
import moment from 'moment';
// TODO replace shared component
import TimeLineChart from './time-line-chart';
import PageBlock from '../../../components/page-block';
import SearchForm, { UnitEnums, checkDayUnit, } from './search-form';
import './style.styl';

const {
	DAY,
	HOUR,
} = UnitEnums;
const TimeTypeMap = {
	[DAY]: TimeLineChart.TimeTypeEnums.DAY,
	[HOUR]: TimeLineChart.TimeTypeEnums.HOUR,
};

const dayDatasets = [
	{
		label: '总投注數',
		data: [
			{ x: '2019/03/15 19:15', y: getRandom(), },
			{ x: '2019/04/10 19:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
			{ x: '2019/05/04 19:15', y: getRandom(), },
			{ x: '2019/05/05 19:15', y: getRandom(), },
			{ x: '2019/05/06 19:15', y: getRandom(), },
			{ x: '2019/05/07 19:15', y: getRandom(), },
			{ x: '2019/05/08 19:15', y: getRandom(), },
			{ x: '2019/05/09 19:15', y: getRandom(), },
			{ x: '2019/05/10 19:15', y: getRandom(), },
		],
	},
	{
		label: 'PC装置',
		data: [
			{ x: '2019/03/15 19:15', y: getRandom(), },
			{ x: '2019/04/10 19:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
			{ x: '2019/05/04 19:15', y: getRandom(), },
			{ x: '2019/05/05 19:15', y: getRandom(), },
			{ x: '2019/05/06 19:15', y: getRandom(), },
			{ x: '2019/05/07 19:15', y: getRandom(), },
			{ x: '2019/05/08 19:15', y: getRandom(), },
			{ x: '2019/05/09 19:15', y: getRandom(), },
			{ x: '2019/05/10 19:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile装置',
		data: [
			{ x: '2019/03/15 19:15', y: getRandom(), },
			{ x: '2019/04/10 19:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
			{ x: '2019/05/04 19:15', y: getRandom(), },
			{ x: '2019/05/05 19:15', y: getRandom(), },
			{ x: '2019/05/06 19:15', y: getRandom(), },
			{ x: '2019/05/07 19:15', y: getRandom(), },
			{ x: '2019/05/08 19:15', y: getRandom(), },
			{ x: '2019/05/09 19:15', y: getRandom(), },
			{ x: '2019/05/10 19:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile 帳密登入',
		data: [
			{ x: '2019/03/15 19:15', y: getRandom(), },
			{ x: '2019/04/10 19:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
			{ x: '2019/05/04 19:15', y: getRandom(), },
			{ x: '2019/05/05 19:15', y: getRandom(), },
			{ x: '2019/05/06 19:15', y: getRandom(), },
			{ x: '2019/05/07 19:15', y: getRandom(), },
			{ x: '2019/05/08 19:15', y: getRandom(), },
			{ x: '2019/05/09 19:15', y: getRandom(), },
			{ x: '2019/05/10 19:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile Wechat登入',
		data: [
			{ x: '2019/03/15 19:15', y: getRandom(), },
			{ x: '2019/04/10 19:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
			{ x: '2019/05/04 19:15', y: getRandom(), },
			{ x: '2019/05/05 19:15', y: getRandom(), },
			{ x: '2019/05/06 19:15', y: getRandom(), },
			{ x: '2019/05/07 19:15', y: getRandom(), },
			{ x: '2019/05/08 19:15', y: getRandom(), },
			{ x: '2019/05/09 19:15', y: getRandom(), },
			{ x: '2019/05/10 19:15', y: getRandom(), },
		],
	},
];

const hourDatasets = [
	{
		label: '总投注數',
		data: [
			{ x: '2019/05/03 12:30', y: getRandom(), },
			{ x: '2019/05/03 13:10', y: getRandom(), },
			{ x: '2019/05/03 20:15', y: getRandom(), },
			{ x: '2019/05/03 22:15', y: getRandom(), },
		],
	},
	{
		label: 'PC装置',
		data: [
			{ x: '2019/05/03 05:30', y: getRandom(), },
			{ x: '2019/05/03 14:10', y: getRandom(), },
			{ x: '2019/05/03 16:15', y: getRandom(), },
			{ x: '2019/05/03 21:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile装置',
		data: [
			{ x: '2019/05/03 10:30', y: getRandom(), },
			{ x: '2019/05/03 13:10', y: getRandom(), },
			{ x: '2019/05/03 17:15', y: getRandom(), },
			{ x: '2019/05/03 23:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile 帳密登入',
		data: [
			{ x: '2019/05/03 09:30', y: getRandom(), },
			{ x: '2019/05/03 12:10', y: getRandom(), },
			{ x: '2019/05/03 15:15', y: getRandom(), },
			{ x: '2019/05/03 19:15', y: getRandom(), },
		],
	},
	{
		label: 'Mobile Wechat登入',
		data: [
			{ x: '2019/05/03 05:30', y: getRandom(), },
			{ x: '2019/05/03 08:10', y: getRandom(), },
			{ x: '2019/05/03 12:15', y: getRandom(), },
			{ x: '2019/05/03 17:15', y: getRandom(), },
		],
	},
];

const propTypes = {};

class CompanyReportDevicePage extends Component {
	constructor() {
		super();
		this.state = {
			isChartFetched: false,
			formData: {},
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderBetTimes = this._renderBetTimes.bind(this);
		this._renderBetAmount = this._renderBetAmount.bind(this);
		this._renderLoginTimes = this._renderLoginTimes.bind(this);
	}

	_handleSearch(data) {
		// TODO call api
		this.setState({
			isChartFetched: true,
			formData: data,
		});
	}
	_handleReset() {
		// TODO call api
		this.setState({
			isChartFetched: false,
			formData: {},
		});
	}

	_renderBetTimes() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? dayDatasets : hourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="投注次數" />
				</div>
				<TimeLineChart
					timeType={TimeTypeMap[formData.unit]}
					data={{
						labels: period,
						datasets: data,
					}}
				/>
			</PageBlock>
		);
	}
	_renderBetAmount() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? dayDatasets : hourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="投注量" />
				</div>
				<TimeLineChart
					timeType={TimeTypeMap[formData.unit]}
					data={{
						labels: period,
						datasets: data,
					}}
				/>
			</PageBlock>
		);
	}
	_renderLoginTimes() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? dayDatasets : hourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="登入次數" />
				</div>
				<TimeLineChart
					timeType={TimeTypeMap[formData.unit]}
					data={{
						labels: period,
						datasets: data,
					}}
				/>
			</PageBlock>
		);
	}

	render() {
		const {
			isChartFetched,
		} = this.state;
		let betTimes = null;
		let betAmount = null;
		let loginTimes = null;

		if (isChartFetched) {
			betTimes = this._renderBetTimes();
			betAmount = this._renderBetAmount();
			loginTimes = this._renderLoginTimes();
		}
		return (
			<Fragment>
				<PageBlock noMinHeight>
					<SearchForm
						initialValues={{
							unit: DAY,
							period: [moment(), moment()],
							date: moment(),
						}}
						onSearch={this._handleSearch}
						onReset={this._handleReset}
					/>
				</PageBlock>
				{betTimes}
				{betAmount}
				{loginTimes}
			</Fragment>
		);
	}
}

CompanyReportDevicePage.propTypes = propTypes;

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandom() {
	return getRandomArbitrary(0, 1000);
}

export default CompanyReportDevicePage;

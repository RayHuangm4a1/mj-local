import React, { Component, Fragment, } from 'react';
import moment from 'moment';
// TODO replace shared component
import TimeLineChart from './time-line-chart';
import PageBlock from '../../../components/page-block';
import {
	UnitEnums,
	checkDayUnit,
} from '../utils';
import SearchForm from './search-form';
import './style.styl';

const {
	DAY,
	HOUR,
} = UnitEnums;
const TimeTypeMap = {
	[DAY]: TimeLineChart.TimeTypeEnums.DAY,
	[HOUR]: TimeLineChart.TimeTypeEnums.HOUR,
};

const gameTypeOptions = [
	{ label: '水果拉霸', value: '1', },
	{ label: '灵猴献瑞', value: '2', },
	{ label: '欧洲列强争霸', value: '3', },
	{ label: '复古花园', value: '4', },
];

const teamDayDatasets = [
	{
		label: '每日盈亏',
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
		label: '每日销量',
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

const teamHourDatasets = [
	{
		label: '每日盈亏',
		data: [
			{ x: '2019/05/03 12:30', y: getRandom(), },
			{ x: '2019/05/03 13:10', y: getRandom(), },
			{ x: '2019/05/03 20:15', y: getRandom(), },
			{ x: '2019/05/03 22:15', y: getRandom(), },
		],
	},
	{
		label: '每日销量',
		data: [
			{ x: '2019/05/03 05:30', y: getRandom(), },
			{ x: '2019/05/03 14:10', y: getRandom(), },
			{ x: '2019/05/03 16:15', y: getRandom(), },
			{ x: '2019/05/03 21:15', y: getRandom(), },
		],
	},
];

const signUpDayDatasets = [
	{
		label: '每日盈亏',
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
		label: '每日销量',
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
const signUpHourDatasets = [
	{
		label: '每日盈亏',
		data: [
			{ x: '2019/05/03 12:30', y: getRandom(), },
			{ x: '2019/05/03 13:10', y: getRandom(), },
			{ x: '2019/05/03 20:15', y: getRandom(), },
			{ x: '2019/05/03 22:15', y: getRandom(), },
		],
	},
	{
		label: '每日销量',
		data: [
			{ x: '2019/05/03 05:30', y: getRandom(), },
			{ x: '2019/05/03 14:10', y: getRandom(), },
			{ x: '2019/05/03 16:15', y: getRandom(), },
			{ x: '2019/05/03 21:15', y: getRandom(), },
		],
	},
];

const propTypes = {};

class CompanyReportTeamPage extends Component {
	constructor() {
		super();
		this.state = {
			isChartFetched: false,
			formData: {},
		};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderPersonalBlock = this._renderPersonalBlock.bind(this);
		this._renderTeamBlock = this._renderTeamBlock.bind(this);
		this._renderSignUpBlock = this._renderSignUpBlock.bind(this);
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

	_renderPersonalBlock() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? teamDayDatasets : teamHourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="个人概况" />
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
	_renderTeamBlock() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? teamDayDatasets : teamHourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="团队概况" />
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
	_renderSignUpBlock() {
		const {
			formData,
		} = this.state;
		const data = checkDayUnit(formData.unit) ? signUpDayDatasets : signUpHourDatasets;
		const period = checkDayUnit(formData.unit) ? formData.period : formData.date;

		return (
			<PageBlock className="chart-block">
				<div className="chart-block__title">
					<PageBlock.Title text="注冊概況" />
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
		let personalBlock = null;
		let teamBlock = null;
		let signUpBlock = null;

		if (isChartFetched) {
			personalBlock = this._renderPersonalBlock();
			teamBlock = this._renderTeamBlock();
			signUpBlock = this._renderSignUpBlock();
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
						gameTypeOptions={gameTypeOptions}
						onSearch={this._handleSearch}
						onReset={this._handleReset}
					/>
				</PageBlock>
				{personalBlock}
				{teamBlock}
				{signUpBlock}
			</Fragment>
		);
	}
}

CompanyReportTeamPage.propTypes = propTypes;

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandom() {
	return getRandomArbitrary(0, 1000);
}

export default CompanyReportTeamPage;

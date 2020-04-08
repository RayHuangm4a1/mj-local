import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Charts, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import moment from 'moment';
import { UnitEnums, } from '../utils';

const HOURS_OF_DAYS = 24;

const { DAY, HOUR, } = UnitEnums;

const propTypes = {
	labelTime: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.object),
	]),
	unit: PropTypes.string,
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
};

const defaultProps = {};

function getLineDatasetConfig(dataset = {}) {
	return Object.assign({
		fill: false,
		lineTension: 0,
		pointBorderWidth: 3,
		pointRadius: 3,
		pointHoverBorderColor: '#FFFFFF',
	}, dataset);
}

class TimeLineChart extends Component {
	constructor() {
		super();

		this._getDataConfig = this._getDataConfig.bind(this);
		this._getTimeConfig = this._getTimeConfig.bind(this);
	}

	_getDataConfig(datasets) {
		const { labelTime, unit, } = this.props;
		const labels = [];

		if (unit === HOUR) {
			for (let i = 0; i < HOURS_OF_DAYS; i++) {
				const start = moment(labelTime).startOf('day');

				labels.push(start.add(i, 'h'));
			}
		}
		else if (unit === DAY) {
			const month = labelTime[1].diff(labelTime[0], 'month');

			for (let i = 0; i <= month; i++) {
				const start = moment(labelTime[0]).startOf('month');

				labels.push(start.add(i, 'month'));
			}
		}

		return {
			labels,
			datasets,
		};
	}

	_getTimeConfig() {
		const { unit, } = this.props;

		if (unit === DAY) {
			return {
				displayFormats: {
					month: 'YYYY.M',
				},
				unit: 'month',
				minUnit: 'day',
				tooltipFormat: 'MM/DD',
			};
		}
		else if (unit === HOUR) {
			return {
				displayFormats: {
					hour: 'HH',
				},
				unit: 'hour',
				minUnit: 'second',
				tooltipFormat: 'HH:mm:ss',
			};
		}
	}

	render () {
		const { datasets, } = this.props;
		const lineChartDatasets = datasets && datasets.map(getLineDatasetConfig);
		const data = this._getDataConfig(datasets);
		const options = {
			scales: {
				xAxes: [
					{
						type: 'time',
						time: this._getTimeConfig(),
						scaleLabel: {
							display: true,
						},
						ticks: {
							source: 'labels',
							callback: function(value, index, values) {
								return value;
							},
						},
					}
				],
			},
			tooltips: {
				enabled: false,
				mode: 'index',
				position: 'nearest',
				intersect: false,
			},
		};

		return (
			<PageBlock noMinHeight>
				<Charts.Chart
					type="line"
					data={Object.assign({}, data, {
						datasets: lineChartDatasets,
					})}
					options={options}
				/>
			</PageBlock>
		);
	}
}

TimeLineChart.propTypes = propTypes;
TimeLineChart.defaultProps = defaultProps;

export default TimeLineChart;

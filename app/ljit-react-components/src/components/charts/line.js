import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Chart from './chart';

const propTypes = {
	data: PropTypes.shape({
		labels: PropTypes.arrayOf(PropTypes.string),
		datasets: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			data: PropTypes.arrayOf(PropTypes.number),
		})),
	}),
};
const defaultProps = {
	data: {},
};

class Line extends Component {
	render() {
		const {
			data,
		} = this.props;
		const { datasets, } = data;
		const lineChartDatasets = datasets && datasets.map(getDatasetConfig);

		return (
			<Chart
				type="line"
				data={Object.assign({}, data, {
					datasets: lineChartDatasets,
				})}
			/>
		);
	}
}

Line.propTypes = propTypes;
Line.defaultProps = defaultProps;

export function getDatasetConfig(dataset = {}) {
	return Object.assign({
		fill: false,
		lineTension: 0,
		pointBorderWidth: 3,
		pointRadius: 3,
		pointHoverBorderColor: '#FFF',
	}, dataset);
}

export default Line;

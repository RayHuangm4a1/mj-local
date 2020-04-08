import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import ChartComponent from 'react-chartjs-2';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import tooltips from './tooltips';
import 'chartjs-plugin-colorschemes';
import './style.styl';

const propTypes = {
	options: PropTypes.object,
};

class Chart extends Component {
	render() {
		const {
			options,
		} = this.props;
		const childProps = omit(this.props, [
			'options',
		]);

		return (
			<ChartComponent
				{...childProps}
				options={merge({
					plugins: {
						colorschemes: {
							scheme: 'brewer.Paired12',
						},
					},
					tooltips: {
						enabled: false,
						mode: 'index',
						position: 'nearest',
						intersect: false,
						custom: tooltips,
					},
					scales: {
						yAxes: [
							{
								gridLines: {
									borderDashOffset: 10,
									drawTicks: true,
									borderDash: [4],
									lineWidth: 1,
								},
							},
						],
					},
				}, options)}
			/>
		);
	}
}

Chart.propTypes = propTypes;

export default Chart;

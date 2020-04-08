import React from 'react';
import { mount, } from 'enzyme';
import Chart from '../components/charts/chart';
import Line, { getDatasetConfig, } from '../components/charts/Line';

jest.mock('react-chartjs-2', () => 'Chart');

describe('Chart Component', () => {
	it('should renders correctly', () => {
		const wrapper = mount(
			<Chart />,
		);

		expect(wrapper).toMatchSnapshot();
	});
});

describe('Line', () => {
	it('should renders correctly', () => {
		const wrapper = mount(
			<Line />,
		);

		expect(wrapper).toMatchSnapshot();
	});

	describe('getDatasetConfig', () => {
		it('should handle default config', () => {
			const expectResult = {
				fill: false,
				lineTension: 0,
				pointBorderWidth: 3,
				pointRadius: 3,
				pointHoverBorderColor: '#FFF',
			};

			expect(getDatasetConfig({})).toMatchObject(expectResult);
		});
	})
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import Dice from '../components/dice';

describe('Dice', () => {
	it('handel default props', () => {
		const {
			points,
		} = Dice.defaultProps;

		expect(points).toEqual([]);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<Dice
				classsName='mock-class'
				points={[]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-dice', () => {
		const wrapper = shallow(<Dice/>);

		expect(wrapper.hasClass('ljit-dice')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Dice className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const points = [ 1, ];
		const wrapper = mount(
			<Dice
				className={className}
				points={points}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().points).toEqual(points);
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import SliderBar from '../components/slider-bar';

jest.mock('antd/lib/slider');

describe('Slider Bar', () => {
	it('handle default props', () => {
		const {
			value,
			min,
			max,
			step,
			disabled,
			suffix,
			onChange,
		} = SliderBar.defaultProps;

		expect(value).toEqual(0);
		expect(min).toBe(0);
		expect(max).toBe(100);
		expect(step).toBe(1);
		expect(disabled).toEqual(false);
		expect(suffix).toBe('单位');
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const value = 10;
		const min = 0;
		const max = 1000;
		const wrapper = shallow(
			<SliderBar
				min={min}
				max={max}
				value={value}
				onChange={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-slider-bar', () => {
		const wrapper = shallow(<SliderBar />);

		expect(wrapper.hasClass('ljit-slider-bar')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<SliderBar className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const value = 10;
		const max = 100;
		const min = 1;
		const step = 0.1;
		const suffix = 'mock-suffix';
		const className = 'mock-class';
		const disabled = false;
		const onChange = () => {};

		const wrapper = mount(
			<SliderBar
				value={value}
				max={max}
				min={min}
				step={step}
				suffix={suffix}
				className={className}
				disabled={disabled}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().max).toBe(max);
		expect(wrapper.props().min).toBe(min);
		expect(wrapper.props().step).toBe(step);
		expect(wrapper.props().suffix).toBe(suffix);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().onChange).toEqual(onChange);
	});
});

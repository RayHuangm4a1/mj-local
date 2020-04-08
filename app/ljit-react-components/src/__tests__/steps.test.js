import React from 'react';
import { shallow, mount, } from 'enzyme';
import Steps from '../components/steps';

jest.mock('antd/lib/steps');

describe('Steps', () => {
	it('handle default props', () => {
		const {
			direction,
			size,
			onChange,
		} = Steps.defaultProps;

		expect(direction).toEqual(Steps.DirectionEnums.HORIZONTAL);
		expect(size).toEqual(Steps.SizeEnums.DEFAULT);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<Steps/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-steps', () => {
		const wrapper = shallow(<Steps />);

		expect(wrapper.hasClass('ljit-steps')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Steps className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const onChange = jest.fn();
		const wrapper = shallow(<Steps onChange={onChange} />);

		wrapper.simulate('change');
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalled();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const activeKey = 0;
		const direction = Steps.DirectionEnums.HORIZONTAL;
		const size = Steps.SizeEnums.SMALL;
		const onChange = () => {};
		const children = 'mock-children';

		const wrapper = mount(
			<Steps
				className={className}
				activeKey={0}
				direction={direction}
				size={size}
				onChange={onChange}
			>
				{children}
			</Steps>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().activeKey).toBe(activeKey);
		expect(wrapper.props().direction).toEqual(direction);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().children).toEqual(children);
	});
});

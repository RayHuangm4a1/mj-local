import React from 'react';
import { shallow, mount, } from 'enzyme';
import Switch from '../components/switch';

jest.mock('antd/lib/switch');

describe('Switch', () => {
	it('handle default props', () => {
		const {
			checked,
			disabled,
			onChange,
		} = Switch.defaultProps;

		expect(checked).toEqual(false);
		expect(disabled).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const checked = true;
		const disabled = false;
		const onChange = () => {};
		const wrapper = shallow(
			<Switch
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-switch', () => {
		const wrapper = shallow(<Switch />);

		expect(wrapper.hasClass('ljit-switch')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Switch className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should ljit-switch--checked be selectable when switch checked', () => {
		const checked = true;
		const wrapper = shallow(<Switch checked={checked} />);

		expect(wrapper.hasClass('ljit-switch--checked')).toEqual(true);
	});

	it('should handle change event', () => {
		const checked = true;
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { checked, },
		};
		const wrapper = shallow(<Switch checked={checked} onChange={onChange} />);

		wrapper.simulate('change', checked, event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(checked, event);
	});

	it('should mount in a full DOM', () => {
		const checked = false;
		const disabled = false;
		const className = 'mock-class';
		const onChange = () => {};

		const wrapper = mount(
			<Switch
				checked={checked}
				disabled={disabled}
				className={className}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().checked).toEqual(checked);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().onChange).toEqual(onChange);
	});
});

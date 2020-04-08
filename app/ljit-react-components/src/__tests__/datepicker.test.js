import React from 'react';
import { shallow, mount, } from 'enzyme';
import DatePicker from '../components/datepicker';

jest.mock('antd/lib/date-picker');

describe('DatePicker', () => {
	it('handle default props', () => {
		const {
			className,
			isDisabled,
			format,
			style,
			onChange,
			onFocus,
			onBlur,
		} = DatePicker.defaultProps;

		expect(className).toBe('');
		expect(isDisabled).toBe(false);
		expect(format).toBe('YYYY/MM/DD');
		expect(style).toEqual({});
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const value = new Date(2019, 1, 1);
		const wrapper = shallow(<DatePicker value={value} placeholder="mock-placeholder" />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-date-picker', () => {
		const wrapper = shallow(<DatePicker />);

		expect(wrapper.hasClass('ljit-date-picker')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<DatePicker className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const value = new Date(2019, 1, 1);
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<DatePicker value={value} onChange={onChange} />);

		wrapper.simulate('change', event);
		expect(onChange).toBeCalledWith(event);
	});

	it('should handle focus event', () => {
		const value = new Date(2019, 1, 1);
		const onFocus = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<DatePicker value={value} onFocus={onFocus} />);

		wrapper.simulate('focus', event);
		expect(onFocus).toHaveBeenCalledTimes(1);
		expect(onFocus).toBeCalledWith(event);
	});

	it('should handle blur event', () => {
		const value = new Date(2019, 1, 1);
		const onBlur = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<DatePicker value={value} onBlur={onBlur} />);

		wrapper.simulate('blur', event);
		expect(onBlur).toHaveBeenCalledTimes(1);
		expect(onBlur).toBeCalledWith(event);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const isDisabled = false;
		const defaultValue = new Date(2019, 1, 1);
		const value = new Date(2019, 1, 1);
		const format = 'YYYY-MM-DD';
		const placeholder = 'mock-placeholder';
		const style = { color: '#F00', };
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const wrapper = mount(
			<DatePicker
				className={className}
				isDisabled={isDisabled}
				defaultValue={defaultValue}
				value={value}
				format={format}
				placeholder={placeholder}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().isDisabled).toEqual(isDisabled);
		expect(wrapper.props().defaultValue).toEqual(defaultValue);
		expect(wrapper.props().value).toEqual(value);
		expect(wrapper.props().format).toBe(format);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().onBlur).toEqual(onBlur);
	});
});

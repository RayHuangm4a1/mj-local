import React from 'react';
import { shallow, mount, } from 'enzyme';
import Radio from '../components/radio';

jest.mock('antd/lib/radio/radioButton');
jest.mock('antd/lib/radio');

describe('Radio', () => {
	it('handle default props', () => {
		const {
			radioType,
			defaultChecked,
			disabled,
			onChange,
			onFocus,
			onBlur,
		} = Radio.defaultProps;

		expect(radioType).toEqual(Radio.RadioTypeEnums.RADIO);
		expect(defaultChecked).toEqual(false);
		expect(disabled).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const checked = true;
		const text = 'radio 1 content';
		const wrapper = shallow(
			<Radio
				checked={checked}
			>
				{text}
			</Radio>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-radio', () => {
		const wrapper = shallow(<Radio />);

		expect(wrapper.hasClass('ljit-radio')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Radio className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const checked = true;
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { checked, },
		};
		const wrapper = shallow(<Radio checked={checked} onChange={onChange} />);

		wrapper.simulate('change', event);
		expect(onChange).toBeCalledWith(event);
	});

	it('should handle focus event', () => {
		const checked = true;
		const onFocus = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { checked, },
		};
		const wrapper = shallow(<Radio checked={checked} onFocus={onFocus} />);

		wrapper.simulate('focus', event);
		expect(onFocus).toBeCalledWith(event);
	});

	it('should handle blur event', () => {
		const checked = true;
		const onBlur = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { checked, },
		};
		const wrapper = shallow(<Radio checked={checked} onBlur={onBlur} />);

		wrapper.simulate('blur', event);
		expect(onBlur).toBeCalledWith(event);
	});

	it('should mount in a full DOM', () => {
		const autoFocus = false;
		const checked = false;
		const defaultChecked = false;
		const disabled = false;
		const value = 'radio value';
		const children = 'radio text';
		const className = 'mock-class';
		const name = 'radio name';
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};
		const radioType = Radio.RadioTypeEnums.RADIO;

		const wrapper = mount(
			<Radio
				autoFocus={autoFocus}
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				value={value}
				className={className}
				name={name}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				radioType={radioType}
			>
				{children}
			</Radio>
		);

		expect(wrapper.props().autoFocus).toEqual(autoFocus);
		expect(wrapper.props().checked).toEqual(checked);
		expect(wrapper.props().defaultChecked).toEqual(defaultChecked);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().name).toEqual(name);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().onBlur).toEqual(onBlur);
	});

	describe('Radio Type Enums', () => {
		it('should contains radio property', () => {
			const typeName = 'radio';
			const enumType = 'RADIO';

			expect(Radio.RadioTypeEnums[enumType]).toEqual(typeName);
		});

		it('should contains button property', () => {
			const typeName = 'button';
			const enumType = 'BUTTON';

			expect(Radio.RadioTypeEnums[enumType]).toEqual(typeName);
		});

		it('should contains check property', () => {
			const typeName = 'check';
			const enumType = 'CHECK';

			expect(Radio.RadioTypeEnums[enumType]).toEqual(typeName);
		});

		it('should contains radio-s property', () => {
			const typeName = 'radio-s';
			const enumType = 'RADIO_S';

			expect(Radio.RadioTypeEnums[enumType]).toEqual(typeName);
		});
	});
});

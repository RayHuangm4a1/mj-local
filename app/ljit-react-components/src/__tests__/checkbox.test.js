import React from 'react';
import { shallow, mount, } from 'enzyme';
import CheckBox from '../components/checkbox';

jest.mock('antd/lib/checkbox');

describe('CheckBox', () => {
	it('handle default props', () => {
		const {
			autoFocus,
			value,
			disabled,
			className,
			onChange,
			onFocus,
			onBlur,
		} = CheckBox.defaultProps;

		expect(autoFocus).toEqual(false);
		expect(value).toEqual(false);
		expect(disabled).toEqual(false);
		expect(className).toEqual('');
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const value = true;
		const text = 'checkbox 1 content';
		const wrapper = shallow(
			<CheckBox
				value={value}
			>
				{text}
			</CheckBox>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-checkbox', () => {
		const wrapper = shallow(<CheckBox />);

		expect(wrapper.hasClass('ljit-checkbox')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<CheckBox className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by class ljit-checkbox--circle', () => {
		const wrapper = shallow(<CheckBox type={CheckBox.TypeEnums.CIRCLE} />);

		expect(wrapper.hasClass('ljit-checkbox--circle')).toEqual(true);
	});

	it('should handle change event', () => {
		const value = true;
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<CheckBox value={value} onChange={onChange} />);

		wrapper.simulate('change', event);
		expect(onChange).toBeCalledWith(event);
	});

	it('should handle focus event', () => {
		const value = true;
		const onFocus = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<CheckBox value={value} onFocus={onFocus} />);

		wrapper.simulate('focus', event);
		expect(onFocus).toBeCalledWith(event);
	});

	it('should handle blur event', () => {
		const value = true;
		const onBlur = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<CheckBox value={value} onBlur={onBlur} />);

		wrapper.simulate('blur', event);
		expect(onBlur).toBeCalledWith(event);
	});

	it('should mount in a full DOM', () => {
		const autoFocus = false;
		const value = false;
		const disabled = false;
		const children = 'checkbox text';
		const className = 'mock-class';
		const name = 'checkbox name';
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const wrapper = mount(
			<CheckBox
				autoFocus={autoFocus}
				value={value}
				disabled={disabled}
				className={className}
				name={name}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{children}
			</CheckBox>
		);

		expect(wrapper.props().autoFocus).toEqual(autoFocus);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().value).toEqual(value);
		expect(wrapper.props().children).toEqual(children);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().name).toEqual(name);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().onBlur).toEqual(onBlur);
	});

	describe('Type Enums', () => {
		it('should contains circle property', () => {
			const typeName = 'circle';
			const type = 'CIRCLE';

			expect(CheckBox.TypeEnums[type]).toEqual(typeName);
		});
	});
});

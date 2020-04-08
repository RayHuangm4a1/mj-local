import React from 'react';
import { shallow, mount, } from 'enzyme';
import Radio from '../components/radio';
import RadioGroup from '../components/radio-group';

jest.mock('antd/lib/radio/group');
jest.mock('antd/lib/radio/radioButton');
jest.mock('antd/lib/radio');

describe('Radio Group', () => {
	it('handle default props', () => {
		const {
			radioType,
			buttonStyle,
			disabled,
			onChange,
		} = RadioGroup.defaultProps;

		expect(radioType).toBe(RadioGroup.RadioTypeEnums.RADIO);
		expect(buttonStyle).toBe(RadioGroup.ButtonStyleEnums.SOLID);
		expect(disabled).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should be selectable by class ljit-radio-group', () => {
		const wrapper = shallow(<RadioGroup />);

		expect(wrapper.hasClass('ljit-radio-group')).toEqual(true);
	});

	it('should renders correctly', () => {
		const value = 'option 1';
		const options = [
			{ label: 'option 1', value: 'option 1', },
		];
		const wrapper = shallow(
			<RadioGroup
				value={value}
				options={options}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const defaultValue = '';
		const value = 'option 1';
		const name = 'radioGroup';
		const radioType = RadioGroup.RadioTypeEnums.RADIO;
		const options = [
			{ label: 'option 1', value: 'option 1', },
			{ label: 'option 2', value: 'option 2', },
			{ label: 'option 3', value: 'option 3', },
		];
		const onChange = () => {};
		const disabled = false;
		const buttonStyle = RadioGroup.ButtonStyleEnums.SOLID;
		const className = 'mock-calss';
		const wrapper = mount(
			<RadioGroup
				defaultValue={defaultValue}
				value={value}
				name={name}
				radioType={radioType}
				options={options}
				onChange={onChange}
				disabled={disabled}
				buttonStyle={buttonStyle}
				className={className}
			/>
		);

		expect(wrapper.props().defaultValue).toBe(defaultValue);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().name).toBe(name);
		expect(wrapper.props().radioType).toBe(radioType);
		expect(wrapper.props().options).toMatchObject(options);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().buttonStyle).toBe(buttonStyle);
		expect(wrapper.props().className).toBe(className);
	});

	describe('when pass options props', () => {
		it('should renders three options', () => {
			const options = [
				{ label: 'option 1', value: 'option 1', },
				{ label: 'option 2', value: 'option 2', },
				{ label: 'option 3', value: 'option 3', },
			];
			const wrapper = shallow(<RadioGroup options={options} />);

			expect(wrapper.find('.ljit-radio-group__option')).toHaveLength(3);
		});

		it('should ljit-radio-group__option--radio be selectable by radio type', () => {
			const options = [
				{ label: 'option 1', value: 'option 1', },
			];
			const wrapper = shallow(<RadioGroup options={options} radioType={RadioGroup.RadioTypeEnums.RADIO} />);

			expect(wrapper.find('.ljit-radio-group__option--radio')).toHaveLength(1);
		});

		it('should ljit-radio-group__option--button be selectable by radio type', () => {
			const options = [
				{ label: 'option 1', value: 'option 1', },
			];
			const wrapper = shallow(<RadioGroup options={options} radioType={RadioGroup.RadioTypeEnums.BUTTON} />);

			expect(wrapper.find('.ljit-radio-group__option--button')).toHaveLength(1);
		});
	});

	describe('Radio Type Enums', () => {
		it('should be defined', () => {
			expect(RadioGroup.RadioTypeEnums).toBeDefined();
		});

		it('should match radio\'s RadioTypeEnums', () => {
			expect(RadioGroup.RadioTypeEnums).toMatchObject(Radio.RadioTypeEnums);
		});
	});

	describe('Button Style Enums', () => {
		it('should be defined', () => {
			expect(RadioGroup.ButtonStyleEnums).toBeDefined();
		});

		it('should contains outline property', () => {
			const typeName = 'outline';
			const enumType = 'OUTLINE';

			expect(RadioGroup.ButtonStyleEnums[enumType]).toEqual(typeName);
		});

		it('should contains solid property', () => {
			const typeName = 'solid';
			const enumType = 'SOLID';

			expect(RadioGroup.ButtonStyleEnums[enumType]).toEqual(typeName);
		});
	});
});

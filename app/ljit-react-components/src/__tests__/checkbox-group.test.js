import React from 'react';
import { shallow, mount, } from 'enzyme';
import CheckBoxGroup from '../components/checkbox-group';

jest.mock('antd/lib/checkbox');

describe('CheckBox Group', () => {
	it('handle default props', () => {
		const {
			disabled,
			className,
			onChange,
		} = CheckBoxGroup.defaultProps;

		expect(disabled).toEqual(false);
		expect(className).toEqual('');
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should be selectable by class ljit-checkbox-group', () => {
		const wrapper = shallow(<CheckBoxGroup />);

		expect(wrapper.hasClass('ljit-checkbox-group')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<CheckBoxGroup className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should renders correctly', () => {
		const value = ['option 1',];
		const options = [
			{ label: 'option 1', value: 'option 1', },
		];
		const wrapper = shallow(
			<CheckBoxGroup
				value={value}
				options={options}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const defaultValue = [];
		const value = ['option 1',];
		const name = 'CheckBoxGroup';
		const options = [
			{ label: 'option 1', value: 'option 1', },
			{ label: 'option 2', value: 'option 2', },
			{ label: 'option 3', value: 'option 3', },
		];
		const onChange = () => {};
		const disabled = false;
		const className = 'mock-calss';
		const wrapper = mount(
			<CheckBoxGroup
				defaultValue={defaultValue}
				value={value}
				name={name}
				options={options}
				onChange={onChange}
				disabled={disabled}
				className={className}
			/>
		);

		expect(wrapper.props().defaultValue).toEqual(defaultValue);
		expect(wrapper.props().value).toEqual(value);
		expect(wrapper.props().name).toEqual(name);
		expect(wrapper.props().options).toMatchObject(options);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().className).toEqual(className);
	});

	describe('when pass options props', () => {
		it('should renders three options', () => {
			const options = [
				{ label: 'option 1', value: 'option 1', },
				{ label: 'option 2', value: 'option 2', },
				{ label: 'option 3', value: 'option 3', },
			];
			const wrapper = shallow(<CheckBoxGroup options={options} />);

			expect(wrapper.find('.ljit-checkbox-group__option')).toHaveLength(3);
		});
	});
});

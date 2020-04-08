import React from 'react';
import { shallow, mount, } from 'enzyme';
import Select from '../components/select';

jest.mock('antd/lib/select');

describe('Select', () => {
	it('handle default props', () => {
		const {
			options,
			onChange,
			onBlur,
			onFocus,
			disabled,
			isShowSearch,
			filterOption,
		} = Select.defaultProps;

		expect(options).toMatchObject([]);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(disabled).toEqual(false);
		expect(isShowSearch).toEqual(false);
		expect(filterOption).toEqual(true);
	});

	it('should renders three options', () => {
		const options = [
			{ label: 'option 1', value: 'option 1', },
			{ label: 'option 2', value: 'option 2', },
			{ label: 'option 3', value: 'option 3', },
		];
		const wrapper = shallow(<Select options={options} />);

		expect(wrapper.find('.ljit-form-select__option')).toHaveLength(3);
	});

	it('should be selectable by class ljit-form-select', () => {
		const wrapper = shallow(<Select />);

		expect(wrapper.hasClass('ljit-form-select')).toEqual(true);
	});

	it('should renders correctly', () => {
		const value = 'option 1';
		const options = [
			{ label: 'option 1', value: 'option 1', },
		];
		const wrapper = shallow(
			<Select
				value={value}
				options={options}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const style = { color: '#F00', };
		const defaultValue = '';
		const value = 'option 1';
		const options = [
			{ label: 'option 1', value: 'option 1', },
			{ label: 'option 2', value: 'option 2', },
			{ label: 'option 3', value: 'option 3', },
		];
		const onChange = () => {};
		const onBlur = () => {};
		const onFocus = () => {};
		const disabled = false;
		const placeholder = 'mock-placeholder';
		const className = 'mock-calss';
		const dropdownClassName = 'mock-dropdownClassName';
		const isShowSearch = false;
		const filterOption = true;
		const wrapper = mount(
			<Select
				style={style}
				defaultValue={defaultValue}
				value={value}
				options={options}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				placeholder={placeholder}
				className={className}
				dropdownClassName={dropdownClassName}
				isShowSearch={isShowSearch}
				filterOption={filterOption}
			/>
		);

		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().defaultValue).toBe(defaultValue);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().options).toMatchObject(options);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onBlur).toEqual(onBlur);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().isShowSearch).toBe(isShowSearch);
		expect(wrapper.props().filterOption).toBe(filterOption);
	});
});

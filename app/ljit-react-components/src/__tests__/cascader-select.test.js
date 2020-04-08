import React from 'react';
import { shallow, mount, } from 'enzyme';
import CascaderSelect from '../components/cascader-select';

jest.mock('antd/lib/Cascader');

describe('CascaderSelect', () => {
	it('handle default props', () => {
		const {
			style,
			onChange,
			onBlur,
			onFocus,
			disabled,
			placeholder,
			className,
			popupClassName,
			isShowAll,
			isAllowClear,
		} = CascaderSelect.defaultProps;

		expect(style).toMatchObject({});
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(disabled).toEqual(false);
		expect(placeholder).toBe('');
		expect(className).toBe('');
		expect(popupClassName).toBe('');
		expect(isShowAll).toEqual(false);
		expect(isAllowClear).toEqual(true);
	});

	it('should be selectable by class ljit-cascader-select', () => {
		const wrapper = shallow(
			<CascaderSelect
				value={['ALL',]}
				options={[{
					value: 'ALL',
					label: 'ALL',
				},]}
			/>
		);

		expect(wrapper.hasClass('ljit-cascader-select')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const wrapper = shallow(
			<CascaderSelect
				className="mock-class"
				value={['ALL',]}
				options={[{
					value: 'ALL',
					label: 'ALL',
				},]}
			/>
		);

		expect(wrapper.hasClass('mock-class')).toEqual(true);
	});

	it('should be selectable by class ljit-cascader-select__pop-up after click', () => {
		const wrapper = mount(
			<CascaderSelect
				value={['ALL',]}
				options={[{
					value: 'ALL',
					label: 'ALL',
				},]}
			/>
		);

		wrapper.simulate('click');
		expect(wrapper.find('.ljit-cascader-select__pop-up').exists()).toEqual(true);
	});

	it('should be selectable by custom popupClassName after click', () => {
		const wrapper = mount(
			<CascaderSelect
				popupClassName="mock-popup-class"
				value={['ALL',]}
				options={[{
					value: 'ALL',
					label: 'ALL',
				},]}
			/>
		);

		wrapper.simulate('click');
		expect(wrapper.find('.mock-popup-class').exists()).toEqual(true);
	});

	it('should handle onChange', () => {
		const onChange = jest.fn();
		const wrapper = shallow(
			<CascaderSelect
				value={['ALL',]}
				options={[{
					value: 'ALL',
					label: 'ALL',
				},]}
				onChange={onChange}
			/>
		);

		wrapper.find('.ljit-cascader-select').simulate('change');
		expect(onChange).toHaveBeenCalled();
	});

	it('should renders correctly', () => {
		const value = ['A', 'A-A', 'A-A-A',];
		const options = [{
			value: 'ALL',
			label: 'ALL',
		},{
			value: 'A',
			label: 'A',
			children: [{
				value: 'A-A',
				label: 'A-A',
				children: [{
					value: 'A-A-A',
					label: 'A-A-A',
				},],
			},],
		},{
			value: 'B',
			label: 'B',
			children: [{
				value: 'B-A',
				label: 'B-A',
				children: [{
					value: 'B-A-A',
					label: 'B-A-A',
				},],
			},],
		},];
		const wrapper = shallow(
			<CascaderSelect
				value={value}
				options={options}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const style = { color: '#F00', };
		const value = ['A', 'A-A', 'A-A-A',];
		const options = [{
			value: 'ALL',
			label: 'ALL',
		},{
			value: 'A',
			label: 'A',
			children: [{
				value: 'A-A',
				label: 'A-A',
				children: [{
					value: 'A-A-A',
					label: 'A-A-A',
				},],
			},],
		},{
			value: 'B',
			label: 'B',
			children: [{
				value: 'B-A',
				label: 'B-A',
				children: [{
					value: 'B-A-A',
					label: 'B-A-A',
				},],
			},],
		},];
		const onChange = () => {};
		const onBlur = () => {};
		const onFocus = () => {};
		const disabled = false;
		const placeholder = 'mock-placeholder';
		const className = 'mock-calss';
		const popupClassName = 'mock-dropdownClassName';
		const isShowAll = false;
		const isAllowClear = false;
		const wrapper = mount(
			<CascaderSelect
				style={style}
				value={value}
				options={options}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				placeholder={placeholder}
				className={className}
				popupClassName={popupClassName}
				isShowAll={isShowAll}
				isAllowClear={isAllowClear}
			/>
		);

		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().options).toMatchObject(options);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onBlur).toEqual(onBlur);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().popupClassName).toBe(popupClassName);
		expect(wrapper.props().isShowAll).toEqual(isShowAll);
		expect(wrapper.props().isAllowClear).toEqual(isAllowClear);
	});
});

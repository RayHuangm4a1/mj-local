import React from 'react';
import { shallow, mount, } from 'enzyme';
import InputTextarea from '../components/input-textarea';

jest.mock('antd/lib/input');

describe('InputTextarea', () => {
	it('handle default props', () => {
		const {
			disabled,
			readOnly,
			onChange,
			onFocus,
			onBlur,
			onPressEnter,
		} = InputTextarea.defaultProps;

		expect(disabled).toEqual(false);
		expect(readOnly).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
		expect(onPressEnter).toBeDefined();
		expect(onPressEnter).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const value = 'mock-value';
		const placeholder = 'mock-placeholder';
		const wrapper = shallow(
			<InputTextarea
				value={value}
				placeholder={placeholder}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-input-textarea', () => {
		const wrapper = shallow(<InputTextarea/>);

		expect(wrapper.hasClass('ljit-input-textarea')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<InputTextarea className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const value = 'mock-value';
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<InputTextarea onChange={onChange}/>);

		wrapper.simulate('change', event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(event);
	});

	it('should handle focus event', () => {
		const value = 'mock-value';
		const onFocus = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<InputTextarea value={value} onFocus={onFocus} />);

		wrapper.simulate('focus', event);
		expect(onFocus).toHaveBeenCalledTimes(1);
		expect(onFocus).toBeCalledWith(event);
	});

	it('should handle blur event', () => {
		const value = 'mock-value';
		const onBlur = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<InputTextarea value={value} onBlur={onBlur} />);

		wrapper.simulate('blur', event);
		expect(onBlur).toHaveBeenCalledTimes(1);
		expect(onBlur).toBeCalledWith(event);
	});

	it('should handle press enter event', () => {
		const value = 'mock-value';
		const onPressEnter = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<InputTextarea value={value} onPressEnter={onPressEnter} />);

		wrapper.find('.ljit-input-textarea').props().onPressEnter(event);
		expect(onPressEnter).toHaveBeenCalledTimes(1);
		expect(onPressEnter).toBeCalledWith(event);
	});

	it('should mount in a full DOM', () => {
		const minRows = 2;
		const maxRows = 6;
		const disabled = false;
		const id = 'mock-id';
		const value = 'mock-value';
		const placeholder = 'mock-placeholder';
		const className = 'mock-class';
		const readOnly = false;
		const style = { color: '#F00', };
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};
		const onPressEnter = () => {};

		const wrapper = mount(
			<InputTextarea
				minRows={minRows}
				maxRows={maxRows}
				disabled={disabled}
				id={id}
				value={value}
				placeholder={placeholder}
				className={className}
				readOnly={readOnly}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onPressEnter={onPressEnter}
			/>
		);

		expect(wrapper.props().minRows).toEqual(minRows);
		expect(wrapper.props().maxRows).toEqual(maxRows);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().id).toBe(id);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().readOnly).toEqual(readOnly);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().onBlur).toEqual(onBlur);
		expect(wrapper.props().onPressEnter).toEqual(onPressEnter);
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import TextInput from '../components/standard-betting-row/text-input';

describe('TextInput', () => {
	it('should be selectable by class ljit-text-input', () => {
		const wrapper = shallow(<TextInput/>);

		expect(wrapper.hasClass('ljit-text-input')).toEqual(true);
	});
	it('should handle default props', () => {
		const {
			data,
			placeholder,
			onChangeText,
		} = TextInput.defaultProps;

		expect(data).toEqual('');
		expect(placeholder).toEqual('');
		expect(onChangeText).toBeInstanceOf(Function);
	});
	it('should renders correctly', () => {
		const data = 'mock-data';
		const placeholder = 'mock-placeholder';
		const onChangeText = () => {};
		const wrapper = shallow(
			<TextInput 
				data={data}
				placeholder={placeholder}
				onChangeText={onChangeText}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
	it('should mount in a full DOM', () => {
		const data = 'mock-data';
		const placeholder = 'mock-placeholder';
		const onChangeText = () => {};
		const wrapper = mount(
			<TextInput 
				data={data}
				placeholder={placeholder}
				onChangeText={onChangeText}
			/>
		);

		expect(wrapper.props().data).toBe(data);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().onChangeText).toEqual(onChangeText);
	});
});

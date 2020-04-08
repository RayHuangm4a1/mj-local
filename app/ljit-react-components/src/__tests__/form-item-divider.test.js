import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import FormItemDivider from '../components/form-item-divider';

describe('Form Item Divider', () => {
	it('should renders correctly', () => {
		const className = 'mock-class';
		const wrapper = render(<FormItemDivider className={className} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-form-item-divider', () => {
		const wrapper = shallow(<FormItemDivider />);

		expect(wrapper.hasClass('ljit-form-item-divider')).toBeTruthy();
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<FormItemDivider className={className} />);

		expect(wrapper.hasClass('mock-class')).toBeTruthy();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const wrapper = mount(<FormItemDivider className={className} />);

		expect(wrapper.props().className).toBe(className);
	});
});

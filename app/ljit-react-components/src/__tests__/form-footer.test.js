import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import FormFooter from '../components/form-footer';

describe('Form Footer', () => {
	it('should renders correctly', () => {
		const className = 'mock-class';
		const children = 'mock-children';
		const wrapper = render(<FormFooter className={className}>{children}</FormFooter>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-form-footer', () => {
		const wrapper = shallow(<FormFooter />);

		expect(wrapper.hasClass('ljit-form-footer')).toBeTruthy();
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<FormFooter className={className} />);

		expect(wrapper.hasClass('mock-class')).toBeTruthy();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const children = 'mock-children';
		const wrapper = mount(<FormFooter className={className}>{children}</FormFooter>);

		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().className).toBe(className);
	});
});

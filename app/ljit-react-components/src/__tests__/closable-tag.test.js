import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import ClosableTag from '../components/closable-tag';

describe('Closable Tag', () => {
	it('handle default props', () => {
		const {
			isWithOutline,
			onClose,
		} = ClosableTag.defaultProps;

		expect(isWithOutline).toEqual(true);
		expect(onClose).toBeDefined();
		expect(onClose).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = render(
			<ClosableTag
				className="mock-class"
				onClose={() => {}}
				text="tag text"
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class "ljit-closable-tag"', () => {
		const wrapper = shallow(<ClosableTag />);

		expect(wrapper.hasClass('ljit-closable-tag')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<ClosableTag className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	describe('when tag is closable', () => {
		it('should be selectable by "ljit-closable-tag--closed"', () => {
			const wrapper = shallow(<ClosableTag />);

			expect(wrapper.hasClass('ljit-closable-tag--closed')).toEqual(true);
		});
	});

	it('should mount in a full DOM', () => {
		const text = 'mock-text';
		const className = 'mock-class';
		const onClose = () => {};

		const wrapper = mount(
			<ClosableTag
				text={text}
				className={className}
				onClose={onClose}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().onClose).toEqual(onClose);
	});
});

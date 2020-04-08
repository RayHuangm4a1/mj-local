import React from 'react';
import { shallow, mount, } from 'enzyme';
import Col from '../components/col';

describe('Col', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Col/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-col', () => {
		const wrapper = shallow(<Col/>);

		expect(wrapper.hasClass('ljit-col')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Col className={className}>mock text</Col>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const offset = 6;
		const order = 1;
		const numberOfMoveToLeft = 1;
		const numberOfMoveToRight = 1;
		const span = 6;
		const className = 'mock-class';
		const children = 'mock-children';
		const style = {};

		const wrapper = mount(
			<Col
				offset={offset}
				order={order}
				numberOfMoveToLeft={numberOfMoveToLeft}
				numberOfMoveToRight={numberOfMoveToRight}
				span={span}
				className={className}
				style={style}
			>
				{children}
			</Col>
		);

		expect(wrapper.props().offset).toBe(offset);
		expect(wrapper.props().order).toBe(order);
		expect(wrapper.props().numberOfMoveToLeft).toBe(numberOfMoveToLeft);
		expect(wrapper.props().numberOfMoveToRight).toBe(numberOfMoveToRight);
		expect(wrapper.props().span).toBe(span);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().style).toMatchObject(style);

	});
});

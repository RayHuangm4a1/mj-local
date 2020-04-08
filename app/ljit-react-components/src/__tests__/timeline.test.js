import React from 'react';
import { shallow, mount, } from 'enzyme';
import Timeline from '../components/time-line';

describe('timeline', () => {
	beforeEach(function () {
		jest.mock('antd/lib/timeline');
	});

	afterEach(function () {
		jest.resetModules();
	});

	it('should handle default props', () => {
		const { mode, } = Timeline.defaultProps;

		expect(mode).toBe('left');
	});

	it('should renders correctly', () => {
		const mode = Timeline.ModeEnums.LEFT;
		const className = 'mock-timeline';
		const children = 'mock-children';
		const wrapper = shallow(<Timeline mode={mode} className={className}>
			{children}
		</Timeline>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-time-line', () => {
		const wrapper = shallow(<Timeline/>);

		expect(wrapper.hasClass('ljit-time-line')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Timeline className={className}>mock text</Timeline>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const mode = Timeline.ModeEnums.ALTERNATE;
		const className = 'mock-timeline';

		const wrapper = mount(
			<Timeline
				mode={mode}
				className={className}
			>
			</Timeline>
		);

		expect(wrapper.props().mode).toBe(mode);
		expect(wrapper.props().className).toBe(className);
	});
});

describe('Timeline ModeEnums ', () => {
	it('should contains left property', () => {
		const typeName = 'left';
		const formatType = 'LEFT';

		expect(Timeline.ModeEnums[formatType]).toEqual(typeName);
	});

	it('should contains right property', () => {
		const typeName = 'right';
		const formatType = 'RIGHT';

		expect(Timeline.ModeEnums[formatType]).toEqual(typeName);
	});

	it('should contains alternate property', () => {
		const typeName = 'alternate';
		const formatType = 'ALTERNATE';

		expect(Timeline.ModeEnums[formatType]).toEqual(typeName);
	});
});

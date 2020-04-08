import React from 'react';
import { shallow, mount, } from 'enzyme';
import TimelineItem from '../components/time-line/time-line-item';

describe('timeline item', () => {

	beforeEach(function () {
		jest.mock('antd/lib/timeline/TimelineItem', () => function mockComponent() {
			return <div/>;
		});
	});

	afterEach(function () {
		jest.resetModules();
	});

	it('should renders correctly', () => {
		const nodeColor = 'brightBlue';
		const nodeElement = 'mock-element';
		const className = 'mock-timeline-item';
		const children = 'mock-children';
		const wrapper = shallow(<TimelineItem nodeColor={nodeColor} nodeElement={nodeElement} className={className}>
			{children}
		</TimelineItem>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-time-line-item', () => {
		const wrapper = shallow(<TimelineItem/>);

		expect(wrapper.hasClass('ljit-time-line-item')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<TimelineItem className={className}>mock text</TimelineItem>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const nodeColor = 'brightBlue';
		const nodeElement = 'mock-element';
		const className = 'mock-timeline-item';
		const children = 'mock-children';

		const wrapper = mount(
			<TimelineItem
				nodeColor={nodeColor}
				nodeElement={nodeElement}
				className={className}
			>
				{children}
			</TimelineItem>
		);

		expect(wrapper.props().nodeColor).toBe(nodeColor);
		expect(wrapper.props().nodeElement).toBe(nodeElement);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().children).toBe(children);

	});
});

describe('Color Enums', () => {
	it('should contains brightBlue property', () => {
		const typeName = 'brightBlue';
		const formatType = 'BRIGHTBLUE';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains grassGreen property', () => {
		const typeName = 'grassGreen';
		const formatType = 'GRASSGREEN';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains lightRed property', () => {
		const typeName = 'lightRed';
		const formatType = 'LIGHTRED';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains warmOrange property', () => {
		const typeName = 'warmOrange';
		const formatType = 'WARMORANGE';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains lightPurple property', () => {
		const typeName = 'lightPurple';
		const formatType = 'LIGHTPURPLE';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains tiffanyGreen property', () => {
		const typeName = 'tiffanyGreen';
		const formatType = 'TIFFANYGREEN';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains salmonRed property', () => {
		const typeName = 'salmonRed';
		const formatType = 'SALMONRED';

		expect(TimelineItem.ColorEnums[formatType]).toEqual(typeName);
	});
});

describe('Color setting Enums', () => {
	it('should brightblue color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.BRIGHTBLUE;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#5cb0ff');
	});

	it('should grassgreen color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.GRASSGREEN;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#52c41a');
	});

	it('should lightred color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.LIGHTRED;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#f5222d');
	});

	it('should warmorange color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.WARMORANGE;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#faad14');
	});

	it('should lightpurple color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.LIGHTPURPLE;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#cc77ee');
	});

	it('should tiffanygreen color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.TIFFANYGREEN;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#3de2ca');
	});

	it('should salmonred color setting be defined', () => {
		const typeName = TimelineItem.ColorEnums.SALMONRED;
		const formatEnum = TimelineItem.ColorSettingEnums[typeName];

		expect(formatEnum).toBeDefined();
		expect(formatEnum).toBe('#ff8667');
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import Panel from '../components/panel';

describe('Panel', () => {
	it('should renders correctly', () => {
		const className = 'mock-class';
		const headerTitle = 'mock-Headertitle';
		const headerRight = 'mock-headerRight';
		const content = 'mock-content';
		const footer = 'mock-footer';

		const wrapper = shallow(
			<Panel
				className={className}
				headerTitle={headerTitle}
				headerRight={headerRight}
				content={content}
				footer={footer}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const headerTitle = 'mock-Headertitle';
		const headerRight = 'mock-headerRight';
		const content = 'mock-content';
		const footer = 'mock-footer';

		const wrapper = mount(
			<Panel
				className={className}
				headerTitle={headerTitle}
				headerRight={headerRight}
				content={content}
				footer={footer}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().headerTitle).toBe(headerTitle);
		expect(wrapper.props().headerRight).toBe(headerRight);
		expect(wrapper.props().content).toEqual(content);
		expect(wrapper.props().footer).toEqual(footer);
	});

	it('should be selectable by class ljit-list', () => {
		const wrapper = shallow(<Panel />);

		expect(wrapper.hasClass('ljit-panel')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Panel className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should renders react node content', () => {
		const content = (
			<div>
				<div>mock text 1</div>
				<div>mock text 2</div>
				<div>mock text 3</div>
			</div>
		);
		const wrapper = shallow(<Panel content={content} />);

		expect(wrapper.contains(content)).toEqual(true);
	});

	it('should renders react node footer', () => {
		const footer = (
			<div>
				<div>mock text 1</div>
				<div>mock text 2</div>
				<div>mock text 3</div>
			</div>
		);
		const wrapper = shallow(<Panel footer={footer} />);

		expect(wrapper.contains(footer)).toEqual(true);
	});
});

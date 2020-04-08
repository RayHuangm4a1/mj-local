import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('ListItem', () => {
	let ListItem;

	beforeEach(() => {
		jest.mock('antd/lib/list');
		ListItem = require('../components/list-item').default;
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('should render correctly', () => {
		const className = 'mock-class';
		const title = 'mock-title';
		const titleHint = 'mock-title-hint';
		const content = 'mock-content';
		const right = 'mock-right';
		const prefix = 'mock-prefix';
		const wrapper = shallow(
			<ListItem
				className={className}
				title={title}
				titleHint={titleHint}
				content={content}
				right={right}
				prefix={prefix}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-list-item', () => {
		const title = 'mock-title';
		const titleHint = 'mock-title-hint';
		const content = 'mock-content';
		const right = 'mock-right';
		const wrapper = shallow(
			<ListItem
				title={title}
				titleHint={titleHint}
				content={content}
				right={right}
			/>
		);

		expect(wrapper.hasClass('ljit-list-item')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<ListItem className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const title = 'mock-title';
		const titleHint = 'mock-title-hint';
		const content = 'mock-content';
		const right = 'mock-right';
		const prefix = 'mock-prefix';
		const wrapper = mount(
			<ListItem
				className={className}
				title={title}
				titleHint={titleHint}
				content={content}
				right={right}
				prefix={prefix}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().title).toBe(title);
		expect(wrapper.props().titleHint).toBe(titleHint);
		expect(wrapper.props().content).toBe(content);
		expect(wrapper.props().right).toBe(right);
	});
});

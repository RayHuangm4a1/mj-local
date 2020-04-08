import React from 'react';
import { shallow, mount, } from 'enzyme';
import  ListItem from '../components/list-item';

describe('List', () => {
	let List;

	beforeEach(() => {

		jest.mock('antd/lib/list');
		List = require('../components/list').default;
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('should render correctly', () => {
		const listData = [{
			key: '1',
			title: 'title 1',
			remindText: '',
			content: 'content 1',
			onRenderOperation: (item) => <div onClick={() => console.log(item)}>operation</div>,
		},{
			key: '2',
			title: 'title 2',
			remindText: 'remind text',
			content: 'conten 2',
		},];
		const wrapper = shallow(
			<List
				dataSource={listData}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-list', () => {
		const wrapper = shallow(<List />);

		expect(wrapper.hasClass('ljit-list')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<List className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should render two items', () => {
		const listData = [{
			key: '1',
			title: 'title 1',
			remindText: '',
			content: 'content 1',
		},{
			key: '2',
			title: 'title 2',
			remindText: 'remind text',
			content: 'conten 2',
		},];
		const wrapper = shallow(
			<List
				dataSource={listData}
			/>
		);

		const Element = (item) => (
			<ListItem
				title={item.title}
				titleHint={item.remindText}
				content={item.content}
			/>
		);

		expect(wrapper.contains([<Element item={listData[0]}/>,<Element item={listData[1]}/>]));
	});

	it('should render two items with operation', () => {
		const onRenderOperation = (item) => <div onClick={() => console.log(item)}>operation</div>;
		const listData = [{
			key: '1',
			title: 'title 1',
			remindText: '',
			content: 'content 1',
			onRenderOperation,
		},{
			key: '2',
			title: 'title 2',
			remindText: 'remind text',
			content: 'conten 2',
			onRenderOperation,
		},];
		const wrapper = shallow(
			<List
				dataSource={listData}
			/>
		);

		const Element = (item) => <div onClick={() => console.log(item)}>operation</div>;

		expect(wrapper.contains([<Element item={listData[0]}/>,<Element item={listData[1]}/>]));
	});

	it('should mount in a full DOM', () => {
		const onRenderOperation = (item) => <div onClick={() => console.log(item)}>operation</div>;
		const className = 'mock-class';
		const listData = [{
			key: '1',
			title: 'title 1',
			remindText: '',
			content: 'content 1',
			onRenderOperation,
		},{
			key: '2',
			title: 'title 2',
			remindText: 'remind text',
			content: 'conten 2',
			onRenderOperation,
		},];
		const wrapper = mount(
			<List
				className={className}
				dataSource={listData}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().dataSource).toEqual(listData);
	});
});

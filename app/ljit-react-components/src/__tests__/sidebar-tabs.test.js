import React from 'react';
import { Link, } from 'react-router-dom';
import { shallow, mount, } from 'enzyme';

describe('SidebarTabs', () => {
	let SidebarTabs, tabData, content;

	beforeEach(() => {
		jest.mock('antd/lib/tabs');
		SidebarTabs = require('../components/sidebar-tabs').default;

		tabData = [{
			key: 'key1',
			path: '/first',
			tab: 'tab1',
		},{
			key: 'key2',
			path: '/second',
			tab: 'tab2',
		},];

		content = tabData.map((item) => {
			return (
				<div key={item.key} >{item.tab} content</div>
			);
		});
	});

	afterEach(() => {
		tabData = undefined;
		content = undefined;
		jest.resetModules();
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<SidebarTabs
				tabData={tabData}
			>
				{content}
			</SidebarTabs>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should render two Links with path', () => {
		const wrapper = shallow(
			<SidebarTabs
				tabData={tabData}
			>
				{content}
			</SidebarTabs>
		);

		const Element = (path, tab) => (
			<Link
				className="tab-control"
				to={path}
			>
				<span className="tab-padding">
					{tab}
				</span>
			</Link>
		);

		expect(wrapper.contains([<Element path="/first" tab="tab1"/>, <Element path="/second" tab="tab2"/>]));
	});

	it('should render two divs without path', () => {
		const tabData = [{
			key: 'key1',
			tab: 'tab1',
		},{
			key: 'key2',
			tab: 'tab2',
		},];

		const content = tabData.map((item) => {
			return (
				<div key={item.key} >{item.tab} content</div>
			);
		});

		const wrapper = shallow(
			<SidebarTabs
				tabData={tabData}
			>
				{content}
			</SidebarTabs>
		);

		const Element = (tab) => (
			<div className="tab-control">
				<span className="tab-padding">
					{tab}
				</span>
			</div>
		);

		expect(wrapper.contains([<Element tab="tab1"/>, <Element tab="tab2"/>]));
	});

	it('should be selectable by class ljit-form-select', () => {
		const wrapper = shallow(<SidebarTabs />);

		expect(wrapper.hasClass('ljit-sidebar-tabs')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<SidebarTabs className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const activeKey = 'mock-key';
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { activeKey, },
		};
		const wrapper = shallow(<SidebarTabs activeKey={activeKey} onChange={onChange} />);

		wrapper.simulate('change', activeKey, event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(activeKey, event);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const activeKey = 'mock-key';
		const children = 'default';
		const onChange = () => {};
		const wrapper = mount(
			<SidebarTabs
				tabData={tabData}
				className={className}
				activeKey={activeKey}
				onChange={onChange}
			>
				{children}
			</SidebarTabs>
		);

		expect(wrapper.props().tabData).toEqual(tabData);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().activeKey).toBe(activeKey);
		expect(wrapper.props().onChange).toEqual(onChange);
	});
});

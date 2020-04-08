import React, { Component, } from 'react';
import { shallow, mount, } from 'enzyme';
import Tabs from '../components/tabs';
import HorizontalTabs from '../components/horizontal-tabs';

class HorizontalTabsTestContainer extends Component {
	constructor() {
		super();
		this.state = { activeKey: 1, };
	}

	render() {
		return (
			<HorizontalTabs
				activeKey={this.state.selectedKeys}
				onChange={(activeKey) => this.setState({ activeKey, })}
			>
				<HorizontalTabs.TabPane key="1" tab="1">
					1
				</HorizontalTabs.TabPane>
				<HorizontalTabs.TabPane  key="2" tab="2">
					2
				</HorizontalTabs.TabPane>
			</HorizontalTabs>
		);
	}
}

describe('HorizontalTabs', () => {
	it('should handle default props', () => {
		const {
			onChange,
			isAnimated,
		} = HorizontalTabs.defaultProps;

		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(isAnimated).toBe(true);
	});

	it('should render correctly', () => {
		const className = 'mock-class';
		const activeKey = 'contnet1';
		const children = 'mock-children';
		const onChange = () => {};
		const isAnimated = true;
		const wrapper = shallow(
			<HorizontalTabs
				className={className}
				activeKey={activeKey}
				onChange={onChange}
				isAnimated={isAnimated}
			>
				{children}
			</HorizontalTabs>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should contains Tabs component', () => {
		const wrapper = shallow(<HorizontalTabs />);

		expect(wrapper.type()).toEqual(Tabs);
	});

	it('should be selectable by class ljit-horizontal-tabs', () => {
		const wrapper = shallow(<HorizontalTabs />);

		expect(wrapper.hasClass('ljit-horizontal-tabs')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<HorizontalTabs className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const activeKey = 'mock-key';
		const onChange = jest.fn();
		const event = {
			target: { activeKey, },
		};
		const wrapper = shallow(<HorizontalTabs activeKey={activeKey} onChange={onChange} />);

		wrapper.simulate('change', activeKey, event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(activeKey, event);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const activeKey = 'contnet1';
		const children = (
			<HorizontalTabs.TabPane key="1" tab="1">
				1
			</HorizontalTabs.TabPane>
		);
		const onChange = () => {};
		const isAnimated = true;
		const wrapper = mount(
			<HorizontalTabs
				className={className}
				activeKey={activeKey}
				onChange={onChange}
				isAnimated={isAnimated}
			>
				{children}
			</HorizontalTabs>
		);

		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().activeKey).toBe(activeKey);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().isAnimated).toEqual(isAnimated);
	});

	describe('when wrap TabPane in a container', () => {
		it('should renders correctly', () => {
			const wrapper = shallow(<HorizontalTabsTestContainer />);

			expect(wrapper.find(HorizontalTabs)).toHaveLength(1);
		});
	});
});

describe('Sub Menu', () => {
	it('should be selectable by class ljit-horizontal-tabs__tabpane', () => {
		const wrapper = shallow(<HorizontalTabs.TabPane  key="1" tab="1"/>);

		expect(wrapper.hasClass('ljit-horizontal-tabs__tabpane')).toEqual(true);
	});
});


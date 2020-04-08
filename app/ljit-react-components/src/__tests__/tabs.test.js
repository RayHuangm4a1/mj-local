import React, { Component, } from 'react';
import { shallow, mount, } from 'enzyme';
import Tabs from '../components/tabs';
import {
	PREFIX_CLASS,
	TabPositionEnum,
	TabTypeEnum,
	TabTypeMap,
} from '../components/tabs/utils';

class TabsTestContainer extends Component {
	constructor() {
		super();
		this.state = { activeKey: 1, };
	}

	render() {
		return (
			<Tabs
				activeKey={this.state.selectedKeys}
				onChange={(activeKey) => this.setState({ activeKey, })}
			>
				<Tabs.TabPane key="1" tab="1">
					1
				</Tabs.TabPane>
				<Tabs.TabPane  key="2" tab="2">
					2
				</Tabs.TabPane>
			</Tabs>
		);
	}
}

describe('Tabs', () => {
	it('should handle default props', () => {
		const {
			tabPosition,
			tabType,
			isTabBordered,
			hasTabInkBar,
			isTabFillWidth,
			onChange,
			isAnimated,
		} = Tabs.defaultProps;

		expect(tabPosition).toEqual('top');
		expect(tabType).toEqual('line');
		expect(isTabBordered).toEqual(true);
		expect(hasTabInkBar).toEqual(true);
		expect(isTabFillWidth).toEqual(false);
		expect(isAnimated).toEqual(true);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const className = 'mock-class';
		const activeKey = 'contnet1';
		const children = 'mock-children';
		const onChange = () => {};
		const wrapper = shallow(
			<Tabs
				className={className}
				activeKey={activeKey}
				onChange={onChange}
			>
				{children}
			</Tabs>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-tabs', () => {
		const wrapper = shallow(<Tabs />);

		expect(wrapper.hasClass('ljit-tabs')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Tabs className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const activeKey = 'mock-key';
		const onChange = jest.fn();
		const event = activeKey;
		const wrapper = shallow(<Tabs activeKey={activeKey} onChange={onChange} />);

		wrapper.simulate('change', activeKey, event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(activeKey, event);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const activeKey = 'contnet1';
		const children = (
			<Tabs.TabPane key="1" tab="1">
				1
			</Tabs.TabPane>
		);
		const onChange = () => {};
		const tabPosition = 'right';
		const tabType = 'card';
		const isTabBordered = false;
		const hasTabInkBar = false;
		const isTabFillWidth = false;
		const isAnimated = true;
		const wrapper = mount(
			<Tabs
				className={className}
				activeKey={activeKey}
				onChange={onChange}
				tabPosition={tabPosition}
				tabType={tabType}
				isTabBordered={isTabBordered}
				hasTabInkBar={hasTabInkBar}
				isTabFillWidth={isTabFillWidth}
			>
				{children}
			</Tabs>
		);

		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().activeKey).toBe(activeKey);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().tabPosition).toEqual(tabPosition);
		expect(wrapper.props().tabType).toEqual(tabType);
		expect(wrapper.props().isTabBordered).toEqual(isTabBordered);
		expect(wrapper.props().hasTabInkBar).toEqual(hasTabInkBar);
		expect(wrapper.props().isTabFillWidth).toEqual(isTabFillWidth);
		expect(wrapper.props().isAnimated).toEqual(isAnimated);
	});

	describe('when wrap TabPane in a container', () => {
		it('should renders correctly', () => {
			const wrapper = shallow(<TabsTestContainer />);

			expect(wrapper.find(Tabs)).toHaveLength(1);
		});
	});

	describe('when pass tabPosition in tabs', () => {
		it('should ljit-tabs--position-top be selected by postion top', () => {
			const received = 'top';
			const expected = true;
			const wrapper = shallow(<Tabs tabPosition={received} />);

			expect(wrapper.hasClass('ljit-tabs--position-top')).toEqual(expected);
		});

		it('should ljit-tabs--position-right be selected by postion right', () => {
			const received = 'right';
			const expected = true;
			const wrapper = shallow(<Tabs tabPosition={received} />);

			expect(wrapper.hasClass('ljit-tabs--position-right')).toEqual(expected);
		});

		it('should ljit-tabs--position-bottom be selected by postion bottom', () => {
			const received = 'bottom';
			const expected = true;
			const wrapper = shallow(<Tabs tabPosition={received} />);

			expect(wrapper.hasClass('ljit-tabs--position-bottom')).toEqual(expected);
		});

		it('should ljit-tabs--position-left be selected by postion left', () => {
			const received = 'left';
			const expected = true;
			const wrapper = shallow(<Tabs tabPosition={received} />);

			expect(wrapper.hasClass('ljit-tabs--position-left')).toEqual(expected);
		});
	});

	describe('when pass tabType in tabs', () => {
		it('should ljit-tabs--type-line be selected by postion line', () => {
			const received = 'line';
			const expected = true;
			const wrapper = shallow(<Tabs tabType={received} />);

			expect(wrapper.hasClass('ljit-tabs--type-line')).toEqual(expected);
		});

		it('should ljit-tabs--type-card be selected by postion card', () => {
			const received = 'card';
			const expected = true;
			const wrapper = shallow(<Tabs tabType={received} />);

			expect(wrapper.hasClass('ljit-tabs--type-card')).toEqual(expected);
		});

		it('should ljit-tabs--type-cardgroup be selected by postion card-group', () => {
			const received = 'card-group';
			const expected = true;
			const wrapper = shallow(<Tabs tabType={received} />);

			expect(wrapper.hasClass('ljit-tabs--type-cardgroup')).toEqual(expected);
		});
	});

	describe('when pass isTabBordered in tabs', () => {
		it('should ljit-tabs--bordered be selected by isTabBordered true', () => {
			const isTabBordered = true;
			const expected = true;
			const wrapper = shallow(<Tabs isTabBordered={isTabBordered} />);

			expect(wrapper.hasClass('ljit-tabs--bordered')).toEqual(expected);
		});

		it('should ljit-tabs--no-bordered be selected by isTabBordered false', () => {
			const isTabBordered = false;
			const expected = true;
			const wrapper = shallow(<Tabs isTabBordered={isTabBordered} />);

			expect(wrapper.hasClass('ljit-tabs--no-bordered')).toEqual(expected);
		});
	});

	describe('when pass isTabFillWidth in tabs', () => {
		it('should ljit-tabs--fillwidth be selected by isTabFillWidth true', () => {
			const isTabFillWidth = true;
			const expected = true;
			const wrapper = shallow(<Tabs isTabFillWidth={isTabFillWidth} />);

			expect(wrapper.hasClass('ljit-tabs--fillwidth')).toEqual(expected);
		});

		it('should ljit-tabs--fillwidth not be selected by isTabFillWidth false', () => {
			const isTabFillWidth = false;
			const expected = false;
			const wrapper = shallow(<Tabs isTabFillWidth={isTabFillWidth} />);

			expect(wrapper.hasClass('ljit-tabs--fillwidth')).toEqual(expected);
		});
	});

	describe('when pass hasTabInkBar in tabs', () => {
		it('should ljit-tabs--inkbar be selected by hasTabInkBar true', () => {
			const hasTabInkBar = true;
			const expected = true;
			const wrapper = shallow(<Tabs hasTabInkBar={hasTabInkBar} />);

			expect(wrapper.hasClass('ljit-tabs--inkbar')).toEqual(expected);
		});

		it('should ljit-tabs--no-inkbar be selected by hasTabInkBar false', () => {
			const hasTabInkBar = false;
			const expected = true;
			const wrapper = shallow(<Tabs hasTabInkBar={hasTabInkBar} />);

			expect(wrapper.hasClass('ljit-tabs--no-inkbar')).toEqual(expected);
		});
	});

	describe('when pass title in tabs', () => {
		it('should has ljit-tabs__title class if tabPosition set to "left"', () => {
			const wrapper = mount(<Tabs title="mock-title" tabPosition="left" />);

			expect(wrapper.find('.ljit-tabs__title')).toHaveLength(1);
		});
		it('should  has ljit-tabs__title class if tabPosition set to "right"', () => {
			const wrapper = mount(<Tabs title="mock-title" tabPosition="right" />);

			expect(wrapper.find('.ljit-tabs__title')).toHaveLength(1);
		});
	});
});

describe('TabPane', () => {
	it('should be selectable by class ljit-tabs__tabpane', () => {
		const wrapper = shallow(<Tabs.TabPane key="1" tab="1"/>);

		expect(wrapper.hasClass('ljit-tabs__tabpane')).toEqual(true);
	});
});

describe('utils', () => {
	it('should PREFIX_CLASS to equal ljit-tabs', () => {
		const expected = 'ljit-tabs';

		expect(PREFIX_CLASS).toEqual(expected);
	});

	describe('TabPositionEnum', () => {
		it('should Tabs conatins TabPositionEnum', () => {
			expect(Tabs.TabPositionEnum).toBeDefined();
			expect(Tabs).toHaveProperty('TabPositionEnum', TabPositionEnum);
		});

		it('should contains top property', () => {
			const expectedProperty = 'TOP';
			const expectedValue = 'top';

			expect(TabPositionEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains right property', () => {
			const expectedProperty = 'RIGHT';
			const expectedValue = 'right';

			expect(TabPositionEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains bottom property', () => {
			const expectedProperty = 'BOTTOM';
			const expectedValue = 'bottom';

			expect(TabPositionEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains left property', () => {
			const expectedProperty = 'LEFT';
			const expectedValue = 'left';

			expect(TabPositionEnum).toHaveProperty(expectedProperty, expectedValue);
		});
	});

	describe('TabTypeEnum', () => {
		it('should Tabs conatins TabTypeEnum', () => {
			expect(Tabs.TabTypeEnum).toBeDefined();
			expect(Tabs).toHaveProperty('TabTypeEnum', TabTypeEnum);
		});

		it('should contains LINE property', () => {
			const expectedProperty = 'LINE';
			const expectedValue = 'line';

			expect(TabTypeEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains CARD property', () => {
			const expectedProperty = 'CARD';
			const expectedValue = 'card';

			expect(TabTypeEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains CARD_GROUP property', () => {
			const expectedProperty = 'CARD_GROUP';
			const expectedValue = 'card-group';

			expect(TabTypeEnum).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains LIST property', () => {
			const expectedProperty = 'LIST';
			const expectedValue = 'list';

			expect(TabTypeEnum).toHaveProperty(expectedProperty, expectedValue);
		});
	});

	describe('TabTypeMap', () => {
		it('should contains line property', () => {
			const expectedProperty = 'line';
			const expectedValue = 'line';

			expect(TabTypeMap).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains card property', () => {
			const expectedProperty = 'card';
			const expectedValue = 'card';

			expect(TabTypeMap).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains card-group property', () => {
			const expectedProperty = 'card-group';
			const expectedValue = 'card';

			expect(TabTypeMap).toHaveProperty(expectedProperty, expectedValue);
		});

		it('should contains list property', () => {
			const expectedProperty = 'list';
			const expectedValue = 'list';

			expect(TabTypeMap).toHaveProperty(expectedProperty, expectedValue);
		});
	});
});

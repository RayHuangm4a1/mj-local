import React from 'react';
import { shallow, mount, } from 'enzyme';
import ExpandablePanel from '../components/expandable-panel';
import Icon from '../components/icon';

const { OrientationEnums, } = ExpandablePanel;

describe('ExpandablePanel', () => {
	it('handle default props', () => {
		const {
			topRight,
			title,
			closingText,
			titleIcon,
			children,
			orientation,
			onClickTopRight,
		} = ExpandablePanel.defaultProps;

		expect(topRight).toEqual('');
		expect(title).toEqual('');
		expect(closingText).toEqual('点击隐藏');
		expect(titleIcon).toEqual(null);
		expect(children).toEqual(null);
		expect(orientation).toEqual(OrientationEnums.LEFT);
		expect(onClickTopRight).toBeDefined();
		expect(onClickTopRight).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<ExpandablePanel title="mock-title">mock-children</ExpandablePanel>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by default class ljit-expandable-panel', () => {
		const wrapper = shallow(
			<ExpandablePanel title="mock-title">mock-children</ExpandablePanel>
		);

		expect(wrapper.hasClass('ljit-expandable-panel')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<ExpandablePanel
				title="mock-title"
				className={className}
			>
				mock-children
			</ExpandablePanel>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const title = 'mock-title';
		const titleIcon = <Icon type={Icon.MENU_FOLD} />;
		const children = 'mock-children';
		const className = 'mock-class';
		const closingText = 'mock-text';
		const topRight = <Icon type={Icon.MENU_FOLD} />;
		const style = { backgroundColor: 'yellow', };
		const orientation = OrientationEnums.LEFT;
		const onClickTopRight = () => {};

		const wrapper = mount(
			<ExpandablePanel
				title={title}
				titleIcon={titleIcon}
				className={className}
				closingText={closingText}
				topRight={topRight}
				style={style}
				orientation={orientation}
				onClickTopRight={onClickTopRight}
			>
				{children}
			</ExpandablePanel>
		);

		expect(wrapper.props().title).toEqual(title);
		expect(wrapper.props().titleIcon).toEqual(titleIcon);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().closingText).toEqual(closingText);
		expect(wrapper.props().topRight).toEqual(topRight);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().orientation).toEqual(orientation);
		expect(wrapper.props().onClickTopRight).toEqual(onClickTopRight);
	});

	describe('handle toggle panel', () => {
		it('should be selectable by "ljit-expandable-panel--closed", when panel is closed', () => {
			const wrapper = mount(<ExpandablePanel />);
			const panel = wrapper.find('div').at(0);

			expect(panel.hasClass('ljit-expandable-panel--closed')).toEqual(true);
		});

		it('should be selectable by "ljit-expandable-panel--opened", when panel is opened', () => {
			const wrapper = mount(<ExpandablePanel />);
			const panelOpener = wrapper.find('div').at(1);

			panelOpener.simulate('click');

			const panel = wrapper.find('div').at(0);

			expect(panel.hasClass('ljit-expandable-panel--opened')).toEqual(true);
		});
	});

	describe('handle orientation', () => {
		it ('should be selectable by "ljit-expandable-panel--left" when orientation is passed as "left"', () => {
			const orientation = OrientationEnums.LEFT;
			const wrapper = mount(<ExpandablePanel orientation={orientation} />);
			const panel = wrapper.find('div').at(0);

			expect(panel.hasClass('ljit-expandable-panel--left')).toEqual(true);
		});
		it ('should be selectable by "ljit-expandable-panel--right" when orientation is passed as "right"', () => {
			const orientation = OrientationEnums.RIGHT;
			const wrapper = mount(<ExpandablePanel orientation={orientation} />);
			const panel = wrapper.find('div').at(0);

			expect(panel.hasClass('ljit-expandable-panel--right')).toEqual(true);
		});
	});
});

describe('ExpandablePanel Orientation Enums', () => {
	it('should contain all LEFT property', () => {
		const typeName = 'left';
		const formatType = 'LEFT';

		expect(OrientationEnums[formatType]).toEqual(typeName);
	});

	it('should contain all RIGHT property', () => {
		const typeName = 'right';
		const formatType = 'RIGHT';

		expect(OrientationEnums[formatType]).toEqual(typeName);
	});
});


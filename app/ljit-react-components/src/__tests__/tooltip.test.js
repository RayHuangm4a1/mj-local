import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Tooltip', () => {
	let Tooltip;

	beforeEach(() => {
		jest.doMock('antd/lib/tooltip');
		Tooltip = require('../components/tooltip').default;
	});

	afterEach(() => {
		jest.unmock('antd/lib/tooltip');
		Tooltip = undefined;
	});

	it('should handle default props', () => {
		const { PlacementEnums, TriggerTypeEnums, } = Tooltip;
		const {
			placement,
			trigger,
			isArrowPointAtCenter,
		} = Tooltip.defaultProps;

		expect(placement).toEqual(PlacementEnums.TOP);
		expect(trigger).toEqual(TriggerTypeEnums.HOVER);
		expect(isArrowPointAtCenter).toEqual(false);
	});

	it('should render correctly', () => {
		const { PlacementEnums, TriggerTypeEnums, ColorEnums, } = Tooltip;
		const title = 'mock-title';
		const placement = PlacementEnums.TOP;
		const trigger = TriggerTypeEnums.HOVER;
		const className = 'mock-class';
		const children = 'Hover me';
		const isArrowPointAtCenter = false;
		const overlayColor = ColorEnums.WHITE;
		const overlayClassName = 'mock-overlay-class';
		const overlayStyle = { padding: '10px', };
		const wrapper = shallow(
			<Tooltip
				title={title}
				placement={placement}
				trigger={trigger}
				className={className}
				isArrowPointAtCenter={isArrowPointAtCenter}
				overlayColor={overlayColor}
				overlayClassName={overlayClassName}
				overlayStyle={overlayStyle}
			>
				{children}
			</Tooltip>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-tooltip', () => {
		const wrapper = shallow(
			<Tooltip title="mock-title">Hover me</Tooltip>
		);

		expect(wrapper.hasClass('ljit-tooltip')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<Tooltip
				className={className}
				title="mock-title"
			>
				Hover me
			</Tooltip>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const { PlacementEnums, TriggerTypeEnums, ColorEnums, } = Tooltip;
		const title = 'mock-title';
		const placement = PlacementEnums.TOP;
		const trigger = TriggerTypeEnums.HOVER;
		const children = 'Hover me';
		const className = 'mock-class';
		const isArrowPointAtCenter = false;
		const overlayColor = ColorEnums.WHITE;
		const overlayClassName = 'mock-overlay-class';
		const overlayStyle = { padding: '10px', };
		const wrapper = mount(
			<Tooltip
				title={title}
				placement={placement}
				trigger={trigger}
				className={className}
				isArrowPointAtCenter={isArrowPointAtCenter}
				overlayColor={overlayColor}
				overlayClassName={overlayClassName}
				overlayStyle={overlayStyle}
			>
				{children}
			</Tooltip>
		);

		expect(wrapper.props().title).toEqual(title);
		expect(wrapper.props().placement).toEqual(placement);
		expect(wrapper.props().trigger).toEqual(trigger);
		expect(wrapper.props().children).toEqual(children);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().isArrowPointAtCenter).toEqual(isArrowPointAtCenter);
		expect(wrapper.props().overlayColor).toEqual(overlayColor);
		expect(wrapper.props().overlayClassName).toEqual(overlayClassName);
		expect(wrapper.props().overlayStyle).toEqual(overlayStyle);
	});

	describe('Placement Enums', () => {
		it('should contain TOP property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('TOP', 'top');
		});
		it('should contain LEFT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('LEFT', 'left');
		});
		it('should contain RIGHT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('RIGHT', 'right');
		});
		it('should contain BOTTOM property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('BOTTOM', 'bottom');
		});
		it('should contain TOP_LEFT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('TOP_LEFT', 'topLeft');
		});
		it('should contain TOP_RIGHT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('TOP_RIGHT', 'topRight');
		});
		it('should contain BOTTOM_LEFT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('BOTTOM_LEFT', 'bottomLeft');
		});
		it('should contain BOTTOM_RIGHT property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('BOTTOM_RIGHT', 'bottomRight');
		});
		it('should contain LEFT_TOP property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('LEFT_TOP', 'leftTop');
		});
		it('should contain LEFT_BOTTOM property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('LEFT_BOTTOM', 'leftBottom');
		});
		it('should contain RIGHT_TOP property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('RIGHT_TOP', 'rightTop');
		});
		it('should contain RIGHT_BOTTOM property', () => {
			expect(Tooltip.PlacementEnums).toHaveProperty('RIGHT_BOTTOM', 'rightBottom');
		});
	});

	describe('TriggerType Enums', () => {
		it('should contain HOVER property', () => {
			expect(Tooltip.TriggerTypeEnums).toHaveProperty('HOVER', 'hover');
		});
		it('should contain FOCUS property', () => {
			expect(Tooltip.TriggerTypeEnums).toHaveProperty('FOCUS', 'focus');
		});
		it('should contain CLICK property', () => {
			expect(Tooltip.TriggerTypeEnums).toHaveProperty('CLICK', 'click');
		});
		it('should contain CONTEXT_MENU property', () => {
			expect(Tooltip.TriggerTypeEnums).toHaveProperty('CONTEXT_MENU', 'contextMenu');
		});
	});

	describe('Color Enums', () => {
		it('should contain DEFAULT property', () => {
			expect(Tooltip.ColorEnums).toHaveProperty('DEFAULT', 'default');
		});
		it('should contain WHITE property', () => {
			expect(Tooltip.ColorEnums).toHaveProperty('WHITE', 'white');
		});
	});
});

import React from 'react';
import { mount, shallow, } from 'enzyme';

describe('ControlledTooltip', () => {
	let ControlledTooltip;

	beforeEach(() => {
		jest.doMock('../components/tooltip');
		ControlledTooltip = require('../components/tooltip/controlled-tooltip').default;
	});

	afterEach(() => {
		jest.unmock('../components/tooltip');
		ControlledTooltip = undefined;
	});

	it('should handle default props', () => {
		const {
			isVisible,
			onVisibleChange,
		} = ControlledTooltip.defaultProps;

		expect(isVisible).toEqual(false);
		expect(onVisibleChange).toBeDefined();
		expect(onVisibleChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const title = 'mock-title';
		const className ='mock-class';
		const isVisible = true;
		const onVisibleChange = () => console.log('hello');

		const wrapper = shallow(
			<ControlledTooltip
				title={title}
				className={className}
				isVisible={isVisible}
				onVisibleChange={onVisibleChange}
			>
				<div>Hover ME</div>
			</ControlledTooltip>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by ljit-controlled-tooltip', () => {
		const wrapper = shallow(
			<ControlledTooltip
				title="Hello"
			>
				<div>Hover ME</div>
			</ControlledTooltip>
		);

		expect(wrapper.hasClass('ljit-controlled-tooltip')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<ControlledTooltip
				title="Hello"
				className={className}
			>
				<div>Hover ME</div>
			</ControlledTooltip>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM',() => {
		const title = 'mock-title';
		const className ='mock-class';
		const isVisible = false;
		const onVisibleChange = () => console.log('hello');
		
		const wrapper = mount(
			<ControlledTooltip
				title={title}
				className={className}
				isVisible={isVisible}
				onVisibleChange={onVisibleChange}
			>
				<div>CLICK ME</div>
			</ControlledTooltip>
		);

		expect(wrapper.props().title).toEqual(title);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().isVisible).toEqual(isVisible);
		expect(wrapper.props().onVisibleChange).toBe(onVisibleChange);
	});

	it('should handle onVisibleChange', () => {
		const onVisibleChange = jest.fn();
		const trigger = ControlledTooltip.TriggerTypeEnums.CLICK;
		const wrapper = shallow(
			<ControlledTooltip
				title="hello"
				onVisibleChange={onVisibleChange}
				trigger={trigger}
			>
				<div style={{ width: '15px', }}>LOOOOOONG TIP</div>
			</ControlledTooltip>
		);

		wrapper.simulate('click');

		expect(onVisibleChange).toHaveBeenCalled;
		
	});

	describe('Placement Enums', () => {
		it('should contain TOP property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('TOP', 'top');
		});
		it('should contain LEFT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('LEFT', 'left');
		});
		it('should contain RIGHT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('RIGHT', 'right');
		});
		it('should contain BOTTOM property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('BOTTOM', 'bottom');
		});
		it('should contain TOP_LEFT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('TOP_LEFT', 'topLeft');
		});
		it('should contain TOP_RIGHT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('TOP_RIGHT', 'topRight');
		});
		it('should contain BOTTOM_LEFT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('BOTTOM_LEFT', 'bottomLeft');
		});
		it('should contain BOTTOM_RIGHT property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('BOTTOM_RIGHT', 'bottomRight');
		});
		it('should contain LEFT_TOP property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('LEFT_TOP', 'leftTop');
		});
		it('should contain LEFT_BOTTOM property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('LEFT_BOTTOM', 'leftBottom');
		});
		it('should contain RIGHT_TOP property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('RIGHT_TOP', 'rightTop');
		});
		it('should contain RIGHT_BOTTOM property', () => {
			expect(ControlledTooltip.PlacementEnums).toHaveProperty('RIGHT_BOTTOM', 'rightBottom');
		});
	});

	describe('TriggerType Enums', () => {
		it('should contain HOVER property', () => {
			expect(ControlledTooltip.TriggerTypeEnums).toHaveProperty('HOVER', 'hover');
		});
		it('should contain FOCUS property', () => {
			expect(ControlledTooltip.TriggerTypeEnums).toHaveProperty('FOCUS', 'focus');
		});
		it('should contain CLICK property', () => {
			expect(ControlledTooltip.TriggerTypeEnums).toHaveProperty('CLICK', 'click');
		});
		it('should contain CONTEXT_MENU property', () => {
			expect(ControlledTooltip.TriggerTypeEnums).toHaveProperty('CONTEXT_MENU', 'contextMenu');
		});
	});

	describe('Color Enums', () => {
		it('should contain DEFAULT property', () => {
			expect(ControlledTooltip.ColorEnums).toHaveProperty('DEFAULT', 'default');
		});
		it('should contain WHITE property', () => {
			expect(ControlledTooltip.ColorEnums).toHaveProperty('WHITE', 'white');
		});
	});
});

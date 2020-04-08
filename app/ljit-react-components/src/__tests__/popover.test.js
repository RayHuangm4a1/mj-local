import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Popover', () => {
	let Popover;

	beforeEach(() => {
		jest.doMock('antd/lib/popover');
		Popover = require('../components/popover').default;
	});

	afterEach(() => {
		jest.unmock('antd/lib/popover');
		Popover = undefined;
	});

	it('should handle default props', () => {
		const {
			title,
			content,
			trigger,
			placement,
		} = Popover.defaultProps;

		expect(title).toEqual('');
		expect(content).toEqual('');
		expect(trigger).toEqual(Popover.TriggerTypeEnums.HOVER);
		expect(placement).toEqual(Popover.PlacementEnums.TOP);
	});

	it('should render correctly', () => {
		const title = 'mock-title';
		const content = 'mock-content';
		const children = 'Hover me';
		const trigger = Popover.TriggerTypeEnums.HOVER;
		const placement = Popover.PlacementEnums.TOP;
		const className = 'mock-className';
		const overlayClassName = 'mock-overlayClassName';

		const wrapper = shallow(
			<Popover
				title={title}
				content={content}
				trigger={trigger}
				placement={placement}
				className={className}
				overlayClassName={overlayClassName}
			>
				{children}
			</Popover>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by ljit-popover', () => {
		const PREFIX_CLASS = 'ljit-popover';
		const wrapper = shallow(
			<Popover
				title="mock popover"
				content="mock content"
			>
				<div>Hover me</div>
			</Popover>
		);

		expect(wrapper.hasClass(PREFIX_CLASS)).toEqual(true);
	});

	it('should be selectable by custom class name', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<Popover
				title="mock popover"
				content="mock content"
				className={className}
			>
				<div>Hover me</div>
			</Popover>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const title = 'mock-title';
		const content = 'mock-content';
		const children = 'Hover me';
		const trigger = Popover.TriggerTypeEnums.HOVER;
		const placement = Popover.PlacementEnums.TOP;
		const className = 'mock-className';
		const overlayClassName = 'mock-overlayClassName';
		
		const wrapper = mount(
			<Popover
				title={title}
				content={content}
				trigger={trigger}
				placement={placement}
				className={className}
				overlayClassName={overlayClassName}
			>
				{children}
			</Popover>
		);

		expect(wrapper.props().title).toEqual(title);
		expect(wrapper.props().content).toEqual(content);
		expect(wrapper.props().trigger).toEqual(trigger);
		expect(wrapper.props().placement).toEqual(placement);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().overlayClassName).toEqual(overlayClassName);
		expect(wrapper.props().children).toEqual(children);
	});

	describe('Popover PlacementEnums', () => {
		it('should contain TOP property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('TOP', 'top');
		});
		it('should contain LEFT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('LEFT', 'left');
		});
		it('should contain RIGHT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('RIGHT', 'right');
		});
		it('should contain BOTTOM property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('BOTTOM', 'bottom');
		});
		it('should contain TOP_LEFT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('TOP_LEFT', 'topLeft');
		});
		it('should contain TOP_RIGHT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('TOP_RIGHT', 'topRight');
		});
		it('should contain BOTTOM_LEFT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('BOTTOM_LEFT', 'bottomLeft');
		});
		it('should contain BOTTOM_RIGHT property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('BOTTOM_RIGHT', 'bottomRight');
		});
		it('should contain LEFT_TOP property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('LEFT_TOP', 'leftTop');
		});
		it('should contain LEFT_BOTTOM property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('LEFT_BOTTOM', 'leftBottom');
		});
		it('should contain RIGHT_TOP property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('RIGHT_TOP', 'rightTop');
		});
		it('should contain RIGHT_BOTTOM property', () => {
			expect(Popover.PlacementEnums).toHaveProperty('RIGHT_BOTTOM', 'rightBottom');
		});
	});

	describe('Popover TriggerTypeEnums', () => {
		it('should contain HOVER property', () => {
			expect(Popover.TriggerTypeEnums).toHaveProperty('HOVER', 'hover');
		});
		it('should contain FOCUS property', () => {
			expect(Popover.TriggerTypeEnums).toHaveProperty('FOCUS', 'focus');
		});
		it('should contain CLICK property', () => {
			expect(Popover.TriggerTypeEnums).toHaveProperty('CLICK', 'click');
		});
		it('should contain CONTEXT_MENU property', () => {
			expect(Popover.TriggerTypeEnums).toHaveProperty('CONTEXT_MENU', 'contextMenu');
		});
	});
});

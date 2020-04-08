import React from 'react';
import { shallow, mount, } from 'enzyme';
import Dropdown from '../components/dropdown';


function renderDropdownItem() {
	return (
		<ul>
			<li>item 1</li>
			<li>item 2</li>
		</ul>
	);
}

describe('Dropdown', () => {
	it('handle default props', () => {
		const {
			placement,
			trigger,
			isDisabled,
			onVisibleChange,
			isShowingArrow,
			isKeepMenuOpen,
		} = Dropdown.defaultProps;

		expect(placement).toEqual(Dropdown.PlacementEnums.BOTTOM_LEFT);
		expect(trigger).toEqual(['hover',]);
		expect(isDisabled).toEqual(false);
		expect(onVisibleChange).toBeDefined();
		expect(onVisibleChange).toBeInstanceOf(Function);
		expect(isShowingArrow).toEqual(false);
		expect(isKeepMenuOpen).toEqual(false);
	});

	it('should renders correctly', () => {
		const className = 'mock-classname';
		const placement = Dropdown.PlacementEnums.BOTTOM_CENTER;
		const children = <div>dropdown-content</div>;

		const wrapper = shallow(
			<Dropdown
				dropdownContent={renderDropdownItem()}
				className={className}
				placement={placement}
				isShowingArrow={false}
				isKeepMenuOpen={false}
			>
				{children}
			</Dropdown>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-classname';
		const placement = Dropdown.PlacementEnums.BOTTOM_CENTER;
		const children = <div>children</div>;
		const dropdownContent =  renderDropdownItem();
		const trigger = ['click', 'hover',];
		const isDisabled = false;
		const onVisibleChange = () => {};
		const isShowingArrow = false;
		const isKeepMenuOpen = false;
		const props = {
			className,
			dropdownContent,
			placement,
			trigger,
			isDisabled,
			onVisibleChange,
			isShowingArrow,
			isKeepMenuOpen,
		};

		const wrapper = mount(
			<Dropdown {...props}>
				{children}
			</Dropdown>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().dropdownContent).toBe(dropdownContent);
		expect(wrapper.props().placement).toBe(placement);
		expect(wrapper.props().trigger).toBe(trigger);
		expect(wrapper.props().isDisabled).toBe(isDisabled);
		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().onVisibleChange).toBe(onVisibleChange);
		expect(wrapper.props().isShowingArrow).toBe(isShowingArrow);
		expect(wrapper.props().isKeepMenuOpen).toBe(isKeepMenuOpen);
	});

	describe('when Dropdown.props.trigger has "click" ', () => {
		it('should call onVisibleChange when children is click', () => {
			const mockOnVisibleChange = jest.fn();
			const wrapper = mount(
				<Dropdown
					dropdownContent={renderDropdownItem()}
					trigger={['click',]}
					onVisibleChange={mockOnVisibleChange}
				>
					<button className="mock-child">children</button>
				</Dropdown>
			);

			wrapper.find('.mock-child').simulate('click');
			expect(mockOnVisibleChange).toHaveBeenCalled();
		});
	});
});

describe('PlacementEnums ', () => {
	it('should contains BOTTOM_LEFT property', () => {
		const typeName = 'bottomLeft';
		const formatType = 'BOTTOM_LEFT';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});

	it('should contains BOTTOM_CENTER property', () => {
		const typeName = 'bottomCenter';
		const formatType = 'BOTTOM_CENTER';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});
	it('should contains BOTTOM_RIGHT property', () => {
		const typeName = 'bottomRight';
		const formatType = 'BOTTOM_RIGHT';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});
	it('should contains TOP_LEFT property', () => {
		const typeName = 'topLeft';
		const formatType = 'TOP_LEFT';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});
	it('should contains TOP_CENTER property', () => {
		const typeName = 'topCenter';
		const formatType = 'TOP_CENTER';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});
	it('should contains TOP_RIGHT property', () => {
		const typeName = 'topRight';
		const formatType = 'TOP_RIGHT';

		expect(Dropdown.PlacementEnums[formatType]).toEqual(typeName);
	});
});

describe('TriggerEnums ', () => {
	it('should contains CLICK property', () => {
		const typeName = 'click';
		const formatType = 'CLICK';

		expect(Dropdown.TriggerEnums[formatType]).toEqual(typeName);
	});

	it('should contains HOVER property', () => {
		const typeName = 'hover';
		const formatType = 'HOVER';

		expect(Dropdown.TriggerEnums[formatType]).toEqual(typeName);
	});
});


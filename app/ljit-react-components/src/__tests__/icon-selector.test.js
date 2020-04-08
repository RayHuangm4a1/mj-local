import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Icon Selector', () => {
	let IconSelector, itemList;

	beforeEach(() => {
		IconSelector = require('../components/icon-selector').default;
		itemList = [
			{ id: 'selected-icon-id-1', name: '客服', iconType: 'customer-service', },
			{ id: 'selected-icon-id-2', name: '客服_2', iconType: 'customer-service-2', selectedType: 'selected-customer-service-2', },
		];
	});

	afterEach(() => {
		itemList = undefined;

		jest.resetModules();
	});

	it('Handle default props', () => {
		const {
			className,
			selectedId,
			onClickItem,
			items,
			isVertical,
			iconPlacement,
		} = IconSelector.defaultProps;

		expect(className).toBe('');
		expect(items).toMatchObject([]);
		expect(selectedId).toBe('');
		expect(isVertical).toEqual(false);
		expect(onClickItem).toBeUndefined();
		expect(iconPlacement).toEqual('left-side');
	});

	it('Should render correctly', () => {
		const wrapper = shallow(
			<IconSelector
				items={itemList}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('Should be selectable by ljit-icon-selector', () => {
		const wrapper = shallow(
			<IconSelector
				items={itemList}
			/>
		);

		expect(wrapper.hasClass('ljit-icon-selector')).toEqual(true);
	});

	it('Should mount in a full DOM', () => {
		const isVertical = true;
		const onClickItem = () => {};
		const iconPlacement = 'up-side';
		const className = 'ljit-icon-selector-validation';
		const selectedId = 'selected-icon-id-636';

		const wrapper = mount(
			<IconSelector
				items={itemList}
				onClickItem={onClickItem}
				isVertical={isVertical}
				className={className}
				iconPlacement={iconPlacement}
				selectedId={selectedId}
			/>
		);

		expect(wrapper.props().items).toEqual(itemList);
		expect(wrapper.props().selectedId).toEqual(selectedId);
		expect(wrapper.props().isVertical).toEqual(isVertical);
		expect(wrapper.props().onClickItem).toEqual(onClickItem);
		expect(wrapper.hasClass(className)).toEqual(true);
		expect(wrapper.props().iconPlacement).toEqual(iconPlacement);
	});

	it('Should handle onClickItem', () => {
		const onClickItem = jest.fn();
		const id = 'selected-icon-id-1';
		const name = '客服';
		const iconType = 'customer-service';
		const item = { id, name, iconType, };
		const isVertical = true;
		const iconPlacement = 'up-side';
		const className = 'ljit-icon-selector-validation';
		const selectedId = id;

		const wrapper = mount(
			<IconSelector
				items={[item, ]}
				onClickItem={onClickItem}
				isVertical={isVertical}
				className={className}
				iconPlacement={iconPlacement}
				selectedId={selectedId}
			/>
		);

		wrapper.find('.ljit-icon-selector__item').simulate('click');
		expect(onClickItem).toHaveBeenCalled();
		expect(onClickItem).toHaveBeenCalledTimes(1);
		expect(onClickItem).toHaveBeenCalledWith(id);
	});

	describe('IconSelector Placement Enums', () => {
		it('should contain UP_SIDE property', () => {
			expect(IconSelector.IconPlacementEnums).toHaveProperty('UP_SIDE', 'up-side');
		});
		it('should contain RIGHT_SIDE property', () => {
			expect(IconSelector.IconPlacementEnums).toHaveProperty('RIGHT_SIDE', 'right-side');
		});
		it('should contain DOWN_SIDE property', () => {
			expect(IconSelector.IconPlacementEnums).toHaveProperty('DOWN_SIDE', 'down-side');
		});
		it('should contain LEFT_SIDE property', () => {
			expect(IconSelector.IconPlacementEnums).toHaveProperty('LEFT_SIDE', 'left-side');
		});
	});
});

import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import LabelSelector from '../components/label-selector';

const { OrientationTypeEnums, } = LabelSelector;

describe('Label Selector', () => {
	it('handle default props', () => {
		const {
			onClickItem,
			isSelectedShowBorder,
			orientation,
		} = LabelSelector.defaultProps;

		expect(orientation).toEqual(OrientationTypeEnums.HORIZONTAL);
		expect(onClickItem).toBeDefined();
		expect(onClickItem).toBeInstanceOf(Function);
		expect(isSelectedShowBorder).toBe(true);
	});

	it('should renders correctly', () => {
		const wrapper = render(
			<LabelSelector
				label="mock-label"
				items={[
					{
						id: 0,
						name: 'mock-name',
					},
				]}
				selectedId={0}
				onClickItem={() => {}}
				isSelectedShowBorder={true}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-label-selector', () => {
		const wrapper = shallow(
			<LabelSelector
				label="mock-label"
				items={[
					{
						id: 0,
						name: 'mock-name',
					},
				]}
				selectedId={0}
				onClickItem={() => {}}
				isSelectedShowBorder={true}
			/>
		);

		expect(wrapper.hasClass('ljit-label-selector')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const label = 'mock-label';
		const items = [
			{
				id: 0,
				name: 'mock-name',
			},
		];
		const selectedId = 0;
		const onClickItem = () => {};
		const isSelectedShowBorder = true;
		const orientation = OrientationTypeEnums.VERTICAL;

		const wrapper = mount(
			<LabelSelector
				label={label}
				items={items}
				selectedId={selectedId}
				onClickItem={onClickItem}
				isSelectedShowBorder={isSelectedShowBorder}
				orientation={orientation}
			/>
		);

		expect(wrapper.props().label).toBe(label);
		expect(wrapper.props().items).toBe(items);
		expect(wrapper.props().selectedId).toBe(selectedId);
		expect(wrapper.props().orientation).toBe(orientation);
		expect(wrapper.props().onClickItem).toBe(onClickItem);
		expect(wrapper.props().isSelectedShowBorder).toEqual(isSelectedShowBorder);
	});

	it('should handle onClickItem', () => {
		const onClickItem = jest.fn();
		const item = {
			id: 0,
			name: 'mock-name',
		};
		const wrapper = mount(<LabelSelector
			label="mock-label"
			items={[ item, ]}
			selectedId={0}
			onClickItem={onClickItem}
			isSelectedShowBorder={true}
		/>);

		wrapper.find('.ljit-clickable-tag').simulate('click');
		expect(onClickItem).toHaveBeenCalledTimes(1);
		expect(onClickItem).toHaveBeenCalled();
		expect(onClickItem).toHaveBeenCalledWith(item);
	});
});

describe('OrientationTypeEnums ', () => {
	it('should contains HORIZONTAL property', () => {
		const typeName = 'horizontal';
		const formatType = 'HORIZONTAL';

		expect(OrientationTypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains VERTICAL property', () => {
		const typeName = 'vertical';
		const formatType = 'VERTICAL';

		expect(OrientationTypeEnums[formatType]).toEqual(typeName);
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import CollectionBox, { PREFIX_CLASS, } from '../components/collection-box';

describe('CollectionBox', () => {
	let lotteryClass;
	let lotteries;
	let collections;

	beforeEach(() => {
		lotteryClass = [
			{ id: 0, name: '时时彩', },
			{ id: 1, name: '华宇彩', },
			{ id: 2, name: '11选5', },
		];
		lotteries = {
			0: [
				{ id: 1, name: '重庆时时彩', },
				{ id: 11, name: '韩式1.5分', },
				{ id: 12, name: '东京1.5分', },
			],
			1: [
				{ id: 31, name: '华宇5分彩', },
				{ id: 32, name: '华宇2分彩', },
			],
		};
		collections = [1, 16, 33, ];
	});

	afterEach(() => {
		lotteryClass = undefined;
		lotteries = undefined;
		collections = undefined;
	});

	it('should handle default props', () => {
		const {
			mainList,
			subList,
			selectedIds,
			onChange,
		} = CollectionBox.defaultProps;

		expect(mainList).toEqual([]);
		expect(subList).toMatchObject({});
		expect(selectedIds).toEqual([]);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<CollectionBox
				mainList={lotteryClass}
				subList={lotteries}
				selectedIds={collections}
				onChange={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by default class', () => {
		const wrapper = shallow(
			<CollectionBox
				mainList={lotteryClass}
				subList={lotteries}
				selectedIds={collections}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass(PREFIX_CLASS)).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<CollectionBox
				className={className}
				mainList={lotteryClass}
				subList={lotteries}
				selectedIds={collections}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const mainList = lotteryClass;
		const subList = lotteries;
		const selectedIds = collections;
		const className = 'mock-class';
		const style = { width: '250px', };
		const onChange = () => {};
		const wrapper = mount(
			<CollectionBox
				mainList={mainList}
				subList={subList}
				selectedIds={selectedIds}
				className={className}
				style={style}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().mainList).toEqual(mainList);
		expect(wrapper.props().subList).toEqual(subList);
		expect(wrapper.props().selectedIds).toEqual(selectedIds);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().style).toEqual(style);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	describe('when item is be highlight', () => {
		it('should be selectable by class "ljit-collection-box__menu-item--selected"', () => {
			const wrapper = mount(
				<CollectionBox
					mainList={lotteryClass}
					subList={lotteries}
					selectedIds={collections}
					onChange={() => {}}
				/>
			);
			const selectedItem = wrapper.find('li').at(0);

			expect(selectedItem.hasClass('ljit-collection-box__menu-item--selected')).toEqual(true);
		});
	});
});

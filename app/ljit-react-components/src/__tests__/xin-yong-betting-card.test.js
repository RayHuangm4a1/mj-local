import React from 'react';
import { shallow, mount, } from 'enzyme';
import XinYongBettingCard from '../components/xin-yong-betting-card';

const {
	OrientationEnums,
	TypeEnums,
	XinYongPlaySlotTypeEnums,
} = XinYongBettingCard;

describe('XinYongBettingCard', () => {
	let playTemplates = [];
	let playsMap = {};
	let playSubcondition = {};

	beforeEach(() => {
		playTemplates = [
			{ id: 1, name: '大', },
			{ id: 2, name: '小', },
		];
		playsMap = {
			'1': { id: 1, name: '大', odds: 1954.00, },
			'2': { id: 2, name: '小', odds: 1954.00, },
		};
		playSubcondition = {
			name: '第一球',
			id: 1,
			bonus: 1.243,
			_id: '2131231',
		};
	});

	afterEach(() => {
		playTemplates = [];
		playsMap = {};
		playSubcondition = {};
	});

	it('should handle props', () => {
		const {
			playSubcondition,
			orientation,
			disabledText,
			isDisabled,
			defaultAmount,
			columnCount,
			playsMap,
			bettingsMap,
			playTemplates,
			xinYongPlaySlotType,
			onChange,
		} = XinYongBettingCard.defaultProps;

		expect(playSubcondition).toMatchObject({});
		expect(orientation).toEqual(OrientationEnums.VERTICAL);
		expect(disabledText).toEqual('');
		expect(isDisabled).toEqual(false);
		expect(defaultAmount).toEqual(0);
		expect(columnCount).toEqual(4);
		expect(playsMap).toMatchObject({});
		expect(bettingsMap).toMatchObject({});
		expect(playTemplates).toEqual([]);
		expect(xinYongPlaySlotType).toEqual(XinYongPlaySlotTypeEnums.LINE);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			playTemplates: playTemplates,
			playsMap: playsMap,
			playSubcondition: playSubcondition,
			orientation: OrientationEnums.HORIZONTAL,
			disabledText: 'mock-text',
			isDisabled: false,
			defaultAmount: 10,
			columnCount: 4,
			onChange: () => {},
			className: 'mock-class',
			xinYongPlaySlotType: XinYongPlaySlotTypeEnums.LINE,
		};

		const wrapper = shallow(<XinYongBettingCard {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it ('should be selectable by class ljit-xin-yong-betting-card', () => {
		const wrapper = shallow(<XinYongBettingCard playTemplates={playTemplates} />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-card')).toEqual(true);
	});

	it ('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<XinYongBettingCard className={className} playTemplates={playTemplates} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it ('should be selectable by orientation is vertical', () => {
		const orientation = OrientationEnums.VERTICAL;
		const wrapper = shallow(<XinYongBettingCard orientation={orientation} playTemplates={playTemplates} />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-card--vertical')).toEqual(true);
	});

	it ('should be selectable by orientation is horizontal', () => {
		const orientation = OrientationEnums.HORIZONTAL;
		const wrapper = shallow(<XinYongBettingCard orientation={orientation} playTemplates={playTemplates} />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-card--horizontal')).toEqual(true);
	});

	it ('should mount in a full DOM', () => {
		const orientation = OrientationEnums.HORIZONTAL;
		const disabledText = 'mock-text';
		const className = 'mock-class';
		const isDisabled = false;
		const defaultAmount = 10;
		const columnCount = 4;
		const xinYongPlaySlotType = XinYongPlaySlotTypeEnums.LINE;
		const onChange = () => {};
		const wrapper = mount(
			<XinYongBettingCard
				playTemplates={playTemplates}
				playsMap={playsMap}
				playSubcondition={playSubcondition}
				orientation={orientation}
				disabledText={disabledText}
				className={className}
				isDisabled={isDisabled}
				defaultAmount={defaultAmount}
				columnCount={columnCount}
				xinYongPlaySlotType={xinYongPlaySlotType}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().playTemplates).toEqual(playTemplates);
		expect(wrapper.props().playsMap).toEqual(playsMap);
		expect(wrapper.props().playSubcondition).toEqual(playSubcondition);
		expect(wrapper.props().orientation).toEqual(orientation);
		expect(wrapper.props().disabledText).toEqual(disabledText);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().isDisabled).toEqual(isDisabled);
		expect(wrapper.props().defaultAmount).toEqual(defaultAmount);
		expect(wrapper.props().columnCount).toEqual(columnCount);
		expect(wrapper.props().xinYongPlaySlotType).toEqual(xinYongPlaySlotType);
		expect(wrapper.props().onChange).toEqual(onChange);
	});
});

describe('XinYongBettingCard OrientationEnums', () => {
	it('should contain vertical property', () => {
		const typeName = 'vertical';
		const formatType = 'VERTICAL';

		expect(OrientationEnums[formatType]).toEqual(typeName);
	});

	it('should contain horizontal property', () => {
		const typeName = 'horizontal';
		const formatType = 'HORIZONTAL';

		expect(OrientationEnums[formatType]).toEqual(typeName);
	});
});

describe('XinYongBettingCard TypeEnums', () => {
	it('should contain CIRCLE property', () => {
		const typeName = 'circle';
		const formatType = 'CIRCLE';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains ROUND property', () => {
		const typeName = 'round';
		const formatType = 'ROUND';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contain RECTANGLE property', () => {
		const typeName = 'rectangle';
		const formatType = 'RECTANGLE';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contain ANIMAL property', () => {
		const typeName = 'animal';
		const formatType = 'ANIMAL';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});
});

describe('XinYongBettingCard XinYongPlaySlotTypeEnums', () => {
	it('should contain LINE property', () => {
		const typeName = 'line';
		const formatType = 'LINE';

		expect(XinYongPlaySlotTypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains SQUARE property', () => {
		const typeName = 'square';
		const formatType = 'SQUARE';

		expect(XinYongPlaySlotTypeEnums[formatType]).toEqual(typeName);
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import XinYongPlaySlotLine from '../components/xin-yong-play-slot/line';

const { TypeEnums, } = XinYongPlaySlotLine;

jest.mock('antd/lib/tooltip');

describe('XinYongPlaySlotLine', () => {
	let play;
	let betting;

	beforeEach(() => {
		play = { name: '大', id: 53000, odds: 1954.00, };
		betting = {
			play: { name: '大', id: 53000, odds: 1954.00, },
			amount: 10,
		};
	});

	afterEach(() => {
		play = {};
		betting = {};
	});

	it('handle default props', () => {
		const {
			isDisabled,
			disabledText,
			defaultAmount,
			onChange,
			play,
			playSlotType,
			betting,
		} = XinYongPlaySlotLine.defaultProps;

		expect(isDisabled).toEqual(false);
		expect(disabledText).toEqual('不支援');
		expect(defaultAmount).toEqual(0);
		expect(play).toMatchObject({});
		expect(playSlotType).toEqual(TypeEnums.CIRCLE);
		expect(betting).toMatchObject({});
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			play: play,
			betting: betting,
			className: 'mock-class',
			isDisabled: false,
			disabledText: 'mock-text',
			defaultAmount: 0,
			onChange: () => {},
		};

		const wrapper = shallow(<XinYongPlaySlotLine {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it ('should be selectable by class ljit-xin-yong-play-slot-line', () => {
		const props = {
			play: play,
			betting: betting,
		};
		const wrapper = shallow(<XinYongPlaySlotLine {...props} />);

		expect(wrapper.hasClass('ljit-xin-yong-play-slot-line')).toEqual(true);
	});

	it ('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<XinYongPlaySlotLine className={className} play={play} betting={betting} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it ('should be selectable by class ljit-xin-yong-play-slot-line--disabled, if isDisabled is pass true', () => {
		const props = {
			play: play,
			betting: betting,
			isDisabled: true,
		};
		const wrapper = shallow(<XinYongPlaySlotLine {...props} />);

		expect(wrapper.hasClass('ljit-xin-yong-play-slot-line--disabled')).toEqual(true);
	});

	it('should handle onChange event', () => {
		const onChange = jest.fn();
		const mockedEvent = { target: {}, };

		const wrapper = shallow(
			<XinYongPlaySlotLine defaultAmount={10} onChange={onChange} play={play} betting={betting} />
		);

		wrapper.simulate('click', mockedEvent);

		expect(onChange).toBeDefined();
		expect(onChange).toHaveBeenCalledTimes(1);
	});

	it ('should mount in a full DOM', () => {
		const isDisabled = false;
		const disabledText = 'mock-text';
		const defaultAmount = 0;
		const className = 'mock-class';
		const onChange = () => {};
		const wrapper = mount(
			<XinYongPlaySlotLine
				play={play}
				betting={betting}
				isDisabled={isDisabled}
				disabledText={disabledText}
				defaultAmount={defaultAmount}
				onChange={onChange}
				className={className}
			/>
		);

		expect(wrapper.props().play).toMatchObject(play);
		expect(wrapper.props().betting).toMatchObject(betting);
		expect(wrapper.props().isDisabled).toEqual(isDisabled);
		expect(wrapper.props().disabledText).toEqual(disabledText);
		expect(wrapper.props().defaultAmount).toEqual(defaultAmount);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().onChange).toEqual(onChange);
	});
});

describe('XinYongPlaySlotLine TypeEnums', () => {
	it('should contains CIRCLE property', () => {
		const typeName = 'circle';
		const formatType = 'CIRCLE';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains ROUND property', () => {
		const typeName = 'round';
		const formatType = 'ROUND';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains RECTANGLE property', () => {
		const typeName = 'rectangle';
		const formatType = 'RECTANGLE';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});

	it('should contains ANIMAL property', () => {
		const typeName = 'animal';
		const formatType = 'ANIMAL';

		expect(TypeEnums[formatType]).toEqual(typeName);
	});
});

import React from 'react';
import { shallow, mount, } from 'enzyme';
import XinYongPlaySlotSquare from '../components/xin-yong-play-slot/square';

const { TypeEnums, } = XinYongPlaySlotSquare;

describe('XinYongPlaySlotSquare', () => {
	it('handle default props', () => {
		const {
			className,
			playSlotType,
			play,
			isSelected,
			isDisabled,
			onClick,
		} = XinYongPlaySlotSquare.defaultProps;

		expect(className).toEqual('');
		expect(playSlotType).toEqual('');
		expect(play).toMatchObject({});
		expect(isSelected).toEqual(false);
		expect(isDisabled).toEqual(false);
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			className: 'mock-class',
			play: { id: 0, name: 0, odds: 1.995, },
			isSelected: false,
			playSlotType: '',
			isDisabled: false,
			onClick: () => {},
		};

		const wrapper = shallow(<XinYongPlaySlotSquare {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it ('should be selectable by class ljit-xin-yong-play-slot-square', () => {
		const props = {
			play: { id: 0, name: 0, odds: 1.995, },
		};
		const wrapper = shallow(<XinYongPlaySlotSquare {...props} />);

		expect(wrapper.hasClass('ljit-xin-yong-play-slot-square')).toEqual(true);
	});

	it ('should be selectable by custom class', () => {
		const props = {
			play: { id: 0, name: 0, odds: 1.995, },
			className: 'mock-class',
		};
		const wrapper = shallow(<XinYongPlaySlotSquare {...props} />);

		expect(wrapper.hasClass('mock-class')).toEqual(true);
	});

	it ('should be selectable by class ljit-xin-yong-play-slot-square--disabled, if isDisabled is pass true', () => {
		const props = {
			play: { id: 0, name: 0, odds: 1.995, },
			isDisabled: true,
		};
		const wrapper = shallow(<XinYongPlaySlotSquare {...props} />);

		expect(wrapper.hasClass('ljit-xin-yong-play-slot-square--disabled')).toEqual(true);
	});

	it ('should be selectable by class ljit-xin-yong-play-slot-square--selected, if isSelected is pass true', () => {
		const props = {
			play: { id: 0, name: 0, odds: 1.995, },
			isSelected: true,
		};
		const wrapper = shallow(<XinYongPlaySlotSquare {...props} />);

		expect(wrapper.hasClass('ljit-xin-yong-play-slot-square--selected')).toEqual(true);
	});

	it('should handle onClick event', () => {
		const onClick = jest.fn();

		const wrapper = shallow(
			<XinYongPlaySlotSquare
				play={{ id: 0, name: 0, odds: 1.995, }}
				onClick={onClick}
			/>
		);

		wrapper.simulate('click');

		expect(onClick).toBeDefined();
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it ('should mount in a full DOM', () => {
		const className ='mock-class';
		const play = { id: 0, name: 0, odds: 1.995, };
		const isSelected = false;
		const isDisabled = false;
		const playSlotType = '';
		const onClick = () => {};
		const wrapper = mount(
			<XinYongPlaySlotSquare
				className={className}
				play={play}
				isSelected={isSelected}
				isDisabled={isDisabled}
				playSlotType={playSlotType}
				onClick={onClick}
			/>
		);

		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().play).toMatchObject(play);
		expect(wrapper.props().isSelected).toEqual(isSelected);
		expect(wrapper.props().isDisabled).toEqual(isDisabled);
		expect(wrapper.props().playSlotType).toEqual(playSlotType);
		expect(wrapper.props().onClick).toEqual(onClick);
	});
});

describe('XinYongPlaySlotSquare TypeEnums', () => {
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

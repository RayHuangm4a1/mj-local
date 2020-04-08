import React from 'react';
import { shallow, mount, } from 'enzyme';
import Toggle from '../components/toggle';

describe('Toggle', () => {
	it('handle default props', () => {
		const {
			activeBackgroundColor,
			activeColor,
			inActiveBackgroundColor,
			inActiveColor,
			onClickLeft,
			onClickRight,
			className,
			isLeftActive,
		} = Toggle.defaultProps;

		expect(activeBackgroundColor).toEqual(Toggle.ColorEnums.ORANGE);
		expect(activeColor).toEqual(Toggle.ColorEnums.WHITE);
		expect(inActiveBackgroundColor).toEqual(Toggle.ColorEnums.GREY);
		expect(inActiveColor).toEqual(Toggle.ColorEnums.BLACK);
		expect(isLeftActive).toBe(true);
		expect(className).toBe('');
		expect(onClickLeft).toBeDefined();
		expect(onClickLeft).toBeInstanceOf(Function);
		expect(onClickRight).toBeDefined();
		expect(onClickRight).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const className = 'mock-class';
		const left = 'mock-left';
		const right = 'mock-right';
		const wrapper = shallow(
			<Toggle
				left={left}
				right={right}
				className={className}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-toggle', () => {
		const wrapper = shallow(<Toggle/>);

		expect(wrapper.hasClass('ljit-toggle')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Toggle className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const left = 'mock-left';
		const right = 'mock-right';
		const className = 'mock-class';
		const activeBackgroundColor = Toggle.ColorEnums.WHITE;
		const activeColor = Toggle.ColorEnums.BLACK;
		const inActiveBackgroundColor = Toggle.ColorEnums.ORANGE;
		const inActiveColor = Toggle.ColorEnums.GREY;
		const isLeftActive = true;
		const onClickLeft = () => {};
		const onClickRight = () => {};

		const wrapper = mount(
			<Toggle
				left={left}
				right={right}
				className={className}
				activeBackgroundColor={activeBackgroundColor}
				activeColor={activeColor}
				inActiveBackgroundColor={inActiveBackgroundColor}
				inActiveColor={inActiveColor}
				isLeftActive={isLeftActive}
				onClickLeft={onClickLeft}
				onClickRight={onClickRight}
			/>
		);

		expect(wrapper.props().left).toBe(left);
		expect(wrapper.props().right).toBe(right);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().activeBackgroundColor).toBe(activeBackgroundColor);
		expect(wrapper.props().activeColor).toBe(activeColor);
		expect(wrapper.props().inActiveBackgroundColor).toBe(inActiveBackgroundColor);
		expect(wrapper.props().inActiveColor).toBe(inActiveColor);
		expect(wrapper.props().isLeftActive).toEqual(isLeftActive);
		expect(wrapper.props().onClickLeft).toEqual(onClickLeft);
		expect(wrapper.props().onClickRight).toEqual(onClickRight);

	});

	it('should handle onClickLeft event', () => {
		const onClickLeft = jest.fn();
		const wrapper = shallow(
			<Toggle onClickLeft={onClickLeft} />
		);

		wrapper.find('.ljit-toggle__item--left-active').simulate('click');
		expect(onClickLeft).toHaveBeenCalledTimes(1);
		expect(onClickLeft).toHaveBeenCalled();
	});
	it('should handle onClickRight event', () => {
		const onClickRight = jest.fn();
		const wrapper = shallow(
			<Toggle
				onClickRight={onClickRight}
				isLeftActive={false}
			/>
		);

		wrapper.find('.ljit-toggle__item--right-active').simulate('click');
		expect(onClickRight).toHaveBeenCalledTimes(1);
		expect(onClickRight).toHaveBeenCalled();
	});
});

describe('Toggle ColorEnums ', () => {
	it('should contains ORANGE property', () => {
		const typeName = '#ff8113';
		const formatType = 'ORANGE';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains WHITE property', () => {
		const typeName = '#fff';
		const formatType = 'WHITE';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains GREY property', () => {
		const typeName = '#dddbdb';
		const formatType = 'GREY';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});


	it('should contains BLACK property', () => {
		const typeName = '#646464';
		const formatType = 'BLACK';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});


	it('should contains BLUE property', () => {
		const typeName = 'blue';
		const formatType = 'BLUE';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains GREEN property', () => {
		const typeName = 'green';
		const formatType = 'GREEN';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains YELLOW property', () => {
		const typeName = 'yellow';
		const formatType = 'YELLOW';

		expect(Toggle.ColorEnums[formatType]).toEqual(typeName);
	});
});

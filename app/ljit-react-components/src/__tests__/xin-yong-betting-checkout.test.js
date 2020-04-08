import React from 'react';
import { shallow, mount, } from 'enzyme';
import XinYongBettingCheckout, { PREFIX_CLASS, } from '../components/xin-yong-betting-checkout';
import ChipGroup from '../components/xin-yong-betting-checkout/chip-group';

describe('XinYongBettingCheckout', () => {
	it('should PREFIX_CLASS to equal ljit-xin-yong-betting-checkout', () => {
		expect(PREFIX_CLASS).toEqual('ljit-xin-yong-betting-checkout');
	});

	it('should handle default props', () => {
		const {
			betCount,
			betAmount,
			balance,
			isSquare,
			inputValue,
			onSubmit,
			onReset,
			onChangeInputValue,
		} = XinYongBettingCheckout.defaultProps;

		expect(betCount).toEqual(0);
		expect(betAmount).toEqual(0);
		expect(balance).toEqual(0);
		expect(isSquare).toEqual(false);
		expect(inputValue).toEqual(0);
		expect(onSubmit).toBeInstanceOf(Function);
		expect(onReset).toBeInstanceOf(Function);
		expect(onChangeInputValue).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			betCount: 0,
			betAmount: 0,
			balance: 0,
			isSquare: false,
			onSubmit: () => {},
			onReset: () => {},
			inputValue: 0,
			changeInputValue: () => {},
		};

		const wrapper = shallow(<XinYongBettingCheckout {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-xin-yong-betting-checkout',() => {
		const wrapper = shallow(<XinYongBettingCheckout />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-checkout')).toEqual(true);
	});
	it('should ljit-xin-yong-betting-checkout--square be selectable by isSquare',() => {
		const wrapper = shallow(<XinYongBettingCheckout isSquare={true} />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-checkout--square')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			betCount: 0,
			betAmount: 0,
			balance: 0,
			isSquare: false,
			onSubmit: () => {},
			onReset: () => {},
			inputValue: 0,
			changeInputValue: () => {},
		};
		const wrapper = mount(<XinYongBettingCheckout {...props}/>);

		expect(wrapper.props().betCount).toEqual(props.betCount);
		expect(wrapper.props().betAmount).toEqual(props.betAmount);
		expect(wrapper.props().balance).toEqual(props.balance);
		expect(wrapper.props().isSquare).toEqual(props.isSquare);
		expect(wrapper.props().inputValue).toEqual(props.inputValue);
		expect(wrapper.props().onSubmit).toEqual(props.onSubmit);
		expect(wrapper.props().onReset).toEqual(props.onReset);
		expect(wrapper.props().changeInputValue).toEqual(props.changeInputValue);
	});

	it('should handle onReset event', () => {
		const onReset = jest.fn();
		const wrapper = mount(<XinYongBettingCheckout onReset={onReset} />);
		const resetButton = wrapper.find('.ljit-xin-yong-betting-checkout__reset__button').at(0);

		resetButton.simulate('click');
		expect(onReset).toHaveBeenCalled();
	});

	it('should handle sumbit event', () => {
		const onSubmit = jest.fn();
		const wrapper = mount(<XinYongBettingCheckout onSubmit={onSubmit} />);
		const submitButton = wrapper.find('.ljit-xin-yong-betting-checkout__submit__button').at(0);

		submitButton.simulate('click');
		expect(onSubmit).toHaveBeenCalled();
	});
});

describe('ChipGroup' , () => {
	it('should handle default props', () => {
		const {
			className,
			onClick,
		} = ChipGroup.defaultProps;

		expect(className).toEqual('');
		expect(onClick).toBeInstanceOf(Function);
	});
	it('should render correctly', () => {
		const props = {
			className: 'mock-name',
			onClick: () => {},
		};
		const wrapper = shallow(<ChipGroup {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});
	it('should be selectable by class ljit-xin-yong-betting-checkout__chip',() => {
		const wrapper = shallow(<ChipGroup />);

		expect(wrapper.hasClass('ljit-xin-yong-betting-checkout__chip')).toEqual(true);
	});
	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-name',
			onclick: () => {},
		};
		const wrapper = mount(<XinYongBettingCheckout {...props}/>);

		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().onclick).toEqual(props.onclick);
	});
});


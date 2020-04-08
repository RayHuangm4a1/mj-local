import React from 'react';
import { shallow, mount, } from 'enzyme';
import StandardSelectedBettingCard from '../components/standard-selected-betting-card';

describe('StandardSelectedBettingCard', () => {
	it('handle default props', () => {
		const {
			betting,
			onClickClose,
		} = StandardSelectedBettingCard.defaultProps;

		expect(betting).toEqual({});
		expect(onClickClose).toBeDefined();
		expect(onClickClose).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<StandardSelectedBettingCard
				betting={{
					name: '直选复式 12,12,12,12,12',
					lotteryName: 'mock-lottery',
					weizhi: '-',
					count: 1,
					multiple: 1,
					amountPerBet: 30,
					amount: 30,
					betcontent: '7,7,7,7,7',
				}}
				className='mock-class'
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class standard-selected-betting-card', () => {
		const wrapper = shallow(<StandardSelectedBettingCard/>);

		expect(wrapper.hasClass('standard-selected-betting-card')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<StandardSelectedBettingCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle onClickClose event', () => {
		const onClickClose = jest.fn();
		const wrapper = mount(<StandardSelectedBettingCard onClickClose={onClickClose} />
		);

		wrapper.find('.standard-selected-betting-card__close').simulate('click');
		expect(onClickClose).toHaveBeenCalledTimes(1);
		expect(onClickClose).toHaveBeenCalled();
	});

	it('should mount in a full DOM', () => {
		const betting= {
			name: '直选复式 12,12,12,12,12',
			lotteryName: 'mock-lottery',
			weizhi: '-',
			count: 1,
			multiple: 1,
			amountPerBet: 30,
			amount: 30,
			betcontent: '7,7,7,7,7',
		};
		const className = 'mock-class';
		const onClickClose = () => {};
		const wrapper = mount(
			<StandardSelectedBettingCard
				className={className}
				betting={betting}
				onClickClose={onClickClose}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().betting).toMatchObject(betting);
		expect(wrapper.props().onClickClose).toEqual(onClickClose);
	});
});

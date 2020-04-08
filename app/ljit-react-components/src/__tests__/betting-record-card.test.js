import React from 'react';
import { shallow, mount, } from 'enzyme';
import BettingRecordCard from '../components/betting-record-card';

describe('Betting Record Card', () => {
	it('handle default props', () => {
		const {
			onClick,
			onClickCancel,
			bettingRecord,
			className,
		} = BettingRecordCard.defaultProps;

		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
		expect(onClickCancel).toBeDefined();
		expect(onClickCancel).toBeInstanceOf(Function);
		expect(bettingRecord).toEqual({});
		expect(className).toBe('');
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<BettingRecordCard
				bettingRecord={{
					id: 201901240027,
					name: 'mock-name',
					lotteryId: 0,
					lotteryName: 'mock-lottery',
					playId: 1,
					amountPerBet: 10,
					multiple: 2,
					reward: 0,
					rebate: 12.8,
					issue: '20190701-0001',
					opencode: '',
					count: 1,
					betcontent: '和',
					weizhi: '',
					details: [ // 中獎資訊
						{
							name: '和',
							count: 1,
							reward: 10,
						},
					],
					status: BettingRecordCard.StatusEnums.NOT_OPENED,
					createdAt: new Date('2019-04-13T10:38:43'),
				}}
				className='mock-class'
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-betting-info-card', () => {
		const wrapper = shallow(<BettingRecordCard/>);

		expect(wrapper.hasClass('ljit-betting-info-card')).toEqual(true);
	});

	it('should contains class ljit-betting-info-card__info', () => {
		const wrapper = shallow(<BettingRecordCard/>);

		expect(wrapper.find('.ljit-betting-info-card__info')).toHaveLength(1);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<BettingRecordCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});
	it('should handle onClick event', () => {
		const onClick = jest.fn();
		const wrapper = mount(
			<BettingRecordCard
				onClick={onClick}
			/>
		);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});
	it('should handle onClickCancel event', () => {
		const onClickCancel = jest.fn();
		const wrapper = mount(
			<BettingRecordCard
				onClickCancel={onClickCancel}
				bettingRecord={{ status: BettingRecordCard.StatusEnums.NOT_OPENED, }}
			/>
		);

		wrapper.find('button').simulate('click');
		expect(onClickCancel).toHaveBeenCalledTimes(1);
		expect(onClickCancel).toHaveBeenCalled();
	});

	it('should mount in a full DOM', () => {
		const bettingRecord = {
			id: 201901240027,
			name: 'mock-name',
			lotteryId: 0,
			lotteryName: 'mock-lottery',
			playId: 1,
			amountPerBet: 10,
			multiple: 2,
			reward: 0,
			rebate: 12.8,
			issue: '20190701-0001',
			opencode: '',
			count: 1,
			betcontent: '和',
			weizhi: '',
			details: [ // 中獎資訊
				{
					name: '和',
					count: 1,
					reward: 10,
				},
			],
			status: BettingRecordCard.StatusEnums.NEW,
			createdAt: new Date('2019-04-13T10:38:43'),
		};
		const className = 'mock-class';
		const onClick = () => {};
		const onClickCancel = () => {};
		const wrapper = mount(
			<BettingRecordCard
				bettingRecord={bettingRecord}
				className={className}
				onClick={onClick}
				onClickCancel={onClickCancel}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().bettingRecord).toMatchObject(bettingRecord);
		expect(wrapper.props().onClick).toEqual(onClick);
		expect(wrapper.props().onClickCancel).toEqual(onClickCancel);
	});
});

import React, { Component, } from 'react';
import {
	XinYongBettingElement,
} from 'ljit-react-components';
import ComponentBlock from '../ComponentBlock';
import { LotteryClassIdEnum, } from '../../../src/lib/game-id-enums';

const playSubconditions = [
	{
		name: '总和-龙虎和',
		id: 15001,
	},
	{
		name: '第一球',
		id: 15002,
	},
	{
		name: '第二球',
		id: 15003,
	},
	{
		name: '第三球',
		id: 15004,
	},
	{
		name: '第四球',
		id: 15005,
	},
	{
		name: '第五球',
		id: 15006,
	},
	{
		name: '前三',
		id: 15007,
	},
	{
		name: '中三',
		id: 15008,
	},
	{
		name: '后三',
		id: 15009,
	},
];
const iix5PlaySubconditions = [
	{
		name: '总和',
		id: 151001,
	},
	{
		name: '第一球',
		id: 151002,
	},
	{
		name: '第二球',
		id: 151003,
	},
	{
		name: '第三球',
		id: 151004,
	},
	{
		name: '第四球',
		id: 151005,
	},
	{
		name: '第五球',
		id: 151006,
	},
];
const plays = [
	{
		name: '总和大',
		id: 63028,
		bonus: 1.992,
	},
	{
		name: '总和小',
		id: 63029,
		bonus: 1.992,
	},
	{
		name: '总和单',
		id: 63030,
		bonus: 1.992,
	},
	{
		name: '总和双',
		id: 63031,
		bonus: 1.992,
	},
	{
		name: '大',
		id: 53000,
		bonus: 1.992,
		status: 'offline',
	},
	{
		name: '小',
		id: 53001,
		bonus: 1.992,
	},
	{
		name: '单',
		id: 53002,
		bonus: 1.992,
	},
	{
		name: '双',
		id: 53003,
		bonus: 1.992,
	},
	{
		name: '0',
		id: 53004,
		bonus: 1.992,
	},
	{
		name: '1',
		id: 53005,
		bonus: 1.992,
	},
	{
		name: '2',
		id: 53006,
		bonus: 1.992,
	},
	{
		name: '3',
		id: 53007,
		bonus: 1.992,
	},
	{
		name: '4',
		id: 53008,
		bonus: 1.992,
	},
	{
		name: '5',
		id: 53009,
		bonus: 1.992,
	},
	{
		name: '6',
		id: 53010,
		bonus: 1.992,
	},
	{
		name: '7',
		id: 53011,
		bonus: 1.992,
	},
	{
		name: '8',
		id: 53012,
		bonus: 1.992,
	},
	{
		name: '9',
		id: 53013,
		bonus: 1.992,
	},
];

const playsMap = plays.reduce(function (reduced, play) {
	reduced[play.id] = play;
	return reduced;
}, {});
const playSubconditionsMap = (playSubconditions) => playSubconditions.reduce(function (reduced, playSubcondition) {
	reduced[playSubcondition.id] = playSubcondition;
	return reduced;
}, {});

const lottery = { id: 12, };
const defaultAmount = 5;

const lotteryClass_pk10 = { id: 3, };

class XinYongBettingElementSample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bettingsMap: {},
		};
		this._handleChangeAmount = this._handleChangeAmount.bind(this);
	}
	_handleChangeAmount(lotteryClass, lottery, playSubcondition, play, amount) {
		this.setState(function (prevState) {
			let nextState = {};

			nextState.bettingsMap = {
				...prevState.bettingsMap,
				[play.id]: {
					lotteryClass,
					lottery,
					playSubcondition,
					play,
					amount,
				},
			};

			return nextState;
		});
	}
	render() {
		const { _handleChangeAmount, } = this;
		const { bettingsMap, } = this.state;
		const XXXinYongBettingElement = XinYongBettingElement.get(LotteryClassIdEnum.SSC, lottery.id, 15);// ssc
		const PK10BettingElement_Liangmian = XinYongBettingElement.get(3, 0, 251);
		const PK10BettingElement_1_10 = XinYongBettingElement.get(3, 0, 252);
		const PK10BettingElement_combo = XinYongBettingElement.get(3, 0, 253);
		const PCDDXinYongBettingElement = XinYongBettingElement.get(LotteryClassIdEnum.PCDD, lottery.id, 451);// pcdd
		const IIX5XinYongBettingElement = XinYongBettingElement.get(LotteryClassIdEnum.IIX5, lottery.id, 151);// iix5

		return (
			<React.Fragment>
				<ComponentBlock title="XinYongBettingElement">
					<XXXinYongBettingElement
						lotteryClass={{ id: LotteryClassIdEnum.SSC, }}
						lottery={lottery}
						playSubconditionsMap={playSubconditionsMap(playSubconditions)}
						playsMap={playsMap}
						bettingsMap={bettingsMap}
						defaultAmount={defaultAmount}
						onChange={_handleChangeAmount}
					/>
				</ComponentBlock>
				<ComponentBlock title="XinYongBettingElement 封盤">
					<XXXinYongBettingElement
						lotteryClass={{ id: LotteryClassIdEnum.SSC, }}
						lottery={lottery}
						playSubconditionsMap={playSubconditionsMap(playSubconditions)}
						playsMap={playsMap}
						isDisabled={true}
						disabledText='封盤中'
						defaultAmount={defaultAmount}
						onChange={_handleChangeAmount}
					/>
				</ComponentBlock>
				<ComponentBlock title="XinYongBettingElement pk10">
					<ComponentBlock title="XinYongBettingElement pk10 兩面">
						<PK10BettingElement_Liangmian
							lotteryClass={lotteryClass_pk10}
							lottery={lottery}
							defaultAmount={defaultAmount}
							onChange={_handleChangeAmount}
						/>
					</ComponentBlock>
					<ComponentBlock title="XinYongBettingElement pk10 1-10">
						<PK10BettingElement_1_10
							lotteryClass={lotteryClass_pk10}
							lottery={lottery}
							defaultAmount={defaultAmount}
							onChange={_handleChangeAmount}
						/>
					</ComponentBlock>
					<ComponentBlock title="XinYongBettingElement pk10 組合">
						<PK10BettingElement_combo
							lotteryClass={lotteryClass_pk10}
							lottery={lottery}
							defaultAmount={defaultAmount}
							onChange={_handleChangeAmount}
						/>
					</ComponentBlock>
				</ComponentBlock>
				<ComponentBlock title="XinYongBettingElement 11选5">
					<IIX5XinYongBettingElement
						lotteryClass={{ id: LotteryClassIdEnum.IIX5, }}
						lottery={lottery}
						playSubconditionsMap={playSubconditionsMap(iix5PlaySubconditions)}
						playsMap={playsMap}
						bettingsMap={bettingsMap}
						onChange={_handleChangeAmount}
						defaultAmount={defaultAmount}
					/>
				</ComponentBlock>
				<ComponentBlock title="XinYongBettingElement PC蛋蛋">
					<PCDDXinYongBettingElement
						lotteryClass={{ id: LotteryClassIdEnum.PCDD, }}
						lottery={lottery}
					/>
				</ComponentBlock>
			</React.Fragment>
		);
	}
}

export default XinYongBettingElementSample;

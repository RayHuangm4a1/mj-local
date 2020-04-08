import React, { Component, } from 'react';
import {
	XinYongBettingElement,
} from 'ljit-react-components';

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
const plays = [
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
const playSubconditionsMap = playSubconditions.reduce(function (reduced, playSubcondition) {
	reduced[playSubcondition.id] = playSubcondition;
	return reduced;
}, {});
const lotteryClass = { id: 0, };
const lottery = {
	id: 12,
	name: '東京1.5分彩',
};
const playCondition = {
	id: 15,
	name: '整合',
};
const defaultAmount = 5;

class XinYongBettingElementSample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bettingsMap: {},
		};
		this._handleChangeAmount = this._handleChangeAmount.bind(this);
	}
	_handleChangeAmount(lotteryClass, lottery, play, amount) {
		this.setState(function (prevState) {
			let nextState = {};

			nextState.bettingsMap = {
				...prevState.bettingsMap,
				[play.id]: {
					lotteryClass,
					lottery,
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

		const XXXinYongBettingElement = XinYongBettingElement.get(lotteryClass.id, lottery.id, playCondition.id);// ssc

		return (
			<React.Fragment>
				<h2>正常</h2>
				<XXXinYongBettingElement
					lotteryClass={lotteryClass}
					lottery={lottery}
					playSubconditionsMap={playSubconditionsMap}
					playsMap={playsMap}
					bettingsMap={bettingsMap}
					defaultAmount={defaultAmount}
					onChange={_handleChangeAmount}
				/>
				<h2>封盤</h2>
				<XXXinYongBettingElement
					lotteryClass={lotteryClass}
					lottery={lottery}
					playSubconditionsMap={playSubconditionsMap}
					playsMap={playsMap}
					isDisabled={true}
					disabledText='封盤中'
					defaultAmount={defaultAmount}
					onChange={_handleChangeAmount}
				/>
			</React.Fragment>
		);
	}
}

export default XinYongBettingElementSample;

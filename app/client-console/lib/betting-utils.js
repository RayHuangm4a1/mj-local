import Big from 'big.js';
import PropTypes from 'prop-types';
import {
	BettingRecordCard,
	StatusTag,
} from 'ljit-react-components';
import {
	DeviceEnum,
	BettingRecordStatusEnum,
	BettingRecordTypeEnum,
	TraceRecordStatusEnum,
	TraceRecordTypeEnum,
} from './enums';

export function getXinYongBettingData({
	amountPerBet = 0,
	rebate = 1,
	play = {},
	name = '',
}) {
	return {
		amountPerBet,
		weizhi: '',
		rebate,
		multiple: 1,
		play: {
			_id: play._id,
			id: play.id,
			name: play.name,
			bonus: play.bonus,
			odds: play.odds
		},
		name,
		betcontent: play.name,
		amount: calculateAmount(amountPerBet, 1),
		count: 1,
	};
}

export function calculateReward(amountPerBet, bonus, multiple) {
	return parseFloat(
		new Big(amountPerBet).div(2).times(new Big(bonus).times(new Big(multiple)))
	);
}

export function calculateAmount(amountPerBet, multiple) {
	return parseFloat(new Big(amountPerBet).times(new Big(multiple)));
}

export function calculateProfit(reward, amount) {
	return parseFloat(new Big(reward).minus(new Big(amount)));
}

export function calculateProfitRate(reward, amount) {
	if (amount !== 0) {
		const profit = new Big(calculateProfit(reward, amount));

		return parseFloat(profit.div(new Big(amount)).times(100));
	}
	return 0;
}

export function calculateRebate(bonus, minBonus = 1700, ratio = 20) {
	return parseFloat(((new Big(bonus).minus(new Big(minBonus))).div(new Big(ratio))));
}

const BettingRecordStatusMap = BettingRecordCard.StatusMap;
const {
	NEW,
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	NOT_OPENED,
} = BettingRecordStatusEnum;

const bettingRecordStatusDataPropTypes = PropTypes.oneOf(Object.values(BettingRecordStatusEnum));

export const bettingRecordPropType = PropTypes.shape({
	id: PropTypes.number,
	userId: PropTypes.number,
	username: PropTypes.string,
	walletId: PropTypes.number,
	type: PropTypes.oneOf(Object.values(BettingRecordTypeEnum)),
	traceId: PropTypes.number,
	lotteryClassId: PropTypes.number,
	lotteryId: PropTypes.number,
	lotteryName: PropTypes.string,
	playId: PropTypes.number,
	unit: PropTypes.number,
	awards: PropTypes.objectOf(PropTypes.shape({
		numerator: PropTypes.number,
		deltaBonus: PropTypes.number,
		denominator: PropTypes.number,
	})),
	name: PropTypes.string,
	bonus: PropTypes.number,
	rebate: PropTypes.number,
	issue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	opencode: PropTypes.string,
	reward: PropTypes.number,
	amountPerBet: PropTypes.number,
	multiple: PropTypes.number,
	count: PropTypes.number,
	amount: PropTypes.number,
	betcontent: PropTypes.string,
	weizhi: PropTypes.string,
	isPK: PropTypes.bool,
	status: bettingRecordStatusDataPropTypes,
	details: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		count: PropTypes.number,
		reward: PropTypes.number,
	})),
	device: PropTypes.oneOf(Object.values(DeviceEnum)),
	error: PropTypes.string,
	oid: PropTypes.number,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});
export const bettingRecordsDataPropTypes = PropTypes.shape({
	bettingRecords: PropTypes.arrayOf(bettingRecordPropType),
	page: PropTypes.number,
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
});

export const checkIsBettingRecordStatus = status => Object.values(BettingRecordStatusEnum).indexOf(status) >= 0;

export const checkIsNewBettingRecordStatus = status => NEW === status;

export const checkIsNotOpenBettingRecordStatus = status => NOT_OPENED === status;

export const checkIsCompletedBettingRecordStatus = status => [WIN, LOSE, DRAW].indexOf(status) > -1;

export const checkIsCanceledBettingRecordStatus = status => CANCELED === status;

export const getBettingRecordStatusMap = status => BettingRecordStatusMap[status] || {};

const TagStatusEnums = StatusTag.StatusEnums;
const {
	STOP,
	CONTINUE,
} = TraceRecordTypeEnum;
const TraceRecordTypeMap = {
	[CONTINUE]: { text: '中奖后继续', statusTag: TagStatusEnums.BET_OPENING, },
	[STOP]: { text: '中奖后停止', statusTag: TagStatusEnums.BET_CANCELED, },
};

export const convertTerminatedIfWinToType = isTerminatedIfWin => isTerminatedIfWin ? STOP : CONTINUE;

export const getTraceRecordTypeMap = type => TraceRecordTypeMap[type] || {};

const {
	INCOMPLETE,
	COMPLETE,
} = TraceRecordStatusEnum;
const TraceRecordStatusMap = {
	[INCOMPLETE]: { text: '未完成', statusTag: TagStatusEnums.BET_UNOPENED, },
	[COMPLETE]: { text: '已完成', statusTag: TagStatusEnums.BET_WIN, },
};

export const checkIsTraceRecordStatus = status => Object.values(TraceRecordStatusEnum).indexOf(status) >= 0;

export const getTraceRecordStatusMap = status => TraceRecordStatusMap[status] || {};

export const traceRecordDataPropType = PropTypes.shape({
	id: PropTypes.number,
	userId: PropTypes.number,
	username: PropTypes.string,
	lotteryClassId: PropTypes.number,
	lotteryId: PropTypes.number,
	lotteryName: PropTypes.string,
	playId: PropTypes.number,
	name: PropTypes.string,
	isTerminatedIfWin: PropTypes.bool,
	isTerminatedIfNotOpened: PropTypes.bool,
	totalIssues: PropTypes.number,
	totalFinishedIssues: PropTypes.number,
	rebate: PropTypes.number,
	amountPerBet: PropTypes.number,
	count: PropTypes.number,
	amount: PropTypes.number,
	betcontent: PropTypes.string,
	weizhi: PropTypes.string,
	isPK: PropTypes.bool,
	status: PropTypes.oneOf(Object.values(TraceRecordStatusEnum)),
	device: PropTypes.oneOf(Object.values(DeviceEnum)),
	closedAt: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});

// TODO when real data is done, remove it.
function generateFakeListData(generator = () => {}) {
	return function (size = 10) {
		let index = 0;
		const result = [];

		for (index; index < size; index += 1) {
			const fakeData = generator(index);

			result.push(fakeData);
		}

		return result;
	};
}

export const generateFakeBettingRecordsData = generateFakeListData(generateFakeBettingRecordData);

export const generateFakeTraceRecordsData = generateFakeListData(generateFakeTraceRecordData);

function generateFakeBettingRecordData(index = 0) {
	const statusValues = Object.values(BettingRecordStatusEnum);
	const statusIndex = getRandom(0, statusValues.length - 1);
	const deviceValues = Object.values(DeviceEnum);
	const deviceIndex = getRandom(0, deviceValues.length - 1);

	return {
		id: 10000 + index,
		userId: getRandom(100, 200),
		username: 'test01',
		walletCode: 100,
		type: getRandom(1, 1),
		traceId: 0,
		lotteryClassId: 0,
		lotteryId: 16,
		lotteryName: '腾讯分分彩',
		playId: 112312312,
		unit: 1,
		awards: {
			3: {
				numerator: 1,
				deltaBonus: 0,
				denominator: 10,
			},
		},
		name: '五星龙虎和',
		bonus: 1956,
		rebate: 3,
		issue: `20190918-0864${index + 1}`,
		opencode: null,
		reward: 5000,
		amountPerBet: 0.2,
		multiple: getRandom(5, 15),
		count: 1,
		amount: 0.2,
		betcontent: '3',
		weizhi: '',
		isPK: Boolean(getRandom(0, 1)),
		status: statusValues[statusIndex],
		details: [
			{
				name: '和',
				count: 1,
				reward: 10,
			},
		],
		device: deviceValues[deviceIndex],
		error: null,
		oid: 0,
		pid: 1,
		closedAt: '2019-09-18T06:23:58.000Z',
		createdAt: '2019-09-18T06:22:59.000Z',
		updatedAt: '2019-09-18T06:22:59.000Z',
	};
}
function generateFakeTraceRecordData(index = 0) {
	const statusValues = Object.values(TraceRecordStatusEnum);
	const statusIndex = getRandom(0, statusValues.length - 1);
	const deviceValues = Object.values(DeviceEnum);
	const deviceIndex = getRandom(0, deviceValues.length - 1);

	return {
		id: 10000 + index,
		issue: '20190701-0002',
		userId: getRandom(100, 200),
		username: 'test01',
		lotteryClassId: 0,
		lotteryId: 16,
		lotteryName: '腾讯分分彩',
		playId: 53007,
		name: '整合 3',
		isTerminatedIfWin: getRandom(0, 1),
		isTerminatedIfNotOpened: getRandom(0, 1),
		totalIssues: 3,
		totalFinishedIssues: 2,
		rebate: 3,
		amountPerBet: 0.2,
		count: 1,
		amount: 0.2,
		betcontent: '3',
		weizhi: '',
		isPK: Boolean(getRandom(0, 1)),
		status: statusValues[statusIndex],
		device: deviceValues[deviceIndex],
		closedAt: '2019-09-19T06:23:58.000Z',
		createdAt: '2019-09-19T06:23:58.000Z',
		updatedAt: '2019-09-19T06:23:58.000Z',
	};
}

function getRandom(min, max) {
	return Math.round(Math.random() * max) + min;
}

export const BettingProcessStatusEnum = {
	INIT: 0,
	NO_PASSWORD: 1,
};

export const amountPerBetOptions = [
	{ label: '2 元', value: 2, },
	{ label: '2 角', value: 0.2, },
	{ label: '2 分', value: 0.02, },
	{ label: '2 厘', value: 0.002, },
];

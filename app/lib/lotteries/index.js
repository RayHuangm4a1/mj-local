import {
	PositionIdEnum,
	getPosition,
} from './positions';

export const LotteryClassIdEnum = {
	SSC: 0,
	IIX5: 2,
	PK10: 3,
	PCDD: 4,
	THREED: 6,
	KL8: 7,
	K3: 8,
	KLSF: 9,
	// TODO replace to real 秒秒彩 class id
	MMC: 100,
	// TODO check mark-six LotteryClassIdEnum
	MARK_SIX: 'mark_six',
};

const {
	TEN_THOUSANDS, THOUSANDS, HUNDREDS, TENS, UNITS,

	CHAMPION, FIRST_RUNNER_UP, SECOND_RUNNER_UP,

	FIRST, SECOND, THIRD, FOURTH, FIFTH,
	SIXTH, SEVENTH, EIGHTH, NINTH, TENTH,
	ELEVENTH, TWELFTH, THIRTEENTH, FOURTEENTH, FIFTEENTH,
	SIXTEENTH, SEVENTEENTH, EIGHTEENTH, NINETEENTH, TWENTIETH,
} = PositionIdEnum;

const LotteryClassPositionIdsMap = {
	[LotteryClassIdEnum.SSC]: [
		TEN_THOUSANDS,
		THOUSANDS,
		HUNDREDS,
		TENS,
		UNITS,
	],
	[LotteryClassIdEnum.IIX5]: [
		FIRST,
		SECOND,
		THIRD,
		FOURTH,
		FIFTH,
	],
	[LotteryClassIdEnum.PK10]: [
		CHAMPION, FIRST_RUNNER_UP, SECOND_RUNNER_UP, FOURTH, FIFTH,
		SIXTH, SEVENTH, EIGHTH, NINTH, TENTH,
	],
	[LotteryClassIdEnum.THREED]: [
		HUNDREDS,
		TENS,
		UNITS,
	],
	[LotteryClassIdEnum.PCDD]: [
		HUNDREDS,
		TENS,
		UNITS,
	],
	[LotteryClassIdEnum.KL8]: [
		FIRST, SECOND, THIRD, FOURTH, FIFTH,
		SIXTH, SEVENTH, EIGHTH, NINTH, TENTH,
		ELEVENTH, TWELFTH, THIRTEENTH, FOURTEENTH, FIFTEENTH,
		SIXTEENTH, SEVENTEENTH, EIGHTEENTH, NINETEENTH, TWENTIETH,
	],
};

export const getLotteryClassPositions = (lotteryClassId) => {
	const positionIds = LotteryClassPositionIdsMap[lotteryClassId];

	if (!positionIds) {
		console.error(`No positions in this lotteryClassId ${lotteryClassId}`);
		return;
	}

	return positionIds.map(getPosition);
};

const LotteryClassOpencodeRangeValuesMap = {
	[LotteryClassIdEnum.THREED]: [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	],
	[LotteryClassIdEnum.SSC]: [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	],
	[LotteryClassIdEnum.IIX5]: [
		'01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
	],
	[LotteryClassIdEnum.PCDD]: [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	],
	[LotteryClassIdEnum.PK10]: [
		'01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
	],
	[LotteryClassIdEnum.KL8]: [
		'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
	],
};

export const getLotteryClassOpencodeRangeValues = (lotteryClassId) => {
	const values = LotteryClassOpencodeRangeValuesMap[lotteryClassId];

	if (!values) {
		console.error(`No ranges in this lotteryClassId: ${lotteryClassId}`);
		return;
	}

	return values;
};

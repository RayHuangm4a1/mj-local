import { LotteryClassIdEnum, } from '../../../lib/game-id-enums';
import shishicaiBettingGroup from './shishicai';
import pk10BettingGroup from './pk10';
import pcddBettingGroup from './pcdd';
import iix5BettingGroup from './iix5';

function get(classId, lotteryId, playConditionId) {
	switch (classId) {
		case LotteryClassIdEnum.SSC:
			return shishicaiBettingGroup.get(playConditionId);
		case LotteryClassIdEnum.PK10:
			return pk10BettingGroup.get(playConditionId);
		case LotteryClassIdEnum.PCDD:
			return pcddBettingGroup.get(playConditionId);
		case LotteryClassIdEnum.IIX5:
			return iix5BettingGroup.get(playConditionId);
		default:
			throw new Error(`XinYongBettingGroup do not support classId [${classId}]`);
	}
}

export default {
	get,
};

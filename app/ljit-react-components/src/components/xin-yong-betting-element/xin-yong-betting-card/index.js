import { LotteryClassIdEnum, } from '../../../lib/game-id-enums';
import shishicaiBettingCard from './shishicai';
import pk10BettingCard from './pk10';
import pcddBettingCard from './pcdd';
import iix5BettingCard from './iix5';

function get(classId, lotteryId, playSubconditionId) {
	switch (classId) {
		case LotteryClassIdEnum.SSC:
			return shishicaiBettingCard.get(playSubconditionId);
		case LotteryClassIdEnum.PK10:
			return pk10BettingCard.get(playSubconditionId);
		case LotteryClassIdEnum.PCDD:
			return pcddBettingCard.get(playSubconditionId);
		case LotteryClassIdEnum.IIX5:
			return iix5BettingCard.get(playSubconditionId);
		default:
			throw new Error(`XinYongBettingCard do not support classId [${classId}]`);
	}
}

export default {
	get,
};

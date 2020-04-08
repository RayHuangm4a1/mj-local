import { LotteryClassIdEnum, } from '../../lib/game-id-enums';

import sscBettingElementLocator from './shishicai';
import pcddBettingElementLocator from './pcdd';
import IIX5BettingElementLocator from './11x5';
import pk10BettingElementLocator from './pk10';
import threedBettingElementLocator from './threed';

function getStandardBettingElement(classId, lotteryId, playId) {
	switch (classId) {
		case LotteryClassIdEnum.SSC:
			return sscBettingElementLocator.get(playId);

		case LotteryClassIdEnum.PCDD:
			return pcddBettingElementLocator.get(playId);

		case LotteryClassIdEnum.IIX5:
			return IIX5BettingElementLocator.get(playId);

		case LotteryClassIdEnum.PK10:
			return pk10BettingElementLocator.get(playId);

		case LotteryClassIdEnum.THREED:
			return threedBettingElementLocator.get(playId);

		default:
			throw new Error(`StandardBettingElement do not support classId [${classId}]`);
	}
}

export default {
	get: getStandardBettingElement,
};

import ServiceLocator from 'ljit-lib/service-locator';
import { LotteryClassIdEnum, } from '../../../../lib/game-id-enums';
import withXinYongBettingGroup from '../with-xin-yong-betting-group';
import XinYongPlayIdConfig from '../../xin-yong-play-id-config';

const locator = new ServiceLocator();
const {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
} = XinYongPlayIdConfig[LotteryClassIdEnum.PCDD];

locator.register(PlayConditionIdMap['整合'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['整合']['混合'],
		],
		[
			PlaySubconditionIdMap['整合']['波色'],
		],
		[
			PlaySubconditionIdMap['整合']['特码'],
		],
	])
);

export default locator;

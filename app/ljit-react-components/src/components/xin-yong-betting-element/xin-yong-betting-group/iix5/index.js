import ServiceLocator from 'ljit-lib/service-locator';
import { LotteryClassIdEnum, } from '../../../../lib/game-id-enums';
import withXinYongBettingGroup from '../with-xin-yong-betting-group';
import XinYongPlayIdConfig from '../../xin-yong-play-id-config';

const locator = new ServiceLocator();
const {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
} = XinYongPlayIdConfig[LotteryClassIdEnum.IIX5];

locator.register(PlayConditionIdMap['两面'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['两面']['总和'],
		],
		[
			PlaySubconditionIdMap['两面']['第一球'],
			PlaySubconditionIdMap['两面']['第二球'],
			PlaySubconditionIdMap['两面']['第三球'],
			PlaySubconditionIdMap['两面']['第四球'],
			PlaySubconditionIdMap['两面']['第五球'],
		],
	])
);

locator.register(PlayConditionIdMap['单号'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['单号']['一中一'],
		],
		[
			PlaySubconditionIdMap['单号']['第一球'],
			PlaySubconditionIdMap['单号']['第二球'],
			PlaySubconditionIdMap['单号']['第三球'],
			PlaySubconditionIdMap['单号']['第四球'],
			PlaySubconditionIdMap['单号']['第五球'],
		],
	])
);

// TODO add 连码, 直选

export default locator;

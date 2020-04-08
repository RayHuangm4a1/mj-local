import ServiceLocator from 'ljit-lib/service-locator';
import { LotteryClassIdEnum, } from '../../../../lib/game-id-enums';
import withXinYongBettingGroup from '../with-xin-yong-betting-group';
import XinYongPlayIdConfig from '../../xin-yong-play-id-config';

const locator = new ServiceLocator();
const {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
} = XinYongPlayIdConfig[LotteryClassIdEnum.PK10];

locator.register(PlayConditionIdMap['兩面'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['兩面']['冠、亚军和'],
		],
		[
			PlaySubconditionIdMap['兩面']['冠军'],
			PlaySubconditionIdMap['兩面']['亚军'],
			PlaySubconditionIdMap['兩面']['第三名'],
			PlaySubconditionIdMap['兩面']['第四名'],
			PlaySubconditionIdMap['兩面']['第五名'],
		],
		[
			PlaySubconditionIdMap['兩面']['第六名'],
			PlaySubconditionIdMap['兩面']['第七名'],
			PlaySubconditionIdMap['兩面']['第八名'],
			PlaySubconditionIdMap['兩面']['第九名'],
			PlaySubconditionIdMap['兩面']['第十名'],
		],
	]));

locator.register(PlayConditionIdMap['单号1-10'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['单号1-10']['冠军'],
			PlaySubconditionIdMap['单号1-10']['亚军'],
			PlaySubconditionIdMap['单号1-10']['第三名'],
			PlaySubconditionIdMap['单号1-10']['第四名'],
			PlaySubconditionIdMap['单号1-10']['第五名'],
		],
		[
			PlaySubconditionIdMap['单号1-10']['第六名'],
			PlaySubconditionIdMap['单号1-10']['第七名'],
			PlaySubconditionIdMap['单号1-10']['第八名'],
			PlaySubconditionIdMap['单号1-10']['第九名'],
			PlaySubconditionIdMap['单号1-10']['第十名'],
		],
	]));

locator.register(PlayConditionIdMap['冠亚军组合'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['冠亚军组合']['冠亚军组合'],
		],
	]));

export default locator;

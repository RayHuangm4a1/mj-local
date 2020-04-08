import ServiceLocator from 'ljit-lib/service-locator';
import { LotteryClassIdEnum, } from '../../../../lib/game-id-enums';
import withXinYongBettingGroup from '../with-xin-yong-betting-group';
import XinYongPlayIdConfig from '../../xin-yong-play-id-config';

const locator = new ServiceLocator();
const {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
} = XinYongPlayIdConfig[LotteryClassIdEnum.SSC];

locator.register(PlayConditionIdMap['整合'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['整合']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['整合']['第一球'],
			PlaySubconditionIdMap['整合']['第二球'],
			PlaySubconditionIdMap['整合']['第三球'],
			PlaySubconditionIdMap['整合']['第四球'],
			PlaySubconditionIdMap['整合']['第五球'],
		],
		[
			PlaySubconditionIdMap['整合']['前三'],
		],
		[
			PlaySubconditionIdMap['整合']['中三'],
		],
		[
			PlaySubconditionIdMap['整合']['后三'],
		],
	])
);

locator.register(PlayConditionIdMap['第一球'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['第一球']['第一球'],
		],
		[
			PlaySubconditionIdMap['第一球']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['第一球']['前三'],
		],
		[
			PlaySubconditionIdMap['第一球']['中三'],
		],
		[
			PlaySubconditionIdMap['第一球']['后三'],
		],
	])
);
locator.register(PlayConditionIdMap['第二球'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['第二球']['第二球'],
		],
		[
			PlaySubconditionIdMap['第二球']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['第二球']['前三'],
		],
		[
			PlaySubconditionIdMap['第二球']['中三'],
		],
		[
			PlaySubconditionIdMap['第二球']['后三'],
		],
	])
);

locator.register(PlayConditionIdMap['第三球'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['第三球']['第三球'],
		],
		[
			PlaySubconditionIdMap['第三球']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['第三球']['前三'],
		],
		[
			PlaySubconditionIdMap['第三球']['中三'],
		],
		[
			PlaySubconditionIdMap['第三球']['后三'],
		],
	])
);

locator.register(PlayConditionIdMap['第四球'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['第四球']['第四球'],
		],
		[
			PlaySubconditionIdMap['第四球']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['第四球']['前三'],
		],
		[
			PlaySubconditionIdMap['第四球']['中三'],
		],
		[
			PlaySubconditionIdMap['第四球']['后三'],
		],
	])
);

locator.register(PlayConditionIdMap['第五球'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['第五球']['第五球'],
		],
		[
			PlaySubconditionIdMap['第五球']['总和-龙虎和'],
		],
		[
			PlaySubconditionIdMap['第五球']['前三'],
		],
		[
			PlaySubconditionIdMap['第五球']['中三'],
		],
		[
			PlaySubconditionIdMap['第五球']['后三'],
		],
	])
);

locator.register(PlayConditionIdMap['单码'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['单码']['单码'],
		],
	])
);

locator.register(PlayConditionIdMap['连码'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['连码']['连码'],
		],
	])
);

locator.register(PlayConditionIdMap['斗牛'],
	withXinYongBettingGroup([
		[
			PlaySubconditionIdMap['斗牛']['斗牛'],
		],
	])
);

export default locator;

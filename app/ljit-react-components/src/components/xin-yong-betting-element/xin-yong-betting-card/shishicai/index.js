import ServiceLocator from 'ljit-lib/service-locator';
import { LotteryClassIdEnum, } from '../../../../lib/game-id-enums';
import XinYongBettingCard from '../../../xin-yong-betting-card';
import withXinYongBettingCard from '../with-xin-yong-betting-card';
import XinYongPlayIdConfig from '../../xin-yong-play-id-config';
const locator = new ServiceLocator();

const {
	OrientationEnums,
} = XinYongBettingCard;

const {
	PlaySubconditionIdMap,
	PlaysMap,
} = XinYongPlayIdConfig[LotteryClassIdEnum.SSC];
const withXinYongBettingCard_Vertical = withXinYongBettingCard.bind(null, {});
const withXinYongBettingCard_Horizontal4Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
});
const withXinYongBettingCard_Horizontal5Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
	columnCount: 5,
});

locator.register(PlaySubconditionIdMap['整合']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['整合']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['整合']['第一球'],
	withXinYongBettingCard_Vertical(PlaysMap['整合']['第一球'])
);
locator.register(PlaySubconditionIdMap['整合']['第二球'],
	withXinYongBettingCard_Vertical(PlaysMap['整合']['第二球'])
);
locator.register(PlaySubconditionIdMap['整合']['第三球'],
	withXinYongBettingCard_Vertical(PlaysMap['整合']['第三球'])
);
locator.register(PlaySubconditionIdMap['整合']['第四球'],
	withXinYongBettingCard_Vertical(PlaysMap['整合']['第四球'])
);
locator.register(PlaySubconditionIdMap['整合']['第五球'],
	withXinYongBettingCard_Vertical(PlaysMap['整合']['第五球'])
);
locator.register(PlaySubconditionIdMap['整合']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['整合']['前三'])
);
locator.register(PlaySubconditionIdMap['整合']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['整合']['中三'])
);
locator.register(PlaySubconditionIdMap['整合']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['整合']['后三'])
);
locator.register(PlaySubconditionIdMap['第一球']['第一球'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第一球']['第一球'])
);
locator.register(PlaySubconditionIdMap['第一球']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第一球']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['第一球']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第一球']['前三'])
);
locator.register(PlaySubconditionIdMap['第一球']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第一球']['中三'])
);
locator.register(PlaySubconditionIdMap['第一球']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第一球']['后三'])
);
locator.register(PlaySubconditionIdMap['第二球']['第二球'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第二球']['第二球'])
);
locator.register(PlaySubconditionIdMap['第二球']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第二球']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['第二球']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第二球']['前三'])
);
locator.register(PlaySubconditionIdMap['第二球']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第二球']['中三'])
);
locator.register(PlaySubconditionIdMap['第二球']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第二球']['后三'])
);
locator.register(PlaySubconditionIdMap['第三球']['第三球'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第三球']['第三球'])
);
locator.register(PlaySubconditionIdMap['第三球']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第三球']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['第三球']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第三球']['前三'])
);
locator.register(PlaySubconditionIdMap['第三球']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第三球']['中三'])
);
locator.register(PlaySubconditionIdMap['第三球']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第三球']['后三'])
);
locator.register(PlaySubconditionIdMap['第四球']['第四球'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第四球']['第四球'])
);
locator.register(PlaySubconditionIdMap['第四球']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第四球']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['第四球']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第四球']['前三'])
);
locator.register(PlaySubconditionIdMap['第四球']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第四球']['中三'])
);
locator.register(PlaySubconditionIdMap['第四球']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第四球']['后三'])
);
locator.register(PlaySubconditionIdMap['第五球']['第五球'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第五球']['第五球'])
);
locator.register(PlaySubconditionIdMap['第五球']['总和-龙虎和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第五球']['总和-龙虎和'])
);
locator.register(PlaySubconditionIdMap['第五球']['前三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第五球']['前三'])
);
locator.register(PlaySubconditionIdMap['第五球']['中三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第五球']['中三'])
);
locator.register(PlaySubconditionIdMap['第五球']['后三'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['第五球']['后三'])
);
locator.register(PlaySubconditionIdMap['单码']['单码'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['单码']['单码'])
);
locator.register(PlaySubconditionIdMap['连码']['连码'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['连码']['连码'])
);
locator.register(PlaySubconditionIdMap['斗牛']['斗牛'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['斗牛']['斗牛'])
);

export default locator;

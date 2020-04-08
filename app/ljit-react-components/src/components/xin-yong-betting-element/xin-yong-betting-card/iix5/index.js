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
} = XinYongPlayIdConfig[LotteryClassIdEnum.IIX5];
const withXinYongBettingCard_Vertical = withXinYongBettingCard.bind(null, {});
const withXinYongBettingCard_Horizontal5Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
	columnCount: 5,
});

locator.register(PlaySubconditionIdMap['两面']['总和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['两面']['总和'])
);
locator.register(PlaySubconditionIdMap['两面']['第一球'],
	withXinYongBettingCard_Vertical(PlaysMap['两面']['第一球'])
);
locator.register(PlaySubconditionIdMap['两面']['第二球'],
	withXinYongBettingCard_Vertical(PlaysMap['两面']['第二球'])
);
locator.register(PlaySubconditionIdMap['两面']['第三球'],
	withXinYongBettingCard_Vertical(PlaysMap['两面']['第三球'])
);
locator.register(PlaySubconditionIdMap['两面']['第四球'],
	withXinYongBettingCard_Vertical(PlaysMap['两面']['第四球'])
);
locator.register(PlaySubconditionIdMap['两面']['第五球'],
	withXinYongBettingCard_Vertical(PlaysMap['两面']['第五球'])
);
locator.register(PlaySubconditionIdMap['单号']['一中一'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['单号']['一中一'])
);
locator.register(PlaySubconditionIdMap['单号']['第一球'],
	withXinYongBettingCard_Vertical(PlaysMap['单号']['第一球'])
);
locator.register(PlaySubconditionIdMap['单号']['第二球'],
	withXinYongBettingCard_Vertical(PlaysMap['单号']['第二球'])
);
locator.register(PlaySubconditionIdMap['单号']['第三球'],
	withXinYongBettingCard_Vertical(PlaysMap['单号']['第三球'])
);
locator.register(PlaySubconditionIdMap['单号']['第四球'],
	withXinYongBettingCard_Vertical(PlaysMap['单号']['第四球'])
);
locator.register(PlaySubconditionIdMap['单号']['第五球'],
	withXinYongBettingCard_Vertical(PlaysMap['单号']['第五球'])
);

// TODO add 连码, 直选

export default locator;

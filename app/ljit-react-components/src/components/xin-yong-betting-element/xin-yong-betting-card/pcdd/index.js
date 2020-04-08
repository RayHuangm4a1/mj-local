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
} = XinYongPlayIdConfig[LotteryClassIdEnum.PCDD];
const withXinYongBettingCard_Horizontal4Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
});

locator.register(PlaySubconditionIdMap['整合']['特码'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['整合']['特码'])
);
locator.register(PlaySubconditionIdMap['整合']['混合'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['整合']['混合'])
);
locator.register(PlaySubconditionIdMap['整合']['波色'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['整合']['波色'])
);

export default locator;

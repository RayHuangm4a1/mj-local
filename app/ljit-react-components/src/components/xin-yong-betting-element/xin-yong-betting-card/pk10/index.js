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
} = XinYongPlayIdConfig[LotteryClassIdEnum.PK10];

const withXinYongBettingCard_Vertical = withXinYongBettingCard.bind(null, {});
const withXinYongBettingCard_Horizontal4Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
});
const withXinYongBettingCard_Horizontal5Columns = withXinYongBettingCard.bind(null, {
	orientation: OrientationEnums.HORIZONTAL,
	columnCount: 5,
});

locator.register(PlaySubconditionIdMap['兩面']['冠、亚军和'],
	withXinYongBettingCard_Horizontal5Columns(PlaysMap['兩面']['冠、亚军和'])
);

locator.register(PlaySubconditionIdMap['兩面']['冠军'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['冠军'])
);

locator.register(PlaySubconditionIdMap['兩面']['亚军'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['亚军'])
);

locator.register(PlaySubconditionIdMap['兩面']['第三名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第三名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第四名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第四名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第五名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第五名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第六名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第六名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第七名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第七名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第八名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第八名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第九名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第九名'])
);

locator.register(PlaySubconditionIdMap['兩面']['第十名'],
	withXinYongBettingCard_Vertical(PlaysMap['兩面']['第十名'])
);


locator.register(PlaySubconditionIdMap['单号1-10']['冠军'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['冠军'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['亚军'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['亚军'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第三名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第三名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第四名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第四名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第五名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第五名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第六名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第六名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第七名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第七名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第八名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第八名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第九名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第九名'])
);

locator.register(PlaySubconditionIdMap['单号1-10']['第十名'],
	withXinYongBettingCard_Vertical(PlaysMap['单号1-10']['第十名'])
);

locator.register(PlaySubconditionIdMap['冠亚军组合']['冠亚军组合'],
	withXinYongBettingCard_Horizontal4Columns(PlaysMap['冠亚军组合']['冠亚军组合'])
);

export default locator;

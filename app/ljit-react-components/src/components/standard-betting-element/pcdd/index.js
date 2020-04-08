import ServiceLocator from 'ljit-lib/service-locator';

import PlaysMap from './plays-map';

import withCodeBallBettingElement from '../with-code-ball-betting-element';
import withRoundBallBettingElement from '../with-round-ball-betting-element';

const locator = new ServiceLocator();

locator.register(
	PlaysMap['不回本玩法']['定位'].id,
	withCodeBallBettingElement(
		PlaysMap['不回本玩法']['定位'].labels,
		PlaysMap['不回本玩法']['定位'].codes,
		PlaysMap['不回本玩法']['定位'].configs
	)
);

locator.register(
	PlaysMap['不回本玩法']['极值'].id,
	withRoundBallBettingElement(
		PlaysMap['不回本玩法']['极值'].labels,
		PlaysMap['不回本玩法']['极值'].codes,
		PlaysMap['不回本玩法']['极值'].configs
	)
);

locator.register(
	PlaysMap['不回本玩法']['大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['不回本玩法']['大小单双'].labels,
		PlaysMap['不回本玩法']['大小单双'].codes,
		PlaysMap['不回本玩法']['大小单双'].configs
	)
);

locator.register(
	PlaysMap['不回本玩法']['组合'].id,
	withRoundBallBettingElement(
		PlaysMap['不回本玩法']['组合'].labels,
		PlaysMap['不回本玩法']['组合'].codes,
		PlaysMap['不回本玩法']['组合'].configs
	)
);

locator.register(
	PlaysMap['回本玩法']['大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['回本玩法']['大小单双'].labels,
		PlaysMap['回本玩法']['大小单双'].codes,
		PlaysMap['回本玩法']['大小单双'].configs
	)
);

locator.register(
	PlaysMap['回本玩法']['组合'].id,
	withRoundBallBettingElement(
		PlaysMap['回本玩法']['组合'].labels,
		PlaysMap['回本玩法']['组合'].codes,
		PlaysMap['回本玩法']['组合'].configs
	)
);

export default locator;

import ServiceLocator from 'ljit-lib/service-locator';

import PlaysMap from './plays-map';

import withCodeBallBettingElement from '../with-code-ball-betting-element';
import withLongHuHeBettingElement from '../with-long-hu-he-betting-element';
import withTextInputBettingElement from '../with-text-input-betting-element';

const locator = new ServiceLocator();

locator.register(
	PlaysMap['定位胆']['定位胆'].id,
	withCodeBallBettingElement(
		PlaysMap['定位胆']['定位胆'].labels,
		PlaysMap['定位胆']['定位胆'].codes,
		PlaysMap['定位胆']['定位胆'].configs
	)
);

locator.register(
	PlaysMap['前一']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前一']['直选复式'].labels,
		PlaysMap['前一']['直选复式'].codes,
		PlaysMap['前一']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['前二']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['直选复式'].labels,
		PlaysMap['前二']['直选复式'].codes,
		PlaysMap['前二']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['前二']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前二']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['前三']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['直选复式'].labels,
		PlaysMap['前三']['直选复式'].codes,
		PlaysMap['前三']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['前三']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前三']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['前四']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前四']['直选复式'].labels,
		PlaysMap['前四']['直选复式'].codes,
		PlaysMap['前四']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['前四']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前四']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['前五']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前五']['直选复式'].labels,
		PlaysMap['前五']['直选复式'].codes,
		PlaysMap['前五']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['前五']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前五']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['和值']['冠亚和值'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['冠亚和值'].labels,
		PlaysMap['和值']['冠亚和值'].codes,
		PlaysMap['和值']['冠亚和值'].configs
	)
);

locator.register(
	PlaysMap['和值']['首尾和值'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['首尾和值'].labels,
		PlaysMap['和值']['首尾和值'].codes,
		PlaysMap['和值']['首尾和值'].configs
	)
);

locator.register(
	PlaysMap['和值']['前三和值'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['前三和值'].labels,
		PlaysMap['和值']['前三和值'].codes,
		PlaysMap['和值']['前三和值'].configs
	)
);

locator.register(
	PlaysMap['和值']['后三和值'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['后三和值'].labels,
		PlaysMap['和值']['后三和值'].codes,
		PlaysMap['和值']['后三和值'].configs
	)
);

locator.register(
	PlaysMap['和值']['首尾和值大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['首尾和值大小单双'].labels,
		PlaysMap['和值']['首尾和值大小单双'].codes,
		PlaysMap['和值']['首尾和值大小单双'].configs
	)
);

locator.register(
	PlaysMap['和值']['冠亚和值大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['冠亚和值大小单双'].labels,
		PlaysMap['和值']['冠亚和值大小单双'].codes,
		PlaysMap['和值']['冠亚和值大小单双'].configs
	)
);


locator.register(
	PlaysMap['和值']['前三和值大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['前三和值大小单双'].labels,
		PlaysMap['和值']['前三和值大小单双'].codes,
		PlaysMap['和值']['前三和值大小单双'].configs
	)
);

locator.register(
	PlaysMap['和值']['后三和值大小单双'].id,
	withCodeBallBettingElement(
		PlaysMap['和值']['后三和值大小单双'].labels,
		PlaysMap['和值']['后三和值大小单双'].codes,
		PlaysMap['和值']['后三和值大小单双'].configs
	)
);

locator.register(
	PlaysMap['特殊']['任选龙虎'].id,
	withLongHuHeBettingElement(
		PlaysMap['特殊']['任选龙虎'].labels,
		PlaysMap['特殊']['任选龙虎'].configs
	)
);

export default locator;

import ServiceLocator from 'ljit-lib/service-locator';

import PlaysMap from './plays-map';

import withCodeBallBettingElement from '../with-code-ball-betting-element';
import withLongHuHeBettingElement from '../with-long-hu-he-betting-element';
import withTextInputBettingElement from '../with-text-input-betting-element';
import withRoundBallBettingElement from '../with-round-ball-betting-element';

const locator = new ServiceLocator();

locator.register(
	PlaysMap['五星']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['直选复式'].labels,
		PlaysMap['五星']['直选复式'].codes,
		PlaysMap['五星']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['五星']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['五星']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['五星']['直选组合'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['直选组合'].labels,
		PlaysMap['五星']['直选组合'].codes,
		PlaysMap['五星']['直选组合'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选120'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选120'].labels,
		PlaysMap['五星']['组选120'].codes,
		PlaysMap['五星']['组选120'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选60'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选60'].labels,
		PlaysMap['五星']['组选60'].codes,
		PlaysMap['五星']['组选60'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选30'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选30'].labels,
		PlaysMap['五星']['组选30'].codes,
		PlaysMap['五星']['组选30'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选20'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选20'].labels,
		PlaysMap['五星']['组选20'].codes,
		PlaysMap['五星']['组选20'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选10'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选10'].labels,
		PlaysMap['五星']['组选10'].codes,
		PlaysMap['五星']['组选10'].configs
	)
);

locator.register(
	PlaysMap['五星']['组选5'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['组选5'].labels,
		PlaysMap['五星']['组选5'].codes,
		PlaysMap['五星']['组选5'].configs
	)
);

locator.register(
	PlaysMap['五星']['一帆风顺'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['一帆风顺'].labels,
		PlaysMap['五星']['一帆风顺'].codes,
		PlaysMap['五星']['一帆风顺'].configs
	)
);

locator.register(
	PlaysMap['五星']['好事成双'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['好事成双'].labels,
		PlaysMap['五星']['好事成双'].codes,
		PlaysMap['五星']['好事成双'].configs
	)
);

locator.register(
	PlaysMap['五星']['三星报喜'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['三星报喜'].labels,
		PlaysMap['五星']['三星报喜'].codes,
		PlaysMap['五星']['三星报喜'].configs
	)
);

locator.register(
	PlaysMap['五星']['四季发财'].id,
	withCodeBallBettingElement(
		PlaysMap['五星']['四季发财'].labels,
		PlaysMap['五星']['四季发财'].codes,
		PlaysMap['五星']['四季发财'].configs
	)
);

locator.register(
	PlaysMap['五星']['龙虎和'].id,
	withLongHuHeBettingElement(
		PlaysMap['五星']['龙虎和'].labels,
		PlaysMap['五星']['龙虎和'].configs
	)
);

locator.register(
	PlaysMap['五星']['总和'].id,
	withRoundBallBettingElement(
		PlaysMap['五星']['总和'].labels,
		PlaysMap['五星']['总和'].codes,
		PlaysMap['五星']['总和'].configs
	)
);

locator.register(
	PlaysMap['五星']['斗牛'].id,
	withRoundBallBettingElement(
		PlaysMap['五星']['斗牛'].labels,
		PlaysMap['五星']['斗牛'].codes,
		PlaysMap['五星']['斗牛'].configs
	)
);

locator.register(
	PlaysMap['五星']['梭哈'].id,
	withRoundBallBettingElement(
		PlaysMap['五星']['梭哈'].labels,
		PlaysMap['五星']['梭哈'].codes,
		PlaysMap['五星']['梭哈'].configs
	)
);

locator.register(
	PlaysMap['四星']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['直选复式'].labels,
		PlaysMap['四星']['直选复式'].codes,
		PlaysMap['四星']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['四星']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['四星']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['四星']['直选组合'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['直选组合'].labels,
		PlaysMap['四星']['直选组合'].codes,
		PlaysMap['四星']['直选组合'].configs
	)
);

locator.register(
	PlaysMap['四星']['组选24'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['组选24'].labels,
		PlaysMap['四星']['组选24'].codes,
		PlaysMap['四星']['组选24'].configs
	)
);

locator.register(
	PlaysMap['四星']['组选12'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['组选12'].labels,
		PlaysMap['四星']['组选12'].codes,
		PlaysMap['四星']['组选12'].configs
	)
);

locator.register(
	PlaysMap['四星']['组选6'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['组选6'].labels,
		PlaysMap['四星']['组选6'].codes,
		PlaysMap['四星']['组选6'].configs
	)
);

locator.register(
	PlaysMap['四星']['组选4'].id,
	withCodeBallBettingElement(
		PlaysMap['四星']['组选4'].labels,
		PlaysMap['四星']['组选4'].codes,
		PlaysMap['四星']['组选4'].configs
	)
);

locator.register(
	PlaysMap['后三']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['直选复式'].labels,
		PlaysMap['后三']['直选复式'].codes,
		PlaysMap['后三']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['后三']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['后三']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['后三']['直选组合'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['直选组合'].labels,
		PlaysMap['后三']['直选组合'].codes,
		PlaysMap['后三']['直选组合'].configs
	)
);

locator.register(
	PlaysMap['后三']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['直选和值'].labels,
		PlaysMap['后三']['直选和值'].codes,
		PlaysMap['后三']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['后三']['直选跨度'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['直选跨度'].labels,
		PlaysMap['后三']['直选跨度'].codes,
		PlaysMap['后三']['直选跨度'].configs
	)
);

locator.register(
	PlaysMap['后三']['组三复式'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['组三复式'].labels,
		PlaysMap['后三']['组三复式'].codes,
		PlaysMap['后三']['组三复式'].configs
	)
);

locator.register(
	PlaysMap['后三']['组三单式'].id,
	withTextInputBettingElement(
		PlaysMap['后三']['组三单式'].configs
	)
);

locator.register(
	PlaysMap['后三']['组六复式'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['组六复式'].labels,
		PlaysMap['后三']['组六复式'].codes,
		PlaysMap['后三']['组六复式'].configs
	)
);

locator.register(
	PlaysMap['后三']['组六单式'].id,
	withTextInputBettingElement(
		PlaysMap['后三']['组六单式'].configs
	)
);

locator.register(
	PlaysMap['后三']['混合组选'].id,
	withTextInputBettingElement(
		PlaysMap['后三']['混合组选'].configs
	)
);

locator.register(
	PlaysMap['后三']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['组选和值'].labels,
		PlaysMap['后三']['组选和值'].codes,
		PlaysMap['后三']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['后三']['组选包胆'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['组选包胆'].labels,
		PlaysMap['后三']['组选包胆'].codes,
		PlaysMap['后三']['组选包胆'].configs
	)
);

locator.register(
	PlaysMap['后三']['和值尾数'].id,
	withCodeBallBettingElement(
		PlaysMap['后三']['和值尾数'].labels,
		PlaysMap['后三']['和值尾数'].codes,
		PlaysMap['后三']['和值尾数'].configs
	)
);

locator.register(
	PlaysMap['后三']['特殊号'].id,
	withRoundBallBettingElement(
		PlaysMap['后三']['特殊号'].labels,
		PlaysMap['后三']['特殊号'].codes,
		PlaysMap['后三']['特殊号'].configs
	)
);

locator.register(
	PlaysMap['中三']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['直选复式'].labels,
		PlaysMap['中三']['直选复式'].codes,
		PlaysMap['中三']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['中三']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['中三']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['中三']['直选组合'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['直选组合'].labels,
		PlaysMap['中三']['直选组合'].codes,
		PlaysMap['中三']['直选组合'].configs
	)
);

locator.register(
	PlaysMap['中三']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['直选和值'].labels,
		PlaysMap['中三']['直选和值'].codes,
		PlaysMap['中三']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['中三']['直选跨度'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['直选跨度'].labels,
		PlaysMap['中三']['直选跨度'].codes,
		PlaysMap['中三']['直选跨度'].configs
	)
);

locator.register(
	PlaysMap['中三']['组三复式'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['组三复式'].labels,
		PlaysMap['中三']['组三复式'].codes,
		PlaysMap['中三']['组三复式'].configs
	)
);

locator.register(
	PlaysMap['中三']['组三单式'].id,
	withTextInputBettingElement(
		PlaysMap['中三']['组三单式'].configs
	)
);

locator.register(
	PlaysMap['中三']['组六复式'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['组六复式'].labels,
		PlaysMap['中三']['组六复式'].codes,
		PlaysMap['中三']['组六复式'].configs
	)
);

locator.register(
	PlaysMap['中三']['组六单式'].id,
	withTextInputBettingElement(
		PlaysMap['中三']['组六单式'].configs
	)
);

locator.register(
	PlaysMap['中三']['混合组选'].id,
	withTextInputBettingElement(
		PlaysMap['中三']['混合组选'].configs
	)
);

locator.register(
	PlaysMap['中三']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['组选和值'].labels,
		PlaysMap['中三']['组选和值'].codes,
		PlaysMap['中三']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['中三']['组选包胆'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['组选包胆'].labels,
		PlaysMap['中三']['组选包胆'].codes,
		PlaysMap['中三']['组选包胆'].configs
	)
);

locator.register(
	PlaysMap['中三']['和值尾数'].id,
	withCodeBallBettingElement(
		PlaysMap['中三']['和值尾数'].labels,
		PlaysMap['中三']['和值尾数'].codes,
		PlaysMap['中三']['和值尾数'].configs
	)
);

locator.register(
	PlaysMap['中三']['特殊号'].id,
	withRoundBallBettingElement(
		PlaysMap['中三']['特殊号'].labels,
		PlaysMap['中三']['特殊号'].codes,
		PlaysMap['中三']['特殊号'].configs
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
	PlaysMap['前三']['直选组合'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['直选组合'].labels,
		PlaysMap['前三']['直选组合'].codes,
		PlaysMap['前三']['直选组合'].configs
	)
);

locator.register(
	PlaysMap['前三']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['直选和值'].labels,
		PlaysMap['前三']['直选和值'].codes,
		PlaysMap['前三']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['前三']['直选跨度'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['直选跨度'].labels,
		PlaysMap['前三']['直选跨度'].codes,
		PlaysMap['前三']['直选跨度'].configs
	)
);

locator.register(
	PlaysMap['前三']['组三复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组三复式'].labels,
		PlaysMap['前三']['组三复式'].codes,
		PlaysMap['前三']['组三复式'].configs
	)
);

locator.register(
	PlaysMap['前三']['组三单式'].id,
	withTextInputBettingElement(
		PlaysMap['前三']['组三单式'].configs
	)
);

locator.register(
	PlaysMap['前三']['组六复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组六复式'].labels,
		PlaysMap['前三']['组六复式'].codes,
		PlaysMap['前三']['组六复式'].configs
	)
);

locator.register(
	PlaysMap['前三']['组六单式'].id,
	withTextInputBettingElement(
		PlaysMap['前三']['组六单式'].configs
	)
);

locator.register(
	PlaysMap['前三']['混合组选'].id,
	withTextInputBettingElement(
		PlaysMap['前三']['混合组选'].configs
	)
);

locator.register(
	PlaysMap['前三']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组选和值'].labels,
		PlaysMap['前三']['组选和值'].codes,
		PlaysMap['前三']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['前三']['组选包胆'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组选包胆'].labels,
		PlaysMap['前三']['组选包胆'].codes,
		PlaysMap['前三']['组选包胆'].configs
	)
);

locator.register(
	PlaysMap['前三']['和值尾数'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['和值尾数'].labels,
		PlaysMap['前三']['和值尾数'].codes,
		PlaysMap['前三']['和值尾数'].configs
	)
);

locator.register(
	PlaysMap['前三']['特殊号'].id,
	withRoundBallBettingElement(
		PlaysMap['前三']['特殊号'].labels,
		PlaysMap['前三']['特殊号'].codes,
		PlaysMap['前三']['特殊号'].configs
	)
);

locator.register(
	PlaysMap['后二']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['直选复式'].labels,
		PlaysMap['后二']['直选复式'].codes,
		PlaysMap['后二']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['后二']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['后二']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['后二']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['直选和值'].labels,
		PlaysMap['后二']['直选和值'].codes,
		PlaysMap['后二']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['后二']['直选跨度'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['直选跨度'].labels,
		PlaysMap['后二']['直选跨度'].codes,
		PlaysMap['后二']['直选跨度'].configs
	)
);

locator.register(
	PlaysMap['后二']['组选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['组选复式'].labels,
		PlaysMap['后二']['组选复式'].codes,
		PlaysMap['后二']['组选复式'].configs
	)
);

locator.register(
	PlaysMap['后二']['组选单式'].id,
	withTextInputBettingElement(
		PlaysMap['后二']['组选单式'].configs
	)
);

locator.register(
	PlaysMap['后二']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['组选和值'].labels,
		PlaysMap['后二']['组选和值'].codes,
		PlaysMap['后二']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['后二']['组选包胆'].id,
	withCodeBallBettingElement(
		PlaysMap['后二']['组选包胆'].labels,
		PlaysMap['后二']['组选包胆'].codes,
		PlaysMap['后二']['组选包胆'].configs
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
	PlaysMap['前二']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['直选和值'].labels,
		PlaysMap['前二']['直选和值'].codes,
		PlaysMap['前二']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['前二']['直选跨度'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['直选跨度'].labels,
		PlaysMap['前二']['直选跨度'].codes,
		PlaysMap['前二']['直选跨度'].configs
	)
);

locator.register(
	PlaysMap['前二']['组选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['组选复式'].labels,
		PlaysMap['前二']['组选复式'].codes,
		PlaysMap['前二']['组选复式'].configs
	)
);

locator.register(
	PlaysMap['前二']['组选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前二']['组选单式'].configs
	)
);

locator.register(
	PlaysMap['前二']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['组选和值'].labels,
		PlaysMap['前二']['组选和值'].codes,
		PlaysMap['前二']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['前二']['组选包胆'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['组选包胆'].labels,
		PlaysMap['前二']['组选包胆'].codes,
		PlaysMap['前二']['组选包胆'].configs
	)
);

locator.register(
	PlaysMap['定位胆']['定位胆'].id,
	withCodeBallBettingElement(
		PlaysMap['定位胆']['定位胆'].labels,
		PlaysMap['定位胆']['定位胆'].codes,
		PlaysMap['定位胆']['定位胆'].configs
	)
);

locator.register(
	PlaysMap['不定位']['后三一码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['后三一码'].labels,
		PlaysMap['不定位']['后三一码'].codes,
		PlaysMap['不定位']['后三一码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['前三一码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['前三一码'].labels,
		PlaysMap['不定位']['前三一码'].codes,
		PlaysMap['不定位']['前三一码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['后三二码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['后三二码'].labels,
		PlaysMap['不定位']['后三二码'].codes,
		PlaysMap['不定位']['后三二码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['前三二码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['前三二码'].labels,
		PlaysMap['不定位']['前三二码'].codes,
		PlaysMap['不定位']['前三二码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['四星一码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['四星一码'].labels,
		PlaysMap['不定位']['四星一码'].codes,
		PlaysMap['不定位']['四星一码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['四星二码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['四星二码'].labels,
		PlaysMap['不定位']['四星二码'].codes,
		PlaysMap['不定位']['四星二码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['五星二码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['五星二码'].labels,
		PlaysMap['不定位']['五星二码'].codes,
		PlaysMap['不定位']['五星二码'].configs
	)
);

locator.register(
	PlaysMap['不定位']['五星三码'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['五星三码'].labels,
		PlaysMap['不定位']['五星三码'].codes,
		PlaysMap['不定位']['五星三码'].configs
	)
);

locator.register(
	PlaysMap['大小单双']['前二'].id,
	withCodeBallBettingElement(
		PlaysMap['大小单双']['前二'].labels,
		PlaysMap['大小单双']['前二'].codes,
		PlaysMap['大小单双']['前二'].configs
	)
);

locator.register(
	PlaysMap['大小单双']['后二'].id,
	withCodeBallBettingElement(
		PlaysMap['大小单双']['后二'].labels,
		PlaysMap['大小单双']['后二'].codes,
		PlaysMap['大小单双']['后二'].configs
	)
);

locator.register(
	PlaysMap['大小单双']['前三'].id,
	withCodeBallBettingElement(
		PlaysMap['大小单双']['前三'].labels,
		PlaysMap['大小单双']['前三'].codes,
		PlaysMap['大小单双']['前三'].configs
	)
);

locator.register(
	PlaysMap['大小单双']['后三'].id,
	withCodeBallBettingElement(
		PlaysMap['大小单双']['后三'].labels,
		PlaysMap['大小单双']['后三'].codes,
		PlaysMap['大小单双']['后三'].configs
	)
);

locator.register(
	PlaysMap['任二']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任二']['直选复式'].labels,
		PlaysMap['任二']['直选复式'].codes,
		PlaysMap['任二']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['任二']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['任二']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['任二']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['任二']['直选和值'].labels,
		PlaysMap['任二']['直选和值'].codes,
		PlaysMap['任二']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['任二']['组选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任二']['组选复式'].labels,
		PlaysMap['任二']['组选复式'].codes,
		PlaysMap['任二']['组选复式'].configs
	)
);

locator.register(
	PlaysMap['任二']['组选单式'].id,
	withTextInputBettingElement(
		PlaysMap['任二']['组选单式'].configs
	)
);

locator.register(
	PlaysMap['任二']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['任二']['组选和值'].labels,
		PlaysMap['任二']['组选和值'].codes,
		PlaysMap['任二']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['任二']['龙虎和'].id,
	withLongHuHeBettingElement(
		PlaysMap['任二']['龙虎和'].labels,
		PlaysMap['任二']['龙虎和'].configs
	)
);

locator.register(
	PlaysMap['任三']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任三']['直选复式'].labels,
		PlaysMap['任三']['直选复式'].codes,
		PlaysMap['任三']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['任三']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['任三']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['任三']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['任三']['直选和值'].labels,
		PlaysMap['任三']['直选和值'].codes,
		PlaysMap['任三']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['任三']['组三复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任三']['组三复式'].labels,
		PlaysMap['任三']['组三复式'].codes,
		PlaysMap['任三']['组三复式'].configs
	)
);

locator.register(
	PlaysMap['任三']['组三单式'].id,
	withTextInputBettingElement(
		PlaysMap['任三']['组三单式'].configs
	)
);

locator.register(
	PlaysMap['任三']['组六复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任三']['组六复式'].labels,
		PlaysMap['任三']['组六复式'].codes,
		PlaysMap['任三']['组六复式'].configs
	)
);

locator.register(
	PlaysMap['任三']['组六单式'].id,
	withTextInputBettingElement(
		PlaysMap['任三']['组六单式'].configs
	)
);

locator.register(
	PlaysMap['任三']['混合组选'].id,
	withTextInputBettingElement(
		PlaysMap['任三']['混合组选'].configs
	)
);

locator.register(
	PlaysMap['任三']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['任三']['组选和值'].labels,
		PlaysMap['任三']['组选和值'].codes,
		PlaysMap['任三']['组选和值'].configs
	)
);

locator.register(
	PlaysMap['任四']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['任四']['直选复式'].labels,
		PlaysMap['任四']['直选复式'].codes,
		PlaysMap['任四']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['任四']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['任四']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['任四']['组选24'].id,
	withCodeBallBettingElement(
		PlaysMap['任四']['组选24'].labels,
		PlaysMap['任四']['组选24'].codes,
		PlaysMap['任四']['组选24'].configs
	)
);

locator.register(
	PlaysMap['任四']['组选12'].id,
	withCodeBallBettingElement(
		PlaysMap['任四']['组选12'].labels,
		PlaysMap['任四']['组选12'].codes,
		PlaysMap['任四']['组选12'].configs
	)
);

locator.register(
	PlaysMap['任四']['组选6'].id,
	withCodeBallBettingElement(
		PlaysMap['任四']['组选6'].labels,
		PlaysMap['任四']['组选6'].codes,
		PlaysMap['任四']['组选6'].configs
	)
);

locator.register(
	PlaysMap['任四']['组选4'].id,
	withCodeBallBettingElement(
		PlaysMap['任四']['组选4'].labels,
		PlaysMap['任四']['组选4'].codes,
		PlaysMap['任四']['组选4'].configs
	)
);

export default locator;

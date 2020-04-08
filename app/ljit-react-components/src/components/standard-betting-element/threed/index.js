import ServiceLocator from 'ljit-lib/service-locator';
import withCodeBallBettingElement from '../with-code-ball-betting-element';
import withTextInputBettingElement from '../with-text-input-betting-element';
import PlaysMap from './plays-map';

const locator = new ServiceLocator();

locator.register(
	PlaysMap['三星']['直选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['三星']['直选复式'].labels,
		PlaysMap['三星']['直选复式'].codes,
		PlaysMap['三星']['直选复式'].configs
	)
);

locator.register(
	PlaysMap['三星']['直选单式'].id,
	withTextInputBettingElement(
		PlaysMap['三星']['直选单式'].configs
	)
);

locator.register(
	PlaysMap['三星']['直选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['三星']['直选和值'].labels,
		PlaysMap['三星']['直选和值'].codes,
		PlaysMap['三星']['直选和值'].configs
	)
);

locator.register(
	PlaysMap['三星']['组三复式'].id,
	withCodeBallBettingElement(
		PlaysMap['三星']['组三复式'].labels,
		PlaysMap['三星']['组三复式'].codes,
		PlaysMap['三星']['组三复式'].configs
	)
);

locator.register(
	PlaysMap['三星']['组三单式'].id,
	withTextInputBettingElement(
		PlaysMap['三星']['组三单式'].configs
	)
);

locator.register(
	PlaysMap['三星']['组六复式'].id,
	withCodeBallBettingElement(
		PlaysMap['三星']['组六复式'].labels,
		PlaysMap['三星']['组六复式'].codes,
		PlaysMap['三星']['组六复式'].configs
	)
);

locator.register(
	PlaysMap['三星']['组六单式'].id,
	withTextInputBettingElement(
		PlaysMap['三星']['组六单式'].configs
	)
);

locator.register(
	PlaysMap['三星']['混合组选'].id,
	withTextInputBettingElement(
		PlaysMap['三星']['混合组选'].configs
	)
);

locator.register(
	PlaysMap['三星']['组选和值'].id,
	withCodeBallBettingElement(
		PlaysMap['三星']['组选和值'].labels,
		PlaysMap['三星']['组选和值'].codes,
		PlaysMap['三星']['组选和值'].configs
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
	PlaysMap['定位胆']['定位胆'].id,
	withCodeBallBettingElement(
		PlaysMap['定位胆']['定位胆'].labels,
		PlaysMap['定位胆']['定位胆'].codes,
		PlaysMap['定位胆']['定位胆'].configs
	)
);

locator.register(
	PlaysMap['不定位']['一码不定位'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['一码不定位'].labels,
		PlaysMap['不定位']['一码不定位'].codes,
		PlaysMap['不定位']['一码不定位'].configs
	)
);

locator.register(
	PlaysMap['不定位']['二码不定位'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['二码不定位'].labels,
		PlaysMap['不定位']['二码不定位'].codes,
		PlaysMap['不定位']['二码不定位'].configs
	)
);

export default locator;
import ServiceLocator from 'ljit-lib/service-locator';
import withCodeBallBettingElement from '../with-code-ball-betting-element';
import withTextInputBettingElement from '../with-text-input-betting-element';
import withRoundBallBettingElement from '../with-round-ball-betting-element';
import PlaysMap from './plays-map';

const locator = new ServiceLocator();

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
	PlaysMap['前三']['组选复式'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组选复式'].labels,
		PlaysMap['前三']['组选复式'].codes,
		PlaysMap['前三']['组选复式'].configs
	)
);

locator.register(
	PlaysMap['前三']['组选单式'].id,
	withTextInputBettingElement(
		PlaysMap['前三']['组选单式'].configs
	)
);

locator.register(
	PlaysMap['前三']['组选胆拖'].id,
	withCodeBallBettingElement(
		PlaysMap['前三']['组选胆拖'].labels,
		PlaysMap['前三']['组选胆拖'].codes,
		PlaysMap['前三']['组选胆拖'].configs
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
	PlaysMap['前二']['组选胆拖'].id,
	withCodeBallBettingElement(
		PlaysMap['前二']['组选胆拖'].labels,
		PlaysMap['前二']['组选胆拖'].codes,
		PlaysMap['前二']['组选胆拖'].configs
	)
);

locator.register(
	PlaysMap['不定位']['前三不定位'].id,
	withCodeBallBettingElement(
		PlaysMap['不定位']['前三不定位'].labels,
		PlaysMap['不定位']['前三不定位'].codes,
		PlaysMap['不定位']['前三不定位'].configs
	)
);

locator.register(
	PlaysMap['定位胆']['前三定位胆'].id,
	withCodeBallBettingElement(
		PlaysMap['定位胆']['前三定位胆'].labels,
		PlaysMap['定位胆']['前三定位胆'].codes,
		PlaysMap['定位胆']['前三定位胆'].configs
	)
);

locator.register(
	PlaysMap['趣味型']['定单双'].id,
	withRoundBallBettingElement(
		PlaysMap['趣味型']['定单双'].labels,
		PlaysMap['趣味型']['定单双'].codes,
		PlaysMap['趣味型']['定单双'].configs,
	)
);

locator.register(
	PlaysMap['趣味型']['猜中位'].id,
	withCodeBallBettingElement(
		PlaysMap['趣味型']['猜中位'].labels,
		PlaysMap['趣味型']['猜中位'].codes,
		PlaysMap['趣味型']['猜中位'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['一中一'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['一中一'].labels,
		PlaysMap['任选复式']['一中一'].codes,
		PlaysMap['任选复式']['一中一'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['二中二'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['二中二'].labels,
		PlaysMap['任选复式']['二中二'].codes,
		PlaysMap['任选复式']['二中二'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['三中三'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['三中三'].labels,
		PlaysMap['任选复式']['三中三'].codes,
		PlaysMap['任选复式']['三中三'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['四中四'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['四中四'].labels,
		PlaysMap['任选复式']['四中四'].codes,
		PlaysMap['任选复式']['四中四'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['五中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['五中五'].labels,
		PlaysMap['任选复式']['五中五'].codes,
		PlaysMap['任选复式']['五中五'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['六中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['六中五'].labels,
		PlaysMap['任选复式']['六中五'].codes,
		PlaysMap['任选复式']['六中五'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['七中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['七中五'].labels,
		PlaysMap['任选复式']['七中五'].codes,
		PlaysMap['任选复式']['七中五'].configs,
	)
);

locator.register(
	PlaysMap['任选复式']['八中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选复式']['八中五'].labels,
		PlaysMap['任选复式']['八中五'].codes,
		PlaysMap['任选复式']['八中五'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['一中一'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['一中一'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['二中二'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['二中二'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['三中三'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['三中三'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['四中四'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['四中四'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['五中五'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['五中五'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['六中五'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['六中五'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['七中五'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['七中五'].configs,
	)
);

locator.register(
	PlaysMap['任选单式']['八中五'].id,
	withTextInputBettingElement(
		PlaysMap['任选单式']['八中五'].configs,
	)
);


locator.register(
	PlaysMap['任选胆拖']['二中二'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['二中二'].labels,
		PlaysMap['任选胆拖']['二中二'].codes,
		PlaysMap['任选胆拖']['二中二'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['三中三'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['三中三'].labels,
		PlaysMap['任选胆拖']['三中三'].codes,
		PlaysMap['任选胆拖']['三中三'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['四中四'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['四中四'].labels,
		PlaysMap['任选胆拖']['四中四'].codes,
		PlaysMap['任选胆拖']['四中四'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['五中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['五中五'].labels,
		PlaysMap['任选胆拖']['五中五'].codes,
		PlaysMap['任选胆拖']['五中五'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['六中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['六中五'].labels,
		PlaysMap['任选胆拖']['六中五'].codes,
		PlaysMap['任选胆拖']['六中五'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['七中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['七中五'].labels,
		PlaysMap['任选胆拖']['七中五'].codes,
		PlaysMap['任选胆拖']['七中五'].configs,
	)
);

locator.register(
	PlaysMap['任选胆拖']['八中五'].id,
	withCodeBallBettingElement(
		PlaysMap['任选胆拖']['八中五'].labels,
		PlaysMap['任选胆拖']['八中五'].codes,
		PlaysMap['任选胆拖']['八中五'].configs,
	)
);

export default locator;

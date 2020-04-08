import React from 'react';
import PropTypes from 'prop-types';
import BettingSearch from '../../../../../../features/betting-search';
import { GameTypeEnums, } from '../../../../../../lib/enums';

const propTypes = {
	gameType: PropTypes.string,
	issue: PropTypes.number,
	lotteryId: PropTypes.number,
};

const defaultProps = {
	gameType: GameTypeEnums.LOTTERY,
};

function BettingRecordTab({
	gameType,
	lotteryId,
	issue,
}) {
	return (
		<BettingSearch
			gameType={gameType}
			lotteryId={lotteryId}
			issue={issue}
		/>
	);
}

BettingRecordTab.propTypes = propTypes;
BettingRecordTab.defaultProps = defaultProps;

export default BettingRecordTab;

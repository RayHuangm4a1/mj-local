import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const GameOddsMultiperiodBettingPage = ({ renderedRoutes, }) => {
	return (
		<div className="multiperiod-betting-page">
			{renderedRoutes}
		</div>
	);
};

GameOddsMultiperiodBettingPage.propTypes = propTypes;

export default GameOddsMultiperiodBettingPage;

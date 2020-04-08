import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const GameOddsMultiperiodOddsPage = ({ renderedRoutes, }) => {
	return (
		<div className="multiperiod-odds-page">
			{renderedRoutes}
		</div>
	);
};

GameOddsMultiperiodOddsPage.propTypes = propTypes;

export default GameOddsMultiperiodOddsPage;

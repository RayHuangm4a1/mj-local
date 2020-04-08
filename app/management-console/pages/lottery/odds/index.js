import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const GameOddsPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

GameOddsPage.propTypes = propTypes;

export default GameOddsPage;

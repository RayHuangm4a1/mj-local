import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const GamePage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

GamePage.propTypes = propTypes;

export default GamePage;

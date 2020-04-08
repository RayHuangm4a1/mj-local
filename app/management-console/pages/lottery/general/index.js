import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

const GameGeneralPage = ({ renderedRoutes, }) => (
	<Fragment>
		{renderedRoutes}
	</Fragment>
);

GameGeneralPage.propTypes = propTypes;
GameGeneralPage.defaultProps = defaultProps;

export default GameGeneralPage;

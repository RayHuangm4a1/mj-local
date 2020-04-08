import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemCreditControlPage = ({ renderedRoutes, }) => {
	return (
		<React.Fragment>
			{renderedRoutes}
		</React.Fragment>
	);
};

CashSystemCreditControlPage.propTypes = propTypes;

export default CashSystemCreditControlPage;

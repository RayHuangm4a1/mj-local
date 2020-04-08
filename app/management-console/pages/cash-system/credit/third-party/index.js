import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemCreditThirdPartyPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemCreditThirdPartyPage.propTypes = propTypes;

export default CashSystemCreditThirdPartyPage;

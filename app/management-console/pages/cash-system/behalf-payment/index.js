import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemBehalfPaymentPage = ({ renderedRoutes }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemBehalfPaymentPage.propTypes = propTypes;

export default CashSystemBehalfPaymentPage;

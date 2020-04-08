import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const defaultProps = {};

const CashSystemCreditPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemCreditPage.propTypes = propTypes;
CashSystemCreditPage.defaultProps = defaultProps;

export default CashSystemCreditPage;

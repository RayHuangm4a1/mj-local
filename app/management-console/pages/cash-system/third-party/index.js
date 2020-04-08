import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

const CashSystemThirdPartyPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemThirdPartyPage.propTypes = propTypes;
CashSystemThirdPartyPage.defaultProps = defaultProps;

export default CashSystemThirdPartyPage;

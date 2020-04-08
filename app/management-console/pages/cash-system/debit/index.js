import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemDebitPage = ({ renderedRoutes }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemDebitPage.propTypes = propTypes;

export default CashSystemDebitPage;

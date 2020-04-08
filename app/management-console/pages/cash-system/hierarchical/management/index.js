import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemHierarchicalManagementPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CashSystemHierarchicalManagementPage.propTypes = propTypes;

export default CashSystemHierarchicalManagementPage;

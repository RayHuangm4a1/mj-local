import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CashSystemHierarchicalPage = ({ renderedRoutes, }) => {
	return (
		<div className="hierarchical-management">
			{renderedRoutes}
		</div>
	);
};

CashSystemHierarchicalPage.propTypes = propTypes;

export default CashSystemHierarchicalPage;

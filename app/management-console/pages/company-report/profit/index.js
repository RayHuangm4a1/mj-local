import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CompanyReportProfitPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CompanyReportProfitPage.propTypes = propTypes;

export default CompanyReportProfitPage;

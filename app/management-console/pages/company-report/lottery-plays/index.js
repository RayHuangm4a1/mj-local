import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CompanyReportLotteryPlaysPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

CompanyReportLotteryPlaysPage.propTypes = propTypes;

export default CompanyReportLotteryPlaysPage;

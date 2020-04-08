import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const CompanyReportDividendPage = ({ renderedRoutes, }) => {
	return (
		<Fragment>
			{renderedRoutes}
		</Fragment>
	);
};

CompanyReportDividendPage.propTypes = propTypes;

export default CompanyReportDividendPage;

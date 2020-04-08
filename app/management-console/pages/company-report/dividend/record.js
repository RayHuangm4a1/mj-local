import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const DividendReportRecord = ({ renderedRoutes, }) => {
	return (
		<div className="dividend-report-record">
			{renderedRoutes}
		</div>
	);
};

DividendReportRecord.propTypes = propTypes;

export default DividendReportRecord;

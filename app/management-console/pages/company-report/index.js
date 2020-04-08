import React from 'react';
import PropTypes from 'prop-types';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import { FeatureCodeEnum, } from '../../lib/enums';

const propTypes = {
	renderedRoutes: PropTypes.object,
	layoutConfigs: layoutConfigsPropTypes,
};

const CompanyReportPage = ({ renderedRoutes, layoutConfigs, }) => {
	const { isFeatureActive, } = layoutConfigs;

	return (
		<div>
			{isFeatureActive ? renderedRoutes : null}
		</div>
	);
};

CompanyReportPage.propTypes = propTypes;

export default withFeatureToggle(FeatureCodeEnum.COMPANY_REPORT)(CompanyReportPage);

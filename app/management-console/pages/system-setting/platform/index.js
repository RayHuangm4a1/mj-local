import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { FeatureCodeEnum, } from '../../../lib/enums';

const propTypes = {
	renderedRoutes: PropTypes.object,
	layoutConfigs: layoutConfigsPropTypes,
};

const SystemSettingPlatformPage = ({ renderedRoutes, layoutConfigs, }) => {
	const { isFeatureActive, } = layoutConfigs;

	return (
		<Fragment>
			{isFeatureActive ? renderedRoutes : null}
		</Fragment>
	);
};

SystemSettingPlatformPage.propTypes = propTypes;

export default withFeatureToggle(FeatureCodeEnum.SYSTEM_SETTING_PLATFORM)(SystemSettingPlatformPage);

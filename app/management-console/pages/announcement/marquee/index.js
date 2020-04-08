import React from 'react';
import PropTypes from 'prop-types';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../lib/enums';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
	layoutConfigs: layoutConfigsPropTypes,
};

const AnnouncementMarqueePage = ({ renderedRoutes, layoutConfigs }) => {
	const { isFeatureActive, } = layoutConfigs;

	return (
		<div>
			{isFeatureActive ? renderedRoutes : null}
		</div>
	);
};

AnnouncementMarqueePage.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.ANNOUNCEMENT_MARQUEE)
)(AnnouncementMarqueePage);

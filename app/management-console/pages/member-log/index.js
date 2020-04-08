import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../lib/enums';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
	layoutConfigs: layoutConfigsPropTypes,
};

const MemberLogPage = ({ renderedRoutes, layoutConfigs: { isFeatureActive, }, }) => {
	return (
		<Fragment>
			{isFeatureActive ? renderedRoutes : null}
		</Fragment>
	);
};

MemberLogPage.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.MEMBER_LOG)
)(MemberLogPage);

import React from 'react';
import PropTypes from 'prop-types';
import { FeatureToggleContext, } from './utils';

const propTypes = {
	featureToggleRules: PropTypes.arrayOf(
		PropTypes.shape({
			feature: PropTypes.string,
			toggles: PropTypes.object
		})
	).isRequired,
	children: PropTypes.any.isRequired,
};

const FeatureToggleProvider = ({
	featureToggleRules = {},
	children
}) => {
	return (
		<FeatureToggleContext.Provider
			value={featureToggleRules}
		>
			{children}
		</FeatureToggleContext.Provider>
	);
};

FeatureToggleProvider.propTypes = propTypes;

export default FeatureToggleProvider;

import React from 'react';
import PropTypes from 'prop-types';

export const FeatureToggleContext = React.createContext();

export const layoutConfigsPropTypes = PropTypes.shape({
	toggles: PropTypes.object,
	isFeatureActive: PropTypes.bool,
});

export const getDisplayName = (WrappedComponent) => {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

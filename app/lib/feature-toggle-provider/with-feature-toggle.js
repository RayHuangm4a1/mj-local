import React, { Component, } from 'react';
import {
	FeatureToggleContext,
	getDisplayName,
} from './utils';

const initialFeatureConfig = {
	isActive: false,
	toggles: {},
};

export const withFeatureToggle = (featureCode) => (WrappedComponent) => {
	class WithFeatureToggleComponent extends Component {
		render() {
			return (
				<FeatureToggleContext.Consumer>
					{(featureToggleConfigs) => {

						const featureConfig = featureToggleConfigs.find((item) => item.feature === featureCode) || initialFeatureConfig;

						return (
							<WrappedComponent
								{...this.props}
								layoutConfigs={{
									isFeatureActive: featureConfig.isActive,
									toggles: featureConfig.toggles
								}}
							/>
						);
					}}
				</FeatureToggleContext.Consumer>
			);
		}
	}

	WithFeatureToggleComponent.displayName = `withFeatureToggle(${getDisplayName(WrappedComponent)})`;
	return WithFeatureToggleComponent;
};

export default withFeatureToggle;

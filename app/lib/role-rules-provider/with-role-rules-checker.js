import React, { Component, } from 'react';
import {
	RoleRulesContext,
	checkRoleRules,
} from './utils';

function withRoleRulesChecker(WrappedComponent) {
	class Enhance extends Component {
		render() {
			return (
				<RoleRulesContext.Consumer>
					{({
						availableActions,
						flattenRoleRules = [],
					}) => (
						<WrappedComponent
							{...this.props}
							checkRoleRules={(functionKey) => checkRoleRules(flattenRoleRules, availableActions, functionKey)}
						/>
					)}
				</RoleRulesContext.Consumer>
			);
		}
	}

	Enhance.displayName = `WithRoleRulesChecker(${getDisplayName(WrappedComponent)})`;

	return Enhance;
}

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withRoleRulesChecker;

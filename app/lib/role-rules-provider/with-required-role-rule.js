import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	withRoleRulesChecker,
} from './';

const propTypes = {
	checkRoleRules: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

const withRequiredRoleRule = (functionKey) => (WrappedComponent) => {
	class Enhance extends Component {
		render() {
			const {
				checkRoleRules,
				onNavigate,
				...rest
			} = this.props;

			if (!checkRoleRules(functionKey)) {
				onNavigate('/');

				return null;
			}

			return (
				<WrappedComponent
					onNavigate={onNavigate}
					{...rest}
				/>
			);
		}
	}

	Enhance.propTypes = propTypes;
	Enhance.displayName = `WithRequiredRoleRule(${getDisplayName(WrappedComponent)})`;

	return withRoleRulesChecker(Enhance);
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withRequiredRoleRule;

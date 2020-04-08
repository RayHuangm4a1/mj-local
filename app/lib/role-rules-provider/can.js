import React from 'react';
import PropTypes from 'prop-types';
import {
	useRoleRulesContext,
	checkRoleRules,
} from './utils';

const propTypes = {
	functionKey: PropTypes.string.isRequired,
	renderPassed: PropTypes.func,
	renderDenied: PropTypes.func,
};

const Can = ({
	functionKey,
	renderPassed = () => null,
	renderDenied = () => null,
}) => {
	const {
		availableActions,
		flattenRoleRules = [],
	} = useRoleRulesContext();

	if (!checkRoleRules(flattenRoleRules, availableActions, functionKey)) {
		return renderDenied();
	}

	return renderPassed();
};

Can.propTypes = propTypes;

const MemoCan = React.memo(Can);

export default MemoCan;

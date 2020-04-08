import React, { useContext, } from 'react';

// TODO 待確認實際命名後進行更新
export const RoleRuleActionEnum = {
	VISIT: 'visit',
};

export const RoleRulesContext = React.createContext({});

export const useRoleRulesContext = () => useContext(RoleRulesContext);

// flatten deep permissions data
export const flattenDeep = (data = []) => data.reduce(
	(accumulator, { children, ...rest }) => {
		accumulator.push(rest);

		if (children) {
			accumulator.push(...flattenDeep(children));
		}

		return accumulator;
	},
	[]
);

export function checkRoleRules(flattenRules = [], availableActions = [], functionKey) {
	const filteredRules = flattenRules.filter(
		(rule) => (rule.key === functionKey)
	);

	if (!filteredRules.length) {
		return false;
	}

	function _compareAvailableAction(action) {
		return availableActions.indexOf(action) > -1;
	}

	return filteredRules.every(
		({ actions, }) => actions.some(_compareAvailableAction)
	);
}

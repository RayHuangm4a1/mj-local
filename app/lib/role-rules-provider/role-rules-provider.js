import React from 'react';
import PropTypes from 'prop-types';
import {
	RoleRulesContext,
	RoleRuleActionEnum,
	flattenDeep,
} from './utils';

const defaultAvailableActions = Object.values(RoleRuleActionEnum);

const propTypes = {
	roleRules: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			actions: PropTypes.arrayOf(PropTypes.string),
			children: PropTypes.arrayOf(
				PropTypes.shape({
					key: PropTypes.string,
					actions: PropTypes.arrayOf(PropTypes.string),
					children: PropTypes.arrayOf(PropTypes.object),
				})
			),
		})
	).isRequired,
	children: PropTypes.any.isRequired,
};

const RoleRulesProvider = ({
	roleRules,
	children,
}) => {
	// TODO 根據實際資料結構再進行修改
	const flattenRoleRules = flattenDeep(roleRules);

	return (
		<RoleRulesContext.Provider
			value={{
				flattenRoleRules,
				availableActions: defaultAvailableActions,
			}}
		>
			{children}
		</RoleRulesContext.Provider>
	);
};

RoleRulesProvider.propTypes = propTypes;

export default RoleRulesProvider;

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, } from 'ljit-react-components';
import { Can, } from '../../../lib/role-rules-provider';

const { ItemGroup, } = Menu;

const propTypes = {
	functionKey: PropTypes.string.isRequired,
	title: PropTypes.node,
	children: PropTypes.any,
};

const RoleRulesItemGroup = ({
	functionKey,
	title,
	children,
	...rest
}) => (
	<Can
		functionKey={functionKey}
		renderPassed={() => (
			<ItemGroup
				{...rest}
				title={title}
			>
				{children}
			</ItemGroup>
		)}
	/>
);

RoleRulesItemGroup.propTypes = propTypes;

export default RoleRulesItemGroup;

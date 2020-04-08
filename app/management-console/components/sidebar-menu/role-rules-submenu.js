import React from 'react';
import PropTypes from 'prop-types';
import { Menu, } from 'ljit-react-components';
import { Can, } from '../../../lib/role-rules-provider';

const { SubMenu, } = Menu;

const propTypes = {
	functionKey: PropTypes.string.isRequired,
	title: PropTypes.node,
	children: PropTypes.any,
};

const RoleRulesSubMenu = ({
	functionKey,
	title,
	children,
	...rest
}) => (
	<Can
		functionKey={functionKey}
		renderPassed={() => (
			<SubMenu
				{...rest}
				title={title}
			>
				{children}
			</SubMenu>
		)}
	/>
);

RoleRulesSubMenu.propTypes = propTypes;

export default RoleRulesSubMenu;

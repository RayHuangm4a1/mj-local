import React from 'react';
import PropTypes from 'prop-types';
import { Menu, } from 'ljit-react-components';
import { Can, } from '../../../lib/role-rules-provider';

const { Item, } = Menu;

const propTypes = {
	functionKey: PropTypes.string.isRequired,
	children: PropTypes.any,
};

const RoleRulesMenuItem = ({
	functionKey,
	children,
	...rest
}) => (
	<Can
		functionKey={functionKey}
		renderPassed={() => (
			<Item
				{...rest}
			>
				{children}
			</Item>
		)}
	/>
);

RoleRulesMenuItem.propTypes = propTypes;

export default RoleRulesMenuItem;

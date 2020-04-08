import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

const AccountMemberManagementPage = ({ renderedRoutes, }) => (
	<div>
		{renderedRoutes}
	</div>
);

AccountMemberManagementPage.propTypes = propTypes;
AccountMemberManagementPage.defaultProps = defaultProps;

export default AccountMemberManagementPage;

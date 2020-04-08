import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const AccountMemberFrontstageWhiteListPage = ({ renderedRoutes, }) => {
	return (
		<div className="backlist-frontstage-white-list">
			{renderedRoutes}
		</div>
	);
};

AccountMemberFrontstageWhiteListPage.propTypes = propTypes;

export default AccountMemberFrontstageWhiteListPage;

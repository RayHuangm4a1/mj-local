import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const AccountMemberIpBannedPage = ({ renderedRoutes, }) => {
	return (
		<div className="management-ip-banned">
			{renderedRoutes}
		</div>
	);
};

AccountMemberIpBannedPage.propTypes = propTypes;

export default AccountMemberIpBannedPage;

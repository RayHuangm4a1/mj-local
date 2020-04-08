import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const AccountMemberPage = ({ renderedRoutes, }) => {
	return (
		<Fragment>
			{renderedRoutes}
		</Fragment>
	);
};

AccountMemberPage.propTypes = propTypes;

export default AccountMemberPage;

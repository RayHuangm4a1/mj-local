import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const UserReportMemberPage = ({ renderedRoutes, }) => {
	return (
		<Fragment>
			{renderedRoutes}
		</Fragment>
	);
};

UserReportMemberPage.propTypes = propTypes;

export default UserReportMemberPage;

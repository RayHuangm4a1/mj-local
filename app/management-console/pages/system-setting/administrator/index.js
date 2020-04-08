import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const SystemSettingAdministratorPage = ({ renderedRoutes, }) => {
	return (
		<Fragment>
			{renderedRoutes}
		</Fragment>
	);
};

SystemSettingAdministratorPage.propTypes = propTypes;

export default SystemSettingAdministratorPage;
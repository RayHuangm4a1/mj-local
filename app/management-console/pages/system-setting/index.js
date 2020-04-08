import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const SystemSettingPage = ({ renderedRoutes, }) => {
	return (
		<Fragment>
			{renderedRoutes}
		</Fragment>
	);
};

SystemSettingPage.propTypes = propTypes;

export default SystemSettingPage;

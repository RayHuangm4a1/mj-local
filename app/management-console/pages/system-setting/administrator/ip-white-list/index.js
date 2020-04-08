import React from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const SystemSettingAdministratorIpWhiteListPage = ({ renderedRoutes, }) => {
	return (
		<div className="system-setting-administrator-ip-white-list">
			{renderedRoutes}
		</div>
	);
};

SystemSettingAdministratorIpWhiteListPage.propTypes = propTypes;

export default SystemSettingAdministratorIpWhiteListPage;

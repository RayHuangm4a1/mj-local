import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const AnnouncementPage = ({ renderedRoutes, }) => {
	return (
		<div>
			{renderedRoutes}
		</div>
	);
};

AnnouncementPage.propTypes = propTypes;

export default AnnouncementPage;

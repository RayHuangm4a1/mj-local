import React from "react";
import { Divider, } from 'ljit-react-components';
import { isDateValid, formatDate, } from '../../../../lib/moment-utils';
import PropTypes from 'prop-types';

const PREFIX_CLASS = 'announcement-page-content';

const propTypes = {
	title: PropTypes.string,
	createdAt: PropTypes.string,
	content: PropTypes.string,
};

const AnnouncementContent = ({
	title = '',
	createdAt = '',
	content = '',
}) => {
	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__header`}>
				{title}
				<span>{isDateValid(createdAt) ? `发布时间：${formatDate(createdAt)}` : ''}</span>
			</div>
			<Divider />
			<div className={`${PREFIX_CLASS}__body`}>
				{content}
			</div>
		</div>
	);
};

AnnouncementContent.propTypes = propTypes;

export default AnnouncementContent;

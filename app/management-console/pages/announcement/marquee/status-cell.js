import React from 'react';
import PropTypes from 'prop-types';
import { StatusTag, } from 'ljit-react-components';

const propTypes = {
	status: PropTypes.string,
};

const defaultProps = {};

const StatusEnums = {
	ACTIVE: '1',
	ARCHIVED: '0',
};

const { ACTIVE, ARCHIVED, } = StatusEnums;

const StatusCell = ({ status, }) => {
	const {
		statusValue,
		statusText,
	} = getStatusString(status);

	if (statusValue && statusText) {
		return (
			<StatusTag
				status={statusValue}
				text={statusText}
			/>
		);
	}
	return null;
};

StatusCell.propTypes = propTypes;
StatusCell.defaultProps = defaultProps;

function getStatusString(status) {
	let statusValue = '';
	let statusText = '';

	switch (status) {
		case ACTIVE:
			statusValue = StatusTag.StatusEnums.SUCCESS;
			statusText = '啟用';
			break;
		case ARCHIVED:
			statusValue = StatusTag.StatusEnums.ERROR;
			statusText = '停用';
			break;
		default:
			statusValue = '';
			statusText = '';
	}

	return { statusValue, statusText };
}

export default StatusCell;

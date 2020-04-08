import React from 'react';
import PropTypes from 'prop-types';
import { StatusTag, } from 'ljit-react-components';

const propTypes = {
	status: PropTypes.string,
};

const StatusCell = ({ status, }) => {
	const {
		value,
		text,
	} = getStatusString(status);

	return (
		<StatusTag
			status={value}
			text={text}
		/>
	);
};

StatusCell.propTypes = propTypes;

function getStatusString(status) {
	let value = '';

	let text = '';

	if (status === '1') {
		value = StatusTag.StatusEnums.SUCCESS;
		text = '可转点';
	} else if (status === '0') {
		value = StatusTag.StatusEnums.ERROR;
		text = '不可转点';
	}

	return { value, text };
}

export default StatusCell;

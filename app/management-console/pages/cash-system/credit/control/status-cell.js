import React from 'react';
import PropTypes from 'prop-types';
import { StatusTag, } from 'ljit-react-components';

const propTypes = {
	statusValue: PropTypes.string,
	statusText: PropTypes.string,
};

const defaultProps = {};

const StatusCell = ({ statusValue, statusText, }) => {
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

export default StatusCell;

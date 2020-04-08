import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	StatusTag,
} from 'ljit-react-components';
import {
	SystemStatuses,
	EnableStatuses,
	ConfirmStatuses,
	ActivateStatuses,
} from '../constants';

const PREFIX_CLASS = 'status-cell';

const valueType = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number,
]);

const propTypes = {
	data: valueType,
	className: PropTypes.string,
};
const defaultProps = {
	className: '',
};

export function withStatuses(statuses = []) {
	const StatusCell = ({
		data,
		className,
	}) => {
		const item = statuses.find((statusItem = {}) => statusItem.value === data) || {};

		return (
			<div
				className={cx(PREFIX_CLASS, className)}
			>
				<StatusTag
					status={item.status}
					text={item.text}
				/>
			</div>
		);
	};

	StatusCell.propTypes = propTypes;
	StatusCell.defaultProps = defaultProps;
	return StatusCell;
}

const System = withStatuses(SystemStatuses);

const Enable = withStatuses(EnableStatuses);

const Confirm = withStatuses(ConfirmStatuses);

const Active = withStatuses(ActivateStatuses);

export default {
	System,
	Enable,
	Confirm,
	Active,
};

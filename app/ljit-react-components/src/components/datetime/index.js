import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	DATE,
	TIME,
	TIME_SECONDS,
	DATE_TIME_SECONDS,
	formatDate,
	isDateValid,
} from '../../lib/moment-utils';
import './style.styl';

export const PREFIX_CLASS = 'ljit-datetime';

const propTypes = {
	data: PropTypes.string,
	format: PropTypes.string,
	className: PropTypes.string,
};
const defaultProps = {
	format: DATE_TIME_SECONDS,
	className: '',
};

const Datetime = ({
	data,
	className,
	format,
}) => (
	<span
		className={cx(PREFIX_CLASS, className)}
	>
		{isDateValid(data) ? formatDate(data, format) : null}
	</span>
);

Datetime.propTypes = propTypes;
Datetime.defaultProps = defaultProps;

Datetime.DateOnly = props => <Datetime {...props} format={DATE} />;

Datetime.Time = props => <Datetime {...props} format={TIME} />;

Datetime.TimeSeconds = props => <Datetime {...props} format={TIME_SECONDS} />;

export default Datetime;

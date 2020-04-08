import React from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	Countdown,
} from 'ljit-react-components';
import './style.styl';

const propTypes = {
	name: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	endTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string,
	]),
	onFinish: PropTypes.func,
	prefix: PropTypes.node,
};
const defaultProps = {
	name: '',
	onFinish: () => {},
	endTime: new Date(),
	prefix: '',
};

function CountdownListItem({ name, endTime, onFinish, prefix, }) {
	return (
		<ListItem
			className="ljit-countdown-list-item"
			prefix={prefix}
			title={name}
			right={
				<Countdown
					endDate={new Date(endTime)}
					onFinish={onFinish}
				/>
			}
		/>
	);
}

CountdownListItem.propTypes = propTypes;
CountdownListItem.defaultProps = defaultProps;

export default CountdownListItem;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconButton from '../icon-button';
import Icon from '../icon';

const NotifyTypeEnums = {
	SUCCESS: 'success',
	INFO: 'info',
	ERROR: 'error',
};
const { SUCCESS, ERROR, INFO, } = NotifyTypeEnums;
const ColorMap = {
	[SUCCESS]: IconButton.ColorEnums.SUCCESS,
	[ERROR]: IconButton.ColorEnums.DANGER,
	[INFO]: IconButton.ColorEnums.PRIMARY,
};

const propTypes = {
	notifyType: PropTypes.oneOf([
		SUCCESS,
		ERROR,
		INFO,
	]),
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	onClickClose: PropTypes.func,
};
const defaultProps = {
	notifyType: SUCCESS,
	onClickClose: () => {},
};

const NotifyContent = ({
	notifyType,
	content,
	onClickClose,
}) => {
	return (
		<div
			className={cx('ljit-notify', {
				[`ljit-notify--${ERROR}`]: notifyType === ERROR,
			})}
		>
			{getNotifyIcon(notifyType)}
			<div className="ljit-notify__content">{content}</div>
			<IconButton
				className="ljit-notify__close"
				type="close"
				onClick={event => onClickClose(event)}
			/>
		</div>
	);
};

NotifyContent.propTypes = propTypes;
NotifyContent.defaultProps = defaultProps;
NotifyContent.NotifyTypeEnums = NotifyTypeEnums;

function getNotifyIcon(notifyType) {
	let iconType = null;

	switch (notifyType) {
		case SUCCESS:
			iconType = 'check-circle';
			break;
		case ERROR:
			iconType = 'close-circle';
			break;
		case INFO:
			iconType = 'info';
			break;
		default:
			iconType = 'check-circle';
	}
	return (
		<Icon
			type={iconType}
			theme="filled"
			className="ljit-notify__icon"
			color={ColorMap[notifyType]}
		/>
	);
}

export default NotifyContent;

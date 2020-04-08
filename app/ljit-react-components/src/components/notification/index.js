import React from 'react';
import cx from 'classnames';
import { notification as AntdNotification, } from 'antd';
import Icon from '../icon';
import { convertMsToSeconds, } from '../../lib/moment-utils';
import notificationContent from './notification-content';
import './style.styl';

const PlacementEnums = {
	TOP_LEFT: 'topLeft',
	TOP_RIGHT: 'topRight',
	BOTTOM_LEFT: 'bottomLeft',
	BOTTOM_RIGHT: 'bottomRight',
};

const PREFIX_CLASS = 'ljit-notification';

export function notificationGenerator() {
	return ({
		className = '',
		title = '',
		description = '',
		iconType = Icon.IconTypeEnums.INFO_FILL,
		placement = PlacementEnums.TOP_RIGHT,
		duration = 3000,
	}) => {
		if (duration < 0) {
			throw new Error('Notification: duration must greater than zero.');
		}

		return AntdNotification.info({
			className: cx(PREFIX_CLASS, className,
				`${PREFIX_CLASS}--${placement}`,
				`${PREFIX_CLASS}--has-icon`,
			),
			icon: <Icon type={iconType} size={Icon.SizeEnums.SMALL} className={`${PREFIX_CLASS}__icon`}/>,
			message: notificationContent('title', title),
			description: notificationContent('description', description),
			duration: convertMsToSeconds(duration),
			placement,
		});
	};
}

export const NotificationContent = notificationContent;
export default {
	info: notificationGenerator(),
	PlacementEnums: PlacementEnums,
};

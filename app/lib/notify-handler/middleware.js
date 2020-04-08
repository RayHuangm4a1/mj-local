import { AjaxError, GeneralError } from './notifications/error';
import { Success, } from './notifications/success';
import { Info, } from './notifications/info';

import {
	createNotification,
	NotifyTypeEnum
} from './utils';

const NOTIFY_DELAY_TIME = 5000;

const createNotifyHandlingMiddleware = () => store => next => action => {

	const {
		notification,
	} = action;

	handleNotify(notification);

	return next(action);
};

const notifyHandlingMiddleware = createNotifyHandlingMiddleware();

export default notifyHandlingMiddleware;

function handleNotify(notification) {

	//TODO: add other custom Error, Success, Info class
	if (notification instanceof AjaxError) {
		createNotification(NotifyTypeEnum.ERROR, notification.message, NOTIFY_DELAY_TIME);
	}

	if (notification instanceof GeneralError) {
		createNotification(NotifyTypeEnum.ERROR, notification.message, NOTIFY_DELAY_TIME);
	}

	if (notification instanceof Success) {
		createNotification(NotifyTypeEnum.SUCCESS, notification.message, NOTIFY_DELAY_TIME);
	}

	if (notification instanceof Info) {
		createNotification(NotifyTypeEnum.INFO, notification.message, NOTIFY_DELAY_TIME);
	}
}

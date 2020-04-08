import moment from 'moment';

export const DATE = 'YYYY/MM/DD';

export const TIME = 'HH:mm';

export const TIME_SECONDS = `${TIME}:ss`;

export const DATE_TIME_SECONDS = `${DATE} ${TIME_SECONDS}`;

export const MONTH_DAY = 'MM/DD';

export function isDateValid(date) {
	return moment(date).isValid();
}

export function convertDateStringToTimestamp(dateString = '', format = DATE_TIME_SECONDS) {
	return moment(dateString, format).valueOf();
}

export function formatDate(date = new Date(), format = DATE_TIME_SECONDS) {
	return moment(date).format(format);
}

export function parseDateString(dateString = '', format = 'YYYY/MM/DD HH:mm:ss') {
	return new Date(convertDateStringToTimestamp(dateString, format));
}

export function formatValidDate(date, { format, invalidMessage, } = {}) {
	if (isDateValid(date)) {
		return formatDate(date, format);
	} else if (invalidMessage) {
		return invalidMessage;
	} else {
		return '';
	}
}

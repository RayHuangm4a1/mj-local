// TODO move to ljit-moment-utils.js
import moment from 'moment';

export const DATE = 'YYYY/MM/DD';

export const TIME = 'HH:mm';

export const TIME_SECONDS = `${TIME}:ss`;

export const DATE_TIME_SECONDS = `${DATE} ${TIME_SECONDS}`;

export const DATE_TIME = `${DATE} ${TIME}`;

export function isDateValid(date) {
	return date ? moment(date).isValid() : false;
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

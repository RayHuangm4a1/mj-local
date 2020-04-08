import moment from 'moment';

// TODO moment utils will move to other lib independently

export const DATE = 'YYYY/MM/DD';

export const TIME = 'HH:mm';

export const TIME_SECONDS = `${TIME}:ss`;

export const DATE_TIME_SECONDS = `${DATE} ${TIME_SECONDS}`;

export function isDateValid(date) {
	return moment(date).isValid();
}

export function convertDateStringToTimestamp(dateString = '', format = DATE_TIME_SECONDS) {
	return moment(dateString, format).valueOf();
}

export function formatDate(date = new Date(), format = DATE_TIME_SECONDS) {
	return moment(date).format(format);
}

export function convertMsToSeconds(ms) {
	return moment.duration(ms).seconds();
}

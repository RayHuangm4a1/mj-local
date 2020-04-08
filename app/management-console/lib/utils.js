import { cloneDeep, } from 'lodash';

export const AUTO_UPDATE_SECONDS = 30;

export function getRandom(min, max) {
	return Math.round(Math.random() * max) + min;
}
export function getPropertyValue(item = {}, key = '') {
	let props = key.split('.');
	let result = cloneDeep(item);

	while (props.length) {
		result = result[props.shift()];
	}
	return result || null;
}

export const ipv4Rule = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

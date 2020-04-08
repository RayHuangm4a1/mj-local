import {
	fetchers,
	generateApiFetcher,
} from '../../lib/api-fetcher';
import { get as getConfig } from '../config';

export function getAPIBaseUrl() {
	const {
		api: {
			hostname, port, apiVersion,
		},
	} = getConfig();
	const apiBaseUrl = `${hostname}:${port}/api/${apiVersion}`;

	return apiBaseUrl;
}

export function getEnvironment() {
	const {
		environment
	} = getConfig();

	return environment;
}

const {
	rxAjaxFetcher,
} = fetchers;

export const rxjsApiFetcher = generateApiFetcher({
	fetcher: rxAjaxFetcher,
	baseUrl: getAPIBaseUrl(),
});

export const convertToNumber = (value) => {
	if (isNaN(value)) {
		console.error(`[convertToNumber]: value ${value} is not a number`);

		return 0;
	}

	return parseInt(value);
};

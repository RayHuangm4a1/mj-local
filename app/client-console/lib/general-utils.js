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

const {
	rxAjaxFetcher,
} = fetchers;

export const rxjsApiFetcher = generateApiFetcher({
	fetcher: rxAjaxFetcher,
	baseUrl: getAPIBaseUrl(),
});

import React from 'react';
import {
	getPage,
} from './register';

export function getSinglePageApp(page) {
	const PageObject = getPage(page);

	return PageObject.component;
}

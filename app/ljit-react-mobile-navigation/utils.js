import React from 'react';
import {
	getPage,
} from './register';

function handleNavigate(navigator, {
	page,
	navigationType,
	navigationTitle,
	passProps = {},
}) {
	const pageComponent = getPage(page);

	if (navigationType === 'push') {
		navigator.pushPage(
			{
				key: page,
				component: pageComponent.component,
				navigationType,
				navigationTitle,
				passProps,
			}
		);
	} else if (navigationType === 'showModal') {
		navigator.pushPage(
			{
				key: page,
				component: pageComponent.component,
				navigationType,
				navigationTitle,
				passProps,
			},
			{
				animation: 'lift-md',
			}
		);
	} else {
		throw new Error('no such navigation type: ' + navigationType);
	}
}

/*
	route = {
		key,
		component,
		navigationType,
		navigationTitle,
		passProps,
	}
*/
export function renderPage(route, navigator) {
	return (
		<route.component
			key={route.key}
			navigationType={route.navigationType}
			navigationTitle={route.navigationTitle}
			onNavigate={(options) => handleNavigate(navigator, options)}
			onBack={() => navigator.popPage()}
			{...route.passProps}
		/>
	);
}

import React from 'react';
import {
	Navigator,
} from 'react-onsenui';
import {
	renderPage,
} from './utils';
import {
	registerPage,
} from './register';
import {
	getTabApp,
} from './tab-app';
import {
	getSinglePageApp,
} from './single-page-app';

/*
	tabs = [
		{
			label, // tab 上面的文字
			page,  // tab 該秀的 page key
			icon,  // tab 的 icon
		},
	];
*/
function startTabApp({
	tabs,
}) {
	const TabApp = getTabApp({ tabs });

	return (
		<Navigator
			renderPage={renderPage}
			initialRoute={{
				component: TabApp,
				key: 'tab-root'
			}}
		/>
	);
}

function startSinglePageApp(page) {
	const SinglePageApp = getSinglePageApp(page);

	return (
		<Navigator
			renderPage={renderPage}
			initialRoute={{
				component: SinglePageApp,
				key: 'single-root'
			}}
		/>
	);
}

export {
	startTabApp,
	startSinglePageApp,

	registerPage,
};

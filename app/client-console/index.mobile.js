import React from 'react';
import ReactDOM from 'react-dom';
import { I18NProvider, } from 'ljit-i18n';
import { createI18N, } from 'ljit-i18n/i18n';
import { createObservable } from 'ljit-observable';
import { Provider as ReactObservableProvider } from 'ljit-observable/react-observable';
import { connect } from 'react-redux';
import { initController, } from 'ljit-store-connecter';
import { createStore, StoreProvider, } from './repositories';
import App from './mobile/app';
import { ThemeProvider, } from './lib/theme-provider';
import { getProductConfigs } from './product-configs/utils.js';

const i18n = createI18N();

const observable = createObservable();
const configs = getProductConfigs();
const store = createStore();

function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js').then(registration => {
				console.log('SW registered: ', registration);

			}).catch(registrationError => {
				console.log('SW registration failed: ', registrationError);
			});
		});
	}
}

initController(store, connect);

ReactDOM.render(
	<StoreProvider store={store}>
		<I18NProvider i18n={i18n}>
			<ReactObservableProvider observable={observable}>
				<ThemeProvider style={configs.style} themeMaps={configs.ThemeMaps}>
					<App />
				</ThemeProvider>
			</ReactObservableProvider>
		</I18NProvider>
	</StoreProvider>,
	document.getElementById('client-mobile-console-root')
);

registerServiceWorker();

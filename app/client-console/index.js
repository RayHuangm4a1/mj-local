import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import { I18NProvider, } from 'ljit-i18n';
import { createI18N, } from 'ljit-i18n/i18n';
import { createObservable } from 'ljit-observable';
import { Provider as ReactObservableProvider } from 'ljit-observable/react-observable';
import { connect } from 'react-redux';
import { initController, } from 'ljit-store-connecter';
import { createStore, StoreProvider, } from './repositories';
import App from './app';
import { ThemeProvider, } from './lib/theme-provider';
import { getProductConfigs } from './product-configs/utils.js';
import { FeatureToggleProvider, } from '../lib/feature-toggle-provider';

const i18n = createI18N();

const basename = '/client';
const observable = createObservable();
const configs = getProductConfigs();
const store = createStore();

initController(store, connect);

ReactDOM.render(
	<StoreProvider store={store}>
		<I18NProvider i18n={i18n}>
			<ReactObservableProvider observable={observable}>
				<BrowserRouter basename={basename}>
					<FeatureToggleProvider featureToggleRules={configs.FeatureToggleMap[configs.environment]}>
						<ThemeProvider style={configs.style} themeMaps={configs.ThemeMaps}>
							<App />
						</ThemeProvider>
					</FeatureToggleProvider>
				</BrowserRouter>
			</ReactObservableProvider>
		</I18NProvider>

	</StoreProvider>,
	document.getElementById('client-console-root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { initController, } from 'ljit-store-connecter';
import { BrowserRouter, } from 'react-router-dom';
import { Breadcrumb, } from 'ljit-react-components';
import { createStore, StoreProvider, } from './repositories';
import { connect } from 'react-redux';
import i18n from './i18n';
import App from './app';
import { FeatureTogglesMap, } from './feature-toggle';
import { FeatureToggleProvider, } from '../lib/feature-toggle-provider';
import { getEnvironment, } from './lib/general-utils';

const basename = '/management';

const store = createStore();

initController(store, connect);

ReactDOM.render(
	<StoreProvider store={store}>
		<I18nextProvider i18n={i18n}>
			<BrowserRouter basename={basename}>
				<Breadcrumb.BreadcrumbProvider>
					<FeatureToggleProvider featureToggleRules={FeatureTogglesMap[getEnvironment()]}>
						<App />
					</FeatureToggleProvider>
				</Breadcrumb.BreadcrumbProvider>
			</BrowserRouter>
		</I18nextProvider>
	</StoreProvider>,
	document.getElementById('management-console-root')
);

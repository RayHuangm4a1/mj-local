import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom';
import App from './App';
import { Breadcrumb, } from '../src';

ReactDOM.render((
	<BrowserRouter>
		<Breadcrumb.BreadcrumbProvider>
			<App />
		</Breadcrumb.BreadcrumbProvider>
	</BrowserRouter>
), document.getElementById('root'));

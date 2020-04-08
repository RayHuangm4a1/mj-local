//TODO share with management-console
import React from 'react';
import { Switch, } from 'react-router-dom';
import Route from './route';

function renderRoutes(routePaths, routes, extraProps = {}) {
	return routes.map((route, i) => (
		<Route
			key={route.key || i}
			path={route.path}
			exact={route.exact}
			strict={route.strict}
			component={route.component}
			paramProps={route.paramProps}
			redirectPath={route.redirectPath}
			routes={route.routes}
			meta={route.meta}
			extraProps={extraProps}
			routePaths={routePaths}
		/>
	));
}

export function renderSwitches(routes, extraProps = {}, switchProps = {}) {
	return routes ? (
		<Switch {...switchProps}>
			{renderRoutes([], routes, extraProps)}
		</Switch>
	) : null;
}

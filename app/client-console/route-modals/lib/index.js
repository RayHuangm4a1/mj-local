import React from 'react';
import routes from '../member-center/routes';

const routesMap = getRoutesMap(routes);

export function renderRoute(routeId, { routeProps = {} }) {
	let renderedComponent = null;
	const route = routesMap[routeId];

	if (route) {
		if (route.redirectId) {
			return renderRoute(route.redirectId, {
				routeProps: { ...routeProps, }
			});
		}

		renderedComponent = React.createElement(route.component, {
			...route.passProps,
			...routeProps,
		}, null);

		let parentRoutes = route.parentRoutes.reverse();

		parentRoutes.forEach(function(route) {
			renderedComponent = React.createElement(route.component, {
				...route.passProps,
				...routeProps,
				renderedRoutes: renderedComponent,
			}, null);
		});
	}

	return renderedComponent;
}

export function getRoutesMap(routes) {
	return getRoutes(routes);
}
function getRoutes(routes, parentRoute) {
	return routes.reduce(function(reduced, route) {
		reduced[route.id] = Object.assign({}, route, { parentRoutes: [], });

		if (parentRoute) {
			reduced[route.id].parentRoutes = [...parentRoute.parentRoutes, parentRoute];
		}

		if (route.routes && route.routes.length > 0) {
			reduced = Object.assign({},
				reduced,
				getRoutes(route.routes, reduced[route.id]),
			);
		}

		return reduced;
	}, {});
}

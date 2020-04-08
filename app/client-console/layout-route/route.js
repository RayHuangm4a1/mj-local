//TODO share with management-console project
import React from 'react';
import PropTypes from 'prop-types';
import {
	matchPath,
	Redirect,
	Route as ReactRoute,
} from 'react-router-dom';
import { omit, } from 'lodash';
import { renderSwitches, } from './render-routes';

const propTypes = {
	path: PropTypes.string,
	exact: PropTypes.bool,
	strict: PropTypes.bool,
	component: PropTypes.any,
	paramProps: PropTypes.object,
	redirectPath: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	meta: PropTypes.shape({
		breadcrumbName: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		isCrumbActive: PropTypes.bool,
		isCrumbVisible: PropTypes.bool,
		pageTitle: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
		pageDescription: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
	}),
	routePaths: PropTypes.array,
	extraProps: PropTypes.object,
};

const paramRule = /:(\w+)/g;
const paramReplace = (text, params = {}) => {
	return text.replace(paramRule, (_, key) => (params[key] || key));
};

const Route = (props) => {
	const routeProps = omit(props, [
		'routePaths',
		'extraProps',
		'component',
	]);
	const {
		extraProps,
		path,
		routes,
		paramProps,
		redirectPath,
		component: Page,
	} = props;

	return (
		<ReactRoute
			{...routeProps}
			render={(matchProps) => {
				const {
					match,
					history,
					location,
				} = matchProps;
				const mappedParamProps = {};

				if (paramProps) {
					Object.keys(paramProps).forEach(key => {
						mappedParamProps[key] = paramReplace(paramProps[key], match.params);
					});
				}

				if (redirectPath) {
					if (matchPath(location.pathname, { path, exact: true, })) {
						return <Redirect to={paramReplace(redirectPath, match.params)}/>;
					}
				}

				function onNavigate(uri, options = { passProps: {} }) {
					history.push({
						pathname: uri,
						passProps: options.passProps,
					});
				}
				function onBack() {
					history.goBack();
				}

				return (
					<Page
						{...extraProps}
						{...location.passProps}
						{...mappedParamProps}
						onNavigate={onNavigate}
						onBack={onBack}
						renderedRoutes={renderSwitches(routes)}
						pathName={location.pathname}
					/>
				);
			}}
		/>
	);
};

Route.propTypes = propTypes;

export default Route;

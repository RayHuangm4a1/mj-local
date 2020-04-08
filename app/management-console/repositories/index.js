import {
	createStore as reduxCreateStore,
	applyMiddleware,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import loggerMiddleWare from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { get as getConfig } from '../config';
import {
	epics,
	reducer,
	middlewares as reduxMiddlewares,
} from './redux';

const {
	epicMiddleware,
	notifyHandlingMiddleware,
} = reduxMiddlewares;

const config = getConfig();

export function createStore(initState = {}) {
	let middlewares, store;

	if (config.mode === 'production' || config.mode === 'pre-production') {
		middlewares = [
			thunkMiddleWare,
			epicMiddleware,
			notifyHandlingMiddleware,
		];
		store = reduxCreateStore(reducer, initState, applyMiddleware(...middlewares));
	} else {
		middlewares = [
			thunkMiddleWare,
			loggerMiddleWare,
			epicMiddleware,
			notifyHandlingMiddleware,
		];
		store = reduxCreateStore(reducer, initState, composeWithDevTools(applyMiddleware(...middlewares)));
	}

	epicMiddleware.run(epics);

	return store;
}

export const StoreProvider = Provider;

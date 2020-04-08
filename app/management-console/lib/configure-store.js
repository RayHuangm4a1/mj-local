import { createStore, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
import loggerMiddleWare from "redux-logger";
import reducer from "../reducers/app";
import { composeWithDevTools } from 'redux-devtools-extension';
import { get as getConfig } from "../config";

const config = getConfig();

function create (initState = {}) {
	let middlewares, store;

	if (config.mode === "production" || config.mode === "pre-production") {
		middlewares = [thunkMiddleWare];
		store = createStore(reducer, initState, applyMiddleware(...middlewares));
	} else {
		middlewares = [thunkMiddleWare, loggerMiddleWare];
		store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(...middlewares)));
	}

	return store;
}

export default { create };

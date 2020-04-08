import React, { useRef, useEffect, } from 'react';
import Loadable from 'react-loadable';
import { Loading } from 'ljit-react-components';

//TODO share with management-console project
export function loadComponent(options) {
	return Loadable(Object.assign({
		loading: function LoadingWrapper(prop) {
			const { error } = prop;

			if (process.env.NODE_ENV !== 'production' && error) {
				console.error(error);
			}
			return <Loading />;
		}
	}, options));
}

export function usePrevious(value) {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
}

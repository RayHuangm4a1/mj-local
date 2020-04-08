import { createStore, } from 'redux';

const PATH = 'ljit-react-components/header-banner/';

export const ADD_INFO = `${PATH}ADD_INFO`;
export const UPDATE_INFO = `${PATH}UPDATE_INFO`;
export const REMOVE_INFO = `${PATH}REMOVE_INFO`;

const initialState = {
	title: '',
	description: '',
	isBannerVisible: true,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_INFO:
		case UPDATE_INFO:
			return Object.assign({}, state, {
				title: action.payload.title,
				description: action.payload.description,
				isBannerVisible: action.payload.isBannerVisible,
			});
		case REMOVE_INFO:
			return Object.assign({}, state, initialState);
		default:
			return state;
	}
}

export function addInfo({ title = '', description = '', isBannerVisible = true, }) {
	return {
		type: ADD_INFO,
		payload: {
			title,
			description,
			isBannerVisible,
		},
	};
}

export function updateInfo({ title = '', description = '', isBannerVisible = true, }) {
	return {
		type: UPDATE_INFO,
		payload: {
			title,
			description,
			isBannerVisible,
		},
	};
}

export function removeInfo() {
	return {
		type: REMOVE_INFO,
	};
}

const store = createStore(reducer);

export const dispatch = store.dispatch;

export default store;

import { List, Map } from 'immutable';
import {
	START_FETCH_USER_LEVEL_LOGS,
	FETCH_USER_LEVEL_LOGS_SUCCESS,
	FETCH_USER_LEVEL_LOGS_FAILED,
} from "../../../../../controller/actions/action-types";
import { LoadingStatusEnum, } from "../../../../../lib/enums";

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

// example
// {
// 	data: List([
// 		{
// 			id: 2,
// 			userId: 4,
// 			username: "test0301",
// 			previousLevelId: 1,
// 			afterLevelId: 5,
// 			status: 3,
// 			createdAt: "2020-03-16T03:57:04.000Z",
// 			updatedAt: "2020-03-16T03:57:04.000Z"
// 		}...
// 	]),
// 	numOfItems: 2,
// 	numOfPages: 1
// }

const initialState = Map({
	data: List(),
	numOfItems: 0,
	numOfPages: 0,

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function cashSystemHierarchicalLogPage(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_LEVEL_LOGS:
			return state.set('loadingStatus', LOADING);

		case FETCH_USER_LEVEL_LOGS_SUCCESS: {
			const { data, numOfItems, numOfPages, } = action;

			return state
				.set('data', List(data))
				.set('numOfItems', numOfItems)
				.set('numOfPages', numOfPages)
				.set('loadingStatus', SUCCESS);
		}

		case FETCH_USER_LEVEL_LOGS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

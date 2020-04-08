import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const {
	START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE,
	INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_SUCCESS,
	INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_FAILED,
	START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS,
	REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_SUCCESS,
	REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_FAILED,
	START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL,
	FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_SUCCESS,
	FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_FAILED,
} = actionTypes;

const initialState = Map({
	loadingStatus: NONE,
	loadingStatusMessage: '',
	refreshNormalLevelsLoadingStatus: NONE,
	refreshNormalLevelsLoadingStatusMessage: '',
	userLevelLoadingStatus: NONE,
	userLevelLoadingStatusMessage: '',
});

export default function cashSystemHierarchicalManagementPage(state = initialState, action) {
	switch (action.type) {
		case START_INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE:
			return state.set('loadingStatus', LOADING);
		case INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_SUCCESS:
			return state
				.set('loadingStatus', SUCCESS);
		case INIT_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_PAGE_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS:
			return state.set('refreshNormalLevelsLoadingStatus', LOADING);
		case REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_SUCCESS:
			return state
				.set('refreshNormalLevelsLoadingStatus', SUCCESS);
		case REFRESH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_NORMAL_LEVELS_FAILED:
			return state
				.set('refreshNormalLevelsLoadingStatus', FAILED)
				.set('refreshNormalLevelsLoadingStatusMessage', action.errorMessage);

		case START_FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL:
			return state.set('userLevelLoadingStatus', LOADING);
		case FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_SUCCESS:
			return state
				.set('userLevelLoadingStatus', SUCCESS);
		case FETCH_CASH_SYSTEM_HIERARCHICAL_MANAGEMENT_USER_LEVEL_FAILED:
			return state
				.set('userLevelLoadingStatus', FAILED)
				.set('userLevelLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

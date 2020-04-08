import {
	START_INIT_USER_DETAILS_PAGE,
	INIT_USER_DETAILS_PAGE_SUCCESS,
	INIT_USER_DETAILS_PAGE_FAILED,
	SET_HAS_INIT_USER_DETAIL_PAGE,
} from '../action-types';

export function initUserDetailsPageAction(userId) {
	return {
		type: START_INIT_USER_DETAILS_PAGE,
		userId,
	};
}
export function initUserDetailsPageSuccessAction() {
	return {
		type: INIT_USER_DETAILS_PAGE_SUCCESS,
	};
}
export function initUserDetailsPageFailedAction(error, errorMessage) {
	return {
		type: INIT_USER_DETAILS_PAGE_FAILED,
		error,
		errorMessage,
	};
}

export function setHasInitUserDetailPageAction(hasInit) {
	return {
		type: SET_HAS_INIT_USER_DETAIL_PAGE,
		hasInit,
	};
}

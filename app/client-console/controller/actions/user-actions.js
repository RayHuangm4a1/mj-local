import {
	START_FETCH_USER,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILED,
	START_CREATE_CHILDREN_USER,
	CREATE_CHILDREN_USER_SUCCESS,
	CREATE_CHILDREN_USER_FAILED,
	START_UPDATE_USER_NICKNAME,
	UPDATE_USER_NICKNAME_SUCCESS,
	UPDATE_USER_NICKNAME_FAILED,
	START_UPDATE_USER_GREETING,
	UPDATE_USER_GREETING_SUCCESS,
	UPDATE_USER_GREETING_FAILED,
	START_FETCH_CHILDREN_USERS,
	FETCH_CHILDREN_USERS_SUCCESS,
	FETCH_CHILDREN_USERS_FAILED,
	SET_IS_USER_VALIDATED_BY_PASSWORD,
	START_TRANSFER_TO_USER,
	TRANSFER_TO_USER_SUCCESS,
	TRANSFER_TO_USER_FAILED,
	START_UPDATE_CHILDREN_USER,
	UPDATE_CHILDREN_USER_SUCCESS,
	UPDATE_CHILDREN_USER_FAILED,
} from './action-types';

export function fetchUserAction() {
	return {
		type: START_FETCH_USER,
	};
}
export function fetchUserSuccessAction(user) {
	return {
		type: FETCH_USER_SUCCESS,
		user,
	};
}
export function fetchUserFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_FAILED,
		error,
		errorMessage,
	};
}

export function startCreateChildrenUserAction(data = {}) {
	return {
		type: START_CREATE_CHILDREN_USER,
		data,
	};
}
export function createChildrenUserSuccessAction(payload) {
	return {
		type: CREATE_CHILDREN_USER_SUCCESS,
		payload,
	};
}
export function createChildrenUserFailedAction(error, errorMessage) {
	return {
		type: CREATE_CHILDREN_USER_FAILED,
		error,
		errorMessage,
	};
}

export function startUpdateUserNicknameAction(password, nickname) {
	return {
		type: START_UPDATE_USER_NICKNAME,
		password,
		nickname,
	};
}

export function updateUserNicknameSuccessAction(nickname) {
	return {
		type: UPDATE_USER_NICKNAME_SUCCESS,
		nickname,
	};
}

export function updateUserNicknameFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_NICKNAME_FAILED,
		error,
		errorMessage,
	};
}

export function startUpdateUserGreetingAction(password, greeting) {
	return {
		type: START_UPDATE_USER_GREETING,
		password,
		greeting,
	};
}

export function updateUserGreetingSuccessAction(greeting) {
	return {
		type: UPDATE_USER_GREETING_SUCCESS,
		greeting,
	};
}

export function updateUserGreetingFailedAction(error, errorMessage) {
	return {
		type: UPDATE_USER_GREETING_FAILED,
		error,
		errorMessage,
	};
}

export function fetchChildrenUsersAction(userIdOrUsername, query = {}) {
	// TODO: 串接 order, sort
	return {
		type: START_FETCH_CHILDREN_USERS,
		userIdOrUsername,
		query,
	};
}

export function fetchChildrenUsersSuccessAction({ numOfItems, numOfPages, ancestors, childrenUsers, page }) {
	return {
		type: FETCH_CHILDREN_USERS_SUCCESS,
		numOfItems,
		numOfPages,
		ancestors,
		childrenUsers,
		page,
	};
}

export function fetchChildrenUsersFailedAction(error, errorMessage) {
	return {
		type: FETCH_CHILDREN_USERS_FAILED,
		error,
		errorMessage,
	};
}

export function setIsUserValidatedByPasswordAction(isUserValidated) {
	return {
		type: SET_IS_USER_VALIDATED_BY_PASSWORD,
		isUserValidated,
	};
}

export function updateChildrenUserAction(childrenId, isAgent, bonus) {
	return {
		type: START_UPDATE_CHILDREN_USER,
		childrenId,
		isAgent,
		bonus,
	};
}

export function updateChildrenUserSuccessAction(childrenId, isAgent, bonus) {
	return {
		type: UPDATE_CHILDREN_USER_SUCCESS,
		childrenId,
		isAgent,
		bonus,
	};
}

export function updateChildrenUserFailedAction(error, errorMessage) {
	return {
		type: UPDATE_CHILDREN_USER_FAILED,
		error,
		errorMessage,
	};
}

export function transferToUserAction(username, bankCardNumber, amount, password, totp) {
	return {
		type: START_TRANSFER_TO_USER,
		username,
		bankCardNumber,
		amount,
		password,
		totp,
	};
}
export function transferToUserSuccessAction(wallet) {
	return {
		type: TRANSFER_TO_USER_SUCCESS,
		wallet,
	};
}
export function transferToUserFailedAction(error, errorMessage) {
	return {
		type: TRANSFER_TO_USER_FAILED,
		error,
		errorMessage,
	};
}

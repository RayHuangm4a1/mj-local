import {
	START_FETCH_ADMIN_USERS,
	START_CREATE_ADMIN_USER,
	START_UPDATE_ADMIN_USER,
	FETCH_ADMIN_USERS_SUCCESS,
	FETCH_ADMIN_USERS_FAILED,
	CREATE_ADMIN_USER_SUCCESS,
	CREATE_ADMIN_USER_FAILED,
	UPDATE_ADMIN_USER_SUCCESS,
	UPDATE_ADMIN_USER_FAILED,
	START_UPDATE_STAFF_PASSWORD,
	UPDATE_STAFF_PASSWORD_SUCCESS,
	UPDATE_STAFF_PASSWORD_FAILED,
	START_FETCH_STAFF_ROLES,
	FETCH_STAFF_ROLES_SUCCESS,
	FETCH_STAFF_ROLES_FAILED,
} from './action-types';

export function fetchAdminUsersAction(query) {
	return {
		type: START_FETCH_ADMIN_USERS,
		query
	};
}
export function fetchAdminUsersSuccessAction({ data, numOfItems, numOfPages }) {
	return {
		type: FETCH_ADMIN_USERS_SUCCESS,
		data,
		numOfItems,
		numOfPages,
	};
}
export function fetchAdminUsersFailedAction(error, errorMessage) {
	return {
		type: FETCH_ADMIN_USERS_FAILED,
		error,
		errorMessage
	};
}

export function createAdminUserAction(roleId, description, password, username) {
	return {
		type: START_CREATE_ADMIN_USER,
		username,
		password,
		roleId,
		description,
	};
}
export function createAdminUserSuccessAction(payload) {
	return {
		type: CREATE_ADMIN_USER_SUCCESS,
		payload,
	};
}
export function createAdminUserFailedAction(error, errorMessage) {
	return {
		type: CREATE_ADMIN_USER_FAILED,
		error,
		errorMessage
	};
}
export function updateAdminUserAction(staffId, status, roleId, description) {
	return {
		type: START_UPDATE_ADMIN_USER,
		staffId,
		status,
		roleId,
		description,
	};
}
export function updateAdminUserSuccessAction(payload) {
	return {
		type: UPDATE_ADMIN_USER_SUCCESS,
		payload,
	};
}
export function updateAdminUserFailedAction(error, errorMessage) {
	return {
		type: UPDATE_ADMIN_USER_FAILED,
		error,
		errorMessage,
	};
}
export function updateStaffUserPasswordAction(staffId, password) {
	return {
		type: START_UPDATE_STAFF_PASSWORD,
		staffId,
		password,
	};
}
export function updateStaffUserPasswordSuccessAction() {
	return {
		type: UPDATE_STAFF_PASSWORD_SUCCESS,
	};
}
export function updateStaffUserPasswordFailedAction(error, errorMessage) {
	return {
		type: UPDATE_STAFF_PASSWORD_FAILED,
		error,
		errorMessage,
	};
}
export function fetchStaffRolesAction(meType) {
	return {
		type: START_FETCH_STAFF_ROLES,
		meType,
	};
}
export function fetchStaffRolesSuccessAction(payload) {
	return {
		type: FETCH_STAFF_ROLES_SUCCESS,
		payload,
	};
}
export function fetchStaffRolesFailedAction(error, errorMessage) {
	return {
		type: FETCH_STAFF_ROLES_FAILED,
		error,
		errorMessage,
	};
}

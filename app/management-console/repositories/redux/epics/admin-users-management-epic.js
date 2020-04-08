import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	START_FETCH_ADMIN_USERS,
	START_CREATE_ADMIN_USER,
	START_UPDATE_ADMIN_USER,
	START_UPDATE_STAFF_PASSWORD,
	START_FETCH_STAFF_ROLES,
} from '../../../controller/actions/action-types';
import {
	fetchAdminUsersSuccessAction,
	fetchAdminUsersFailedAction,
	createAdminUserSuccessAction,
	createAdminUserFailedAction,
	updateAdminUserSuccessAction,
	updateAdminUserFailedAction,
	updateStaffUserPasswordSuccessAction,
	updateStaffUserPasswordFailedAction,
	fetchStaffRolesSuccessAction,
	fetchStaffRolesFailedAction,
} from '../../../controller/actions/admin-users-management-actions';
import { rxjsApiFetcher, } from '../../../lib/general-utils';
import {
	catchErrorMessageForEpics,
} from "../../../../lib/epic-utils";
import { objectFilter, objectFilterOptionEnums, } from '../../../../lib/object-utils';

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchAdminUsersEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_ADMIN_USERS),
		switchMap((action = {}) => rxjsApiFetcher
			.get('staffs', { queries: objectFilter(action.query, options), })
			.pipe(
				map(payload => fetchAdminUsersSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchAdminUsersFailedAction)),
			)
		)
	);
}
export function createAdminUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CREATE_ADMIN_USER),
		switchMap((action = {}) => rxjsApiFetcher
			.post(
				'staffs',
				{
					roleId: action.roleId,
					description: action.description,
					password: action.password,
					username: action.username,
				}
			)
			.pipe(
				map(payload => createAdminUserSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, createAdminUserFailedAction)),
			)
		)
	);
}
export function updateAdminUserEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_ADMIN_USER),
		switchMap((action = {}) =>
			rxjsApiFetcher
				.patch(
					`staffs/id=${action.staffId}`,
					{
						status: action.status,
						roleId: action.roleId,
						description: action.description,
					}
				)
				.pipe(
					map(payload => updateAdminUserSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, updateAdminUserFailedAction)),
				)
		)
	);
}
export function updateAdminUserPasswordEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_STAFF_PASSWORD),
		switchMap((action = {}) =>
			rxjsApiFetcher
				.put(
					`staffs/id=${action.staffId}/credentials/type=login`,
					{ password: action.password, }
				)
				.pipe(
					map(payload => updateStaffUserPasswordSuccessAction(payload.response)),
					catchError(error => catchErrorMessageForEpics(error, updateStaffUserPasswordFailedAction)),
				)
		)
	);
}
export function fetchStaffRolesEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_STAFF_ROLES),
		switchMap((action = {}) => rxjsApiFetcher
			.get(`staffs/id=me/roles?me=${action.meType}`)
			.pipe(
				map(payload => fetchStaffRolesSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchStaffRolesFailedAction)),
			)
		)
	);
}

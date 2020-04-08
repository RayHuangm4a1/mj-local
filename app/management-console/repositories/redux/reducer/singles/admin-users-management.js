import { List, Map } from 'immutable';
import { LoadingStatusEnum } from "../../../../lib/enums";
import {
	FETCH_ADMIN_USERS_SUCCESS,
	START_FETCH_ADMIN_USERS,
	FETCH_ADMIN_USERS_FAILED,
	START_FETCH_STAFF_ROLES,
	FETCH_STAFF_ROLES_SUCCESS,
	FETCH_STAFF_ROLES_FAILED,
	START_CREATE_ADMIN_USER,
	CREATE_ADMIN_USER_SUCCESS,
	CREATE_ADMIN_USER_FAILED,
	START_UPDATE_ADMIN_USER,
	UPDATE_ADMIN_USER_SUCCESS,
	UPDATE_ADMIN_USER_FAILED,
	START_UPDATE_STAFF_PASSWORD,
	UPDATE_STAFF_PASSWORD_SUCCESS,
	UPDATE_STAFF_PASSWORD_FAILED,
} from '../../../../controller/actions/action-types';

/** 
Data example
Map({
	adminUsers: Map({
		"data": List([
			{
				"id": 1,
				"username": "admin",
				"accountId": "123456789",
				"role": {
					"id": 1,
					"name": "系統管理員",
					"type": 1
				},
				"ip": null,
				"geo": null,
				"loginAt": null,
				"status": 1,
				"description": null,
				"account": {
					"_id": "123456789",
					"username": 'admin',
					"totp": {
					"isEnabled": false
					},
					"wechat": {
						"isEnabled": false
					},
					"betCredential": {
						"isEnabled": true
					},
					"fundsCredential": {
						"isEnabled": false
					},
					"finCredential": {
						"isEnabled": false
					},
					"loginGeoValidation": {
						"isEnabled": false
					},
					"lastLoginAudit": {
						"_id": '5d8c7f44b769e97a8d1cae95',
						"ip": '211.23.162.10',
						"geo": '台湾省中华电信(HiNet)数据中心',
						"createdAt": '2019-09-26T09:05:08.109Z'
					},
					"securityQuestions": [],
					"numOfFailedLogin": 0
				},
			}
		]),
		...
	})
	staffRoles: List([
		{
			"id": 1,
			"name": "系统管理员"
		},
		{
			"id": 2,
			"name": "会计"
		},
		{
			"id": 3,
			"name": "客服主管"
		},
		{
			"id": 6,
			"name": "财务主管"
		},
		{
			"id": 4,
			"name": "客服主任"
		},
		{
			"id": 7,
			"name": "财务组长"
		},
		{
			"id": 5,
			"name": "客服人员"
		},
		{
			"id": 8,
			"name": "财务代理"
		},
		{
			"id": 9,
			"name": "财务人员"
		},
		{
			"id": 10,
			"name": "财务代理人员"
		},
	])
})
*/

const initialState = Map({
	adminUsers: Map({
		data: List(),
		numOfItems: 0,
		numOfPages: 1,
	}),
	staffRoles: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',

	createUserLoadingStatus: LoadingStatusEnum.NONE,
	createUserLoadingStatusMessage: '',

	updateUserLoadingStatus: LoadingStatusEnum.NONE,
	updateUserLoadingStatusMessage: '',

	updateUserPasswordLoadingStatus: LoadingStatusEnum.NONE,
	updateUserPasswordLoadingStatusMessage: '',

	fetchStaffRolesLoadingStatus: LoadingStatusEnum.NONE,
	fetchStaffRolesLoadingStatusMessage: '',
});

export default function adminUsersManagement(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_ADMIN_USERS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_ADMIN_USERS_SUCCESS:
			return state
				.setIn(['adminUsers', 'data'], List(action.data))
				.setIn(['adminUsers', 'numOfItems'], action.numOfItems)
				.setIn(['adminUsers', 'numOfPages'], action.numOfPages)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_ADMIN_USERS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_FETCH_STAFF_ROLES:
			return state.set('fetchStaffRolesLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_STAFF_ROLES_SUCCESS:
			return state
				.set('staffRoles', List(action.payload))
				.set('fetchStaffRolesLoadingStatus',LoadingStatusEnum.SUCCESS);
		case FETCH_STAFF_ROLES_FAILED:
			return state
				.set('fetchStaffRolesLoadingStatus', LoadingStatusEnum.FAILED)
				.set('fetchStaffRolesLoadingStatusMessage', action.errorMessage);

		case START_CREATE_ADMIN_USER:
			return state.set('createUserLoadingStatus', LoadingStatusEnum.LOADING);
		case CREATE_ADMIN_USER_SUCCESS:
			return state.set('createUserLoadingStatus',LoadingStatusEnum.SUCCESS);
		case CREATE_ADMIN_USER_FAILED:
			return state
				.set('createUserLoadingStatus', LoadingStatusEnum.FAILED)
				.set('createUserLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_ADMIN_USER:
			return state.set('updateUserLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_ADMIN_USER_SUCCESS:
			return state.set('updateUserLoadingStatus', LoadingStatusEnum.SUCCESS);
		case UPDATE_ADMIN_USER_FAILED:
			return state
				.set('updateUserLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateUserLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_STAFF_PASSWORD:
			return state.set('updateUserPasswordLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_STAFF_PASSWORD_SUCCESS:
			return state.set('updateUserPasswordLoadingStatus', LoadingStatusEnum.SUCCESS);
		case UPDATE_STAFF_PASSWORD_FAILED:
			return state
				.set('updateUserPasswordLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateUserPasswordLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

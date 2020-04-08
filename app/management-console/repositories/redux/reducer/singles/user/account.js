import { Map } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_FETCH_USER_ACCOUNT,
	FETCH_USER_ACCOUNT_SUCCESS,
	FETCH_USER_ACCOUNT_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD,
	UPDATE_USER_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_BETTING_PASSWORD,
	UPDATE_USER_BETTING_PASSWORD_SUCCESS,
	UPDATE_USER_BETTING_PASSWORD_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD,
	UPDATE_USER_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_FAILED,
	START_DELETE_USER_SECURITY_QUESTIONS,
	DELETE_USER_SECURITY_QUESTIONS_SUCCESS,
	DELETE_USER_SECURITY_QUESTIONS_FAILED,
	START_ENABLE_USER_LOGIN_GEO_VALIDATION,
	ENABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	ENABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_USER_LOGIN_GEO_VALIDATION,
	DISABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS,
	DISABLE_USER_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_USER_GOOGLE_TOTP,
	DISABLE_USER_GOOGLE_TOTP_SUCCESS,
	DISABLE_USER_GOOGLE_TOTP_FAILED,
} = actionTypes;

/* example
data: Map({
	"lastLoginAudit": {
		"_id": "5e412ca552ed81001b6b7b68",
		"ip": "211.23.162.10",
		"geo": "台湾省中华电信(HiNet)数据中心",
		"createdAt": "2020-02-10T10:12:53.784Z"
	},
	"numOfFailedLogin": 0,
	"_id": "5d4aea86e48b697af60c1211",
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
		"isEnabled": true
	},
	"finCredential": {
		"isEnabled": false
	},
	"loginGeoValidation": {
		"isEnabled": true
	},
	"username": "test01",
	"loginCredential": {
		"isDefault": false
	},
	"securityQuestions": [
		{
			"id": 1,
			"name": "我最喜欢的城市"
		},
		{
			"id": 2,
			"name": "我最喜欢的国家"
		},
		{
			"id": 3,
			"name": "我最喜欢的明星"
		}
	]
})
*/

const defaultAccountData = {
	lastLoginAudit: {
		ip: '',
		geo: '',
		createdAt: '',
	},
	numOfFailedLogin: 0,
	totp: {
		isEnabled: false,
	},
	wechat: {
		isEnabled: false,
	},
	betCredential: {
		isEnabled: false,
	},
	fundsCredential: {
		isEnabled: false,
	},
	finCredential: {
		isEnabled: false,
	},
	loginGeoValidation: {
		isEnabled: false,
	},
	username: '',
	loginCredential: {
		isDefault: true,
	},
	securityQuestions: [],
};

const initialState = Map({
	data: Map(defaultAccountData),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: NONE,
	updateLoadingStatusMessage: '',
});

export default function account(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_ACCOUNT:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_ACCOUNT_SUCCESS: {
			const { account } = action;
			const { lastLoginAudit, } = account;

			//handle special case: if account not login before, response will return null;
			account.lastLoginAudit = lastLoginAudit ? lastLoginAudit : defaultAccountData.lastLoginAudit;

			return state
				.set('data', Map(account))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_USER_ACCOUNT_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_UPDATE_USER_LOGIN_PASSWORD:
		case START_UPDATE_USER_BETTING_PASSWORD:
		case START_UPDATE_USER_FUNDS_PASSWORD:
		case START_DELETE_USER_SECURITY_QUESTIONS:
		case START_ENABLE_USER_LOGIN_GEO_VALIDATION:
		case START_DISABLE_USER_LOGIN_GEO_VALIDATION:
		case START_DISABLE_USER_GOOGLE_TOTP:
			return state.set('updateLoadingStatus', LOADING);
		case UPDATE_USER_LOGIN_PASSWORD_SUCCESS:
		case UPDATE_USER_BETTING_PASSWORD_SUCCESS:
		case UPDATE_USER_FUNDS_PASSWORD_SUCCESS:
		case DELETE_USER_SECURITY_QUESTIONS_SUCCESS:
		case ENABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS:
		case DISABLE_USER_LOGIN_GEO_VALIDATION_SUCCESS:
		case DISABLE_USER_GOOGLE_TOTP_SUCCESS:
			return state.set('updateLoadingStatus', SUCCESS);
		case UPDATE_USER_LOGIN_PASSWORD_FAILED:
		case UPDATE_USER_BETTING_PASSWORD_FAILED:
		case UPDATE_USER_FUNDS_PASSWORD_FAILED:
		case DELETE_USER_SECURITY_QUESTIONS_FAILED:
		case ENABLE_USER_LOGIN_GEO_VALIDATION_FAILED:
		case DISABLE_USER_LOGIN_GEO_VALIDATION_FAILED:
		case DISABLE_USER_GOOGLE_TOTP_FAILED:
			return state
				.set('updateLoadingStatus', FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

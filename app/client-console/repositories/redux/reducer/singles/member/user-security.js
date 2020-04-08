import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const {
	START_FETCH_USER_SECURITY,
	FETCH_USER_SECURITY_SUCCESS,
	FETCH_USER_SECURITY_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD,
	UPDATE_USER_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_BET_PASSWORD,
	UPDATE_USER_BET_PASSWORD_SUCCESS,
	UPDATE_USER_BET_PASSWORD_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD,
	UPDATE_USER_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_FAILED,
	START_ENABLE_LOGIN_GEO_VALIDATION,
	ENABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	ENABLE_LOGIN_GEO_VALIDATION_FAILED,
	START_DISABLE_LOGIN_GEO_VALIDATION,
	DISABLE_LOGIN_GEO_VALIDATION_SUCCESS,
	DISABLE_LOGIN_GEO_VALIDATION_FAILED,
	START_UPDATE_USER_SECURITY_QUESTIONS,
	UPDATE_USER_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_SECURITY_QUESTIONS_FAILED,
	START_BIND_GOOGLE_AUTHENTICATION,
	BIND_GOOGLE_AUTHENTICATION_SUCCESS,
	BIND_GOOGLE_AUTHENTICATION_FAILED,
	START_UNBIND_GOOGLE_AUTHENTICATION,
	UNBIND_GOOGLE_AUTHENTICATION_SUCCESS,
	UNBIND_GOOGLE_AUTHENTICATION_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,
	START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
	START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
	START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP,
	UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_FAILED,
} = actionTypes;

/* Example
data: Map({
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
	"securityQuestions": [
		{
	        "_id": "5d4aea86e48b697af60c1211",
	        "name": "最喜歡的國家"
	    },
	    {
	        "_id": "5d4aea86e48b697af60c1212",
	        "name": "出生地"
	    },
	    {
	        "_id": "5d4aea86e48b697af60c1213",
	        "name": "居住地"
	    }
	],
	"numOfFailedLogin": 0
}),
*/

const initialState = Map({
	data: Map({}),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	loginPasswordLoadingStatus: NONE,
	loginPasswordLoadingStatusMessage: '',
	betPasswordLoadingStatus: NONE,
	betPasswordLoadingStatusMessage: '',
	fundsPasswordLoadingStatus: NONE,
	fundsPasswordLoadingStatusMessage: '',
	enableLoginGeoValidationLoadingStatus: NONE,
	enableLoginGeoValidationLoadingStatusMessage: '',
	disableLoginGeoValidationLoadingStatus: NONE,
	disableLoginGeoValidationLoadingStatusMessage: '',
	securityQuestionsLoadingStatus: NONE,
	securityQuestionsLoadingStatusMessage: '',
	bindGoogleAuthenticationLoadingStatus: NONE,
	bindGoogleAuthenticationLoadingStatusMessage: '',
	unbindGoogleAuthenticationLoadingStatus: NONE,
	unbindGoogleAuthenticationLoadingStatusMessage: '',
	updatePasswordLoadingStatus: NONE,
	updatePasswordLoadingStatusMessage: '',
});

export default function userSecurity(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_SECURITY:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_SECURITY_SUCCESS:
			return state
				.set('data', Map(action.userSecurity))
				.set('loadingStatus', SUCCESS);
		case FETCH_USER_SECURITY_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_LOGIN_PASSWORD:
		case START_UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS:
		case START_UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP:
			return state.set('loginPasswordLoadingStatus', LOADING);
		case UPDATE_USER_LOGIN_PASSWORD_SUCCESS:
		case UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS:
		case UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS:
			return state.set('loginPasswordLoadingStatus', SUCCESS);
		case UPDATE_USER_LOGIN_PASSWORD_FAILED:
		case UPDATE_USER_LOGIN_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED:
		case UPDATE_USER_LOGIN_PASSWORD_VIA_GOOGLE_TOTP_FAILED:
			return state
				.set('loginPasswordLoadingStatus', FAILED)
				.set('loginPasswordLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_BET_PASSWORD:
		case START_UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS:
		case START_UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP:
			return state.set('betPasswordLoadingStatus', LOADING);
		case UPDATE_USER_BET_PASSWORD_SUCCESS:
		case UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS:
		case UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS:
			return state.set('betPasswordLoadingStatus', SUCCESS);
		case UPDATE_USER_BET_PASSWORD_FAILED:
		case UPDATE_USER_BET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED:
		case UPDATE_USER_BET_PASSWORD_VIA_GOOGLE_TOTP_FAILED:
			return state
				.set('betPasswordLoadingStatus', FAILED)
				.set('betPasswordLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_FUNDS_PASSWORD:
		case START_UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS:
		case START_UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP:
			return state.set('fundsPasswordLoadingStatus', LOADING);
		case UPDATE_USER_FUNDS_PASSWORD_SUCCESS:
		case UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS:
		case UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS:
			return state
				.setIn([ 'data', 'fundsCredential', ], { isEnabled: true, })
				.set('fundsPasswordLoadingStatus', SUCCESS);
		case UPDATE_USER_FUNDS_PASSWORD_FAILED:
		case UPDATE_USER_FUNDS_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED:
		case UPDATE_USER_FUNDS_PASSWORD_VIA_GOOGLE_TOTP_FAILED:
			return state
				.set('fundsPasswordLoadingStatus', FAILED)
				.set('fundsPasswordLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_LOGIN_GEO_VALIDATION:
			return state
				.set('enableLoginGeoValidationLoadingStatus', LOADING);
		case ENABLE_LOGIN_GEO_VALIDATION_SUCCESS:
			return state
				.setIn(['data', 'loginGeoValidation'], { isEnabled: true, })
				.set('enableLoginGeoValidationLoadingStatus', SUCCESS);
		case ENABLE_LOGIN_GEO_VALIDATION_FAILED:
			return state
				.set('enableLoginGeoValidationLoadingStatus', FAILED)
				.set('enableLoginGeoValidationLoadingStatusMessage', action.errorMessage);

		case START_DISABLE_LOGIN_GEO_VALIDATION:
			return state
				.set('disableLoginGeoValidationLoadingStatus', LOADING);
		case DISABLE_LOGIN_GEO_VALIDATION_SUCCESS:
			return state
				.setIn(['data', 'loginGeoValidation'], { isEnabled: false, })
				.set('disableLoginGeoValidationLoadingStatus', SUCCESS);
		case DISABLE_LOGIN_GEO_VALIDATION_FAILED:
			return state
				.set('disableLoginGeoValidationLoadingStatus', FAILED)
				.set('disableLoginGeoValidationLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_SECURITY_QUESTIONS:
			return state
				.set('securityQuestionsLoadingStatus', LOADING);
		case UPDATE_USER_SECURITY_QUESTIONS_SUCCESS:
			return state
				.setIn(['data','securityQuestions'], action.securityQuestions)
				.set('securityQuestionsLoadingStatus', SUCCESS);
		case UPDATE_USER_SECURITY_QUESTIONS_FAILED:
			return state
				.set('securityQuestionsLoadingStatus', FAILED)
				.set('securityQuestionsLoadingStatusMessage', action.errorMessage);

		case START_BIND_GOOGLE_AUTHENTICATION:
			return state
				.set('bindGoogleAuthenticationLoadingStatus', LOADING);
		case BIND_GOOGLE_AUTHENTICATION_SUCCESS:
			return state
				.setIn([ 'data', 'totp', ], { isEnabled: true, })
				.set('bindGoogleAuthenticationLoadingStatus', SUCCESS);
		case BIND_GOOGLE_AUTHENTICATION_FAILED:
			return state
				.set('bindGoogleAuthenticationLoadingStatus', FAILED)
				.set('bindGoogleAuthenticationLoadingStatusMessage', action.errorMessage);

		case START_UNBIND_GOOGLE_AUTHENTICATION:
			return state
				.set('unbindGoogleAuthenticationLoadingStatus', LOADING);
		case UNBIND_GOOGLE_AUTHENTICATION_SUCCESS:
			return state
				.setIn([ 'data', 'totp', ], { isEnabled: false, })
				.set('unbindGoogleAuthenticationLoadingStatus', SUCCESS);
		case UNBIND_GOOGLE_AUTHENTICATION_FAILED:
			return state
				.set('unbindGoogleAuthenticationLoadingStatus', FAILED)
				.set('unbindGoogleAuthenticationLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

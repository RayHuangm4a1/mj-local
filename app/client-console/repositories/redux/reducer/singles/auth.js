import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

// CAPTCHA error code
const USER_DEFAULT_PASSWORD_IS_NOT_CHANGED = "888.012.431";

const {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,

	START_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,

	START_LOGIN_VIA_GOOGLE_TOTP,
	LOGIN_VIA_GOOGLE_TOTP_SUCCESS,
	LOGIN_VIA_GOOGLE_TOTP_FAILED,

	START_CHECK_AUTH,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILED,

	START_FETCH_CAPTCHA,
	FETCH_CAPTCHA_SUCCESS,
	FETCH_CAPTCHA_FAILED,

	START_CHECK_CAPTCHA,
	CHECK_CAPTCHA_SUCCESS,
	CHECK_CAPTCHA_FAILED,

	SET_IS_GEO_VALIDATION,

	START_GEO_VALIDATE_WITH_PAYER,
	GEO_VALIDATE_WITH_PAYER_SUCCESS,
	GEO_VALIDATE_WITH_PAYER_FAILED,

	START_UPDATE_DEFAULT_PASSWORD,
	UPDATE_DEFAULT_PASSWORD_SUCCESS,
	UPDATE_DEFAULT_PASSWORD_FAILED,

	START_FETCH_PASSWORD_RESET_METHODS,
	FETCH_PASSWORD_RESET_METHODS_SUCCESS,
	FETCH_PASSWORD_RESET_METHODS_FAILED,

	START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS,
	RESET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS,
	RESET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED,

	START_RESET_PASSWORD_VIA_GOOGLE_TOTP,
	RESET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS,
	RESET_PASSWORD_VIA_GOOGLE_TOTP_FAILED,

	SET_IS_CAPTCHA_VALIDATE,
} = actionTypes;

const initialState = Map({
	data: Map({
		username: '',
		greeting: '',
		passwordResetMethods: Map(),
	}),
	captcha: '',
	isGeoValidation: false,
	isFirstTimeLogin: false,
	isCaptchaValidate: false,

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',

	loginLoadingStatus: LoadingStatusEnum.NONE,
	loginLoadingStatusMessage: '',

	loginViaGoogleTotpLoadingStatus: LoadingStatusEnum.NONE,
	loginViaGoogleTotpLoadingStatusMessage: '',

	logoutLoadingStatus: LoadingStatusEnum.NONE,
	logoutLoadingStatusMessage: '',

	fetchCaptchaLoadingStatus: LoadingStatusEnum.NONE,
	fetchCaptchaLoadingStatusMessage: '',

	checkCaptchaLoadingStatus: LoadingStatusEnum.NONE,
	checkCaptchaLoadingStatusMessage: '',

	geoValidateLoadingStatus: LoadingStatusEnum.NONE,
	geoValidateLoadingStatusMessage: '',

	updateDefaultPasswordLoadingStatus: LoadingStatusEnum.NONE,
	updateDefaultPasswordLoadingStatusMessage: '',

	fetchPasswordResetMethodsLoadingStatus: LoadingStatusEnum.NONE,
	fetchPasswordResetMethodsLoadingStatusMessage: '',

	passwordResetViaSecurityQuestionsLoadingStatus: LoadingStatusEnum.NONE,
	passwordResetViaSecurityQuestionsLoadingStatusMessage: '',

	passwordResetViaGoogleTotpLoadingStatus: LoadingStatusEnum.NONE,
	passwordResetViaGoogleTotpLoadingStatusMessage: '',
});

export default function auth(state = initialState, action) {
	switch (action.type) {
		case START_LOGIN:
			return state.set('loginLoadingStatus', LoadingStatusEnum.LOADING);

		case LOGIN_SUCCESS:
			return state.set('loginLoadingStatus', LoadingStatusEnum.SUCCESS);

		case LOGIN_FAILED:
			return state
				.set('loginLoadingStatus', LoadingStatusEnum.FAILED)
				.set('loginLoadingStatusMessage', action.errorMessage);
		
		case START_LOGIN_VIA_GOOGLE_TOTP:
			return state.set('loginViaGoogleTotpLoadingStatus', LoadingStatusEnum.LOADING);

		case LOGIN_VIA_GOOGLE_TOTP_SUCCESS:
			return state.set('loginViaGoogleTotpLoadingStatus', LoadingStatusEnum.SUCCESS);

		case LOGIN_VIA_GOOGLE_TOTP_FAILED:
			return state
				.set('loginViaGoogleTotpLoadingStatus', LoadingStatusEnum.FAILED)
				.set('loginViaGoogleTotpLoadingStatusMessage', action.errorMessage);

		case START_LOGOUT:
			return state.set('logoutLoadingStatus', LoadingStatusEnum.LOADING);

		case LOGOUT_SUCCESS:
			return state
				.set('logoutLoadingStatus', LoadingStatusEnum.SUCCESS)
				.set('loadingStatus', LoadingStatusEnum.NONE);

		case LOGOUT_FAILED:
			return state
				.set('logoutLoadingStatus', LoadingStatusEnum.FAILED)
				.set('logoutLoadingStatusMessage', action.errorMessage);

		case START_CHECK_AUTH:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case CHECK_AUTH_SUCCESS:
			return state.set('loadingStatus', LoadingStatusEnum.SUCCESS);

		case CHECK_AUTH_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_FETCH_CAPTCHA:
			return state.set('fetchCaptchaLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_CAPTCHA_SUCCESS:
			return state
				.set('fetchCaptchaLoadingStatus', LoadingStatusEnum.SUCCESS)
				.set('captcha', action.captcha);
		case FETCH_CAPTCHA_FAILED:
			return state
				.set('fetchCaptchaLoadingStatus', LoadingStatusEnum.FAILED)
				.set('fetchCaptchaLoadingStatusMessage', action.errorMessage);

		case START_CHECK_CAPTCHA:
			return state
				.set('checkCaptchaLoadingStatus', LoadingStatusEnum.LOADING)
				.setIn(['data', 'username'], action.username)
				.set('isFirstTimeLogin', false);
		case CHECK_CAPTCHA_SUCCESS:
			return state
				.set('checkCaptchaLoadingStatus', LoadingStatusEnum.SUCCESS)
				.setIn(['data', 'greeting'], action.greeting);
		case CHECK_CAPTCHA_FAILED: {
			const { errorMessage, error = {}, } = action;
			const { response = {} } = error;
			const isFirstTimeLogin = response.code === USER_DEFAULT_PASSWORD_IS_NOT_CHANGED;

			return state
				.set('checkCaptchaLoadingStatus', LoadingStatusEnum.FAILED)
				.set('checkCaptchaLoadingStatusMessage', errorMessage)
				.set('isFirstTimeLogin', isFirstTimeLogin);
		}
		case START_UPDATE_DEFAULT_PASSWORD:
			return state.set('updateDefaultPasswordLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_DEFAULT_PASSWORD_SUCCESS:
			return state.set('updateDefaultPasswordLoadingStatus', LoadingStatusEnum.SUCCESS);
		case UPDATE_DEFAULT_PASSWORD_FAILED:
			return state
				.set('updateDefaultPasswordLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateDefaultPasswordLoadingStatusMessage', action.errorMessage);

		case SET_IS_GEO_VALIDATION:
			return state
				.set('isGeoValidation', action.isGeoValidation);

		case START_GEO_VALIDATE_WITH_PAYER:
			return state
				.set('geoValidateLoadingStatus', LoadingStatusEnum.LOADING);
		case GEO_VALIDATE_WITH_PAYER_SUCCESS:
			return state
				.set('geoValidateLoadingStatus', LoadingStatusEnum.SUCCESS);
		case GEO_VALIDATE_WITH_PAYER_FAILED:
			return state
				.set('geoValidateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('geoValidateLoadingStatusMessage', action.errorMessage);

		case START_FETCH_PASSWORD_RESET_METHODS:
			return state.set('fetchPasswordResetMethodsLoadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_PASSWORD_RESET_METHODS_SUCCESS:
			return state
				.set('fetchPasswordResetMethodsLoadingStatus', LoadingStatusEnum.SUCCESS)
				.setIn(['data', 'passwordResetMethods'], Map(action.passwordResetMethods));
		case FETCH_PASSWORD_RESET_METHODS_FAILED:
			return state
				.set('fetchPasswordResetMethodsLoadingStatus', LoadingStatusEnum.FAILED)
				.set('fetchPasswordResetMethodsLoadingStatusMessage', action.errorMessage);

		case START_RESET_PASSWORD_VIA_SECURITY_QUESTIONS:
			return state.set('passwordResetViaSecurityQuestionsLoadingStatus', LoadingStatusEnum.LOADING);
		case RESET_PASSWORD_VIA_SECURITY_QUESTIONS_SUCCESS:
			return state.set('passwordResetViaSecurityQuestionsLoadingStatus', LoadingStatusEnum.SUCCESS);
		case RESET_PASSWORD_VIA_SECURITY_QUESTIONS_FAILED:
			return state
				.set('passwordResetViaSecurityQuestionsLoadingStatus', LoadingStatusEnum.FAILED)
				.set('passwordResetViaSecurityQuestionsLoadingStatusMessage', action.errorMessage);

		case START_RESET_PASSWORD_VIA_GOOGLE_TOTP:
			return state.set('passwordResetViaGoogleTotpLoadingStatus', LoadingStatusEnum.LOADING);
		case RESET_PASSWORD_VIA_GOOGLE_TOTP_SUCCESS:
			return state.set('passwordResetViaGoogleTotpLoadingStatus', LoadingStatusEnum.SUCCESS);
		case RESET_PASSWORD_VIA_GOOGLE_TOTP_FAILED:
			return state
				.set('passwordResetViaGoogleTotpLoadingStatus', LoadingStatusEnum.FAILED)
				.set('passwordResetViaGoogleTotpLoadingStatusMessage', action.errorMessage);

		case SET_IS_CAPTCHA_VALIDATE:
			return state.set('isCaptchaValidate', action.isCaptchaValidate);

		default:
			return state;
	}
}

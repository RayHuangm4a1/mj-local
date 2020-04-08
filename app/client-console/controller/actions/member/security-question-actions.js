// TODO move to member security-setting-actions
import {
	START_FETCH_SECURITY_QUESTIONS,
	FETCH_SECURITY_QUESTIONS_SUCCESS,
	FETCH_SECURITY_QUESTIONS_FAILED,
} from '../action-types';

export function fetchSecurityQuestionsAction() {
	return {
		type: START_FETCH_SECURITY_QUESTIONS
	};
}

export function fetchSecurityQuestionsSuccessAction(securityQuestions = []) {
	return {
		type: FETCH_SECURITY_QUESTIONS_SUCCESS,
		securityQuestions,
	};
}

export function fetchSecurityQuestionsFailedAction(error, errorMessage) {
	return {
		type: FETCH_SECURITY_QUESTIONS_FAILED,
		error,
		errorMessage,
	};
}

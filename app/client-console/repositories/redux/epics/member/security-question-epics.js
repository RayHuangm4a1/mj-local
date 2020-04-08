import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	securityQuestionActions,
} from '../../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import { getAPIBaseUrl, } from '../../../../lib/general-utils';
const {
	START_FETCH_SECURITY_QUESTIONS,
} = actionTypes;
const {
	fetchSecurityQuestionsSuccessAction,
	fetchSecurityQuestionsFailedAction,
} = securityQuestionActions;

//TODO: set apiBaseUrl to product config
const apiBaseUrl = getAPIBaseUrl();

export function fetchSecurityQuestionEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_SECURITY_QUESTIONS),
		switchMap(action => 
			ajax({
				url: `${apiBaseUrl}/security-questions`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(payload => fetchSecurityQuestionsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchSecurityQuestionsFailedAction)),
			)
		)
	);
}

import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
	debounceTime,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userCommentsActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { objectFilter, objectFilterOptionEnums } from '../../../../../lib/object-utils';

const {
	START_FETCH_USER_COMMENTS,
	START_ADD_USER_COMMENT,
	START_CANCEL_PINNED_USER_COMMENT,
} = actionTypes;

const {
	fetchUserCommentsSuccessAction,
	fetchUserCommentsFailedAction,
	addUserCommentSuccessAction,
	addUserCommentFailedAction,
	cancelPinnedUserCommentSuccessAction,
	cancelPinnedUserCommentFailedAction,
} = userCommentsActions;

const DEBOUNCE_TIME = 300;

const {
	SKIP_NULL,
	SKIP_UNDEFINED,
	SKIP_NAN,
	SKIP_EMPTY_STRING,
} = objectFilterOptionEnums;
const options = [SKIP_NULL, SKIP_UNDEFINED, SKIP_NAN, SKIP_EMPTY_STRING];

export function fetchUserCommentsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_USER_COMMENTS),
		debounceTime(DEBOUNCE_TIME),
		switchMap(action => {
			const { userId, queries = {}, } = action;
			const page = queries.page || 1;

			return rxjsApiFetcher
				.get(`/users/id=${userId}/comments`, { queries: objectFilter(queries, options), })
				.pipe(
					map(payload => fetchUserCommentsSuccessAction(payload.response, page)),
					catchError(error => catchErrorMessageForEpics(error, fetchUserCommentsFailedAction))
				);
		}),
	);
}

export function addUserCommentEpic(action$, state$) {
	return action$.pipe(
		ofType(START_ADD_USER_COMMENT),
		switchMap(({ userId, status, description, }) => rxjsApiFetcher
			.post(`/users/id=${userId}/comments`, { status, description, })
			.pipe(
				map(payload => addUserCommentSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, addUserCommentFailedAction))
			)
		),
	);
}

export function cancelPinnedUserCommentEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CANCEL_PINNED_USER_COMMENT),
		switchMap(action => rxjsApiFetcher
			.delete(`/users/id=${action.userId}/comments/id=${action.commentId}/pinned`)
			.pipe(
				map(() => cancelPinnedUserCommentSuccessAction(action.commentId)),
				catchError(error => catchErrorMessageForEpics(error, cancelPinnedUserCommentFailedAction))
			)
		),
	);
}

import { ofType } from 'redux-observable';
import { of, zip, race, concat } from 'rxjs';
import {
	switchMap,
	mergeMap,
	take,
	map
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	userDetailsPageActions,
	userProfileActions,
	userDetailActions,
	userStatsActions,
	userWalletsActions,
	userAccountActions,
	userCommentsActions,
	financeLevelsActions,
	userWithdrawalActions,
	teamActions,
} from '../../../../controller';

const {
	START_INIT_USER_DETAILS_PAGE,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILED,
	FETCH_USER_DETAIL_SUCCESS,
	FETCH_USER_DETAIL_FAILED,
	FETCH_USER_STATS_SUCCESS,
	FETCH_USER_STATS_FAILED,
	FETCH_USER_WALLETS_SUCCESS,
	FETCH_USER_WALLETS_FAILED,
	FETCH_USER_ACCOUNT_SUCCESS,
	FETCH_USER_ACCOUNT_FAILED,
	FETCH_USER_COMMENTS_SUCCESS,
	FETCH_USER_COMMENTS_FAILED,
	FETCH_FINANCE_LEVELS_SUCCESS,
	FETCH_FINANCE_LEVELS_FAILED,
	FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS,
	FETCH_USER_WITHDRAWAL_MESSAGE_FAILED,
	FETCH_TEAM_STATS_SUCCESS,
	FETCH_TEAM_STATS_FAILED,
} = actionTypes;
const {
	initUserDetailsPageSuccessAction,
	initUserDetailsPageFailedAction,
} = userDetailsPageActions;
const { fetchUserProfileAction, } = userProfileActions;
const { fetchUserDetailAction, } = userDetailActions;
const { fetchUserStatsAction, } = userStatsActions;
const { fetchUserWalletsAction, } = userWalletsActions;
const { fetchUserAccountAction, } = userAccountActions;
const { fetchUserCommentsAction, } = userCommentsActions;
const { fetchUserWithdrawalMessageAction, } = userWithdrawalActions;
const { fetchTeamStatsAction, } = teamActions;
const { fetchFinanceLevelsAction, } = financeLevelsActions;

export function initUserDetailsPageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_USER_DETAILS_PAGE),
		switchMap((action) => {
			const { userId, } = action;

			return concat(
				of(fetchUserProfileAction(userId)),
				of(fetchUserDetailAction(userId)),
				of(fetchUserStatsAction(userId)),
				of(fetchUserWalletsAction(userId)),
				of(fetchUserAccountAction(userId)),
				of(fetchUserCommentsAction(userId)),
				of(fetchFinanceLevelsAction()),
				of(fetchUserWithdrawalMessageAction(userId)),
				of(fetchTeamStatsAction(userId)),
				race(
					zip(
						action$.ofType(FETCH_USER_PROFILE_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_DETAIL_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_STATS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_WALLETS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_ACCOUNT_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_COMMENTS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_FINANCE_LEVELS_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_USER_WITHDRAWAL_MESSAGE_SUCCESS).pipe(take(1)),
						action$.ofType(FETCH_TEAM_STATS_SUCCESS).pipe(take(1)),
					).pipe(
						map(() => initUserDetailsPageSuccessAction()),
					),
					action$.ofType(FETCH_USER_PROFILE_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_DETAIL_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_STATS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_WALLETS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_ACCOUNT_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_COMMENTS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_FINANCE_LEVELS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_USER_WITHDRAWAL_MESSAGE_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
					action$.ofType(FETCH_TEAM_STATS_FAILED).pipe(
						take(1),
						mergeMap(error => catchErrorMessageForEpics(error, initUserDetailsPageFailedAction))
					),
				)
			);
		})
	);
}

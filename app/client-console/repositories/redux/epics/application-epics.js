import { ofType, } from 'redux-observable';
import { zip, } from 'rxjs';
import {
	switchMap,
	mergeMap,
	catchError,
	take,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	getUserData,
} from '../../../lib/user-utils';
import {
	actionTypes,
	applicationActions,
	userActions,
	lotteryClassActions,
	lotteryActions,
	walletsActions,
	platformActions,
	userSecurityActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_INITIALIZE_APPLICATION,
} = actionTypes;
const {
	initializeApplicationSuccessAction,
	initializeApplicationFailedAction,
} = applicationActions;
const {
	fetchUserSuccessAction,
} = userActions;
const {
	fetchLotteryClassesSuccessAction,
} = lotteryClassActions;
const {
	fetchLotteriesSuccessAction,
} = lotteryActions;
const {
	fetchWalletsSuccessAction
} = walletsActions;
const {
	fetchPlatformSuccessAction,
} = platformActions;
const {
	fetchUserSecuritySuccessAction,
} = userSecurityActions;

export function initializeApplicationEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INITIALIZE_APPLICATION),
		switchMap(() => (
			zip(
				rxjsApiFetcher.get('lottery-classes'),
				rxjsApiFetcher.get('lotteries'),
				rxjsApiFetcher.get('platform'),
				rxjsApiFetcher.get('wallets'),
				rxjsApiFetcher.get('users/id=me/account')
			).pipe(
				mergeMap((payloads) => {
					const [
						lotteryClasses,
						lotteries,
						platform,
						wallets,
						userSecurity,
					] = payloads;
					const user = state$.value.user.get('data').toObject();
					const userData = getUserData(platform.response, user);

					return [
						fetchUserSuccessAction(userData),
						fetchLotteryClassesSuccessAction(lotteryClasses.response),
						fetchLotteriesSuccessAction(lotteries.response),
						fetchPlatformSuccessAction(platform.response),
						fetchWalletsSuccessAction(wallets.response),
						fetchUserSecuritySuccessAction(userSecurity.response),
						initializeApplicationSuccessAction(),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, initializeApplicationFailedAction))
			)
		))
	);
}

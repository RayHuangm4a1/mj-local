import { ofType } from 'redux-observable';
import {
	switchMap,
	mergeMap,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	bettingActions,
	walletsActions,
	bettingRecordActions,
	userActions,
} from '../../../controller';

import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';

import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_BET,
} = actionTypes;
const {
	betSuccessAction,
	betFailedAction,
	clearBettingsAction,
} = bettingActions;
const {
	updateWallet,
} = walletsActions;
const {
	prependBettingRecordsAction,
} = bettingRecordActions;
const {
	setIsUserValidatedByPasswordAction,
} = userActions;

export function startBetEpic(action$, state$) {
	return action$.pipe(
		ofType(START_BET),
		switchMap((action) => {
			const { password, bettings } = action;

			let body = {
				data: bettings.map(betting => {
					const {
						play = {},
						betcontent,
						weizhi = '',
						multiple,
						amountPerBet,
						rebate = 1,
					} = betting;

					return {
						playId: play.id,
						betcontent,
						weizhi,
						multiple,
						amountPerBet,
						rebate,
					};
				}),

				walletCode: state$.value.wallets.get('usedWalletData').toObject().code,
			};

			if (password) {
				body.password = password;
			}

			return rxjsApiFetcher.post(`lotteries/id=${action.lotteryId}/bettings`, body).pipe(
				mergeMap(payload => {
					return [
						betSuccessAction(payload.response),
						setIsUserValidatedByPasswordAction(true),
						clearBettingsAction(),
						updateWallet(payload.response.wallet),
						prependBettingRecordsAction(payload.response.results),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, betFailedAction)),
			);
		}),
	);
}

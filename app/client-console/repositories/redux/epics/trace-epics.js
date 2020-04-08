import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	mergeMap,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	traceActions,
	traceRecordActions,
	walletsActions,
	bettingActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_TRACE,
} = actionTypes;

const {
	traceSuccessAction,
	traceFailedAction,
} = traceActions;
const {
	prependLatestTraceRecordsAction,
} = traceRecordActions;
const {
	updateWallet,
} = walletsActions;
const {
	clearBettingsAction,
} = bettingActions;

export function startTraceEpic(action$, state$) {
	return action$.pipe(
		ofType(START_TRACE),
		switchMap((action) =>
			rxjsApiFetcher.post(`/lotteries/id=${action.lotteryId}/traces`, {
				walletCode: state$.value.wallets.getIn(['usedWalletData', 'code']),
				data: action.traces,
				password: action.password,
			}).pipe(
				map(payload => payload.response),
				mergeMap((payload) => {
					return [
						traceSuccessAction(),
						updateWallet(payload.wallet),
						clearBettingsAction(),
						prependLatestTraceRecordsAction(payload.results),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, traceFailedAction)),
			)
		),
	);
}

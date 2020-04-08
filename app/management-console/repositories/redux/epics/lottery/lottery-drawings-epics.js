import { ofType, } from 'redux-observable';
import {
	map,
	switchMap,
	catchError,
	debounceTime,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryDrawingsActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_LOTTERY_DRAWINGS,
	START_STOP_LOTTERY_DRAWING,
} = actionTypes;

const {
	fetchLotteryDrawingsSuccessAction,
	fetchLotteryDrawingsFailedAction,
	stopLotteryDrawingSuccessAction,
	stopLotteryDrawingFailedAction,
} = lotteryDrawingsActions;
const DEBOUNCE_TIME = 300;

export function fetchLotteryDrawingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_DRAWINGS),
		debounceTime(DEBOUNCE_TIME),
		switchMap((action) => {
			const { lotteryId } = action;
			const issue = action.issue ? action.issue : 0;
			const query = `issue[lt]=${issue}`;

			return rxjsApiFetcher.get(
				`lotteries/id=${lotteryId}/drawings?${query}`
			).pipe(
				map(payload => fetchLotteryDrawingsSuccessAction({
					drawings: payload.response,
					issue,
				})),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryDrawingsFailedAction))
			);
		}),
	);
}

export function stopLotteryDrawingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_STOP_LOTTERY_DRAWING),
		switchMap((action) => {
			const {
				lotteryId,
				issue,
			} = action;

			return rxjsApiFetcher.post(
				`lotteries/id=${lotteryId}/drawings/issue=${issue}/stopped`
			).pipe(
				map(payload => stopLotteryDrawingSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, stopLotteryDrawingFailedAction))
			);
		}),
	);
}

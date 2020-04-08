import { ofType, } from 'redux-observable';
import {
	map,
	switchMap,
	catchError,
	startWith,
	takeUntil,
} from 'rxjs/operators';
import {
	interval,
} from 'rxjs';
import {
	actionTypes,
	lotteryDrawingDetailActions,
} from '../../../../controller';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';
import { AUTO_UPDATE_SECONDS, } from '../../../../lib/utils';

const {
	START_FETCH_LOTTERY_DRAWING_DETAIL,
	START_CANCEL_LOTTERY_DRAWING,
	START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT,
	START_UPDATE_LOTTERY_DRAWING_OPENCODE,
	START_UPDATE_LOTTERY_DRAWING_INTERVAL,
	STOP_UPDATE_LOTTERY_DRAWING_INTERVAL,
} = actionTypes;

const {
	fetchLotteryDrawingDetailAction,
	fetchLotteryDrawingDetailSuccessAction,
	fetchLotteryDrawingDetailFailedAction,
	cancelLotteryDrawingSuccessAction,
	cancelLotteryDrawingFailedAction,
	fetchLotteryDrawingBettingsCountSuccessAction,
	fetchLotteryDrawingBettingsCountFailedAction,
	updateLotteryDrawingOpencodeSuccessAction,
	updateLotteryDrawingOpencodeFailedAction,
} = lotteryDrawingDetailActions;

export function fetchLotteryDrawingDetailEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_DRAWING_DETAIL),
		switchMap((action) => {
			const {
				lotteryId,
				issue,
			} = action;

			return rxjsApiFetcher.get(
				`lotteries/id=${lotteryId}/drawings/issue=${issue}`
			).pipe(
				map(payload => fetchLotteryDrawingDetailSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryDrawingDetailFailedAction))
			);
		}),
	);
}

export function cancelLotteryDrawingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_CANCEL_LOTTERY_DRAWING),
		switchMap((action) => {
			const {
				lotteryId,
				issue,
			} = action;

			return rxjsApiFetcher.post(
				`lotteries/id=${lotteryId}/drawings/issue=${issue}/canceled`
			).pipe(
				map(payload => cancelLotteryDrawingSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, cancelLotteryDrawingFailedAction))
			);
		}),
	);
}

export function fetchLotteryDrawingBettingsCountEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_DRAWING_BETTINGS_COUNT),
		switchMap((action) => {
			const {
				lotteryId,
				issue,
			} = action;

			return rxjsApiFetcher.get(
				`lotteries/id=${lotteryId}/drawings/issue=${issue}/bettings?count=1`
			).pipe(
				map(payload => fetchLotteryDrawingBettingsCountSuccessAction(payload.response.count)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryDrawingBettingsCountFailedAction))
			);
		}),
	);
}

export function updateLotteryDrawingOpencodeEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_DRAWING_OPENCODE),
		switchMap((action) => {
			const {
				lotteryId,
				issue,
				opencode,
			} = action;

			return rxjsApiFetcher.put(
				`lotteries/id=${lotteryId}/drawings/issue=${issue}/opencode`, {
					opencode,
				}
			).pipe(
				map(() => updateLotteryDrawingOpencodeSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, updateLotteryDrawingOpencodeFailedAction))
			);
		}),
	);
}

export function updateLotteryDrawingIntervalEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_DRAWING_INTERVAL),
		switchMap(action => (
			interval(AUTO_UPDATE_SECONDS * 1000).pipe(
				startWith(0),
				takeUntil(
					action$.pipe(ofType(STOP_UPDATE_LOTTERY_DRAWING_INTERVAL))
				),
				map(() => fetchLotteryDrawingDetailAction(action.lotteryId, action.issue)),
			)
		))
	);
}

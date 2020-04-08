import { ofType } from 'redux-observable';
import moment from 'moment';
import {
	interval,
	of,
	EMPTY,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
	switchMap,
	map,
	catchError,
	startWith,
	takeUntil,
	mergeMap,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryDrawingActions,
	walletsActions,
	bettingRecordActions,
	lotteryDrawingRecordActions,
} from '../../../controller';
import { getAPIBaseUrl, } from '../../../lib/general-utils';

const API_BASE_URL = getAPIBaseUrl();
const LATENCY = 3000;
const GET_LOTTERY_DRAWING = 'before=1&current=1';
const {
	START_FETCH_LOTTERY_DRAWINGS,
	START_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
	STOP_UPDATE_LOTTERY_DRAWINGS_INTERVAL,
	START_UPDATE_LOTTERY_DRAWINGS,
} = actionTypes;
const {
	fetchLotteryDrawingsAction,
	fetchLotteryDrawingsSuccessAction,
	fetchLotteryDrawingsFailedAction,
	startUpdateLotteryDrawingsAction,
} = lotteryDrawingActions;
const {
	fetchWalletsAction,
} = walletsActions;
const {
	fetchLatestBettingRecordsAction,
} = bettingRecordActions;
const {
	fetchLotteryDrawingRecordsAction,
} = lotteryDrawingRecordActions;

export function fetchLotteryDrawingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_DRAWINGS),
		switchMap((action) => (
			ajax({
				url: `${API_BASE_URL}/lotteries/id=${action.lotteryId}/drawings?${GET_LOTTERY_DRAWING}`,
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}).pipe(
				map(response => fetchLotteryDrawingsSuccessAction(action.lotteryId, response.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryDrawingsFailedAction)),
			)
		))
	);
}

export function updateLotteryDrawingsIntervalEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_DRAWINGS_INTERVAL),
		switchMap(action => (
			interval(LATENCY).pipe(
				startWith(0),
				takeUntil(
					action$.pipe(ofType(STOP_UPDATE_LOTTERY_DRAWINGS_INTERVAL))
				),
				map(() => startUpdateLotteryDrawingsAction(action.lotteryId)),
			)
		))
	);
}

export function updateLotteryDrawingsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_UPDATE_LOTTERY_DRAWINGS),
		switchMap((action) => {
			const {
				lotteryId,
			} = action;
			const lotteryDrawings = state$.value.lotteryDrawings.getIn(['data', lotteryId]);

			if (!lotteryDrawings) {
				return of(fetchLotteryDrawingsAction(lotteryId));
			}

			const now = moment();
			const currentDrawing = lotteryDrawings.current;
			const previousDrawing = lotteryDrawings.previous;
			const isCurrentDrawingClosed = moment(currentDrawing.closedAt).isBefore(now);

			if (isCurrentDrawingClosed) {
				return checkNextLotteryExisted(lotteryId, currentDrawing, previousDrawing);
			}

			return checkLotteryDrawingOpened(lotteryId, previousDrawing);
		})
	);
}

function checkLotteryDrawingOpened(lotteryId, previousDrawing = {}) {
	const now = moment();
	const isPreviousDrawingOpened = moment(previousDrawing.openedAt).isBefore(now);

	if (previousDrawing.opencode) {
		return EMPTY;
	}

	if (!isPreviousDrawingOpened) {
		return EMPTY;
	}

	return ajax({
		url: `${API_BASE_URL}/lotteries/id=${lotteryId}/drawings/issue=${previousDrawing.issue}`,
		method: 'HEAD',
		headers: {
			Accept: 'application/json',
		},
	}).pipe(
		mergeMap(() => {
			return [
				// TODO 確定獲取開獎的方式，修改拿取錢包與明細的時間點
				fetchLotteryDrawingsAction(lotteryId),
				fetchWalletsAction(),
				fetchLatestBettingRecordsAction(),
				fetchLotteryDrawingRecordsAction(lotteryId),
			];
		}),
		catchError(() => EMPTY),
	);
}

function checkNextLotteryExisted(lotteryId, currentDrawing = {}, previousDrawing = {}) {
	return ajax({
		url: `${API_BASE_URL}/lotteries/id=${lotteryId}/drawings/issue=${currentDrawing.issue}/next`,
		method: 'HEAD',
		headers: {
			Accept: 'application/json',
		},
	}).pipe(
		map(() => fetchLotteryDrawingsAction(lotteryId)),
		catchError(() => checkLotteryDrawingOpened(previousDrawing)),
	);
}

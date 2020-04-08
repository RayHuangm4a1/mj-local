import { ofType } from 'redux-observable';
import {
	of,
	race,
	concat,
} from 'rxjs';
import {
	take,
	mergeMap,
} from 'rxjs/operators';
import { catchErrorMessageForEpics, } from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryDrawingDetailActions,
	lotteryDrawingIssuePageActions,
} from '../../../../controller';

const {
	START_INIT_LOTTERY_DRAWING_ISSUE_PAGE,
	FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS,
	FETCH_LOTTERY_DRAWING_DETAIL_FAILED,
} = actionTypes;
const {
	initLotteryDrawingIssuePageSuccessAction,
	initLotteryDrawingIssuePageFailedAction,
} = lotteryDrawingIssuePageActions;
const {
	fetchLotteryDrawingDetailAction,
} = lotteryDrawingDetailActions;

export function initLotteryDrawingIssuePageEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INIT_LOTTERY_DRAWING_ISSUE_PAGE),
		mergeMap((action) => (
			concat(
				of(fetchLotteryDrawingDetailAction(action.lotteryId, action.issue)),
				race(
					action$.ofType(FETCH_LOTTERY_DRAWING_DETAIL_SUCCESS).pipe(
						take(1),
						mergeMap(() => [initLotteryDrawingIssuePageSuccessAction()]),
					),
					action$.ofType(FETCH_LOTTERY_DRAWING_DETAIL_FAILED).pipe(
						take(1),
						mergeMap(payload => catchErrorMessageForEpics(payload.error, initLotteryDrawingIssuePageFailedAction)),
					),
				)
			)
		)),
	);
}

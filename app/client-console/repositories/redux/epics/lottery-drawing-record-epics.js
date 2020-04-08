import { ofType, } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	actionTypes,
	lotteryDrawingRecordActions,
} from '../../../controller';
import { catchErrorMessageForEpics, } from '../../../../lib/epic-utils';
import {
	getAPIBaseUrl,
	rxjsApiFetcher,
} from '../../../lib/general-utils';

const { START_FETCH_LOTTERY_DRAWING_RECORDS, } = actionTypes;
const {
	fetchLotteryDrawingRecordsSuccessAction,
	fetchLotteryDrawingRecordsFailedAction,
} = lotteryDrawingRecordActions;

const apiBaseUrl = getAPIBaseUrl();

export function fetchLotteryDrawingRecordsEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_DRAWING_RECORDS),
		switchMap((action) => rxjsApiFetcher
			.get(`${apiBaseUrl}/lotteries/id=${action.lotteryId}/drawings`)
			.pipe(
				map(payload => fetchLotteryDrawingRecordsSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryDrawingRecordsFailedAction)),
			),
		),
	);
}

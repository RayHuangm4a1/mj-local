import { ofType } from 'redux-observable';
import {
	switchMap,
	map,
	catchError,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	bettingRecordDetailsActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_BETTING_RECORD_DETAIL,
} = actionTypes;
const {
	fetchBettingRecordDetailSuccessAction,
	fetchBettingRecordDetailFailedAction,
} = bettingRecordDetailsActions;

export function fetchBettingRecordDetailEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_BETTING_RECORD_DETAIL),
		switchMap((action) => rxjsApiFetcher
			.get(`/bettings/id=${action.id}`)
			.pipe(
				map(payload => fetchBettingRecordDetailSuccessAction(payload.response)),
				catchError(error => catchErrorMessageForEpics(error, fetchBettingRecordDetailFailedAction)),
			)
		),
	);
}

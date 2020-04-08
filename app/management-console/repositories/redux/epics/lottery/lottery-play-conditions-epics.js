import { ofType } from 'redux-observable';
import {
	map,
	switchMap,
	catchError
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../../lib/epic-utils';
import {
	actionTypes,
	lotteryPlayConditionsActions,
} from '../../../../controller';
import { rxjsApiFetcher, } from '../../../../lib/general-utils';

const {
	START_FETCH_LOTTERY_PLAY_CONDITIONS
} = actionTypes;

const {
	fetchLotteryPlayConditionsSuccessAction,
	fetchLotteryPlayConditionsFailedAction,
} = lotteryPlayConditionsActions;

export function fetchLotteryPlayConditionsEpic(action$) {
	return action$.pipe(
		ofType(START_FETCH_LOTTERY_PLAY_CONDITIONS),
		switchMap(({ lotteryId, playClassId }) => rxjsApiFetcher
			.get(`lotteries/id=${lotteryId}/play-classes/id=${playClassId}/play-conditions`)
			.pipe(
				map(payload => payload.response),
				map(response => fetchLotteryPlayConditionsSuccessAction(response)),
				catchError(error => catchErrorMessageForEpics(error, fetchLotteryPlayConditionsFailedAction))
			)
		)
	);
}

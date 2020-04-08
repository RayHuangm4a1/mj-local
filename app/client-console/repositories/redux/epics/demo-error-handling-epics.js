import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
	map,
	catchError,
	switchMap,
} from 'rxjs/operators';
import {
	actionTypes,
	demoErrorHandlingActions,
} from '../../../controller';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_FETCH_DEMO_ERROR_HANDLING,
} = actionTypes;
const {
	fetchDemoErrorHandlingSuccessAction,
	fetchDemoErrorHandlingFailedAction,
} = demoErrorHandlingActions;

export function fetchDemoErrorHandlingEpic(action$, state$) {
	return action$.pipe(
		ofType(START_FETCH_DEMO_ERROR_HANDLING),
		switchMap(() =>
			rxjsApiFetcher.get('lottery-classes123').pipe(
				map(() => fetchDemoErrorHandlingSuccessAction()),
				catchError(error => catchErrorMessageForEpics(error, fetchDemoErrorHandlingFailedAction)),
			)
		)
	);
}

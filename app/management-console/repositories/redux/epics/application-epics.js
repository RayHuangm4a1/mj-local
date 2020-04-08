import { ofType } from "redux-observable";
import { zip, } from 'rxjs';
import {
	take,
	catchError,
	switchMap,
	mergeMap,
} from 'rxjs/operators';
import {
	catchErrorMessageForEpics,
} from '../../../../lib/epic-utils';
import {
	actionTypes,
	applicationActions,
	platformActions,
	meActions,
} from '../../../controller';
import { rxjsApiFetcher, } from '../../../lib/general-utils';

const {
	START_INITIALIZE_APPLICATION,
} = actionTypes;
const {
	initializeApplicationSuccessAction,
	initializeApplicationFailedAction,
} = applicationActions;
const { 
	fetchPlatformSuccessAction,
} = platformActions;
const {
	fetchMeSuccessAction,
} = meActions;

export function initializeApplicationEpic(action$, state$) {
	return action$.pipe(
		ofType(START_INITIALIZE_APPLICATION),
		take(1),
		switchMap(() => (
			zip(
				rxjsApiFetcher.get('platform'),
				rxjsApiFetcher.get('staffs/id=me')
			).pipe(
				mergeMap((payloads) => {
					const [
						platform,
						me,
					] = payloads;

					return [
						fetchPlatformSuccessAction(platform.response),
						fetchMeSuccessAction(me.response),
						initializeApplicationSuccessAction(),
					];
				}),
				catchError(error => catchErrorMessageForEpics(error, initializeApplicationFailedAction)),
			)
		))
	);
}

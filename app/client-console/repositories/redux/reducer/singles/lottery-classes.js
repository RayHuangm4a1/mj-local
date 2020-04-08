import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_LOTTERY_CLASSES,
	FETCH_LOTTERY_CLASSES_SUCCESS,
	FETCH_LOTTERY_CLASSES_FAILED,
} = actionTypes;

/* Example
data:
[
	{
		_id: 'uuid-3',
		id: 4,
		platform: {
			_id: 'uuid-0',
			name: '平台1',
			code: 'pt',
			lotteryCodes: ['txffc', 'cqssc'],
			status: 'online',
			createdAt: '2018-09-29T17:23:40+00:00',
			updatedAt: '2018-09-29T17:23:40+00:00',
		},
		name: '快樂十分',
		code: 'klsf',
		status: 'online',
		createdAt: '2018-09-29T17:23:40+00:00',
		updatedAt: '2018-09-29T17:23:40+00:00',
	}
]
*/

const initialState = Map({
	data: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function lotteryClasses(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_CLASSES:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_LOTTERY_CLASSES_SUCCESS:
			return state
				.set('data', List(action.lotteryClasses.sort((a, b) => a.id - b.id)))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_LOTTERY_CLASSES_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

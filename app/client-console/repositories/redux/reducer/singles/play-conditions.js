import { Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	START_FETCH_PLAY_CONDITIONS,
	FETCH_PLAY_CONDITIONS_SUCCESS,
	FETCH_PLAY_CONDITIONS_FAILED,
} = actionTypes;

/* Example
playConditions:
[
	xinyoung: [
		{
			_id: "_id",
			id: 23,
			name: "斗牛",
			lottery: {
				_id: "_id",
				id: 16,
				name: "腾讯分分彩",
				code: "txffc",
			},
			playClass: {
				_id: "_id",
				name: "信用",
				code: "xinyong",
			},
			subconditions: [
				{
					id: 23001
					name: "斗牛",
					plays: [
						{
							_id: "_id",
							id: 53355
							name: "牛牛",
						},
					],
				},
			],
			createdAt: Date,
			updatedAt: Date,
		},
		...
	]
	standard: [{},...]
]
*/

const initialState = Map({
	data: Map({
		xinyong: [],
		standard: [],
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function playConditions(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_PLAY_CONDITIONS: {
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		}
		case FETCH_PLAY_CONDITIONS_SUCCESS: {
			const xinyongDatas = action.payload.filter(condition => condition.playClass.code === 'xinyong').sort((prev, next) => prev.id - next.id);
			const standardDatas = action.payload.filter(condition => condition.playClass.code === 'standard').sort((prev, next) => prev.id - next.id);
			const playConditions = Map({ xinyong: xinyongDatas, standard: standardDatas });

			return state
				.set('data', playConditions)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_PLAY_CONDITIONS_FAILED: {
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		}
		default: {
			return state;
		}
	}
}

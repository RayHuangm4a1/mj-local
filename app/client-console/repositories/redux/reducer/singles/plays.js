import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';
import keyBy from 'lodash/keyBy';

const {
	SET_PLAY_ID,
	RESET_PLAY_ID,
	START_FETCH_PLAYS,
	FETCH_PLAYS_SUCCESS,
	FETCH_PLAYS_FAILED,
} = actionTypes;

/* Example
data:[
	{
		"_id": 5d317236d69a040035430d2b,
		"status": "online",
		"id": 53000,
		"name": "大",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"awards": {
			"大": {
				"deltaBonus": 0
			}
		},
		"positions": [],
		"policy": {
			"pk": {
				"isEnabled": false,
				"content": {
					"count": 0
				}
			}
		}
	},
	{
        "_id": "5d41449ac8520800417f15dc",
        "status": "online",
        "id": 1,
        "name": "直选复式",
        "numerator": 1,
        "denominator": 100000,
        "unit": 2,
        "awards": {
            "中奖": {
                "deltaBonus": 0
            }
        },
        "positions": [
            {
                "name": "万",
                "isEnabled": true
            },
            {
                "name": "千",
                "isEnabled": true
            },
            {
                "name": "百",
                "isEnabled": true
            },
            {
                "name": "十",
                "isEnabled": true
            },
            {
                "name": "个",
                "isEnabled": true
            }
        ],
        "policy": {
            "pk": {
                "isEnabled": false,
                "content": {
                    "count": 0
                }
            }
        }
	},
	...
]
*/

const initialState = Map({
	data: Map(),
	playId: null,

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function plays(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_PLAYS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_PLAYS_SUCCESS:
			return state
				.set('data', Map(keyBy(action.payload, item => item.id)))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_PLAYS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case SET_PLAY_ID:
			return state.set('playId', action.playId);
		case RESET_PLAY_ID:
			return state.set('playId', null);
		default:
			return state;
	}
}

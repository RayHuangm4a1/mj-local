import { List, Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const {
	START_FETCH_LOTTERY_PLAYS,
	FETCH_LOTTERY_PLAYS_SUCCESS,
	FETCH_LOTTERY_PLAYS_FAILED,
	START_UPDATE_LOTTERY_PLAYS_STATUS,
	UPDATE_LOTTERY_PLAYS_STATUS_SUCCESS,
	UPDATE_LOTTERY_PLAYS_STATUS_FAILED,
	START_UPDATE_LOTTERY_PLAYS_BONUS,
	UPDATE_LOTTERY_PLAYS_BONUS_SUCCESS,
	UPDATE_LOTTERY_PLAYS_BONUS_FAILED,
} = actionTypes;

/* Example
TODO replace _id to id

plays:
[
	{
		_id: "5e60da13a59d3d00310010a3",
		status: "online",
		platform: {
			_id: "5cd151312dfa1d244dd54517"
		},
		lotteryClass: {
			status: "online",
			id: 2,
			name: "11选5",
			code: "11x5"
		},
		lottery: {
			id: 101,
			name: "山东11选5",
			code: "sd11x5",
			status: "online"
		},
		playClass: {
			id: 1,
			name: "官方",
			code: "standard"
		},
		playCondition: {
			id: 103,
			name: "不定位"
		},
		playSubcondition: {
			id: 103001,
			name: "不定位"
		},
		id: 211,
		name: "前三不定位",
		unit: 2,
		pk: {
			isSupported: false
		},
		awards: {
			中奖: {
				deltaBonus: 0,
				numerator: 1,
				denominator: 100000
			}
		},
		positions: [],
		policy: {
			bonusLimiting: {
				isEnabled: false,
				content: []
			},
			betLimiting: {
				isEnabled: false,
				content: []
			}
		},
		description: "从01-11中任意选择1个或1个以上号码。每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。 投注方案：01;开奖号码：01 * * * *，* 01 * * *，* * 01 * *，即中前三位。",
		__v: 0,
		createdAt: "2020-03-05T10:53:08.954Z",
		updatedAt: "2020-03-06T09:35:09.270Z"
	},
	...
]
*/

const initialState = Map({
	plays: List(),

	loadingStatus: NONE,
	loadingStatusMessage: "",
	updateLotteryPlaysStatusLoadingStatus: NONE,
	updateLotteryPlaysStatusLoadingStatusMessage: "",
	updateLotteryPlaysBonusLoadingStatus: NONE,
	updateLotteryPlaysBonusLoadingStatusMessage: "",
});

export default function lotteryPlays(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_LOTTERY_PLAYS:
			return state.set('loadingStatus', LOADING);
		case FETCH_LOTTERY_PLAYS_SUCCESS:
			return state
				.set('plays', List(action.plays))
				.set('loadingStatus', SUCCESS);
		case FETCH_LOTTERY_PLAYS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_UPDATE_LOTTERY_PLAYS_STATUS:
			return state.set('updateLotteryPlaysStatusLoadingStatus', LOADING);
		case UPDATE_LOTTERY_PLAYS_STATUS_SUCCESS:
			return state
				.set('updateLotteryPlaysStatusLoadingStatus', SUCCESS);
		case UPDATE_LOTTERY_PLAYS_STATUS_FAILED:
			return state
				.set('updateLotteryPlaysStatusLoadingStatus', FAILED)
				.set('updateLotteryPlaysStatusLoadingStatusMessage', action.errorMessage);
		case START_UPDATE_LOTTERY_PLAYS_BONUS:
			return state.set('updateLotteryPlaysBonusLoadingStatus', LOADING);
		case UPDATE_LOTTERY_PLAYS_BONUS_SUCCESS:
			return state
				.set('updateLotteryPlaysBonusLoadingStatus', SUCCESS);
		case UPDATE_LOTTERY_PLAYS_BONUS_FAILED:
			return state
				.set('updateLotteryPlaysBonusLoadingStatus', FAILED)
				.set('updateLotteryPlaysBonusLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';
import { BettingProcessStatusEnum, } from '../../../../lib/betting-utils';
import {
	calculateAmount,
} from '../../../../lib/betting-utils';

const {
	START_BET,
	BET_SUCCESS,
	BET_FAILED,
	ADD_BETTING,
	UPDATE_BETTING,
	SET_BETTINGS,
	CLEAR_BETTING,
	CLEAR_BETTINGS,
	UPDATE_ALL_BETTINGS_AMOUNT_PER_BET,
	RESET_STANDARD_BETTING_ELEMENT,
	SET_BETTING_PROCESS_INIT,
	SET_BETTING_PROCESS_NO_PASSWORD,
	CANCEL_BET,
} = actionTypes;

const {
	INIT,
	NO_PASSWORD,
} = BettingProcessStatusEnum;

/* Example
data:
List([
	// 官方 sample
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		lotteryName: '东京1.5分彩',
		betcontent: '12,12,12,12,12',
		weizhi: '万,千,百',
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	// 信用 sample
	{
		play: {
			_id: '1234123412341234',
			id: 15,
			name: '大',
			bonus: 1.987,
		},
		betcontent: '大',
		weizhi: '',
		multiple: 50,
		amountPerBet: 1,
		rebate: 0,
		amount: 50,
	},

	// ...
]),
*/

const initialState = Map({
	data: List(),
	betId: new Date().getTime().toString(),
	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',

	bettingProcessStatus: INIT,
});

export default function bettings(state = initialState, action) {
	switch (action.type) {
		case START_BET:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case BET_SUCCESS:
			return state
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case BET_FAILED:
			return state
				.set('bettingProcessStatus', INIT)
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case ADD_BETTING:
			return state
				.set('data', state.get('data').push(action.data));
		case UPDATE_BETTING: {
			const {
				index,
				data = {},
			} = action;
			const updatedDataList = state
				.get('data')
				.update(index, prevData => Object.assign(prevData, data, {
					amount: calculateAmount(data.amountPerBet, prevData.multiple),
				}));

			return state.set('data', updatedDataList);
		}
		case SET_BETTINGS:
			return state.set('data', List(action.bettings));
		case CLEAR_BETTING:
			return state
				.set('data', state.get('data').delete(action.index));
		case CLEAR_BETTINGS:
			return state
				.set('data', List());
		case UPDATE_ALL_BETTINGS_AMOUNT_PER_BET:
			return state
				.set('data', state.get('data').map(betting => Object.assign(betting, {
					amount: calculateAmount(action.amountPerBet, betting.multiple),
					amountPerBet: action.amountPerBet,
				})));
		case RESET_STANDARD_BETTING_ELEMENT:
			return state
				.set('betId', new Date().getTime().toString());
		case SET_BETTING_PROCESS_INIT:
			return state
				.set('bettingProcessStatus', INIT);
		case SET_BETTING_PROCESS_NO_PASSWORD:
			return state
				.set('bettingProcessStatus', NO_PASSWORD);
		case CANCEL_BET:
			return state.set('bettingProcessStatus', INIT);
		default:
			return state;
	}
}

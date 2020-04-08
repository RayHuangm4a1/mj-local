import { Map, } from 'immutable';
import { actionTypes, } from '../../../../controller';

const {
	SET_SELECTED_LOTTERY,
	CLEAR_SELECTED_LOTTERY,
} = actionTypes;

/* Example
selectedLottery: Map({
	_id: "5d317236d69a040035430221",
	status: "online",
	lotteryClass: {
		status: "online",
		_id: "5d317236d69a040035430216",
		id: 0,
		name: "时时彩",
		code: "ssc"
	},
	playClasses: [
		{
			id: 1,
			name: "官方",
			code: "standard"
		},
		{
			id: 2,
			name: "信用",
			code: "xinyong"
		}
	],
	id: 12,
	name: "东京1.5分彩",
	code: "dj1.5fc",
	numOfIssues: 920,
	createdAt: "2019-07-19T07:33:10.493Z",
	updatedAt: "2019-07-19T07:33:10.493Z"
})
*/

const initialState = Map({});


export default function selectedLottery(state = initialState, action) {
	switch (action.type) {
		case SET_SELECTED_LOTTERY:
			return Map(action.lottery);
		case CLEAR_SELECTED_LOTTERY:
			return Map();
		default:
			return state;
	}
}

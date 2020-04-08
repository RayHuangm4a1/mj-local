import { Map } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';

const {
	START_FETCH_FIXED_WAGES,
	FETCH_FIXED_WAGES_SUCCESS,
	FETCH_FIXED_WAGES_FAILED,
	START_UPDATE_USER_FIXED_WAGE,
	UPDATE_USER_FIXED_WAGE_SUCCESS,
	UPDATE_USER_FIXED_WAGE_FAILED,
} = actionTypes;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

/* Example
data: Map({
	children: [
		{
			"id": 13,
			"username": "test0301",
			"deltaBonus": -4,
			"bonus" 1954, // 拿到資料後就計算
			"fixedWage": 1.6,
			"createdAt": "2019-10-28T10:11:47.000Z",
			"wallets": [
				{
					"code": 100,
					"balance": 9745
				}
			],
			"teamStats": {
				"numOfUsers": 3,
				"balance": 30000
			}
		},
		...
	],
	page: 1,
	numOfItems: 7,
	numOfPages: 1,
}),
*/

const initialState = Map({
	data: Map({
		children: [],
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),
	loadingStatus: NONE,
	loadingStatusMessage: '',
	updateUserFixedWageStatus: NONE,
	updateUserFixedWageStatusMessage: '',
});

export default function fixedWages(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_FIXED_WAGES:
			return state.set('loadingStatus', LOADING);

		case FETCH_FIXED_WAGES_SUCCESS: {
			const {
				children,
				numOfItems,
				numOfPages,
				page,
			} = action;

			return state
				.set('data', Map({
					children,
					numOfItems,
					numOfPages,
					page,
				}))
				.set('loadingStatus', SUCCESS);
		}

		case FETCH_FIXED_WAGES_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_FIXED_WAGE:
			return state.set('updateUserFixedWageStatus', LOADING);

		case UPDATE_USER_FIXED_WAGE_SUCCESS: {
			const {
				childrenId,
				fixedWage,
			} = action;
			const children = state.get('data').toObject()['children'];
			const newChildren = children.map(item => {
				if (item.id === childrenId) {
					item.fixedWage = fixedWage;
					return item;
				} else {
					return item;
				}
			});

			return state
				.setIn(['data', 'children'], newChildren)
				.set('updateUserFixedWageStatus', SUCCESS);
		}

		case UPDATE_USER_FIXED_WAGE_FAILED:
			return state
				.set('updateUserFixedWageStatus', FAILED)
				.set('updateUserFixedWageStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

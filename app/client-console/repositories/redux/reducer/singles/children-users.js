import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';
import { UserTypeEnum } from '../../../../lib/enums';
const {
	AGENT,
	MEMBER,
} = UserTypeEnum;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_CREATE_CHILDREN_USER,
	CREATE_CHILDREN_USER_SUCCESS,
	CREATE_CHILDREN_USER_FAILED,
	START_FETCH_CHILDREN_USERS,
	FETCH_CHILDREN_USERS_SUCCESS,
	FETCH_CHILDREN_USERS_FAILED,
	START_UPDATE_CHILDREN_USER,
	UPDATE_CHILDREN_USER_SUCCESS,
	UPDATE_CHILDREN_USER_FAILED,
	START_TRANSFER_TO_USER,
	TRANSFER_TO_USER_SUCCESS,
	TRANSFER_TO_USER_FAILED,
} = actionTypes;

/* Example
"data": {
	"children": [
		{
			"id": 1,
			"username": "yio",
			"deltaBonus": 0,
			"wallets": [
				{
					"code": "primary",
					"balance": 9999
				}
			],
			"teamStats": {
				"numOfUsers": 3,
				"balance": 10000
			},
			"loginAt": "2019/4/19 17:08:17",
			"bonus" 1954, // 拿到資料後就計算
		},
		{
			"id": 2
			"username": "yio2",
			"deltaBonus": -2,
			"wallets": [
				{
					"code": "primary",
					"balance": 10000
				}
			],
			"teamStats": {
				"numOfUsers": 2,
				"balance": 10000
			}
			"loginAt": null,

		},
	],
	"ancestors": [
		{
			"id": 3,
			"username": "root-yio"
		},
		{
			"id": 1,
			"username": "yio"
		}
	],
	page: 1
	numOfItems: 12,
	numOfPages: 2,
},
*/

const initialState = Map({
	// 待列表 api 確認後再評估是否要把 reducer 分開
	data: Map({
		children: List(),
		ancestors: List(),
		page: 1,
		numOfItems: 0,
		numOfPages: 0,
	}),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	createLoadingStatus: NONE,
	createLoadingStatusMessage: '',
	updateChildrenUserLoadingStatus: NONE,
	updateChildrenUserLoadingStatusMessage: '',
	transferToUserLoadingStatus: NONE,
	transferToUserLoadingStatusMessage: '',
});

export default function childrenUsers(state = initialState, action) {
	switch (action.type) {
		case START_CREATE_CHILDREN_USER:
			return state.set('createLoadingStatus', LOADING);
		case CREATE_CHILDREN_USER_SUCCESS:
			return state
				.set('createLoadingStatus', SUCCESS);
		case CREATE_CHILDREN_USER_FAILED:
			return state
				.set('createLoadingStatus', FAILED)
				.set('createLoadingStatusMessage', action.errorMessage);
		case START_FETCH_CHILDREN_USERS:
			return state
				.set('loadingStatus', LOADING);
		case FETCH_CHILDREN_USERS_SUCCESS:
			return state
				.set('loadingStatus', SUCCESS)
				.setIn(['data', 'ancestors'], List(action.ancestors))
				.setIn(['data', 'children'], List(action.childrenUsers))
				.setIn(['data', 'page'], action.page)
				.setIn(['data', 'numOfItems'], action.numOfItems)
				.setIn(['data', 'numOfPages'], action.numOfPages);
		case FETCH_CHILDREN_USERS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_UPDATE_CHILDREN_USER:
			return state.set('updateChildrenUserLoadingStatus', LOADING);
		case UPDATE_CHILDREN_USER_SUCCESS: {
			const {
				childrenId,
				isAgent,
				bonus,
			} = action;

			const children = state.getIn(['data','children']).map(user => {
				if (user.id === childrenId) {
					return Object.assign({}, user, {
						type: isAgent ? AGENT : MEMBER,
						bonus,
					});
				} else {
					return user;
				}
			});

			return state
				.setIn(['data', 'children'], children)
				.set('updateChildrenUserLoadingStatus', SUCCESS);
		}
		case UPDATE_CHILDREN_USER_FAILED:
			return state
				.set('updateChildrenUserLoadingStatus', FAILED)
				.set('updateChildrenUserLoadingStatusMessage', action.errorMessage);

		case START_TRANSFER_TO_USER:
			return state.set('transferToUserLoadingStatus', LOADING);
		case TRANSFER_TO_USER_SUCCESS:
			return state.set('transferToUserLoadingStatus', SUCCESS);
		case TRANSFER_TO_USER_FAILED:
			return state
				.set('transferToUserLoadingStatus', FAILED)
				.set('transferToUserLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

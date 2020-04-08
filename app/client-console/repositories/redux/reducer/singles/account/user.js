import { Map, } from 'immutable';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { actionTypes, } from '../../../../../controller';
import defaultUserImage from '../../../../../images/member-center/default-user-image.png';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	START_FETCH_USER,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILED,
	START_UPDATE_USER_NICKNAME,
	UPDATE_USER_NICKNAME_SUCCESS,
	UPDATE_USER_NICKNAME_FAILED,
	START_UPDATE_USER_GREETING,
	UPDATE_USER_GREETING_SUCCESS,
	UPDATE_USER_GREETING_FAILED,
	SET_IS_USER_VALIDATED_BY_PASSWORD,
} = actionTypes;

/* Example
data:
Map({
	_id: '5d4d5c559b429123cdb44184',
	id: 13,
	numOfDescendants: 0,
	nickname: null (或字串'nickname'),
	greeting: null (或字串'hello world'),
	status: 'active',
	username: 'test0301',
	type: 1, //1,2,3,4,5,6,7,8
	parent: 'test01',
	deltaBonus: -2,
	isOnline: false,
	fixedWage: 0.2,

	bonus: 1946, // ****** 這邊是經過計算得來，會在拉資料的時候順便計算，省得一直在app裡面重複計算 ****

	// 會有分紅的資料，預計有 dividends/dividendsTemplate
	// 分紅模板
	dividends: [{ amount: 10, ratio: 10 }]
	dividendTemplate: [
		{
			amount: 10,
			ratio: 20,
		},
		...
	],

	//上次登入的資訊
	ip: '',
	geo: '',
	loginAt: '2019-08-09T11:43:17.578Z'
})
*/

const initialState = Map({
	data: Map(),
	isUserValidatedByPassword: false,

	loadingStatus: NONE,
	loadingStatusMessage: '',

	updateNicknameLoadingStatus: NONE,
	updateNicknameLoadingStatusMessage: '',

	updateGreetingLoadingStatus: NONE,
	updateGreetingLoadingStatusMessage: '',
});

export default function user(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER:
			return state.set('loadingStatus', LOADING);
		case FETCH_USER_SUCCESS: {
			const { user, } = action;
			// TODO check parameter name
			const { avatar, } = user;

			user.avatar = avatar ? avatar : defaultUserImage;

			return state
				.set('data', Map(user))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_USER_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_NICKNAME:
			return state.set('updateNicknameLoadingStatus', LOADING);
		case UPDATE_USER_NICKNAME_SUCCESS:
			return state
				.setIn(['data', 'nickname'], action.nickname)
				.set('updateNicknameLoadingStatus', SUCCESS);
		case UPDATE_USER_NICKNAME_FAILED:
			return state
				.set('updateNicknameLoadingStatus', FAILED)
				.set('updateNicknameLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_GREETING:
			return state.set('updateGreetingLoadingStatus', LOADING);
		case UPDATE_USER_GREETING_SUCCESS:
			return state
				.setIn(['data', 'greeting'], action.greeting)
				.set('updateGreetingLoadingStatus', SUCCESS);
		case UPDATE_USER_GREETING_FAILED:
			return state
				.set('updateGreetingLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateGreetingLoadingStatusMessage', action.errorMessage);

		case SET_IS_USER_VALIDATED_BY_PASSWORD:
			return state.set('isUserValidatedByPassword', action.isUserValidated);

		default:
			return state;
	}
}

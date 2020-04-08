import { Map, List, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const {
	START_UPDATE_FINANCE_NORMAL_LEVELS,
	UPDATE_FINANCE_NORMAL_LEVELS_SUCCESS,
	UPDATE_FINANCE_NORMAL_LEVELS_FAILED,

	START_UPDATE_FINANCE_SPECIAL_LEVELS,
	UPDATE_FINANCE_SPECIAL_LEVELS_SUCCESS,
	UPDATE_FINANCE_SPECIAL_LEVELS_FAILED,
	START_FETCH_FINANCE_LEVELS,
	FETCH_FINANCE_LEVELS_SUCCESS,
	FETCH_FINANCE_LEVELS_FAILED,
} = actionTypes;

/* example
Map({
	financeLevels: List([
		{
			"id": 1,
			"displayLevel": 1,								// 層級
			"type": 1,
			"name": "新人层",
			"registeredAfter": null,						// 加入起始日
			"registeredBefore": null,						// 加入截止日
			"numOfRegisteredDays": 0,
			"numOfDeposits": 0,
			"depositAmount": 0,
			"maxAmountPerDeposit": 0,
			"bettingAmount": 0,								// 消費金額
			"numOfWithdraws": 0,
			"withdrawalAmount": 0,
			"numOfUsers": 4,
			"description": null,
			"status": 1,
			"isBettingAmountGreaterThanDepositAmount": 1,	// 投注金額 > 充值金額
			"createdAt": "2020-03-17T07:59:47.000Z",
			"updatedAt": "2020-03-17T07:59:47.000Z"
		},
		...
	]),
	financeLevelNamesMap: Map({
		<levelId>: <levelName>,
		1: 新人层,
		...
	}),
	financeLevelOptions: List([
		{
			type: <levelType>,
			label: <levelName>,
			value: <levelId>,
		},
		{
			type: 1,
			label: 新人层,
			value: 1,
		},
		{
			type: 2,
			label: 自动加入层,
			value: 11,
		},
		...
	]),

	loadingStatus: NONE,
	loadingStatusMessage: '',
})
*/

const initialState = Map({
	financeLevels: List(),
	financeLevelNamesMap: Map(),
	financeLevelOptions: List(),

	loadingStatus: NONE,
	loadingStatusMessage: '',

	updateFinanceNormalLevelsLoadingStatus: NONE,
	updateFinanceNormalLevelsLoadingStatusMessage: '',

	updateFinanceSpecialLevelsLoadingStatus: NONE,
	updateFinanceSpecialLevelsLoadingStatusMessage: '',
});

export default function financeLevels(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_FINANCE_LEVELS:
			return state.set('loadingStatus', LOADING);
		case FETCH_FINANCE_LEVELS_SUCCESS:
		{
			const {
				financeLevels = [],
			} = action;
			const financeLevelNamesMap = convertLevelsToNamesMap(financeLevels);
			const financeLevelOptions = convertLevelsToOptions(financeLevels);

			return state
				.set('financeLevels', List(financeLevels))
				.set('financeLevelNamesMap', Map(financeLevelNamesMap))
				.set('financeLevelOptions', List(financeLevelOptions))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_FINANCE_LEVELS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_FINANCE_NORMAL_LEVELS:
			return state.set('updateFinanceNormalLevelsLoadingStatus', LOADING);
		case UPDATE_FINANCE_NORMAL_LEVELS_SUCCESS:
			return state.set('updateFinanceNormalLevelsLoadingStatus', SUCCESS);
		case UPDATE_FINANCE_NORMAL_LEVELS_FAILED:
			return state
				.set('updateFinanceNormalLevelsLoadingStatus', FAILED)
				.set('updateFinanceNormalLevelsLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_FINANCE_SPECIAL_LEVELS:
			return state.set('updateFinanceSpecialLevelsLoadingStatus', LOADING);
		case UPDATE_FINANCE_SPECIAL_LEVELS_SUCCESS:
			return state.set('updateFinanceSpecialLevelsLoadingStatus', SUCCESS);
		case UPDATE_FINANCE_SPECIAL_LEVELS_FAILED:
			return state
				.set('updateFinanceSpecialLevelsLoadingStatus', FAILED)
				.set('updateFinanceSpecialLevelsLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

function convertLevelsToNamesMap(financeLevels = []) {
	const initial = {};

	return financeLevels.reduce((namesMap, level) => {
		const {
			id,
			name,
		} = level;

		return {
			...namesMap,
			[id]: name,
		};
	}, initial);
}

function convertLevelsToOptions(financeLevels = []) {
	return financeLevels.map(({ id, name, type, }) => ({
		type,
		label: name,
		value: id,
	}));
}

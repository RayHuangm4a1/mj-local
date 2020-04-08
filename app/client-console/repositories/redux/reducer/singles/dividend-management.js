import { Map, List, } from 'immutable';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

const {
	START_FETCH_DIVIDENDS,
	FETCH_DIVIDENDS_SUCCESS,
	FETCH_DIVIDENDS_FAILED,
	START_FETCH_DIVIDEND_DURATIONS,
	FETCH_DIVIDEND_DURATIONS_SUCCESS,
	FETCH_DIVIDEND_DURATIONS_FAILED,
	START_FETCH_DIVIDEND_SETTINGS_SELF,
	FETCH_DIVIDEND_SETTINGS_SELF_SUCCESS,
	FETCH_DIVIDEND_SETTINGS_SELF_FAILED,
	START_FETCH_DIVIDEND_SETTINGS_TEMPLATE,
	FETCH_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
	FETCH_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
	START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE,
	UPDATE_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS,
	UPDATE_DIVIDEND_SETTINGS_TEMPLATE_FAILED,
	START_UPDATE_CHILDREN_DIVIDEND_SETTINGS,
	UPDATE_CHILDREN_DIVIDEND_SETTINGS_SUCCESS,
	UPDATE_CHILDREN_DIVIDEND_SETTINGS_FAILED,
	START_GRANT_DIVIDENDS,
	GRANT_DIVIDENDS_SUCCESS,
	GRANT_DIVIDENDS_FAILED,
} = actionTypes;

/* Example
{
	data: List({
		{
			id: 17,
			username: "test0305",
			deltaBonus: -12,
			dividendSettings: null,
			wallets: [
				{
					code: 100,
					balance: 0
				}
			],
			teamStats: {
				numOfUsers: 1,
				balance: 0
			},
			teamDurationStats: [
				{
					bettingReward: 320000,
					rebateAmount: 30000,
					activityAmount: 0,
					fixedWageAmount: 20000,
					bettingAmount: 400000,
					incentiveAmount: 0,
					status: 1,
					maxGrantAmount: 0,
					grantedAmount: 0,
					durationId: 3,
					profit: -30000
				}
			]
		},
		...
	}),
	// 分紅週期
	durationsData: List([
		{
			id: 1,
			closedAt: "2019-11-15",
			startedAt: "2019-11-01",
		},
		...
	]),

	// 我的
	selfData: List([
		{
			id: 6,
			userId: 12,
			type: 1,
			amount: 6,
			ratio: 19.78
		},
		...
	]),

	// 模板
	templateData: List([
		{
			id: 6,
			userId: 12,
			type: 1,
			amount: 6,
			ratio: 19.78
		},
		...
	]),
	numOfItems: 0,
	numOfPages: 0,

	loadingStatus: NONE,
	loadingStatusMessage: "",
	durationsLoadingStatus: NONE,
	durationsLoadingStatusMessage: "",
	selfLoadingStatus: NONE,
	selfLoadingStatusMessage: "",
	templateLoadingStatus: NONE,
	templateLoadingStatusMessage: "",
	updateTemplateLoadingStatus: NONE,
	updateTemplateLoadingStatusMessage: "",
	grantDividendLoadingStatus: NONE,
	grantDividendLoadingStatusMessage: "",
}
*/

const initialState = Map({
	data: List(),
	durationsData: List(),
	selfData: List(),
	templateData: List(),
	numOfItems: 0,
	numOfPages: 0,

	loadingStatus: NONE,
	loadingStatusMessage: '',
	durationsLoadingStatus: NONE,
	durationsLoadingStatusMessage: '',
	selfLoadingStatus: NONE,
	selfLoadingStatusMessage: '',
	templateLoadingStatus: NONE,
	templateLoadingStatusMessage: '',
	updateTemplateLoadingStatus: NONE,
	updateTemplateLoadingStatusMessage: '',
	updateChildrenDividendSettingsLoadingStatus: NONE,
	updateChildrenDividendSettingsLoadingStatusMessage: '',
	grantDividendLoadingStatus: NONE,
	grantDividendLoadingStatusMessage: '',
});

export default function dividendManagement(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_DIVIDENDS:
			return state.set('loadingStatus', LOADING);
		
		case FETCH_DIVIDENDS_SUCCESS: {
			const {
				dividends = {}
			} = action;
			const {
				data,
				numOfItems,
				numOfPages,
			} = dividends;

			return state
				.set('data', List(data))
				.set('numOfItems', numOfItems)
				.set('numOfPages', numOfPages)
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_DIVIDENDS_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_FETCH_DIVIDEND_DURATIONS:
			return state.set('durationsLoadingStatus', LOADING);
		case FETCH_DIVIDEND_DURATIONS_SUCCESS:
			return state
				.set('durationsLoadingStatus', SUCCESS)
				.set('durationsData', List(action.durations));
		case FETCH_DIVIDEND_DURATIONS_FAILED:
			return state
				.set('durationsLoadingStatus', FAILED)
				.set('durationsLoadingStatusMessage', action.errorMessage);

		case START_FETCH_DIVIDEND_SETTINGS_SELF:
			return state.set('selfLoadingStatus', LOADING);
		case FETCH_DIVIDEND_SETTINGS_SELF_SUCCESS:
			return state
				.set('selfData', List(action.dividendSettings))
				.set('selfLoadingStatus', SUCCESS);
		case FETCH_DIVIDEND_SETTINGS_SELF_FAILED:
			return state
				.set('selfLoadingStatus', FAILED)
				.set('selfLoadingStatusMessage', action.errorMessage);

		case START_FETCH_DIVIDEND_SETTINGS_TEMPLATE:
			return state.set('templateLoadingStatus', LOADING);
		case FETCH_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS:
			return state
				.set('templateData', List(action.template))
				.set('templateLoadingStatus', SUCCESS);
		case FETCH_DIVIDEND_SETTINGS_TEMPLATE_FAILED:
			return state
				.set('templateLoadingStatus', FAILED)
				.set('templateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_DIVIDEND_SETTINGS_TEMPLATE:
			return state.set('updateTemplateLoadingStatus', LOADING);
		case UPDATE_DIVIDEND_SETTINGS_TEMPLATE_SUCCESS:
			return state
				.set('templateData', List(action.template))
				.set('updateTemplateLoadingStatus', SUCCESS);
		case UPDATE_DIVIDEND_SETTINGS_TEMPLATE_FAILED:
			return state
				.set('updateTemplateLoadingStatus', FAILED)
				.set('updateTemplateLoadingStatusMessage', action.errorMessage);
		case START_UPDATE_CHILDREN_DIVIDEND_SETTINGS:
			return state.set('updateChildrenDividendSettingsLoadingStatus', LOADING);
		case UPDATE_CHILDREN_DIVIDEND_SETTINGS_SUCCESS:
			return state.set('updateChildrenDividendSettingsLoadingStatus', SUCCESS);
		case UPDATE_CHILDREN_DIVIDEND_SETTINGS_FAILED:
			return state
				.set('updateChildrenDividendSettingsLoadingStatus', FAILED)
				.set('updateChildrenDividendSettingsLoadingStatusMessage', action.errorMessage);
		case START_GRANT_DIVIDENDS:
			return state.set('grantDividendLoadingStatus', LOADING);
		case GRANT_DIVIDENDS_SUCCESS: {
			const result = action.payload;
			const data = state.get('data').map((item) => {
				if (item.id === result.id) {
					item.teamDurationStats = result.teamDurationStats;
					return item;
				} else {
					return item;
				}
			});

			return state
				.set('data', data)
				.set('grantDividendLoadingStatus', SUCCESS);
		}
		case GRANT_DIVIDENDS_FAILED:
			return state
				.set('grantDividendLoadingStatus', FAILED)
				.set('grantDividendLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}


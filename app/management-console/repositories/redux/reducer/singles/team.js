import { Map, List, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_FETCH_TEAM_CHILDREN,
	FETCH_TEAM_CHILDREN_SUCCESS,
	FETCH_TEAM_CHILDREN_FAILED,
	START_FETCH_TEAM_STATS,
	FETCH_TEAM_STATS_SUCCESS,
	FETCH_TEAM_STATS_FAILED,
	START_ENABLE_TEAM_ACCOUNT,
	ENABLE_TEAM_ACCOUNT_SUCCESS,
	ENABLE_TEAM_ACCOUNT_FAILED,
	START_DISABLE_TEAM_ACCOUNT,
	DISABLE_TEAM_ACCOUNT_SUCCESS,
	DISABLE_TEAM_ACCOUNT_FAILED,
	START_ENABLE_TEAM_BETTING,
	ENABLE_TEAM_BETTING_SUCCESS,
	ENABLE_TEAM_BETTING_FAILED,
	START_DISABLE_TEAM_BETTING,
	DISABLE_TEAM_BETTING_SUCCESS,
	DISABLE_TEAM_BETTING_FAILED,
	START_ENABLE_TEAM_DEPOSIT,
	ENABLE_TEAM_DEPOSIT_SUCCESS,
	ENABLE_TEAM_DEPOSIT_FAILED,
	START_DISABLE_TEAM_DEPOSIT,
	DISABLE_TEAM_DEPOSIT_SUCCESS,
	DISABLE_TEAM_DEPOSIT_FAILED,
	START_ENABLE_TEAM_FUNDS,
	ENABLE_TEAM_FUNDS_SUCCESS,
	ENABLE_TEAM_FUNDS_FAILED,
	START_DISABLE_TEAM_FUNDS,
	DISABLE_TEAM_FUNDS_SUCCESS,
	DISABLE_TEAM_FUNDS_FAILED,
	START_ENABLE_TEAM_SUBORDINATE_CREATION,
	ENABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	ENABLE_TEAM_SUBORDINATE_CREATION_FAILED,
	START_DISABLE_TEAM_SUBORDINATE_CREATION,
	DISABLE_TEAM_SUBORDINATE_CREATION_SUCCESS,
	DISABLE_TEAM_SUBORDINATE_CREATION_FAILED,
	START_ENABLE_TEAM_WITHDRAW,
	ENABLE_TEAM_WITHDRAW_SUCCESS,
	ENABLE_TEAM_WITHDRAW_FAILED,
	START_DISABLE_TEAM_WITHDRAW,
	DISABLE_TEAM_WITHDRAW_SUCCESS,
	DISABLE_TEAM_WITHDRAW_FAILED,
} = actionTypes;

/*
Map {
	data: Map{
		"children": List([
			{
				"isNormal": true,
				"id": 13,
				"username": "test0301",
				"accountId": "5d4aea86e48b697af60c1212",
				"type": 3,
				"deltaBonus": -4,
				"fixedWage": 1.6,
				"nickname": "test0301",
				"greeting": null,
				"createdBy": "admin",
				"ip": null,
				"geo": null,
				"loginAt": null,
				"payer": null,
				"levelId": 1,
				"levelExpiredAt": "9999-12-31",
				"statuses": {
					"isBetable": true,
					"isBlocked": false,
					"isFundsable": true,
					"hasWithdrawn": false,
					"isDepositable": true,
					"isTeamBetable": true,
					"isTeamBlocked": false,
					"isDividendable": true,
					"isTransferable": true,
					"isWithdrawable": true,
					"isTeamFundsable": true,
					"isEverInRiskLevel": false,
					"isTeamDepositable": true,
					"isTeamWithdrawable": true,
					"isChildrenCreatable": true,
					"isEnableDepositZhuandian": true,
					"isEnableIncentiveZhuandian": true
				},
				"createdAt": "2020-02-15T05:43:20.000Z",
				"updatedAt": "2020-02-15T05:43:20.000Z",
				"bankCards": [],
				"wallets": [
					{
						"code": 100,
						"balance": 10000
					}
				]
			}
		]),
		"ancestors": List([
			{
				"id": 1,
				"username": "mj-root"
			},
			{
				"id": 11,
				"username": "zhaoshang01"
			}
		]),
		"numOfItems": 1,
		"numOfPages": 1,
	};
	stats: Map({
		userId: 1,
		username: "root",
		walletCode: 100,
		numOfUsers: 4,
		numOfZeroBalanceUsers: 0,
		numOfNonZeroBalanceUsers: 0,
		balance: 30000,
		depositAmount: 0,
		withdrawalAmount: 0,
		createdAt: "2020-03-13T09:33:50.000Z",
		updatedAt: "2020-03-13T09:33:50.000Z"
	})
}
*/

const initialState = Map({
	data: Map({
		children: List(),
		ancestors: List(),
		numOfItems: 0,
		numOfPages: 0,
	}),
	stats: Map(),

	loadingStatus: NONE,
	loadingStatusMessage: '',
	statsLoadingStatus: NONE,
	statsLoadingStatusMessage: '',
	enableLoadingStatus: NONE,
	enableLoadingStatusMessage: '',
	disableLoadingStatus: NONE,
	disableLoadingStatusMessage: '',
});

export default function team(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_TEAM_CHILDREN:
			return state.set('loadingStatus', LOADING);
		case FETCH_TEAM_CHILDREN_SUCCESS: {
			const {
				children,
				ancestors,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.setIn(['data', 'children'], List(children))
				.setIn(['data', 'ancestors'], List(ancestors))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_TEAM_CHILDREN_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		case START_FETCH_TEAM_STATS:
			return state.set('statsLoadingStatus', LOADING);
		case FETCH_TEAM_STATS_SUCCESS: {
			const { stats } = action;

			return state
				.set('stats', Map(stats))
				.set('statsLoadingStatus', SUCCESS);
		}
		case FETCH_TEAM_STATS_FAILED:
			return state
				.set('statsLoadingStatus', FAILED)
				.set('statsLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_ACCOUNT:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_ACCOUNT_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_ACCOUNT_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_ACCOUNT:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_ACCOUNT_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_ACCOUNT_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_BETTING:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_BETTING_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_BETTING_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_BETTING:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_BETTING_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_BETTING_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_DEPOSIT:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_DEPOSIT_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_DEPOSIT_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_DEPOSIT:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_DEPOSIT_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_DEPOSIT_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_FUNDS:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_FUNDS_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_FUNDS_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_FUNDS:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_FUNDS_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_FUNDS_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_SUBORDINATE_CREATION:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_SUBORDINATE_CREATION_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_SUBORDINATE_CREATION_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_SUBORDINATE_CREATION:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_SUBORDINATE_CREATION_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_SUBORDINATE_CREATION_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_WITHDRAW:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_WITHDRAW_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_WITHDRAW_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);
		case START_DISABLE_TEAM_WITHDRAW:
			return state.set('disableLoadingStatus', LOADING);
		case DISABLE_TEAM_WITHDRAW_SUCCESS:
			return state.set('disableLoadingStatus', SUCCESS);
		case DISABLE_TEAM_WITHDRAW_FAILED:
			return state
				.set('disableLoadingStatus', FAILED)
				.set('disableLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

import { List, Map, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const {
	START_FETCH_USERS,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILED,
} = actionTypes;

/*
Data Example
data: [
	users: [
		{
			isNormal: true,
			id: 1,
			username: "root",
			accountId: "5d4aea86e48b697af60c1213",
			type: 1,
			deltaBonus: 0,
			fixedWage: 2,
			nickname: "root",
			greeting: null,
			createdBy: "admin",
			ip: null,
			geo: null,
			loginAt: null,
			payer: null,
			levelId: 1,
			levelExpiredAt: "9999-12-31",
			statuses: {
				isBetable: true,
				isBlocked: false,
				isFundsable: true,
				hasWithdrawn: false,
				isDepositable: true,
				isTeamBetable: true,
				isTeamBlocked: false,
				isDividendable: true,
				isTransferable: true,
				isWithdrawable: true,
				isTeamFundsable: true,
				isEverInRiskLevel: false,
				isTeamDepositable: true,
				isTeamWithdrawable: true,
				isChildrenCreatable: true,
				isEnableDepositZhuandian: true,
				isEnableIncentiveZhuandian: true
			},
			loginPasswordUpdatedAt: "2020-03-13T09:33:47.000Z",
			betPasswordUpdatedAt: null,
			createdAt: "2020-03-13T09:33:50.000Z",
			updatedAt: "2020-03-13T09:33:50.000Z",
			bankCards: [],
			wallets: [
				{
					code: 100,
					balance: 0
				}
			],
			teamStats: {
				numOfUsers: 4,
				balance: 30000
			}
		},
			...
		]
	},
	numOfPages: 1,
	numOfItems: 4
]
*/

const initialState = Map({
	data: Map({
		users: List(),

		numOfItems: 0,
		numOfPages: 1,
	}),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function users(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USERS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_USERS_SUCCESS:
		{
			const {
				data = {},
				numOfItems,
				numOfPages,
			} = action;

			return state
				.setIn(['data', 'users'], List(data.users))
				.setIn(['data', 'numOfItems'], numOfItems)
				.setIn(['data', 'numOfPages'], numOfPages)
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_USERS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}

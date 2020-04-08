import { List, Map } from 'immutable';
import {
	START_FETCH_CASH_SYSTEM_BANK_DEPOSIT,
	FETCH_CASH_SYSTEM_BANK_DEPOSIT_SUCCESS,
	FETCH_CASH_SYSTEM_BANK_DEPOSIT_FAILED,
} from "../../../../../controller/actions/action-types";
import { LoadingStatusEnum, } from "../../../../../lib/enums";

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

/* example
data: List([
	{
		id: 1,
		userId: 12,
		username: "test01",
		userLevelId: 1,
		departmentId: 1,
		depositClassId: 1,
		walletCode: 100,
		operatorId: null,
		operatorUsername: null,
		bankId: 1000000,
		bankName: "邮政储汇",
		bankAccountId: 1,
		bankAccountNumber: "0129000100000123456",
		amount: 49.01,
		payer: "測試者",
		payerAccountNumber: null,
		fee: 0,
		damaAmount: null,
		postscript: null,
		description: null,
		depositAmountId: 1,
		status: 1,
		expiredAt: "2020-02-07T06:08:02.000Z",
		confirmedAt: null,
		createdAt: "2020-02-07T04:08:02.000Z",
		updatedAt: "2020-02-07T04:08:02.000Z"
	},
	...
])
*/

const initialState = Map({
	data: List(),
	numOfItems: 0,
	numOfPages: 0,

	loadingStatus: NONE,
	loadingStatusMessage: '',
});

export default function cashSystemBankDepositPage(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_CASH_SYSTEM_BANK_DEPOSIT: 
			return state.set('loadingStatus', LOADING);

		case FETCH_CASH_SYSTEM_BANK_DEPOSIT_SUCCESS: {
			const {
				data,
				numOfItems,
				numOfPages,
			} = action;

			return state
				.set('data', List(data))
				.set('numOfItems', numOfItems)
				.set('numOfPages', numOfPages)
				.set('loadingStatus', SUCCESS);
		}

		case FETCH_CASH_SYSTEM_BANK_DEPOSIT_FAILED:
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

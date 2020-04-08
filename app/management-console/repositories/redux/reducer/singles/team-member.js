import { Map, } from 'immutable';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const {
	START_ENABLE_TEAM_MEMBER_ACCOUNT,
	ENABLE_TEAM_MEMBER_ACCOUNT_SUCCESS,
	ENABLE_TEAM_MEMBER_ACCOUNT_FAILED,
	START_ENABLE_TEAM_MEMBER_BETTING,
	ENABLE_TEAM_MEMBER_BETTING_SUCCESS,
	ENABLE_TEAM_MEMBER_BETTING_FAILED,
	START_ENABLE_TEAM_MEMBER_DEPOSIT,
	ENABLE_TEAM_MEMBER_DEPOSIT_SUCCESS,
	ENABLE_TEAM_MEMBER_DEPOSIT_FAILED,
	START_ENABLE_TEAM_MEMBER_FUNDS,
	ENABLE_TEAM_MEMBER_FUNDS_SUCCESS,
	ENABLE_TEAM_MEMBER_FUNDS_FAILED,
	START_ENABLE_TEAM_MEMBER_WITHDRAW,
	ENABLE_TEAM_MEMBER_WITHDRAW_SUCCESS,
	ENABLE_TEAM_MEMBER_WITHDRAW_FAILED,
} = actionTypes;

const initialState = Map({
	enableLoadingStatus: NONE,
	enableLoadingStatusMessage: '',
});

export default function teamMember(state = initialState, action) {
	switch (action.type) {
		case START_ENABLE_TEAM_MEMBER_ACCOUNT:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_MEMBER_ACCOUNT_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_MEMBER_ACCOUNT_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_MEMBER_BETTING:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_MEMBER_BETTING_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_MEMBER_BETTING_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_MEMBER_DEPOSIT:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_MEMBER_DEPOSIT_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_MEMBER_DEPOSIT_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_MEMBER_FUNDS:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_MEMBER_FUNDS_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_MEMBER_FUNDS_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);

		case START_ENABLE_TEAM_MEMBER_WITHDRAW:
			return state.set('enableLoadingStatus', LOADING);
		case ENABLE_TEAM_MEMBER_WITHDRAW_SUCCESS:
			return state.set('enableLoadingStatus', SUCCESS);
		case ENABLE_TEAM_MEMBER_WITHDRAW_FAILED:
			return state
				.set('enableLoadingStatus', FAILED)
				.set('enableLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

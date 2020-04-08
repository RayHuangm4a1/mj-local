import {
	START_FETCH_BETTING_RECORD_DETAIL,
	FETCH_BETTING_RECORD_DETAIL_SUCESS,
	FETCH_BETTING_RECORD_DETAIL_FAILED,
	RESET_BETTING_RECORDS_DETAILS,
} from './action-types';

export function fetchBettingRecordDetailAction(id) {
	return {
		type: START_FETCH_BETTING_RECORD_DETAIL,
		id,
	};
}
export function fetchBettingRecordDetailSuccessAction(bettingRecord) {
	return {
		type: FETCH_BETTING_RECORD_DETAIL_SUCESS,
		bettingRecord
	};
}
export function fetchBettingRecordDetailFailedAction(error, errorMessage) {
	return {
		type: FETCH_BETTING_RECORD_DETAIL_FAILED,
		error,
		errorMessage,
	};
}

export function resetBettingRecordDetailsAction() {
	return {
		type: RESET_BETTING_RECORDS_DETAILS,
	};
}

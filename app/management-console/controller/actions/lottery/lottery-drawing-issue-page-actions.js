import {
	START_INIT_LOTTERY_DRAWING_ISSUE_PAGE,
	INIT_LOTTERY_DRAWING_ISSUE_PAGE_SUCCESS,
	INIT_LOTTERY_DRAWING_ISSUE_PAGE_FAILED,
} from '../action-types';

export function startInitLotteryDrawingIssuePageAction(lotteryId, issue) {
	return {
		type: START_INIT_LOTTERY_DRAWING_ISSUE_PAGE,
		lotteryId,
		issue,
	};
}

export function initLotteryDrawingIssuePageSuccessAction() {
	return {
		type: INIT_LOTTERY_DRAWING_ISSUE_PAGE_SUCCESS,
	};
}

export function initLotteryDrawingIssuePageFailedAction(error, errorMessage) {
	return {
		type: INIT_LOTTERY_DRAWING_ISSUE_PAGE_FAILED,
		error,
		errorMessage,
	};
}

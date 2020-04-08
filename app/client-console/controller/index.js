import * as actionTypes from './actions/action-types';
import * as notifyHandlingActions from './actions/notify-handling-actions';
import * as lotteryActions from './actions/lottery-actions';
import * as userActions from './actions/user-actions';
import * as platformActions from './actions/platform-actions';
import * as bettingActions from './actions/betting-actions';
import * as bettingRecordActions from './actions/betting-record-actions';
import * as bettingRecordDetailsActions from './actions/betting-record-details-actions';
import * as traceActions from './actions/trace-actions';
import * as traceRecordActions from './actions/trace-record-actions';
import * as traceRecordBettingActions from './actions/trace-record-betting-actions';
import * as teamBettingRecordActions from './actions/team-betting-record-actions';
import * as teamTraceRecordsActions from './actions/team-trace-records-actions';
import * as lotteryDrawingActions from './actions/lottery-drawing-actions';
import * as playConditionActions from './actions/play-condition-actions';
import * as playActions from './actions/play-actions';
import * as lotteryClassActions from './actions/lottery-class-actions';
import * as applicationActions from './actions/application-actions';
import * as selectedLotteryActions from './actions/selected-lottery-actions';
import * as xinYongQuickSelectAmountPerBetActions from './actions/xin-yong-quick-select-amount-per-bet-actions';
import * as lotteryDrawingRecordActions from './actions/lottery-drawing-record-actions';
import * as walletsActions from './actions/wallets-actions';
import * as authActions from './actions/auth-actions';
import * as transactionLogActions from './actions/transaction-log-actions';
import * as announcementActions from './actions/announcement-actions';
import * as userSecurityActions from './actions/member/user-security-actions';
import * as securityQuestionActions from './actions/member/security-question-actions';
import * as userStatsActions from './actions/member/user-stats-actions';
import * as fixedWageActions from './actions/agent/fixed-wage-actions';
import * as dividendManagementActions from './actions/dividend-management-actions';
import * as teamReportsActions from './actions/team-reports-actions';
import * as dividendTransactionLogActions from './actions/member/dividend-transaction-log-actions';
import * as userBankCardsAction from './actions/member/user-bank-cards-actions';
import * as myLotteryCollectionsActions from './actions/my-lottery-collections-actions';
import * as teamStatsActions from './actions/team-stats-actions';

//TODO remove after demo
import * as demoErrorHandlingActions from './actions/demo-error-handling-actions';

export {
	actionTypes,
	notifyHandlingActions,
	lotteryActions,
	userActions,
	platformActions,
	bettingActions,
	bettingRecordActions,
	bettingRecordDetailsActions,
	traceActions,
	traceRecordActions,
	traceRecordBettingActions,
	teamBettingRecordActions,
	lotteryDrawingActions,
	playConditionActions,
	playActions,
	lotteryClassActions,
	applicationActions,
	selectedLotteryActions,
	xinYongQuickSelectAmountPerBetActions,
	lotteryDrawingRecordActions,
	walletsActions,
	authActions,
	transactionLogActions,
	announcementActions,
	demoErrorHandlingActions,
	userSecurityActions,
	securityQuestionActions,
	userStatsActions,
	fixedWageActions,
	dividendManagementActions,
	teamReportsActions,
	dividendTransactionLogActions,
	userBankCardsAction,
	myLotteryCollectionsActions,
	teamTraceRecordsActions,
	teamStatsActions,
};

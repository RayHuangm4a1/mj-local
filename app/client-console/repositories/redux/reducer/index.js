import { combineReducers } from 'redux';
import { actionTypes } from '../../../controller';
import user from './singles/account/user';
import myLotteryCollections from './singles/my-lottery-collections';
import childrenUsers from './singles/children-users';
import platform from './singles/platform';
import lotteryClasses from './singles/lottery-classes';
import lotteries from './singles/lotteries';
import lotteryDrawings from './singles/lottery-drawings';
import playClasses from './singles/play-classes';
import playConditions from './singles/play-conditions';
import plays from './singles/plays';
import bettings from './singles/bettings';
import bettingRecords from './singles/betting-records';
import bettingRecordDetails from './singles/betting-record-details';
import traces from './singles/traces';
import traceRecords from './singles/trace-records';
import traceRecordBettings from './singles/trace-record-bettings';
import application from './singles/application';
import selectedLottery from './singles/selected-lottery';
import xinYongQuickSelectAmountPerBet from './singles/xin-yong-quick-select-amount-per-bet';
import lotteryDrawingRecords from './singles/lottery-drawing-records';
import wallets from './singles/wallets';
import auth from './singles/auth';
import transactionLogs from './singles/member/transaction-logs';
import dividendTransactionLogs from './singles/member/dividend-transaction-logs';
import userSecurity from './singles/member/user-security';
import userStats from './singles/member/user-stats';
import announcements from './singles/announcements';
//TODO remove after demo
import demoErrorHandling from './singles/demo-error-handling';
import securityQuestions from './singles/member/security-questions';
import fixedWages from './singles/agent/fixed-wages';
import dividendManagement from './singles/dividend-management';
import userBankCards from './singles/member/user-bank-cards';
// my team
import myTeam from './singles/my-team';

const { LOGOUT_SUCCESS } = actionTypes;

const appReducer = combineReducers({
	user,
	childrenUsers,
	application,
	platform,

	lotteryClasses,
	lotteries,
	lotteryDrawingRecords,
	lotteryDrawings,
	selectedLottery,
	myLotteryCollections,

	playClasses,
	playConditions,
	plays,

	bettings,
	bettingRecords,
	bettingRecordDetails,
	traces,
	traceRecords,
	traceRecordBettings,

	xinYongQuickSelectAmountPerBet,

	wallets,

	auth,

	transactionLogs,
	dividendTransactionLogs,
	userSecurity,
	userStats,
	userBankCards,

	announcements,

	demoErrorHandling,
	securityQuestions,

	fixedWages,

	dividendManagement,

	myTeam,
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_SUCCESS) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;

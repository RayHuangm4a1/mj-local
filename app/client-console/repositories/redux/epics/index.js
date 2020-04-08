import { combineEpics } from 'redux-observable';

import {
	fetchPlatformEpic,
} from './platform-epics';
import {
	fetchLotteriesEpic,
} from './lottery-epics';
import {
	startBetEpic,
} from './betting-epics';
import {
	startTraceEpic,
} from './trace-epics';
import {
	fetchBettingRecordsEpic,
	discardBettingRecordEpic,
	fetchLatestBettingRecordsEpic,
} from './betting-record-epics';
import {
	fetchBettingRecordDetailEpic,
} from './betting-record-details-epics';
import {
	fetchTraceRecordsEpic,
	fetchTraceRecordEpic,
	fetchLatestTraceRecordsEpic,
} from './trace-record-epics';
import {
	fetchTraceRecordBettingsEpic,
	discardTraceRecordBettingEpic,
} from './trace-record-betting-epics';
import {
	fetchLotteryDrawingsEpic,
	updateLotteryDrawingsIntervalEpic,
	updateLotteryDrawingsEpic,
} from './lottery-drawing-epics';
import {
	fetchPlayConditionsEpic,
} from './play-condition-epics';
import {
	fetchLotteryClassesEpic,
} from './lottery-class-epics';
import {
	fetchPlaysEpic,
} from './play-epics';
import {
	fetchLotteryDrawingRecordsEpic
} from './lottery-drawing-record-epics';
import {
	initializeApplicationEpic,
} from './application-epics';
import {
	fetchUserEpic,
	startCreateChildrenUserEpic,
	startUpdateUserNicknameEpic,
	startUpdateUserGreetingEpic,
	fetchChildrenUsersEpic,
	transferToUserEpic,
	updateChildrenUserEpic,
} from './account/user-epics';
import {
	fetchWalletsEpic,
} from './wallets-epics';
import {
	loginEpic,
	logoutEpic,
	loginViaGoogleTotpEpic,
	startCheckAuthEpic,

	geoValidateWithPayerEpic,
	fetchCaptchaEpic,
	checkCaptchaEpic,

	updateDefaultPasswordEpic,
	fetchPasswordResetMethodsEpic,
	resetPasswordViaSecurityQuestionsEpic,
	resetPasswordViaGoogleTotpEpic,
} from './auth-epics';
import {
	fetchAnnouncementsEpic,
} from './announcement-epics';
import {
	fetchMyLotteryCollectionsEpic,
	updateMyLotteryCollectionsEpic,
} from './my-lottery-collections-epics';

// member
import {
	fetchTransactionLogsEpic,
} from './member/transaction-log-epics';
import {
	fetchDividendTransactionLogsEpic,
} from './member/dividend-transaction-log-epics';
import {
	fetchSecurityQuestionEpic,
} from './member/security-question-epics';
import {
	fetchUserSecurityEpic,
	updateUserLoginPasswordEpic,
	updateUserBetPasswordEpic,
	updateUserFundsPasswordEpic,
	enableUserLoginGeoValidationEpic,
	disableUserLoginGeoValidationEpic,
	updateUserSecurityQuestionsEpic,
	bindGoogleAuthenticationEpic,
	unbindGoogleAuthenticationEpic,
	updateUserLoginPasswordViaSecurityQuestionsEpic,
	updateUserBetPasswordViaSecurityQuestionsEpic,
	updateUserFundsPasswordViaSecurityQuestionsEpic,
	updateUserLoginPasswordViaGoogleTotpEpic,
	updateUserBetPasswordViaGoogleTotpEpic,
	updateUserFundsPasswordViaGoogleTotpEpic,
} from './member/user-security-epics';
import {
	fetchUserStatsEpic,
} from './member/user-stats-epics';
import {
	fetchUserBankCardsEpic,
	createUserBankCardEpic,
	deleteUserBankCardEpic,
} from './member/user-bank-cards-epic';

//TODO remove after demo
import {
	fetchDemoErrorHandlingEpic
} from './demo-error-handling-epics';
// agent
import {
	fetchFixedWageEpic,
	updateUserFixedWageEpic,
} from './agent/fixed-wage-epics';

// dividend-manangement
import {
	fetchDividendsEpic,
	fetchDividendDurationsEpic,
	fetchUserDividendSettingsEpic,
	fetchDividendSettingsTemplateEpic,
	updateDividendSettingsTemplateEpic,
	updateChildrenDividendSettingEpic,
	grantDividendEpic,
} from './dividend-management-epics';

// my team
import {
	fetchTeamBettingRecordsEpic,
} from './my-team/betting-records-epics';
import {
	fetchTeamReportsEpic,
} from './my-team/reports-epics';
import {
	fetchTeamTraceRecordsEpic,
	fetchTeamTraceRecordDetailEpic,
	fetchTeamTraceRecordDetailBettingsEpic,
} from './my-team/trace-records-epics';
import {
	fetchTeamStatsEpic,
} from './my-team/stats-epics';

const epics = combineEpics(
	fetchPlatformEpic,
	fetchLotteriesEpic,
	startBetEpic,
	startTraceEpic,
	fetchBettingRecordsEpic,
	discardBettingRecordEpic,
	fetchLatestBettingRecordsEpic,

	fetchBettingRecordDetailEpic,

	fetchTraceRecordsEpic,
	fetchTraceRecordEpic,
	fetchLatestTraceRecordsEpic,
	fetchTraceRecordBettingsEpic,
	discardTraceRecordBettingEpic,
	fetchLotteryDrawingsEpic,
	updateLotteryDrawingsIntervalEpic,
	updateLotteryDrawingsEpic,
	fetchPlayConditionsEpic,
	fetchLotteryClassesEpic,
	fetchLotteryDrawingRecordsEpic,
	fetchPlaysEpic,
	initializeApplicationEpic,
	fetchUserEpic,
	startCreateChildrenUserEpic,
	startUpdateUserNicknameEpic,
	startUpdateUserGreetingEpic,
	fetchChildrenUsersEpic,
	transferToUserEpic,
	updateChildrenUserEpic,
	fetchWalletsEpic,
	loginEpic,
	logoutEpic,
	loginViaGoogleTotpEpic,
	startCheckAuthEpic,
	fetchMyLotteryCollectionsEpic,
	updateMyLotteryCollectionsEpic,

	geoValidateWithPayerEpic,
	fetchCaptchaEpic,
	checkCaptchaEpic,

	updateDefaultPasswordEpic,
	fetchPasswordResetMethodsEpic,
	resetPasswordViaSecurityQuestionsEpic,
	resetPasswordViaGoogleTotpEpic,

	fetchTransactionLogsEpic,
	fetchDividendTransactionLogsEpic,
	fetchUserSecurityEpic,
	fetchUserStatsEpic,
	updateUserLoginPasswordEpic,
	updateUserBetPasswordEpic,
	updateUserFundsPasswordEpic,
	updateUserLoginPasswordViaSecurityQuestionsEpic,
	updateUserBetPasswordViaSecurityQuestionsEpic,
	updateUserFundsPasswordViaSecurityQuestionsEpic,
	updateUserLoginPasswordViaGoogleTotpEpic,
	updateUserBetPasswordViaGoogleTotpEpic,
	updateUserFundsPasswordViaGoogleTotpEpic,
	enableUserLoginGeoValidationEpic,
	disableUserLoginGeoValidationEpic,

	updateUserSecurityQuestionsEpic,
	bindGoogleAuthenticationEpic,
	unbindGoogleAuthenticationEpic,
	fetchUserBankCardsEpic,
	createUserBankCardEpic,
	deleteUserBankCardEpic,

	fetchAnnouncementsEpic,

	fetchDemoErrorHandlingEpic,
	fetchSecurityQuestionEpic,

	fetchFixedWageEpic,
	updateUserFixedWageEpic,

	fetchDividendsEpic,
	fetchDividendDurationsEpic,
	fetchUserDividendSettingsEpic,
	fetchDividendSettingsTemplateEpic,
	updateDividendSettingsTemplateEpic,
	updateChildrenDividendSettingEpic,
	grantDividendEpic,

	// my team
	fetchTeamBettingRecordsEpic,
	fetchTeamReportsEpic,
	fetchTeamTraceRecordsEpic,
	fetchTeamTraceRecordDetailEpic,
	fetchTeamTraceRecordDetailBettingsEpic,
	fetchTeamStatsEpic,
);

export default epics;

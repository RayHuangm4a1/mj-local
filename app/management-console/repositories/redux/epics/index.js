import { combineEpics } from 'redux-observable';
import {
	initializeApplicationEpic,
} from './application-epics';
import {
	fetchLotteryClassesAndLotteriesEpic,
	updateLotteryStatusEpic,
	updateLotteriesOrderingAndHotTagEpic,
	updateLotteryClassStatusEpic,
} from './lottery/lottery-classes-and-lotteries-epics';

import {
	fetchLotteryPlaysEpic,
	updateLotteryPlaysStatusEpic,
	updateLotteryPlaysBonusEpic,
} from './lottery/lottery-plays-epics';
import {
	fetchLotteryPlayConditionsEpic,
} from './lottery/lottery-play-conditions-epics';
import {
	initLotteryManagementPageEpic
} from './lottery/lottery-management-page-epics';

import {
	fetchTraceRecordsEpic,
} from './lottery/trace-records-epics';

import {
	fetchTraceRecordBettingsEpic,
} from './lottery/trace-record-bettings-epics';

import {
	initLotteryPlayManagementPageEpic,
	fetchLotteryPlayManagementPagePlaysEpic,
} from './lottery/lottery-play-management-page-epics';

import {
	initLotteryPlayBonusXinyongManagementPageEpic,
} from './lottery/lottery-play-bonus-xinyong-management-page-epics';
import {
	initLotteryPlayBonusStandardManagementPageEpic,
	fetchLotteryPlayBonusStandardManagementPagePlaysEpic,
} from './lottery/lottery-play-bonus-standard-management-page-epics';

import {
	initLotterySpecialManagementPageEpic
} from './lottery/lottery-special-management-page-epics';

import {
	initLotteryDrawingManagementPageEpic,
	updateLotteryDrawingsIntervalEpic,
} from './lottery/lottery-drawing-management-page-epics';

import {
	initLotteryClassManagementPageEpic,
} from './lottery/lottery-class-management-page-epics';

import {
	fetchUsersEpic,
} from './account/users-epics';
import {
	initUserDetailsPageEpic
} from './account/user-detail-page-epics';
import {
	fetchUserProfileEpic,
	disableUserEpic,
	enableUserEpic,
	updateUserNicknameEpic,
	updateUserPayerEpic,
	updateUserZhuandianEpic,
	updateUserTypeEpic,
	updateUserGreetingEpic,
	enableUserFundsEpic,
	disableUserFundsEpic,
	enableUserBettingEpic,
	disableUserBettingEpic,
	disbleUserDividendEpic,
	enableUserDividendEpic,
	disableUserTransferEpic,
	enableUserTransferEpic,
	enableUserWithdrawableEpic,
	disableUserWithdrawableEpic,
	enableUserDepositEpic,
	disableUserDepositEpic,
	updateUserBonusEpic,
	updateUserFixedWageEpic,
} from './account/user-profile-epics';
import {
	fetchUserStatsEpic,
} from './account/user-stats-epics';
import {
	fetchUserFinanceLevelEpic,
	updateUserFinanceLevelEpic,
} from './account/user-finance-level-epics';
import {
	fetchUserAccountEpic,
	updateUserLoginPasswordEpic,
	updateUserBettingPasswordEpic,
	updateUserFundsPasswordEpic,
	deleteUserSecurityQuestionsEpic,
	enableUserLoginGeoValidationEpic,
	disableUserLoginGeoValidationEpic,
	disableUserGoogleTotpEpic,
} from './account/user-account-epics';
import {
	fetchUserWalletsEpic
} from './account/user-wallets-epics';
import {
	fetchUserDividendSettingsEpic,
	updateUserDividendSettingsEpic,
} from './account/user-dividend-settings-epics';
import {
	fetchUserDetailEpic,
	updateUserDetailBlockBettingEpic,
	updateUserDetailBlockDepositEpic,
	updateUserDetailBlockWithdrawalEpic,
	updateUserDetailFundsPasswordEpic,
	updateUserDetailFinPasswordEpic,
	updateUserDetailLoginPasswordEpic,
	updateUserDetailStatusEpic,
	updateUserDetailNicknameEpic,
	updateUserDetailTypeEpic,
	updateUserDetailBlockDepositTransferEpic,
	updateUserDetailBlockDividendTransferEpic,
	updateUserDetailAlertUserEpic,
	updateUserDetailLevelEpic,
	updateUserDetailPayerEpic,
} from './account/user-detail-epics';

import {
	fetchUserBankCardsEpic,
	createUserBankCardEpic,
	deleteUserBankCardEpic,
	enableUserBankCardWithdrawableEpic,
	updateUserBankCardNumberEpic,
	enableUserBankCardEpic,
	disableUserBankCardEpic,
} from './account/user-bank-cards-epic';

import {
	fetchUserCommentsEpic,
	addUserCommentEpic,
	cancelPinnedUserCommentEpic,
} from './account/user-comments-epics';

import {
	initUserBonusRulesManagementPageEpic,
} from './account/user-bonus-rules-management-page-epic';

import {
	initUserDividendWageRulePageEpic,
} from './account/user-dividend-wage-rule-page-epics';

import {
	fetchAdminUsersEpic,
	createAdminUserEpic,
	updateAdminUserEpic,
	updateAdminUserPasswordEpic,
	fetchStaffRolesEpic,
} from './admin-users-management-epic';

import {
	fetchZhaoShangAccountsEpic,
	createZhaoShangAccountEpic,
} from './account/zhao-shang-account-page-epics';

import {
	fetchLotteryDrawingsEpic,
	stopLotteryDrawingEpic,
} from './lottery/lottery-drawings-epics';

import {
	initLotteryDrawingIssuePageEpic,
} from './lottery/lottery-drawing-issue-page-epics';

import {
	fetchLotteryDrawingDetailEpic,
	cancelLotteryDrawingEpic,
	fetchLotteryDrawingBettingsCountEpic,
	updateLotteryDrawingOpencodeEpic,
	updateLotteryDrawingIntervalEpic,
} from './lottery/lottery-drawing-detail-epics';

import {
	fetchPlatformEpic,
	updateBonusRulesEpic,
	updatePlatformDividendSettingsEpic,
	updateZhaoShangFixedWageEpic,
} from './platform-epics';

import {
	loginEpic,
	logoutEpic,
	checkAuthEpic,
} from './auth-epics';

import {
	fetchBettingRecordsEpic,
} from './user-report/betting-records-epics';

import {
	fetchCashSystemBankDepositEpic
} from './cash-system/bank-deposit-epics';
import {
	initCashSystemHierarchicalManagementPageEpic,
	refreshCashSystemHierarchicalManagementNormalLevelsEpic,
	fetchCashSystemHierarchicalManagementUserLevelEpic,
} from './cash-system/cash-system-hierarchical-page-management-epics';
import {
	fetchCashSystemHierarchicalLogsEpic,
} from './cash-system/hierarchical-log-page-epics';
import {
	fetchTeamChildrenEpic,
	fetchTeamStatsEpic,
	enableTeamAccountEpic,
	disableTeamAccountEpic,
	enableTeamBettingEpic,
	disableTeamBettingEpic,
	enableTeamDepositEpic,
	disableTeamDepositEpic,
	enableTeamFundsEpic,
	disableTeamFundsEpic,
	enableTeamSubordinateCreationEpic,
	disableTeamSubordinateCreationEpic,
	enableTeamWithdrawEpic,
	disableTeamWithdrawEpic,
} from './team-epics';
import {
	enableTeamMemberAccountEpic,
	enableTeamMemberBettingEpic,
	enableTeamMemberDepositEpic,
	enableTeamMemberFundsEpic,
	enableTeamMemberWithdrawEpic,
} from './team-member-epics';
import {
	fetchUserWithdrawalMessageEpic,
	updateUserWithdrawalMessageEpic,
	deleteUserWithdrawalMessageEpic,
} from './account/user-withdrawal-message-epics';
import {
	fetchBankCardBlackListEpic,
	addBankCardToBlackListEpic,
	removeBankCardFromBlackListEpic,
} from './account/bank-card-black-list-epics';
import {
	updateFinanceNormalLevelsEpic,
	updateFinanceSpecialLevelsEpic,
	fetchFinanceLevelsEpic,
	fetchFinanceLevelUsersEpic,
} from './finance-levels-epics';

const epics = combineEpics(
	// application
	initializeApplicationEpic,
	// lottery
	fetchLotteryClassesAndLotteriesEpic,
	fetchLotteryPlaysEpic,
	updateLotteryPlaysStatusEpic,
	updateLotteryPlaysBonusEpic,
	fetchLotteryPlayConditionsEpic,
	fetchTraceRecordsEpic,
	fetchTraceRecordBettingsEpic,
	initLotteryPlayManagementPageEpic,
	fetchLotteryPlayManagementPagePlaysEpic,
	updateLotteryStatusEpic,
	initLotteryManagementPageEpic,
	updateLotteriesOrderingAndHotTagEpic,
	updateLotteryClassStatusEpic,
	initLotteryPlayBonusXinyongManagementPageEpic,
	initLotteryPlayBonusStandardManagementPageEpic,
	fetchLotteryPlayBonusStandardManagementPagePlaysEpic,
	initLotterySpecialManagementPageEpic,
	initLotteryClassManagementPageEpic,
	// drawing management page
	initLotteryDrawingManagementPageEpic,
	updateLotteryDrawingsIntervalEpic,

	// drawing
	initLotteryDrawingIssuePageEpic,
	fetchLotteryDrawingsEpic,
	stopLotteryDrawingEpic,
	cancelLotteryDrawingEpic,
	fetchLotteryDrawingDetailEpic,
	fetchLotteryDrawingBettingsCountEpic,
	updateLotteryDrawingOpencodeEpic,
	updateLotteryDrawingIntervalEpic,

	// account
	fetchUsersEpic,
	fetchUserDetailEpic,
	updateUserDetailBlockBettingEpic,
	updateUserDetailBlockDepositEpic,
	updateUserDetailBlockWithdrawalEpic,
	updateUserDetailFundsPasswordEpic,
	updateUserDetailFinPasswordEpic,
	updateUserDetailLoginPasswordEpic,
	updateUserDetailStatusEpic,
	updateUserDetailNicknameEpic,
	updateUserDetailTypeEpic,
	updateUserDetailBlockDepositTransferEpic,
	updateUserDetailBlockDividendTransferEpic,
	updateUserDetailAlertUserEpic,
	updateUserDetailLevelEpic,
	updateUserDetailPayerEpic,
	initUserBonusRulesManagementPageEpic,
	fetchUserBankCardsEpic,
	createUserBankCardEpic,
	deleteUserBankCardEpic,
	enableUserBankCardWithdrawableEpic,
	updateUserBankCardNumberEpic,
	enableUserBankCardEpic,
	disableUserBankCardEpic,
	fetchUserStatsEpic,
	fetchUserFinanceLevelEpic,
	updateUserFinanceLevelEpic,
	fetchUserWithdrawalMessageEpic,
	updateUserWithdrawalMessageEpic,
	deleteUserWithdrawalMessageEpic,
	fetchUserCommentsEpic,
	addUserCommentEpic,
	cancelPinnedUserCommentEpic,

	fetchBankCardBlackListEpic,
	addBankCardToBlackListEpic,
	removeBankCardFromBlackListEpic,

	fetchPlatformEpic,
	updateBonusRulesEpic,
	updatePlatformDividendSettingsEpic,
	updateZhaoShangFixedWageEpic,

	// 投注記錄
	fetchBettingRecordsEpic,

	fetchAdminUsersEpic,
	createAdminUserEpic,
	updateAdminUserEpic,
	updateAdminUserPasswordEpic,
	fetchStaffRolesEpic,

	// 招商帳戶設定
	fetchZhaoShangAccountsEpic,
	createZhaoShangAccountEpic,

	loginEpic,
	logoutEpic,
	checkAuthEpic,

	// cash system
	fetchCashSystemBankDepositEpic,
	initCashSystemHierarchicalManagementPageEpic,
	refreshCashSystemHierarchicalManagementNormalLevelsEpic,
	fetchCashSystemHierarchicalManagementUserLevelEpic,
	fetchCashSystemHierarchicalLogsEpic,

	fetchTeamChildrenEpic,
	fetchTeamStatsEpic,
	enableTeamAccountEpic,
	disableTeamAccountEpic,
	enableTeamBettingEpic,
	disableTeamBettingEpic,
	enableTeamDepositEpic,
	disableTeamDepositEpic,
	enableTeamFundsEpic,
	disableTeamFundsEpic,
	enableTeamSubordinateCreationEpic,
	disableTeamSubordinateCreationEpic,
	enableTeamWithdrawEpic,
	disableTeamWithdrawEpic,

	enableTeamMemberAccountEpic,
	enableTeamMemberBettingEpic,
	enableTeamMemberDepositEpic,
	enableTeamMemberFundsEpic,
	enableTeamMemberWithdrawEpic,

	initUserDetailsPageEpic,
	fetchUserProfileEpic,
	updateUserNicknameEpic,
	updateUserPayerEpic,
	updateUserZhuandianEpic,
	updateUserTypeEpic,
	updateUserGreetingEpic,
	enableUserFundsEpic,
	disableUserFundsEpic,
	enableUserBettingEpic,
	disableUserBettingEpic,
	enableUserWithdrawableEpic,
	disableUserWithdrawableEpic,
	enableUserDepositEpic,
	disableUserDepositEpic,
	updateUserBonusEpic,
	updateUserFixedWageEpic,
	fetchUserAccountEpic,
	updateUserLoginPasswordEpic,
	updateUserBettingPasswordEpic,
	updateUserFundsPasswordEpic,
	deleteUserSecurityQuestionsEpic,
	enableUserLoginGeoValidationEpic,
	disableUserLoginGeoValidationEpic,
	disableUserGoogleTotpEpic,
	fetchUserWalletsEpic,
	disableUserEpic,
	enableUserEpic,
	fetchUserDividendSettingsEpic,
	updateUserDividendSettingsEpic,
	disbleUserDividendEpic,
	enableUserDividendEpic,
	disableUserTransferEpic,
	enableUserTransferEpic,

	initUserDividendWageRulePageEpic,
	updateFinanceNormalLevelsEpic,
	updateFinanceSpecialLevelsEpic,
	fetchFinanceLevelsEpic,
	fetchFinanceLevelUsersEpic,
);

export default epics;

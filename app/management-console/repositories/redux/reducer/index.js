import { combineReducers } from 'redux';

import application from './singles/application';
import me from './singles/me';
import lotteryClassesAndLotteries from './singles/lottery/lottery-classes-and-lotteries';
import lotteryPlayManagementPage from './singles/lottery/lottery-play-management-page';
import lotteryDrawings from './singles/lottery/lottery-drawings';
import lotteryDrawingDetail from './singles/lottery/lottery-drawing-detail';
import lotteryDrawingIssuePage from './singles/lottery/lottery-drawing-issue-page';
import traceRecords from './singles/lottery/trace-records';
import traceRecordBettings from './singles/lottery/trace-record-bettings';
import lotteryPlays from './singles/lottery/lottery-plays';
import lotteryPlayConditions from './singles/lottery/lottery-play-conditions';
import lotteryPlayBonusXinyongManagementPage from './singles/lottery/lottery-play-bonus-xinyong-management-page';
import lotteryPlayBonusStandardManagementPage from './singles/lottery/lottery-play-bonus-standard-management-page';
import lotterySpecialManagementPage from './singles/lottery/lottery-special-management-page';
import lotteryClassManagementPage from './singles/lottery/lottery-class-management-page';
import lotteryDrawingManagementPage from './singles/lottery/lottery-drawing-management-page';

import users from './singles/account/users';
import userDetail from './singles/account/user-detail';
import zhaoShangAccountPage from './singles/account/zhao-shang-account-page';
import bankCardBlackList from './singles/account/bank-card-black-list';

import playClasses from './singles/play-classes';
import platform from './singles/platform';
import adminUsersManagement from './singles/admin-users-management';
import lotteryManagementPage from './singles/lottery/lottery-management-page';
import auth from './singles/auth';
import bettingRecords from './singles/user-report/betting-records';
import team from './singles/team';
import teamMember from './singles/team-member';

import cashSystemHierarchicalManagementPage from './singles/cash-system/cash-system-hierarchical-management-page';
import cashSystemAutoChannelManagementPage from './singles/cash-system/cash-system-auto-channel-management-page';
import cashSystemBankDepositPage from './singles/cash-system/bank-deposit-page';
import cashSystemHierarchicalLogPage from './singles/cash-system/hierarchical-log-page';
import financeLevelUsers from "./singles/cash-system/finance-level-users";

import userDetailPage from './singles/account/user-details-page';
import userDividendWageRulePage from './singles/account/user-dividend-wage-rule-page';

import userData from './singles/user';
import financeLevels from './singles/finance-levels';

const reducer = combineReducers({
	// application
	application,
	me,

	lotteryClassesAndLotteries,
	lotteryPlayManagementPage,
	lotteryDrawings,
	lotteryDrawingDetail,
	lotteryDrawingIssuePage,
	traceRecords,
	traceRecordBettings,
	lotteryPlays,
	lotteryPlayConditions,
	lotteryPlayBonusXinyongManagementPage,
	lotteryPlayBonusStandardManagementPage,
	lotterySpecialManagementPage,
	lotteryClassManagementPage,
	lotteryDrawingManagementPage,

	users,
	userDetail,

	bankCardBlackList,
	// 招商帳戶設定
	zhaoShangAccountPage,

	playClasses,
	platform,
	team,
	teamMember,

	adminUsersManagement,
	lotteryManagementPage,
	auth,

	bettingRecords,

	cashSystemHierarchicalManagementPage,
	cashSystemAutoChannelManagementPage,
	cashSystemBankDepositPage,
	cashSystemHierarchicalLogPage,
	financeLevelUsers,

	// TODO 等 user 相關 reducer 都建好後重新命名與整理檔案
	userDetailPage,
	userDividendWageRulePage,
	userData,

	financeLevels,
});

export default reducer;

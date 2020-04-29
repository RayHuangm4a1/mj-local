import React from 'react';
import { withRequiredRoleRule, } from '../lib/role-rules-provider';
import { loadComponent, } from './lib/react-utils';

const Announcement = loadComponent({ loader: () => import('./pages/announcement') });
const AnnouncementPopUp = loadComponent({ loader: () => import('./pages/announcement/pop-up') });
const AnnouncementPopUpInfo = loadComponent({ loader: () => import('./pages/announcement/pop-up/info') });
const AnnouncementPopUpEdit = loadComponent({ loader: () => import('./pages/announcement/pop-up/edit') });
const AnnouncementPopUpCreate = loadComponent({ loader: () => import('./pages/announcement/pop-up/create') });
const AnnouncementMarquee = loadComponent({ loader: () => import('./pages/announcement/marquee') });
const AnnouncementMarqueeTable = loadComponent({ loader: () => import('./pages/announcement/marquee/table') });
const AnnouncementMarqueeEdit = loadComponent({ loader: () => import('./pages/announcement/marquee/edit') });
const AnnouncementMarqueeCreate = loadComponent({ loader: () => import('./pages/announcement/marquee/create') });

const Lottery = loadComponent({ loader: () => import('./pages/lottery') });
const LotteryGeneral = loadComponent({ loader: () => import('./pages/lottery/general') });
const LotteryGeneralClass = loadComponent({ loader: () => import('./pages/lottery/general/class') });
const LotteryGeneralSetting = loadComponent({ loader: () => import('./pages/lottery/general/setting') });
const LotteryGeneralXinYongSetting = loadComponent({ loader: () => import('./pages/lottery/general/xinyong-setting') });
const LotteryGeneralXinYongSettingInfo = loadComponent({ loader: () => import('./pages/lottery/general/xinyong-setting/info') });
const LotteryGeneralXinYongSettingEdit = loadComponent({ loader: () => import('./pages/lottery/general/xinyong-setting/edit') });
const LotteryGeneralPlay = loadComponent({ loader: () => import('./pages/lottery/general/play') });
const LotteryGeneralPlayInfo = loadComponent({ loader: () => import('./pages/lottery/general/play/info') });
const LotteryGeneralPlayEdit = loadComponent({ loader: () => import('./pages/lottery/general/play/edit') });
const LotteryGeneralDrawing = loadComponent({ loader: () => import('./pages/lottery/general/drawing') });
const LotteryGeneralDrawingMain = loadComponent({ loader: () => import('./pages/lottery/general/drawing/main') });
const LotteryGeneralDrawingIssue = loadComponent({ loader: () => import('./pages/lottery/general/drawing/issue') });
const LotteryGeneralDrawingIssueModify = loadComponent({ loader: () => import('./pages/lottery/general/drawing/issue/modify') });
const LotteryGeneralDrawingIssueModifyOpencode = loadComponent({ loader: () => import('./pages/lottery/general/drawing/issue/modify-opencode') });
const LotteryGeneralDrawingIssueNegativeBalanceCorrection = loadComponent({ loader: () => import('./pages/lottery/general/drawing/issue/negative-balance-correction') });
const LotteryGeneralDrawingIssueRecord = loadComponent({ loader: () => import('./pages/lottery/general/drawing/issue/record') });
const LotteryGeneralSelfSupport = loadComponent({ loader: () => import('./pages/lottery/general/self-support') });
const LotteryOdds = loadComponent({ loader: () => import('./pages/lottery/odds') });
const LotteryOddsStandard = loadComponent({ loader: () => import('./pages/lottery/odds/standard') });
const LotteryOddsStandardInfo = loadComponent({ loader: () => import('./pages/lottery/odds/standard/info') });
const LotteryOddsStandardEdit = loadComponent({ loader: () => import('./pages/lottery/odds/standard/edit') });
const LotteryOddsXinYong = loadComponent({ loader: () => import('./pages/lottery/odds/xinyong') });
const LotteryOddsXinYongInfo = loadComponent({ loader: () => import('./pages/lottery/odds/xinyong/info') });
const LotteryOddsXinYongEdit= loadComponent({ loader: () => import('./pages/lottery/odds/xinyong/edit') });
const LotteryOddsSpecial = loadComponent({ loader: () => import('./pages/lottery/odds/special') });
const LotteryOddsSpecialMultiperiodOdds = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-odds') });
const LotteryOddsSpecialMultiperiodOddsInfo = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-odds/info') });
const LotteryOddsSpecialMultiperiodOddsCreate = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-odds/create') });
const LotteryOddsSpecialMultiperiodOddsEdit = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-odds/edit') });
const LotteryOddsSpecialMultiperiodBetting = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-betting') });
const LotteryOddsSpecialMultiperiodBettingInfo = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-betting/info') });
const LotteryOddsSpecialMultiperiodBettingCreate = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-betting/create') });
const LotteryOddsSpecialMultiperiodBettingEdit = loadComponent({ loader: () => import('./pages/lottery/odds/special/multiperiod-betting/edit') });

const ExternalGame = loadComponent({ loader: () => import('./pages/external-game') });
const ExternalGameSetting = loadComponent({ loader: () => import('./pages/external-game/setting') });
const ExternalGameContent = loadComponent({ loader: () => import('./pages/external-game/content') });
const ExternalGameRules = loadComponent({ loader: () => import('./pages/external-game/rules') });
const ExternalGameRulesInfo = loadComponent({ loader: () => import('./pages/external-game/rules/info') });
const ExternalGameRulesEditDividend = loadComponent({ loader: () => import('./pages/external-game/rules/edit-dividend') });
const ExternalGameRulesEditRebate = loadComponent({ loader: () => import('./pages/external-game/rules/edit-rebate') });
const ExternalGameRulesEditSalary = loadComponent({ loader: () => import('./pages/external-game/rules/edit-salary') });
const ExternalGameMaintenance = loadComponent({ loader: () => import('./pages/external-game/maintenance') });

const Account = loadComponent({ loader: () => import('./pages/account') });
const AccountMember = loadComponent({ loader: () => import('./pages/account/member') });
const AccountMemberManagement = loadComponent({ loader: () => import('./pages/account/member/management') });
const AccountMemberManagementInfo = loadComponent({ loader: () => import('./pages/account/member/management/info') });
const AccountMemberManagementInfoSubordinate = loadComponent({ loader: () => import('./pages/account/member/management/info-subordinate') });
const AccountMemberManagementDetail = loadComponent({ loader: () => import('./pages/account/member/management/detail') });
const AccountMemberManagementBasicSetting = loadComponent({ loader: () => import('./pages/account/member/management/basic-setting') });
const AccountMemberManagementAccountInfo = loadComponent({ loader: () => import('./pages/account/member/management/account-info') });
const AccountMemberManagementCardBind = loadComponent({ loader: () => import('./pages/account/member/management/card-bind') });
const AccountMemberManagementInvestment = loadComponent({ loader: () => import('./pages/account/member/management/investment') });
const AccountMemberManagementDividendWageRule = loadComponent({ loader: () => import('./pages/account/member/management/dividend-wage-rule') });
const AccountMemberManagementStatistics = loadComponent({ loader: () => import('./pages/account/member/management/statistics') });
const AccountMemberMove = loadComponent({ loader: () => import('./pages/account/member/move') });
const AccountMemberBonusRules = loadComponent({ loader: () => import('./pages/account/member/bonus-rules') });
const AccountMemberBonusRulesInfo = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/info') });
const AccountMemberBonusRulesBonusNumberRule = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/bonus-number-rules') });
const AccountMemberBonusRulesWage = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/wage') });
const AccountMemberBonusRulesThirdPartyWage =  loadComponent({ loader: () => import('./pages/account/member/bonus-rules/third-party-wage') });
const AccountMemberBonusRulesDividend = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/dividend') });
const AccountMemberBonusRulesEffectiveMember = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/effective-member') });
const AccountMemberBonusRulesMaxProfit = loadComponent({ loader: () => import('./pages/account/member/bonus-rules/max-profit') });
const AccountInfo = loadComponent({ loader: () => import('./pages/account/info') });
const AccountInfoIpSearch = loadComponent({ loader: () => import('./pages/account/info/ip-search') });
const AccountInfoLinkWechat = loadComponent({ loader: () => import('./pages/account/info/link-wechat') });
const AccountInfoLink = loadComponent({ loader: () => import('./pages/account/info/link') });
const AccountBlacklist = loadComponent({ loader: () => import('./pages/account/blacklist') });
const AccountBlacklistBankBanned = loadComponent({ loader: () => import('./pages/account/blacklist/bank-banned') });
const AccountBlacklistBankBannedInfo = loadComponent({ loader: () => import('./pages/account/blacklist/bank-banned/info') });
const AccountBlacklistBankBannedMultiAdd = loadComponent({ loader: () => import('./pages/account/blacklist/bank-banned/multi-add') });
const AccountBlacklistBankBannedImport = loadComponent({ loader: () => import('./pages/account/blacklist/bank-banned/import') });
const AccountBlacklistIpBanned = loadComponent({ loader: () => import('./pages/account/blacklist/ip-banned') });
const AccountBlacklistIpBannedInfo = loadComponent({ loader: () => import('./pages/account/blacklist/ip-banned/info') });
const AccountBlacklistIpBannedMultiAdd = loadComponent({ loader: () => import('./pages/account/blacklist/ip-banned/multi-add') });
const AccountBlacklistIpBannedImport = loadComponent({ loader: () => import('./pages/account/blacklist/ip-banned/import') });
const AccountBlacklistFrontstageWhiteList = loadComponent({ loader: () => import('./pages/account/blacklist/frontstage-white-list') });
const AccountBlacklistFrontstageWhiteListInfo = loadComponent({ loader: () => import('./pages/account/blacklist/frontstage-white-list/info') });
const AccountBlacklistFrontstageWhiteListMultiAdd = loadComponent({ loader: () => import('./pages/account/blacklist/frontstage-white-list/multi-add') });
const AccountBlacklistFrontstageWhiteListImport= loadComponent({ loader: () => import('./pages/account/blacklist/frontstage-white-list/import') });
const AccountZhaoShangAccount = loadComponent({ loader: () => import('./pages/account/zhaoshang-account') });
const AccountZhaoShangAccountSetting = loadComponent({ loader: () => import('./pages/account/zhaoshang-account/setting') });
const AccountZhaoShangAccountDividendRule = loadComponent({ loader: () => import('./pages/account/zhaoshang-account/dividend-rule') });
const AccountZhaoShangAccountDividendRuleSetting = loadComponent({ loader: () => import('./pages/account/zhaoshang-account/dividend-rule/setting') });
const AccountZhaoShangAccountWageRule = loadComponent({ loader: () => import('./pages/account/zhaoshang-account/wage-rule') });
const AccountZhaoShangAccountWageRuleEdit = loadComponent({ loader: () => import('./pages/account/zhaoshang-account/wage-rule/edit') });

const CashSystem = loadComponent({ loader: () => import('./pages/cash-system') });
const CashSystemCredit = loadComponent({ loader: () => import('./pages/cash-system/credit') });
const CashSystemCreditBank = loadComponent({ loader: () => import('./pages/cash-system/credit/bank') });
const CashSystemCreditThirdPartyToBank = loadComponent({ loader: () => import('./pages/cash-system/credit/third-party-to-bank') });
const CashSystemCreditThirdParty = loadComponent({ loader: () => import('./pages/cash-system/credit/third-party/platform') });
const CashSystemCreditControl = loadComponent({ loader: () => import('./pages/cash-system/credit/control') });
const CashSystemCreditControlBankAccount = loadComponent({ loader: () => import('./pages/cash-system/credit/control/bank-account/') });
const CashSystemCreditControlThirdPartyToBankAccount = loadComponent({ loader: () => import('./pages/cash-system/credit/control/third-party-to-bank-account/') });
const CashSystemCreditControlThirdPartyAccount = loadComponent({ loader: () => import('./pages/cash-system/credit/control/third-party-account/') });
const CashSystemDebit = loadComponent({ loader: () => import('./pages/cash-system/debit') });
const CashSystemDebitAccountPay = loadComponent({ loader: () => import('./pages/cash-system/debit/account-pay') });
const CashSystemDebitControl = loadComponent({ loader: () => import('./pages/cash-system/debit/control') });
const CashSystemDebitControlThirdParty = loadComponent({ loader: () => import('./pages/cash-system/debit/control/third-party') });
const CashSystemDebitControlBank = loadComponent({ loader: () => import('./pages/cash-system/debit/control/bank') });
const CashSystemDebitControlAutoChannel = loadComponent({ loader: () => import('./pages/cash-system/debit/control/auto-channel-management') });
const CashSystemDebitControlAutoPayCondition = loadComponent({ loader: () => import('./pages/cash-system/debit/control/auto-pay-condition') });
const CashSystemDebitControlAutoPayConditionCreate = loadComponent({ loader: () => import('./pages/cash-system/debit/control/auto-pay-condition/create') });
const CashSystemManualWithDrawal = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal') });
const CashSystemManualWithDrawalDeposit = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/deposit') });
const CashSystemManualWithDrawalDepositMultiAdd = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/deposit/multi-add') });
const CashSystemManualWithDrawalWithdrawal = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/withdrawal') });
const CashSystemManualWithDrawalWithdrawalMultiAdd = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/withdrawal/multi-add') });
const CashSystemManualWithDrawalTransfer = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/transfer') });
const CashSystemManualWithDrawalTransferMultiAdd = loadComponent({ loader: () => import('./pages/cash-system/manual-withdrawal/transfer/multi-add') });
const CashSystemFunds = loadComponent({ loader: () => import('./pages/cash-system/funds/') });
const CashSystemFundsMemberDama = loadComponent({ loader: () => import('./pages/cash-system/funds/member-dama') });
const CashSystemFundsTransfer = loadComponent({ loader: () => import('./pages/cash-system/funds/transfer') });
const CashSystemDepositsAndWithdrawalsControl = loadComponent({ loader: () => import('./pages/cash-system/deposits-and-withdrawals-control') });
const CashSystemDepositsAndWithdrawalsControlDeposits = loadComponent({ loader: () => import('./pages/cash-system/deposits-and-withdrawals-control/deposits') });
const CashSystemDepositsAndWithdrawalsControlWithdrawals = loadComponent({ loader: () => import('./pages/cash-system/deposits-and-withdrawals-control/withdrawals') });
const CashSystemDepositsAndWithdrawalsControlSingleAccountSettings = loadComponent({ loader: () => import('./pages/cash-system/deposits-and-withdrawals-control/single-account-settings') });
const CashSystemThirdParty = loadComponent({ loader: () => import('./pages/cash-system/third-party') });
const CashSystemThirdPartyList = loadComponent({ loader: () => import('./pages/cash-system/third-party/list') });
const CashSystemThirdPartyHistory = loadComponent({ loader: () => import('./pages/cash-system/third-party/history') });
const CashSystemBehalfPayment = loadComponent({ loader: () => import('./pages/cash-system/behalf-payment') });
const CashSystemBehalfPaymentCompany = loadComponent({ loader: () => import('./pages/cash-system/behalf-payment/company') });
const CashSystemHierarchical = loadComponent({ loader: () => import('./pages/cash-system/hierarchical') });
const CashSystemHierarchicalManagement = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management') });
const CashSystemHierarchicalManagementMain = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/main') });
const CashSystemHierarchicalManagementMemberList = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/member-list') });
const CashSystemHierarchicalManagementAuto = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/auto') });
const CashSystemHierarchicalManagementAutoRegion = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/auto/region') });
const CashSystemHierarchicalManagementAutoIp = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/auto/ip') });
const CashSystemHierarchicalManagementAutoRiskControl = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/management/auto/risk-control') });
const CashSystemHierarchicalMovingLevelRuleCreate = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/moving-level-rule-create') });
const CashSystemHierarchicalMovingLevelRuleEdit = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/moving-level-rule-edit') });
const CashSystemHierarchicalLog = loadComponent({ loader: () => import('./pages/cash-system/hierarchical/log') });

const UserReport = loadComponent({ loader: () => import('./pages/user-report') });
const UserReportMember = loadComponent({ loader: () => import('./pages/user-report/member') });
const UserReportMemberBettingRecords = loadComponent({ loader: () => import('./pages/user-report/member/betting-records') });
const UserReportMemberTrace = loadComponent({ loader: () => import('./pages/user-report/member/trace') });
const UserReportMemberTransactionRecord = loadComponent({ loader: () => import('./pages/user-report/member/transaction-record') });
const UserReportMemberProfit = loadComponent({ loader: () => import('./pages/user-report/member/profit') });
const UserReportMemberConversion = loadComponent({ loader: () => import('./pages/user-report/member/conversion') });

const CompanyReport = loadComponent({ loader: () => import('./pages/company-report') });
const CompanyReportPeople = loadComponent({ loader: () => import('./pages/company-report/people') });
const CompanyReportProfit = loadComponent({ loader: () => import('./pages/company-report/profit') });
const CompanyReportProfitFull = loadComponent({ loader: () => import('./pages/company-report/profit/full') });
const CompanyReportProfitSingle = loadComponent({ loader: () => import('./pages/company-report/profit/single') });
const CompanyReportProfitSingleMember = loadComponent({ loader: () => import('./pages/company-report/profit/single/member') });
const CompanyReportProfitSingleSubordinate = loadComponent({ loader: () => import('./pages/company-report/profit/single/subordinate') });
const CompanyReportCashFlowCount = loadComponent({ loader: () => import('./pages/company-report/cashflow-count') });
const CompanyReportLotteryStatistics = loadComponent({ loader: () => import('./pages/company-report/lottery-statistics') });
const CompanyReportLotteryPlays = loadComponent({ loader: () => import('./pages/company-report/lottery-plays') });
const CompanyReportLotteryPlaysTable = loadComponent({ loader: () => import('./pages/company-report/lottery-plays/table') });
const CompanyReportLotteryPlaysDetails = loadComponent({ loader: () => import('./pages/company-report/lottery-plays/details') });
const CompanyReportOnlineStatistics = loadComponent({ loader: () => import('./pages/company-report/online-statistics') });
const CompanyReportTeam = loadComponent({ loader: () => import('./pages/company-report/team') });
const CompanyReportMemberBenefit = loadComponent({ loader: () => import('./pages/company-report/member-benefit') });
const CompanyReportMemberBenefitTable = loadComponent({ loader: () => import('./pages/company-report/member-benefit/table') });
const CompanyReportValidMember = loadComponent({ loader: () => import('./pages/company-report/valid-member') });
const CompanyReportValidMemberTable = loadComponent({ loader: () => import('./pages/company-report/valid-member/table') });
const CompanyReportSummary = loadComponent({ loader: () => import('./pages/company-report/summary') });
const CompanyReportDevice = loadComponent({ loader: () => import('./pages/company-report/device') });
const CompanyReportNewMember = loadComponent({ loader: () => import('./pages/company-report/new-member') });
const CompanyReportDividend = loadComponent({ loader: () => import('./pages/company-report/dividend') });
const CompanyReportDividendInfo = loadComponent({ loader: () => import('./pages/company-report/dividend/info') });
const CompanyReportDividendRecord = loadComponent({ loader: () => import('./pages/company-report/dividend/record') });
const CompanyReportDividendDetail = loadComponent({ loader: () => import('./pages/company-report/dividend/detail') });
const CompanyReportDividendSubordinate = loadComponent({ loader: () => import('./pages/company-report/dividend/subordinate') });

const MemberLog = loadComponent({ loader: () => import('./pages/member-log') });
const MemberLogEntertainmentPayPayment = loadComponent({ loader: () => import('./pages/member-log/entertainment-pay-payment-index') });
const MemberLogOperation = loadComponent({ loader: () => import('./pages/member-log/operation-index') });
const MemberLogPointApply = loadComponent({ loader: () => import('./pages/member-log/point-apply-index') });
const MemberLogFreeze = loadComponent({ loader: () => import('./pages/member-log/freeze-index') });
const MemberLogPayChange = loadComponent({ loader: () => import('./pages/member-log/pay-change') });
const MemberLogLogin = loadComponent({ loader: () => import('./pages/member-log/login') });
const MemberLogEntertainmentPayChange = loadComponent({ loader: () => import('./pages/member-log/entertainment-pay-change') });
const MemberLogBankCard = loadComponent({ loader: () => import('./pages/member-log/bank-card') });
const MemberLogPasswordChange = loadComponent({ loader: () => import('./pages/member-log/password-change') });
const MemberLogPointChange = loadComponent({ loader: () => import('./pages/member-log/point-change') });
const MemberLogBetChange = loadComponent({ loader: () => import('./pages/member-log/bet-change') });

const SystemSetting = loadComponent({ loader: () => import('./pages/system-setting') });
const SystemSettingAdministrator = loadComponent({ loader: () => import('./pages/system-setting/administrator') });
const SystemSettingAdministratorAccount = loadComponent({ loader: () => import('./pages/system-setting/administrator/account') });
const SystemSettingAdministratorManageRole = loadComponent({ loader: () => import('./pages/system-setting/administrator/manage-role') });
const SystemSettingAdministratorPermission = loadComponent({ loader: () => import('./pages/system-setting/administrator/permission') });
const SystemSettingAdministratorPermissionRule = loadComponent({ loader: () => import('./pages/system-setting/administrator/permission/rule') });
const SystemSettingAdministratorIpWhiteList = loadComponent({ loader: () => import('./pages/system-setting/administrator/ip-white-list') });
const SystemSettingAdministratorIpWhiteListInfo = loadComponent({ loader: () => import('./pages/system-setting/administrator/ip-white-list/info') });
const SystemSettingAdministratorIpWhiteListBackstageAdd = loadComponent({ loader: () => import('./pages/system-setting/administrator/ip-white-list/backstage-add') });
const SystemSettingAdministratorIpWhiteListReceiveAdd = loadComponent({ loader: () => import('./pages/system-setting/administrator/ip-white-list/receive-add') });
const SystemSettingPlatform = loadComponent({ loader: () => import('./pages/system-setting/platform') });
const SystemSettingPlatformUrl = loadComponent({ loader: () => import('./pages/system-setting/platform/url') });
const SystemSettingPlatformCarouselImage= loadComponent({ loader: () => import('./pages/system-setting/platform/carousel-image') });
const SystemSettingPlatformWechatPromotionUrl = loadComponent({ loader: () => import('./pages/system-setting/platform/wecaht-promotion-url') });
const SystemSettingPlatformWechatOfficialAccount = loadComponent({ loader: () => import('./pages/system-setting/platform/wechat-official-account') });
const SystemSettingPlatformAppVersionControl = loadComponent({ loader: () => import('./pages/system-setting/platform/app-version-control') });
const SystemSettingPlatformMaintenance = loadComponent({ loader: () => import('./pages/system-setting/platform/maintenance') });
const SystemSettingClient = loadComponent({ loader: () => import('./pages/system-setting/client') });
const SystemSettingClientDictionary = loadComponent({ loader: () => import('./pages/system-setting/client/dictionary') });
const SystemSettingClientGameExplain = loadComponent({ loader: () => import('./pages/system-setting/client/game-explain') });

const User = loadComponent({ loader: () => import('./pages/user') });

const Login = loadComponent({ loader: () => import('./pages/login') });
const Logout = loadComponent({ loader: () => import('./pages/logout') });

const Demo = loadComponent({ loader: () => import('./pages/demo') });

export const RouteKeyEnums = {
	ROOT: '/',
	ANNOUNCEMENT: '/announcement',
	LOTTERY: '/lottery',
	EXTERNALGAME: '/external-game',
	ACCOUNT: '/account',
	USER: '/user',
	LOGIN: '/login',
	LOGOUT: '/logout',

	ANNOUNCEMENT_POPUP: '/announcement/pop-up',
	ANNOUNCEMENT_MARQUEE: '/announcement/marquee',

	CASHSYSTEM: '/cash-system',
	USERREPORT: '/user-report',
	COMPANYREPORT: '/company-report',
	MEMBERLOG: '/member-log',
	SYSTEMSETTING: '/system-setting',

	LOTTERY_GENERAL: '/lottery/general',
	LOTTERY_GENERAL_CLASS: '/lottery/general/class',
	LOTTERY_GENERAL_SETTING: '/lottery/general/setting',
	LOTTERY_GENERAL_XINYONG_SETTING: '/lottery/general/xinyong-setting',
	LOTTERY_GENERAL_PLAY: '/lottery/general/play',
	LOTTERY_GENERAL_DRAWING: '/lottery/general/drawing',
	LOTTERY_GENERAL_DRAWING_ISSUE: '/lottery/general/drawing/:lotteryClassId/:lotteryId/:issue',
	LOTTERY_GENERAL_SELFSUPPORT: '/lottery/general/self-support',
	LOTTERY_ODDS: '/lottery/odds',
	LOTTERY_ODDS_STANDARD: '/lottery/odds/standard',
	LOTTERY_ODDS_XINYONG: '/lottery/odds/xinyong',
	LOTTERY_ODDS_SPECIAL: '/lottery/odds/special',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS: '/lottery/odds/special/multiperiod-odds',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING: '/lottery/odds/special/multiperiod-betting',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_EDIT: '/lottery/odds/special/multiperiod-odds/edit',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_CREATE: '/lottery/odds/special/multiperiod-odds/create',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_EDIT: '/lottery/odds/special/multiperiod-betting/edit',
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_CREATE: '/lottery/odds/special/multiperiod-betting/create',

	EXTERNALGAME_SETTING: '/external-game/setting',
	EXTERNALGAME_CONTENT: '/external-game/content',
	EXTERNALGAME_RULES: '/external-game/rules',
	EXTERNALGAME_RULES_DIVIDEND: '/external-game/rules/dividend',
	EXTERNALGAME_RULES_REBATE: '/external-game/rules/rebate',
	EXTERNALGAME_RULES_SALARY: '/external-game/rules/salary',
	EXTERNALGAME_MAINTENANCE: '/external-game/maintenance',

	ACCOUNT_MEMBER: '/account/member',
	ACCOUNT_MEMBER_MANAGEMENT: '/account/member/management',
	ACCOUNT_MEMBER_MOVE: '/account/member/move',
	ACCOUNT_MEMBER_IPSEARCH: '/account/member/ip-search',
	ACCOUNT_MEMBER_LINKWECHAT: '/account/member/link-wechat',
	ACCOUNT_MEMBER_LINK: '/account/member/link',
	ACCOUNT_MEMBER_BONUSRULES: '/account/member/bonus-rules',
	ACCOUNT_MEMBER_BONUSRULES_BONUS_NUMBER_RULES: '/account/member/bonus-rules/bonus-number-rules',
	ACCOUNT_MEMBER_BONUSRULES_WAGE: '/account/member/bonus-rules/wage',
	ACCOUNT_MEMBER_BONUSRULES_THIRD_PARTY_WAGE: '/account/member/bonus-rules/third-party-wage',
	ACCOUNT_MEMBER_BONUSRULES_DIVIDEND: '/account/member/bonus-rules/dividend',
	ACCOUNT_MEMBER_BONUSRULES_EFFECTIVE_MEMBER: '/account/member/bonus-rules/effective-member',
	ACCOUNT_MEMBER_BONUSRULES_MAX_PROFIT: '/account/member/bonus-rules/max-profit',
	ACCOUNT_INFO: '/account/info',
	ACCOUNT_INFO_IPSEARCH: '/account/info/ip-search',
	ACCOUNT_INFO_LINKWECHAT: '/account/info/link-wechat',
	ACCOUNT_INFO_LINK: '/account/info/link',
	ACCOUNT_BLACKLIST: '/account/blacklist',
	ACCOUNT_BLACKLIST_BANKBANNED: '/account/blacklist/bank-banned',
	ACCOUNT_BLACKLIST_BANKBANNED_MULTI_ADD: '/account/blacklist/bank-banned/multi-add',
	ACCOUNT_BLACKLIST_BANKBANNED_IMPORT: '/account/blacklist/bank-banned/import',
	ACCOUNT_BLACKLIST_IPBANNED: '/account/blacklist/ip-banned',
	ACCOUNT_BLACKLIST_IPBANNED_MULTI_ADD: '/account/blacklist/ip-banned/multi-add',
	ACCOUNT_BLACKLIST_IPBANNED_IMPORT: '/account/blacklist/ip-banned/import',
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST: '/account/blacklist/frontstage-white-list',
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_MULTI_ADD: '/account/blacklist/frontstage-white-list/multi-add',
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_IMPORT: '/account/blacklist/frontstage-white-list/import',
	ACCOUNT_ZHAOSHANGACCOUNT: '/account/zhaoshang-account',
	ACCOUNT_ZHAOSHANGACCOUNT_SETTING: '/account/zhaoshang-account/setting',
	ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE: '/account/zhaoshang-account/dividend-rule',
	ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE_SETTING: '/account/zhaoshang-account/dividend-rule/setting',
	ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE: '/account/zhaoshang-account/wage-rule',
	ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE_EDIT: '/account/zhaoshang-account/wage-rule/edit',

	CASHSYSTEM_CREDIT_ROOT: '/cash-system/credit',
	CASHSYSTEM_CREDIT: '/cash-system/credit/:departmentId',
	CASHSYSTEM_CREDIT_BANK: '/cash-system/credit/:departmentId/bank',
	CASHSYSTEM_CREDIT_THIRDPARTYTOBANK: '/cash-system/credit/:departmentId/third-party-to-bank',
	CASHSYSTEM_CREDIT_THIRDPARTY: '/cash-system/credit/:departmentId/third-party',
	CASHSYSTEM_CREDIT_CONTROL: '/cash-system/credit/:departmentId/control',
	CASHSYSTEM_CREDIT_CONTROL_BANKACCOUNT: '/cash-system/credit/:departmentId/control/bank-account',
	CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYTOBANKACCOUNT: '/cash-system/credit/:departmentId/control/third-party-to-bank-account',
	CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYACCOUNT: '/cash-system/credit/:departmentId/control/third-party-account',
	CASHSYSTEM_DEBIT: '/cash-system/debit',
	CASHSYSTEM_DEBIT_ACCOUNTPAY: '/cash-system/debit/account-pay',
	CASHSYSTEM_DEBIT_CONTROL: '/cash-system/debit/control',
	CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY: '/cash-system/debit/control/third-party',
	CASHSYSTEM_DEBIT_CONTROL_BANK: '/cash-system/debit/control/bank',
	CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL: '/cash-system/debit/control/auto-channel-management',
	CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION: '/cash-system/debit/control/auto-pay-condition',
	CASHSYSTEM_MANUALWITHDRAWAL_ROOT: '/cash-system/manual-withdrawal',
	CASHSYSTEM_MANUALWITHDRAWAL: '/cash-system/manual-withdrawal/:departmentId',
	CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL: '/cash-system/manual-withdrawal/:departmentId/withdrawal',
	CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL_MULTI_ADD: '/cash-system/manual-withdrawal/:departmentId/withdrawal/multi-add',
	CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT: '/cash-system/manual-withdrawal/:departmentId/deposit',
	CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT_MULTI_ADD: '/cash-system/manual-withdrawal/:departmentId/deposit/multi-add',
	CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER: '/cash-system/manual-withdrawal/:departmentId/transfer',
	CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER_MULTI_ADD: '/cash-system/manual-withdrawal/:departmentId/transfer/multi-add',
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL: '/cash-system/deposits-and-withdrawals-control',
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT: '/cash-system/deposits-and-withdrawals-control/deposit',
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_WITHDRAWALS: '/cash-system/deposits-and-withdrawals-control/withdrawals',
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_SINGLE_ACCOUNT_SETTINGS: '/cash-system/deposits-and-withdrawals-control/single-account-settings',
	CASHSYSTEM_THIRDPARTY: '/cash-system/third-party',
	CASHSYSTEM_THIRDPARTY_LIST: '/cash-system/third-party/list',
	CASHSYSTEM_THIRDPARTY_HISTORY: '/cash-system/third-party/history',
	CASHSYSTEM_BEHALFPAYMENT: '/cash-system/behalf-payment',
	CASHSYSTEM_BEHALFPAYMENT_COMPANY: '/cash-system/behalf-payment/:companyId',
	CASHSYSTEM_PAYCOMPANY: '/cash-system/pay-company',
	CASHSYSTEM_FUNDS: '/cash-system/funds',
	CASHSYSTEM_FUNDS_MEMBER_DAMA: '/cash-system/funds/member-dama',
	CASHSYSTEM_FUNDS_TRANSFER: '/cash-system/funds/transfer',
	CASHSYSTEM_HIERARCHICAL: '/cash-system/hierarchical',
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT: '/cash-system/hierarchical/management',
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO: '/cash-system/hierarchical/management/auto',
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_REGION: '/cash-system/hierarchical/management/auto/region',
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_IP: '/cash-system/hierarchical/management/auto/ip',
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_RISKCONTROL: '/cash-system/hierarchical/management/auto/risk-control',
	CASHSYSTEM_HIERARCHICAL_LOG: '/cash-system/hierarchical/log',

	USERREPORT_MEMBER: '/user-report/member',
	USERREPORT_MEMBER_BETTING_RECORDS: '/user-report/member/betting-records',
	USERREPORT_MEMBER_TRACE: '/user-report/member/trace',
	USERREPORT_MEMBER_TRANSACTION_RECORD: '/user-report/member/transaction-record',
	USERREPORT_MEMBER_PROFIT: '/user-report/member/profit',
	USERREPORT_MEMBER_CONVERSION: '/user-report/member/conversion',

	COMPANYREPORT_PEOPLE: '/company-report/people',
	COMPANYREPORT_SUMMARY: '/company-report/summary',
	COMPANYREPORT_CASHFLOW_COUNT: '/company-report/cashflow-count',
	COMPANYREPORT_PROFIT: '/company-report/profit',
	COMPANYREPORT_DEVICE: '/company-report/device',
	COMPANYREPORT_LOTTERY_STATISTICS: '/company-report/lottery-statistics',
	COMPANYREPORT_LOTTERY_PLAYS: '/company-report/lottery-plays',
	COMPANYREPORT_ONLINE_STATISTICS: '/company-report/online-statistics',
	COMPANYREPORT_TEAM: '/company-report/team',
	COMPANYREPORT_MEMBER_BENEFIT: '/company-report/member-benefit',
	COMPANYREPORT_VALID_MEMBER: '/company-report/valid-member',
	COMPANYREPORT_NEW_MEMBER: '/company-report/new-member',
	COMPANYREPORT_DIVIDEND: '/company-report/dividend',

	MEMBERLOG_FREEZE: '/member-log/freeze',
	MEMBERLOG_OPERATION: '/member-log/operation',
	MEMBERLOG_LOGIN: '/member-log/login',
	MEMBERLOG_POINTCHANGE: '/member-log/point-change',
	MEMBERLOG_BETCHANGE: '/member-log/bet-change',
	MEMBERLOG_BANKCARD: '/member-log/bank-card',
	MEMBERLOG_POINTAPPLY: '/member-log/point-apply',
	MEMBERLOG_PASSWORDCHANGE: '/member-log/password-change',
	MEMBERLOG_PAYCHANGE: '/member-log/pay-change',
	MEMBERLOG_ENTERTAINMENT_PAYCHANGE: '/member-log/entertainment-pay-change',
	MEMBERLOG_ENTERTAINMENT_PAYPAYMENT: '/member-log/entertainment-pay-payment',

	SYSTEMSETTING_ADMINISTRATOR: '/system-setting/administrator',
	SYSTEMSETTING_ADMINISTRATOR_ACCOUNT: '/system-setting/administrator/account',
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST: '/system-setting/administrator/ip-white-list',
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_INFO: '/system-setting/administrator/ip-white-list/info',
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_BACKSTAGE_ADD: '/system-setting/administrator/ip-white-list/backstage-add',
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_RECEIVE_ADD: '/system-setting/administrator/ip-white-list/receive-add',
	SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE: '/system-setting/administrator/manage-role',
	SYSTEMSETTING_ADMINISTRATOR_PERMISSION: '/system-setting/administrator/permission',
	SYSTEMSETTING_PLATFORM: '/system-setting/platform',
	SYSTEMSETTING_PLATFORM_URL: '/system-setting/platform/url',
	SYSTEMSETTING_PLATFORM_MAINTENANCE: '/system-setting/platform/maintenance',
	SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION: '/system-setting/platform/wechat-promotion',
	SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT: '/system-setting/platform/wechat-official-account',
	SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL: '/system-setting/platform/app-version-control',
	SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE: '/system-setting/platform/carousel-image',
	SYSTEMSETTING_CLIENT: '/system-setting/client',
	SYSTEMSETTING_CLIENT_DICTIONARY: '/system-setting/client/dictionary',
	SYSTEMSETTING_CLIENT_GAME_EXPLAIN: '/system-setting/client/lottery-explain',

	DEMO: '/demo'
};

const {
	ANNOUNCEMENT,
	ANNOUNCEMENT_POPUP,
	ANNOUNCEMENT_MARQUEE,

	LOTTERY,
	LOTTERY_GENERAL,
	LOTTERY_GENERAL_CLASS,
	LOTTERY_GENERAL_SETTING,
	LOTTERY_GENERAL_XINYONG_SETTING,
	LOTTERY_GENERAL_PLAY,
	LOTTERY_GENERAL_DRAWING,
	LOTTERY_GENERAL_DRAWING_ISSUE,
	LOTTERY_GENERAL_SELFSUPPORT,
	LOTTERY_ODDS,
	LOTTERY_ODDS_STANDARD,
	LOTTERY_ODDS_XINYONG,
	LOTTERY_ODDS_SPECIAL,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_EDIT,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_CREATE,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_EDIT,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_CREATE,

	EXTERNALGAME,
	EXTERNALGAME_SETTING,
	EXTERNALGAME_CONTENT,
	EXTERNALGAME_RULES,
	EXTERNALGAME_RULES_DIVIDEND,
	EXTERNALGAME_RULES_REBATE,
	EXTERNALGAME_RULES_SALARY,
	EXTERNALGAME_MAINTENANCE,

	ACCOUNT,
	ACCOUNT_MEMBER,
	ACCOUNT_MEMBER_MANAGEMENT,
	ACCOUNT_MEMBER_MOVE,
	ACCOUNT_MEMBER_BONUSRULES,
	ACCOUNT_MEMBER_BONUSRULES_BONUS_NUMBER_RULES,
	ACCOUNT_MEMBER_BONUSRULES_WAGE,
	ACCOUNT_MEMBER_BONUSRULES_THIRD_PARTY_WAGE,
	ACCOUNT_MEMBER_BONUSRULES_DIVIDEND,
	ACCOUNT_MEMBER_BONUSRULES_EFFECTIVE_MEMBER,
	ACCOUNT_MEMBER_BONUSRULES_MAX_PROFIT,
	ACCOUNT_INFO,
	ACCOUNT_INFO_IPSEARCH,
	ACCOUNT_INFO_LINKWECHAT,
	ACCOUNT_INFO_LINK,
	ACCOUNT_BLACKLIST,
	ACCOUNT_BLACKLIST_BANKBANNED,
	ACCOUNT_BLACKLIST_BANKBANNED_MULTI_ADD,
	ACCOUNT_BLACKLIST_BANKBANNED_IMPORT,
	ACCOUNT_BLACKLIST_IPBANNED,
	ACCOUNT_BLACKLIST_IPBANNED_MULTI_ADD,
	ACCOUNT_BLACKLIST_IPBANNED_IMPORT,
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST,
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_MULTI_ADD,
	ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_IMPORT,
	ACCOUNT_ZHAOSHANGACCOUNT,
	ACCOUNT_ZHAOSHANGACCOUNT_SETTING,
	ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE,
	ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE_SETTING,
	ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE,
	ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE_EDIT,

	CASHSYSTEM,
	CASHSYSTEM_CREDIT,
	CASHSYSTEM_CREDIT_BANK,
	CASHSYSTEM_CREDIT_THIRDPARTYTOBANK,
	CASHSYSTEM_CREDIT_THIRDPARTY,
	CASHSYSTEM_CREDIT_CONTROL,
	CASHSYSTEM_CREDIT_CONTROL_BANKACCOUNT,
	CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYTOBANKACCOUNT,
	CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYACCOUNT,
	CASHSYSTEM_DEBIT,
	CASHSYSTEM_DEBIT_ACCOUNTPAY,
	CASHSYSTEM_DEBIT_CONTROL,
	CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY,
	CASHSYSTEM_DEBIT_CONTROL_BANK,
	CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL,
	CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION,
	CASHSYSTEM_MANUALWITHDRAWAL,
	CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT,
	CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT_MULTI_ADD,
	CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL,
	CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL_MULTI_ADD,
	CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER,
	CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER_MULTI_ADD,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_WITHDRAWALS,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_SINGLE_ACCOUNT_SETTINGS,
	CASHSYSTEM_THIRDPARTY,
	CASHSYSTEM_THIRDPARTY_LIST,
	CASHSYSTEM_THIRDPARTY_HISTORY,
	CASHSYSTEM_BEHALFPAYMENT,
	CASHSYSTEM_BEHALFPAYMENT_COMPANY,
	CASHSYSTEM_FUNDS,
	CASHSYSTEM_FUNDS_MEMBER_DAMA,
	CASHSYSTEM_FUNDS_TRANSFER,
	CASHSYSTEM_HIERARCHICAL,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_REGION,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_IP,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_RISKCONTROL,
	CASHSYSTEM_HIERARCHICAL_LOG,

	USERREPORT,
	USERREPORT_MEMBER,
	USERREPORT_MEMBER_BETTING_RECORDS,
	USERREPORT_MEMBER_TRACE,
	USERREPORT_MEMBER_TRANSACTION_RECORD,
	USERREPORT_MEMBER_PROFIT,
	USERREPORT_MEMBER_CONVERSION,

	COMPANYREPORT,
	COMPANYREPORT_PEOPLE,
	COMPANYREPORT_PROFIT,
	COMPANYREPORT_CASHFLOW_COUNT,
	COMPANYREPORT_LOTTERY_STATISTICS,
	COMPANYREPORT_LOTTERY_PLAYS,
	COMPANYREPORT_ONLINE_STATISTICS,
	COMPANYREPORT_TEAM,
	COMPANYREPORT_MEMBER_BENEFIT,
	COMPANYREPORT_VALID_MEMBER,
	COMPANYREPORT_SUMMARY,
	COMPANYREPORT_DEVICE,
	COMPANYREPORT_NEW_MEMBER,
	COMPANYREPORT_DIVIDEND,

	MEMBERLOG,
	MEMBERLOG_FREEZE,
	MEMBERLOG_OPERATION,
	MEMBERLOG_LOGIN,
	MEMBERLOG_POINTCHANGE,
	MEMBERLOG_BETCHANGE,
	MEMBERLOG_BANKCARD,
	MEMBERLOG_POINTAPPLY,
	MEMBERLOG_PASSWORDCHANGE,
	MEMBERLOG_PAYCHANGE,
	MEMBERLOG_ENTERTAINMENT_PAYCHANGE,
	MEMBERLOG_ENTERTAINMENT_PAYPAYMENT,

	SYSTEMSETTING,
	SYSTEMSETTING_ADMINISTRATOR,
	SYSTEMSETTING_ADMINISTRATOR_ACCOUNT,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_INFO,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_BACKSTAGE_ADD,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_RECEIVE_ADD,
	SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE,
	SYSTEMSETTING_ADMINISTRATOR_PERMISSION,
	SYSTEMSETTING_PLATFORM,
	SYSTEMSETTING_PLATFORM_URL,
	SYSTEMSETTING_PLATFORM_MAINTENANCE,
	SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION,
	SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT,
	SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL,
	SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE,
	SYSTEMSETTING_CLIENT,
	SYSTEMSETTING_CLIENT_DICTIONARY,
	SYSTEMSETTING_CLIENT_GAME_EXPLAIN,

	USER,

	LOGIN,
	LOGOUT,

	DEMO,
} = RouteKeyEnums;

const routes = [
	{
		path: ANNOUNCEMENT,
		component: Announcement,
		meta: {
			breadcrumbName: '公告管理',
			isCrumbActive: false,
		},
		routes: [
			{
				path: ANNOUNCEMENT_POPUP,
				component: AnnouncementPopUp,
				meta: {
					breadcrumbName: '弹跳公告设置',
					isCrumbActive: false,
				},
				routes: [
					{
						path: ANNOUNCEMENT_POPUP,
						component: AnnouncementPopUpInfo,
						exact: true,
						meta: {
							breadcrumbName: '弹跳公告设置',
						},
					},
					{
						path: `${ANNOUNCEMENT_POPUP}/:AnnouncementId/edit`,
						component: AnnouncementPopUpEdit,
						meta: {
							breadcrumbName: '编辑公吿',
						},
					},
					{
						path: `${ANNOUNCEMENT_POPUP}/create`,
						component: AnnouncementPopUpCreate,
						meta: {
							breadcrumbName: '新增公吿',
						},
					}
				]
			},
			{
				path: ANNOUNCEMENT_MARQUEE,
				component: AnnouncementMarquee,
				meta: {
					breadcrumbName: '跑马灯公告设置',
				},
				routes: [
					{
						path: ANNOUNCEMENT_MARQUEE,
						// TODO replace this temp page
						component: AnnouncementMarqueeTable,
						exact: true,
						meta: {
							breadcrumbName: '跑马灯公告设置',
						},
					},
					{
						path: `${ANNOUNCEMENT_MARQUEE}/:AnnouncementId/edit`,
						component: AnnouncementMarqueeEdit,
						meta: {
							breadcrumbName: '编辑公吿',
						},
					},
					{
						path: `${ANNOUNCEMENT_MARQUEE}/create`,
						component: AnnouncementMarqueeCreate,
						meta: {
							breadcrumbName: '新增公吿',
						},
					}
				]
			},
		]
	},
	{
		path: LOTTERY,
		component: withRequiredRoleRule('lottery')(Lottery),
		meta: {
			breadcrumbName: '彩票管理',
			isCrumbActive: false,
		},
		routes: [
			{
				path: LOTTERY_GENERAL,
				component: LotteryGeneral,
				meta: {
					isCrumbVisible: false,
				},
				routes: [
					{
						path: LOTTERY_GENERAL_CLASS,
						component: LotteryGeneralClass,
						exact: true,
						meta: {
							breadcrumbName: '彩种大分类设置',
						},
					},
					{
						path: LOTTERY_GENERAL_SETTING,
						component: withRequiredRoleRule('lottery-setting')(LotteryGeneralSetting),
						exact: true,
						meta: {
							breadcrumbName: '彩种设置',
						},
					},
					{
						path: LOTTERY_GENERAL_XINYONG_SETTING,
						component: LotteryGeneralXinYongSetting,
						meta: {
							breadcrumbName: '信用玩法设置',
							isCrumbVisible: true,
						},
						routes: [
							{
								path: LOTTERY_GENERAL_XINYONG_SETTING,
								component: LotteryGeneralXinYongSettingInfo,
								exact: true,
								meta: {
									pageTitle: '信用玩法设置',
									isCrumbVisible: false,
								},
							},
							{
								path: `${LOTTERY_GENERAL_XINYONG_SETTING}/:lotteryClassId/:lotteryId/edit/:playConditionId`,
								component: LotteryGeneralXinYongSettingEdit,
								exact: true,
								meta: {
									pageTitle: '信用玩法设置',
									isCrumbVisible: true,
								},
								updatedKeys: {
									breadcrumbName: "lotteryName",
								},
								paramProps: {
									lotteryClassId: ':lotteryClassId',
									lotteryId: ':lotteryId',
									playConditionId: ':playConditionId'
								},
							},
						],
					},
					{
						path: LOTTERY_GENERAL_PLAY,
						component: LotteryGeneralPlay,
						meta: {
							breadcrumbName: '官方玩法设置',
							isCrumbVisible: true,
						},
						routes: [
							{
								path: LOTTERY_GENERAL_PLAY,
								component: LotteryGeneralPlayInfo,
								exact: true,
								meta: {
									pageTitle: '官方玩法设置',
									isCrumbVisible: false,
								},
							},
							{
								path: `${LOTTERY_GENERAL_PLAY}/:lotteryClassId/:lotteryId/edit`,
								component: LotteryGeneralPlayEdit,
								exact: true,
								meta: {
									pageTitle: '官方玩法设置',
								},
								updatedKeys: {
									breadcrumbName: "lotteryName",
								},
								paramProps: {
									lotteryClassId: ':lotteryClassId',
									lotteryId: ':lotteryId',
								},
							},
						]
					},
					{
						path: LOTTERY_GENERAL_DRAWING,
						component: LotteryGeneralDrawing,
						meta: {
							breadcrumbName: '开奖设置',
							isCrumbActive: false,
						},
						routes: [
							{
								path: LOTTERY_GENERAL_DRAWING,
								exact: true,
								component: LotteryGeneralDrawingMain,
								meta: {
									breadcrumbName: '开奖设置',
									isCrumbActive: false,
								},
							},
							{
								path: LOTTERY_GENERAL_DRAWING_ISSUE,
								component: LotteryGeneralDrawingIssue,
								redirectPath: `${LOTTERY_GENERAL_DRAWING_ISSUE}/modify`,
								meta: {
									pageTitle: '开奖设置',
									isCrumbVisible: false,
								},
								paramProps: {
									lotteryId: ':lotteryId',
									issue: ':issue',
								},
								routes: [
									{
										path: `${LOTTERY_GENERAL_DRAWING_ISSUE}/modify`,
										component: LotteryGeneralDrawingIssueModify,
										meta: {
											breadcrumbName: '修改开奖资讯',
										},
										paramProps: {
											selectedLotteryClassId: ':lotteryClassId',
											lotteryId: ':lotteryId',
											issue: ':issue',
										},
									},
									{
										path: `${LOTTERY_GENERAL_DRAWING_ISSUE}/modify-opencode`,
										component: LotteryGeneralDrawingIssueModifyOpencode,
										meta: {
											breadcrumbName: '修改球号',
										},
										paramProps: {
											selectedLotteryClassId: ':lotteryClassId',
											lotteryId: ':lotteryId',
											issue: ':issue',
										},
									},
									{
										path: `${LOTTERY_GENERAL_DRAWING_ISSUE}/record`,
										component: LotteryGeneralDrawingIssueRecord,
										meta: {
											breadcrumbName: '投注名单',
										},
									},
									{
										path: `${LOTTERY_GENERAL_DRAWING_ISSUE}/negative-balance-correction`,
										component: LotteryGeneralDrawingIssueNegativeBalanceCorrection,
										meta: {
											breadcrumbName: '负数补正',
										},
									},
								],
							},
						],
					},
					{
						path: LOTTERY_GENERAL_SELFSUPPORT,
						component: LotteryGeneralSelfSupport,
						exact: true,
						meta: {
							breadcrumbName: '自营彩设置',
						},
					},
				],
			},
			{
				path: LOTTERY_ODDS,
				component: LotteryOdds,
				meta: {
					isCrumbVisible: false
				},
				routes: [
					{
						path: LOTTERY_ODDS_STANDARD,
						component: LotteryOddsStandard,
						meta: {
							breadcrumbName: '官方玩法赔率设置',
							isCrumbActive: false,
						},
						routes: [
							{
								path: LOTTERY_ODDS_STANDARD,
								component: LotteryOddsStandardInfo,
								exact: true,
								meta: {
									pageTitle: '官方玩法赔率设置',
									isCrumbVisible: false,
								},
							},
							{
								path: `${LOTTERY_ODDS_STANDARD}/:lotteryClassId/:lotteryId/edit`,
								component: LotteryOddsStandardEdit,
								meta: {
									pageTitle: '官方玩法赔率设置',
									isCrumbActive: false,
								},
								updatedKeys: {
									breadcrumbName: "lotteryName",
								},
								paramProps: {
									lotteryClassId: ':lotteryClassId',
									lotteryId: ':lotteryId',
								},
							}
						]
					},
					{
						path: LOTTERY_ODDS_XINYONG,
						component: LotteryOddsXinYong,
						meta: {
							breadcrumbName: '信用玩法赔率设置',
							isCrumbActive: false,
							isCrumbVisible: true,
						},
						routes: [
							{
								path: LOTTERY_ODDS_XINYONG,
								component: LotteryOddsXinYongInfo,
								exact: true,
								meta: {
									pageTitle: '信用玩法赔率设置',
									isCrumbVisible: false,
								},
							},
							{
								path: `${LOTTERY_ODDS_XINYONG}/:lotteryClassId/:lotteryId/edit/:playConditionId`,
								component: LotteryOddsXinYongEdit,
								exact: true,
								meta: {
									pageTitle: '信用玩法赔率设置',
									isCrumbVisible: true,
								},
								updatedKeys: {
									breadcrumbName: "lotteryName",
								},
								paramProps: {
									lotteryClassId: ':lotteryClassId',
									lotteryId: ':lotteryId',
									playConditionId: ':playConditionId',
								},
							},
						],
					},
					{
						path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_EDIT,
						component: LotteryOddsSpecialMultiperiodOddsEdit,
						exact: true,
						meta: {
							breadcrumbName: '特殊狀況賠率設置',
						},
					},
					{
						path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_CREATE,
						component: LotteryOddsSpecialMultiperiodOddsCreate,
						exact: true,
						meta: {
							breadcrumbName: '特殊狀況賠率設置',
						},
					},
					{
						path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_EDIT,
						component: LotteryOddsSpecialMultiperiodBettingEdit,
						exact: true,
						meta: {
							breadcrumbName: '特殊狀況賠率設置',
						},
					},
					{
						path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_CREATE,
						component: LotteryOddsSpecialMultiperiodBettingCreate,
						exact: true,
						meta: {
							breadcrumbName: '特殊狀況賠率設置',
						},
					},
					{
						path: LOTTERY_ODDS_SPECIAL,
						component: LotteryOddsSpecial,
						redirectPath: `${LOTTERY_ODDS_SPECIAL}/multiperiod-odds`,
						meta: {
							breadcrumbName: '特殊狀況賠率設置',
						},
						routes: [
							{
								path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS,
								component: LotteryOddsSpecialMultiperiodOdds,
								meta: {
									isCrumbVisible: false,
									breadcrumbName: '特殊狀況賠率設置',
								},
								routes: [
									{
										path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS,
										component: LotteryOddsSpecialMultiperiodOddsInfo,
										exact: true,
										meta: {
											isCrumbVisible: false,
											breadcrumbName: '特殊狀況賠率設置',
										},
									},
								]
							},
							{
								path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING,
								component: LotteryOddsSpecialMultiperiodBetting,
								meta: {
									isCrumbVisible: false,
									breadcrumbName: '特殊狀況賠率設置',
								},
								routes: [
									{
										path: LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING,
										component: LotteryOddsSpecialMultiperiodBettingInfo,
										exact: true,
										meta: {
											isCrumbVisible: false,
											breadcrumbName: '特殊狀況賠率設置',
										},
									},
								],
							},
						]
					},
				],
			},
		],
	},
	{
		path: EXTERNALGAME,
		component: withRequiredRoleRule('external-game')(ExternalGame),
		meta: {
			breadcrumbName: '外接游戏管理',
			isCrumbActive: false,
		},
		routes: [
			{
				path: EXTERNALGAME_SETTING,
				component: ExternalGameSetting,
				meta: {
					breadcrumbName: '外接游戏设置',
				},
			},
			{
				path: EXTERNALGAME_CONTENT,
				component: ExternalGameContent,
				meta: {
					breadcrumbName: '外接游戏内容设置',
				},
			},
			{
				path: EXTERNALGAME_RULES,
				component: ExternalGameRules,
				meta: {
					breadcrumbName: '工资分红设定',
				},
				routes: [
					{
						path: EXTERNALGAME_RULES,
						component: ExternalGameRulesInfo,
						exact: true,
						meta: {
							breadcrumbName: '工资分红设定',
						},
					},
					{
						path: EXTERNALGAME_RULES_DIVIDEND,
						component: ExternalGameRulesEditDividend,
						exact: true,
						meta: {
							breadcrumbName: '分紅修改',
						},
					},
					{
						path: EXTERNALGAME_RULES_REBATE,
						component: ExternalGameRulesEditRebate,
						exact: true,
						meta: {
							breadcrumbName: '返点修改',
						},
					},
					{
						path: EXTERNALGAME_RULES_SALARY,
						component: ExternalGameRulesEditSalary,
						exact: true,
						meta: {
							breadcrumbName: '工资修改',
						},
					},
				],
			},
			{
				path: EXTERNALGAME_MAINTENANCE,
				component: ExternalGameMaintenance,
				meta: {
					breadcrumbName: '外接游戏维护设置',
				},
			},
		],
	},
	{
		path: ACCOUNT,
		component: Account,
		meta: {
			breadcrumbName: '会员管理',
			isCrumbActive: false,
		},
		routes: [
			{
				path: ACCOUNT_MEMBER,
				component: AccountMember,
				meta: {
					isCrumbVisible: false,
				},
				routes: [
					{
						path: ACCOUNT_MEMBER_MANAGEMENT,
						redirectPath: `${ACCOUNT_MEMBER_MANAGEMENT}/info`,
						component: AccountMemberManagement,
						meta: {
							breadcrumbName: '会员帐户管理',
						},
						routes: [
							{
								path: `${ACCOUNT_MEMBER_MANAGEMENT}/info`,
								component: AccountMemberManagementInfo,
								exact: true,
								meta: {
									pageTitle: '会员帐户管理',
									isCrumbVisible: false,
								},
							},
							{
								path: `${ACCOUNT_MEMBER_MANAGEMENT}/:leaderId/info`,
								component: AccountMemberManagementInfoSubordinate,
								exact: true,
								meta: {
									pageTitle: '会员帐户管理',
									isCrumbVisible: false,
								},
								paramProps: {
									leaderId: ':leaderId'
								}
							},
							{
								path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details`,
								redirectPath: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/basic-setting`,
								component: AccountMemberManagementDetail,
								meta: {
									breadcrumbName: '详细资讯',
								},
								routes: [
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/basic-setting`,
										component: AccountMemberManagementBasicSetting,
										paramProps: {
											userId: ':userId',
										},
										meta: {
											breadcrumbName: '基本设置',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/account-info`,
										component: AccountMemberManagementAccountInfo,
										paramProps: {
											userId: ':userId',
										},
										meta: {
											breadcrumbName: '帐户资讯',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/card-bind`,
										component: AccountMemberManagementCardBind,
										meta: {
											breadcrumbName: '银行卡绑定',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/investment`,
										component: AccountMemberManagementInvestment,
										meta: {
											breadcrumbName: '招商设置',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/dividend-wage-rule`,
										component: AccountMemberManagementDividendWageRule,
										paramProps: {
											userId: ':userId',
										},
										meta: {
											breadcrumbName: '分红与工资规则',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
									{
										path: `${ACCOUNT_MEMBER_MANAGEMENT}/:userId/details/statistics`,
										component: AccountMemberManagementStatistics,
										meta: {
											breadcrumbName: '其他统计资讯',
											pageTitle: '详细资讯',
											isCrumbVisible: false,
										},
									},
								],
								paramProps: {
									userId: ':userId',
								},
							},
						],
					},
					{
						path: ACCOUNT_MEMBER_MOVE,
						component: AccountMemberMove,
						meta: {
							breadcrumbName: '会员帐户移桶',
							pageDescription: '帐户移桶表示將下級帐户轉移到另一個上級的組織中'
						},
					},
					{
						path: ACCOUNT_MEMBER_BONUSRULES,
						component: AccountMemberBonusRules,
						meta: {
							breadcrumbName: '会员奖金规则',
						},
						routes: [
							{
								path: ACCOUNT_MEMBER_BONUSRULES,
								component: AccountMemberBonusRulesInfo,
								exact: true,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false,
								},
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_BONUS_NUMBER_RULES,
								component: AccountMemberBonusRulesBonusNumberRule,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false
								}
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_WAGE,
								component: AccountMemberBonusRulesWage,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false
								}
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_THIRD_PARTY_WAGE,
								component: AccountMemberBonusRulesThirdPartyWage,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false
								}
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_DIVIDEND,
								component: AccountMemberBonusRulesDividend,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false
								}
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_EFFECTIVE_MEMBER,
								component: AccountMemberBonusRulesEffectiveMember,
								meta: {
									pageTitle: '有效人数',
									isCrumbVisible: false
								}
							},
							{
								path: ACCOUNT_MEMBER_BONUSRULES_MAX_PROFIT,
								component: AccountMemberBonusRulesMaxProfit,
								meta: {
									pageTitle: '会员奖金规则',
									isCrumbVisible: false
								}
							},
						],
					},
				],
			},
			{
				path: ACCOUNT_INFO,
				component: AccountInfo,
				redirectPath: ACCOUNT_INFO_IPSEARCH,
				meta: {
					breadcrumbName: '会员资讯查询',
				},
				routes: [
					{
						path: ACCOUNT_INFO_IPSEARCH,
						component: AccountInfoIpSearch,
						meta: {
							pageTitle: '会员资讯查询',
							isCrumbVisible: false,
						},
					},
					{
						path: ACCOUNT_INFO_LINKWECHAT,
						component: AccountInfoLinkWechat,
						meta: {
							pageTitle: '会员资讯查询',
							isCrumbVisible: false,
						},
					},
					{
						path: ACCOUNT_INFO_LINK,
						component: AccountInfoLink,
						meta: {
							pageTitle: '会员资讯查询',
							isCrumbVisible: false,
						},
					},
				]
			},
			{
				path: ACCOUNT_BLACKLIST_BANKBANNED_MULTI_ADD,
				component: AccountBlacklistBankBannedMultiAdd,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST_BANKBANNED_IMPORT,
				component: AccountBlacklistBankBannedImport,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST_IPBANNED_MULTI_ADD,
				component: AccountBlacklistIpBannedMultiAdd,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST_IPBANNED_IMPORT,
				component: AccountBlacklistIpBannedImport,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_MULTI_ADD,
				component: AccountBlacklistFrontstageWhiteListMultiAdd,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST_IMPORT,
				component: AccountBlacklistFrontstageWhiteListImport,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
			},
			{
				path: ACCOUNT_BLACKLIST,
				component: AccountBlacklist,
				redirectPath: ACCOUNT_BLACKLIST_IPBANNED,
				meta: {
					breadcrumbName: '会员黑名单管理',
				},
				routes: [
					{
						path: ACCOUNT_BLACKLIST_IPBANNED,
						component: AccountBlacklistIpBanned,
						meta: {
							breadcrumbName: '会员黑名单管理',
							isCrumbVisible: false,
						},
						routes: [
							{
								path: ACCOUNT_BLACKLIST_IPBANNED,
								component: AccountBlacklistIpBannedInfo,
								exact: true,
								meta: {
									pageTitle: '会员黑名单管理',
									isCrumbVisible: false,
								},
							},
						],
					},
					{
						path: ACCOUNT_BLACKLIST_BANKBANNED,
						component: AccountBlacklistBankBanned,
						meta: {
							breadcrumbName: '会员黑名单管理',
							isCrumbVisible: false,
						},
						routes: [
							{
								path: ACCOUNT_BLACKLIST_BANKBANNED,
								component: AccountBlacklistBankBannedInfo,
								exact: true,
								meta: {
									pageTitle: '会员黑名单管理',
									isCrumbVisible: false,
								},
							},
						],
					},
					{
						path: ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST,
						component: AccountBlacklistFrontstageWhiteList,
						meta: {
							breadcrumbName: '会员黑名单管理',
							isCrumbVisible: false,
						},
						routes: [
							{
								path: ACCOUNT_BLACKLIST_FRONTSTAGE_WHITE_LIST,
								component: AccountBlacklistFrontstageWhiteListInfo,
								exact: true,
								meta: {
									pageTitle: '会员黑名单管理',
									isCrumbVisible: false,
								},
							},
						],
					},
				]
			},
			{
				path: ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE_SETTING,
				component: AccountZhaoShangAccountDividendRuleSetting,
				exact: true,
				meta: {
					breadcrumbName: '招商帐户管理',
				},
			},
			{
				path: ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE_EDIT,
				component: AccountZhaoShangAccountWageRuleEdit,
				exact: true,
				meta: {
					breadcrumbName: '招商帐户管理',
				},
			},
			{
				path: ACCOUNT_ZHAOSHANGACCOUNT,
				component: AccountZhaoShangAccount,
				redirectPath: ACCOUNT_ZHAOSHANGACCOUNT_SETTING,
				meta: {
					breadcrumbName: '招商帐户管理',
				},
				routes: [
					{
						path: ACCOUNT_ZHAOSHANGACCOUNT_SETTING,
						component: AccountZhaoShangAccountSetting,
						meta: {
							pageTitle: '招商帐户管理',
							isCrumbVisible: false,
						},
					},
					{
						path: ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE,
						component: AccountZhaoShangAccountDividendRule,
						meta: {
							pageTitle: '招商帐户管理',
							isCrumbVisible: false,
						},
					},
					{
						path: ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE,
						component: AccountZhaoShangAccountWageRule,
						exact: true,
						meta: {
							pageTitle: '招商帐户管理',
							isCrumbVisible: false,
						},
					},
				],
			},
		],
	},
	{
		path: CASHSYSTEM,
		component: CashSystem,
		meta: {
			breadcrumbName: '财务系统',
			isCrumbActive: false,
		},
		routes: [
			{
				path: CASHSYSTEM_CREDIT,
				component: CashSystemCredit,
				meta: {
					// TODO 等待部門資料確認後，討論要如何顯示部門別名
					breadcrumbName: '入款管理部門:departmentId',
					isCrumbActive: false,
				},
				routes: [
					{
						path: CASHSYSTEM_CREDIT_BANK,
						component: CashSystemCreditBank,
						meta: {
							breadcrumbName: '银行入款',
						},
						paramProps: {
							departmentId: ':departmentId'
						}
					},
					{
						path: CASHSYSTEM_CREDIT_THIRDPARTY,
						component: CashSystemCreditThirdParty,
						meta: {
							breadcrumbName: '第三方入款',
						},
					},
					{
						path: CASHSYSTEM_CREDIT_THIRDPARTYTOBANK,
						component: CashSystemCreditThirdPartyToBank,
						meta: {
							breadcrumbName: '第三方转银行',
						},
					},
					{
						path: CASHSYSTEM_CREDIT_CONTROL,
						component: CashSystemCreditControl,
						meta: {
							breadcrumbName: '入款控制部門:departmentId',
							isCrumbActive: false,
						},
						routes: [
							{
								path: CASHSYSTEM_CREDIT_CONTROL_BANKACCOUNT,
								component: CashSystemCreditControlBankAccount,
								meta: {
									breadcrumbName: '银行帐户设定',
								},
							},
							{
								path: CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYACCOUNT,
								component: CashSystemCreditControlThirdPartyAccount,
								meta: {
									breadcrumbName: '第三方帐户设定',
								},
							},
							{
								path: CASHSYSTEM_CREDIT_CONTROL_THIRDPARTYTOBANKACCOUNT,
								component: CashSystemCreditControlThirdPartyToBankAccount,
								meta: {
									breadcrumbName: '三方转银行設定',
								},
							},
						],
					},
				],
			},
			{
				path: CASHSYSTEM_DEBIT,
				component: CashSystemDebit,
				meta: {
					breadcrumbName: '出款管理',
					isCrumbActive: false,
				},
				routes: [
					{
						path: CASHSYSTEM_DEBIT_ACCOUNTPAY,
						component: CashSystemDebitAccountPay,
						meta: {
							breadcrumbName: '提现处理',
						}
					},
					{
						path: `${CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION}/create`,
						component: CashSystemDebitControlAutoPayConditionCreate,
						exact: true,
						meta: {
							breadcrumbName: '出款控制',
						},
					},
					{
						path: CASHSYSTEM_DEBIT_CONTROL,
						redirectPath: CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY,
						component: CashSystemDebitControl,
						meta: {
							breadcrumbName: '出款控制',
							isCrumbActive: false,
						},
						routes: [
							{
								path: CASHSYSTEM_DEBIT_CONTROL_THIRDPARTY,
								component: CashSystemDebitControlThirdParty,
								meta: {
									pageTitle: '出款控制',
									isCrumbVisible: false,
								},
							},
							{
								path: CASHSYSTEM_DEBIT_CONTROL_BANK,
								component: CashSystemDebitControlBank,
								meta: {
									pageTitle: '出款控制',
									isCrumbVisible: false,
								},
							},
							{
								path: CASHSYSTEM_DEBIT_CONTROL_AUTO_CHANNEL,
								component: CashSystemDebitControlAutoChannel,
								meta: {
									pageTitle: '出款控制',
									isCrumbVisible: false,
								},
							},
							{
								path: CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION,
								component: CashSystemDebitControlAutoPayCondition,
								meta: {
									pageTitle: '出款控制',
									isCrumbVisible: false,
								},
							},
						],
					},
				]
			},
			{
				path: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL,
				component: CashSystemDepositsAndWithdrawalsControl,
				redirectPath: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT,
				meta: {
					breadcrumbName: '出入款控制',
				},
				routes: [
					{
						path: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_DEPOSIT,
						component: CashSystemDepositsAndWithdrawalsControlDeposits,
						meta: {
							pageTitle: '出入款控制',
							isCrumbVisible: false,
						},
					},
					{
						path: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_WITHDRAWALS,
						component: CashSystemDepositsAndWithdrawalsControlWithdrawals,
						meta: {
							pageTitle: '出入款控制',
							isCrumbVisible: false,
						},
					},
					{
						path: CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL_SINGLE_ACCOUNT_SETTINGS,
						component: CashSystemDepositsAndWithdrawalsControlSingleAccountSettings,
						meta: {
							pageTitle: '出入款控制',
							isCrumbVisible: false,
						},
					},
				],
			},
			{
				path: CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT_MULTI_ADD,
				component: CashSystemManualWithDrawalDepositMultiAdd,
				meta: {
					breadcrumbName: '人工在线提领',
				},
			},
			{
				path: CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL_MULTI_ADD,
				component: CashSystemManualWithDrawalWithdrawalMultiAdd,
				meta: {
					breadcrumbName: '人工在线提领',
				},
			},
			{
				path: CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER_MULTI_ADD,
				component: CashSystemManualWithDrawalTransferMultiAdd,
				meta: {
					breadcrumbName: '人工在线提领',
				},
			},
			{
				path: CASHSYSTEM_MANUALWITHDRAWAL,
				component: CashSystemManualWithDrawal,
				redirectPath: CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT,
				meta: {
					breadcrumbName: '人工在线提领',
				},
				paramProps: {
					departmentId: ':departmentId',
				},
				routes: [
					{
						path: CASHSYSTEM_MANUALWITHDRAWAL_DEPOSIT,
						component: CashSystemManualWithDrawalDeposit,
						meta: {
							pageTitle: '人工在线提领',
							isCrumbActive: false,
						},
						paramProps: {
							departmentId: ':departmentId',
						},
					},
					{
						path: CASHSYSTEM_MANUALWITHDRAWAL_WITHDRAWAL,
						component: CashSystemManualWithDrawalWithdrawal,
						meta: {
							pageTitle: '人工在线提领',
							isCrumbActive: false,
						},
						paramProps: {
							departmentId: ':departmentId',
						},
					},
					{
						path: CASHSYSTEM_MANUALWITHDRAWAL_TRANSFER,
						component: CashSystemManualWithDrawalTransfer,
						meta: {
							pageTitle: '人工在线提领',
							isCrumbActive: false,
						},
						paramProps: {
							departmentId: ':departmentId',
						},
					},
				],
			},
			{
				path: CASHSYSTEM_HIERARCHICAL,
				component: CashSystemHierarchical,
				meta: {
					breadcrumbName: '会员移层管理',
					isCrumbActive: false,
				},
				routes: [
					{
						path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
						component: CashSystemHierarchicalManagement,
						meta: {
							breadcrumbName: '修改会员层级',
						},
						routes: [
							{
								path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
								component: CashSystemHierarchicalManagementMain,
								exact: true,
								meta: {
									pageTitle: '修改会员层级',
									isCrumbVisible: false,
								},
							},
							{
								path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO,
								component: CashSystemHierarchicalManagementAuto,
								redirectPath: CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_REGION,
								meta: {
									pageTitle: '修改会员层级',
									isCrumbVisible: false,
								},
								routes: [
									{
										path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_REGION,
										component: CashSystemHierarchicalManagementAutoRegion,
										exact: true,
										meta: {
											pageTitle: '修改会员层级',
											isCrumbVisible: false,
										},
									},
									{
										path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_IP,
										component: CashSystemHierarchicalManagementAutoIp,
										exact: true,
										meta: {
											pageTitle: '修改会员层级',
											isCrumbVisible: false,
										},
									},
									{
										path: CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO_RISKCONTROL,
										component: CashSystemHierarchicalManagementAutoRiskControl,
										exact: true,
										meta: {
											pageTitle: '修改会员层级',
											isCrumbVisible: false,
										},
									},
								],
							},
							{
								path: `${CASHSYSTEM_HIERARCHICAL_MANAGEMENT}/:levelId/member-list`,
								component: CashSystemHierarchicalManagementMemberList,
								meta: {
									pageTitle: '修改会员层级',
									isCrumbVisible: false,
								},
								paramProps: {
									levelId: ':levelId',
								},
							},
						],
					},
					{
						path: `${CASHSYSTEM_HIERARCHICAL}/move-rule`,
						exact: true,
						component: CashSystemHierarchicalMovingLevelRuleCreate,
						meta: {
							breadcrumbName: '新增移层规则',
						},
					},
					{
						path: `${CASHSYSTEM_HIERARCHICAL}/move-rule/:id/edit`,
						component: CashSystemHierarchicalMovingLevelRuleEdit,
						meta: {
							breadcrumbName: '修改移层规则',
						},
					},
					{
						path: CASHSYSTEM_HIERARCHICAL_LOG,
						component: CashSystemHierarchicalLog,
						exact: true,
						meta: {
							breadcrumbName: '移层列表',
						},
					},
				],
			},
			{
				path: CASHSYSTEM_THIRDPARTY,
				component: CashSystemThirdParty,
				meta: {
					breadcrumbName: '第三方下发',
					isCrumbActive: false,
				},
				routes: [
					{
						path: CASHSYSTEM_THIRDPARTY_LIST,
						component: CashSystemThirdPartyList,
						meta: {
							breadcrumbName: '第三方下发列表',
						}
					},
					{
						path: CASHSYSTEM_THIRDPARTY_HISTORY,
						component: CashSystemThirdPartyHistory,
						meta: {
							breadcrumbName: '第三方下发历史纪录',
						}
					}
				],
			},
			{
				path: CASHSYSTEM_BEHALFPAYMENT,
				component: CashSystemBehalfPayment,
				meta: {
					breadcrumbName: '代付公司区',
					isCrumbActive: false,
				},
				routes: [
					{
						path: CASHSYSTEM_BEHALFPAYMENT_COMPANY,
						component: CashSystemBehalfPaymentCompany,
						meta: {
							// TODO use real company name or code
							breadcrumbName: '代付公司 :companyId',
						},
						paramProps: {
							companyId: ':companyId',
						},
					},
				],
			},
			{
				path: CASHSYSTEM_FUNDS,
				component: CashSystemFunds,
				redirectPath: CASHSYSTEM_FUNDS_MEMBER_DAMA,
				meta: {
					breadcrumbName: '玩家资金设定',
				},
				routes: [
					{
						path: CASHSYSTEM_FUNDS_MEMBER_DAMA,
						component: CashSystemFundsMemberDama,
						meta: {
							pageTitle: '玩家资金设定',
							isCrumbVisible: false,
						},
					},
					{
						path: CASHSYSTEM_FUNDS_TRANSFER,
						component: CashSystemFundsTransfer,
						meta: {
							pageTitle: '玩家资金设定',
							isCrumbVisible: false,
						},
					},
				]
			},
		]
	},
	{
		path: USERREPORT,
		component: UserReport,
		meta: {
			breadcrumbName: '用户报表查询',
			isCrumbActive: false,
		},
		routes: [
			{
				path: USERREPORT_MEMBER,
				component: UserReportMember,
				redirectPath: USERREPORT_MEMBER_BETTING_RECORDS,
				meta: {
					isCrumbVisible: false,
					isCrumbActive: false,
				},
				routes: [
					{
						path: USERREPORT_MEMBER_BETTING_RECORDS,
						exact: true,
						component: UserReportMemberBettingRecords,
						meta: {
							breadcrumbName: '投注记录',
						}
					},
					{
						path: USERREPORT_MEMBER_TRACE,
						exact: true,
						component: UserReportMemberTrace,
						meta: {
							breadcrumbName: '追号纪录',
						}
					},
					{

						path: USERREPORT_MEMBER_TRANSACTION_RECORD,
						exact: true,
						component: UserReportMemberTransactionRecord,
						meta: {
							breadcrumbName: '帐变记录',
						}
					},
					{
						path: USERREPORT_MEMBER_PROFIT,
						exact: true,
						component: UserReportMemberProfit,
						meta: {
							breadcrumbName: '盈亏记录',
						},
					},
					{
						path: USERREPORT_MEMBER_CONVERSION,
						exact: true,
						component: UserReportMemberConversion,
						meta: {
							breadcrumbName: '转换记录',
						},
					},
				],
			},
		],
	},
	{
		path: COMPANYREPORT,
		component: CompanyReport,
		meta: {
			breadcrumbName: '公司报表查询',
			isCrumbActive: false,
		},
		routes: [
			{
				path: COMPANYREPORT_PEOPLE,
				component: CompanyReportPeople,
				meta: {
					breadcrumbName: '人數统计图',
				},
			},
			{
				path: COMPANYREPORT_PROFIT,
				component: CompanyReportProfit,
				meta: {
					breadcrumbName: '盈亏报表',
				},
				routes: [
					{
						path: COMPANYREPORT_PROFIT,
						component: CompanyReportProfitFull,
						exact: true,
						meta: {
							breadcrumbName: '盈亏报表',
						},
					},
					{
						path: `${COMPANYREPORT_PROFIT}/:member`,
						component: CompanyReportProfitSingle,
						meta: {
							breadcrumbName: '盈亏报表',
							isCrumbActive: false,
						},
						routes: [
							{
								path: `${COMPANYREPORT_PROFIT}/:member/info`,
								component: CompanyReportProfitSingleMember,
								meta: {
									breadcrumbName: '单一会员汇总',
								},
								paramProps: {
									userName: ':member',
								},
							},
							{
								path: `${COMPANYREPORT_PROFIT}/:member/:subOrdinate`,
								component: CompanyReportProfitSingleSubordinate,
								meta: {
									breadcrumbName: '单一会员汇总',
								},
								paramProps: {
									userName: ':subOrdinate',
								},
							},
						],
					},
				],
			},
			{
				path: COMPANYREPORT_CASHFLOW_COUNT,
				component: CompanyReportCashFlowCount,
				meta: {
					breadcrumbName: '金流次數統計',
				},
			},
			{
				path: COMPANYREPORT_LOTTERY_STATISTICS,
				component: CompanyReportLotteryStatistics,
				meta: {
					breadcrumbName: '彩种统计'
				},
			},
			{
				path: COMPANYREPORT_LOTTERY_PLAYS,
				component: CompanyReportLotteryPlays,
				meta: {
					breadcrumbName: '彩种玩法统计',
				},
				routes: [
					{
						path: COMPANYREPORT_LOTTERY_PLAYS,
						component: CompanyReportLotteryPlaysTable,
						exact: true,
						meta: {
							pageTitle: '彩种玩法统计',
							isCrumbVisible: false,
						},
					},
					{
						path: `${COMPANYREPORT_LOTTERY_PLAYS}/:id`,
						component: CompanyReportLotteryPlaysDetails,
						meta: {
							breadcrumbName: '详细',
						},
					},
				],
			},
			{
				path: COMPANYREPORT_ONLINE_STATISTICS,
				component: CompanyReportOnlineStatistics,
				meta: {
					breadcrumbName: '线上人数统计',
				},
			},
			{
				path: COMPANYREPORT_NEW_MEMBER,
				component: CompanyReportNewMember,
				meta: {
					breadcrumbName: '新进人员统计',
				}
			},
			{
				path: COMPANYREPORT_TEAM,
				component: CompanyReportTeam,
				meta: {
					breadcrumbName: '团队概况',
				},
			},
			{
				path: COMPANYREPORT_MEMBER_BENEFIT,
				component: CompanyReportMemberBenefit,
				meta: {
					breadcrumbName: '会员输赢统计',
				},
				routes: [
					{
						path: COMPANYREPORT_MEMBER_BENEFIT,
						component: CompanyReportMemberBenefitTable,
						exact: true,
						meta: {
							pageTitle: '会员输赢统计',
							isCrumbVisible: false,
						},
					},
				]
			},
			{
				path: COMPANYREPORT_VALID_MEMBER,
				component: CompanyReportValidMember,
				meta: {
					breadcrumbName: '有效人数查询',
				},
				routes: [
					{
						path: COMPANYREPORT_VALID_MEMBER,
						component: CompanyReportValidMemberTable,
						meta: {
							breadcrumbName: '有效人数查询',
							pageTitle: '有效人数查询',
						},
					}
				]
			},
			{
				path: COMPANYREPORT_SUMMARY,
				component: CompanyReportSummary,
				meta: {
					breadcrumbName: '出入帐目汇总',
				}
			},
			{
				path: COMPANYREPORT_DEVICE,
				component: CompanyReportDevice,
				meta: {
					breadcrumbName: '装置统计图查询',
				},
			},
			{
				path: COMPANYREPORT_DIVIDEND,
				component: CompanyReportDividend,
				redirectPath: `${COMPANYREPORT_DIVIDEND}/info`,
				meta: {
					breadcrumbName: '分红自动发放纪录',
				},
				routes: [
					{
						path: `${COMPANYREPORT_DIVIDEND}/info`,
						component: CompanyReportDividendInfo,
						meta: {
							pageTitle: '分红自动发放纪录',
							isCrumbVisible: false,
						}
					},
					{
						path: `${COMPANYREPORT_DIVIDEND}/:recordId`,
						component: CompanyReportDividendRecord,
						redirectPath: `${COMPANYREPORT_DIVIDEND}/:recordId/detail`,
						meta: {
							breadcrumbName: '分红发放',
						},
						routes: [
							{
								path: `${COMPANYREPORT_DIVIDEND}/:recordId/detail`,
								component: CompanyReportDividendDetail,
								meta: {
									pageTitle: '分红发放',
									isCrumbVisible: false,
								},
								paramProps: {
									recordId: ':recordId',
								},
							},
							{
								path: `${COMPANYREPORT_DIVIDEND}/:recordId/:agent`,
								component: CompanyReportDividendSubordinate,
								meta: {
									pageTitle: '分红发放',
									isCrumbVisible: false,
								},
								paramProps: {
									recordId: ':recordId',
								},
							},
						],
					},
				],
			},
		],
	},
	{
		path: MEMBERLOG,
		component: MemberLog,
		meta: {
			breadcrumbName: '会员日志',
			isCrumbActive: false,
		},
		routes: [
			{
				path: MEMBERLOG_FREEZE,
				exact: true,
				component: MemberLogFreeze,
				meta: {
					breadcrumbName: '会员冻结日志',
				},
			},
			{
				path: MEMBERLOG_OPERATION,
				exact: true,
				component: MemberLogOperation,
				meta: {
					breadcrumbName: '会员操作日志',
				},
			},
			{
				path: MEMBERLOG_LOGIN,
				exact: true,
				component: MemberLogLogin,
				meta: {
					breadcrumbName: '会员登入日志',
				},
			},
			{
				path: MEMBERLOG_POINTCHANGE,
				exact: true,
				component: MemberLogPointChange,
				meta: {
					breadcrumbName: '返点变化日志',
				},
			},
			{
				path: MEMBERLOG_BETCHANGE,
				exact: true,
				component: MemberLogBetChange,
				meta: {
					breadcrumbName: '码量变化日志',
				},
			},
			{
				path: MEMBERLOG_BANKCARD,
				exact: true,
				component: MemberLogBankCard,
				meta: {
					breadcrumbName: '银行卡日志',
				},
			},
			{
				path: MEMBERLOG_POINTAPPLY,
				exact: true,
				component: MemberLogPointApply,
				meta: {
					breadcrumbName: '转点申请日志',
				},
			},
			{
				path: MEMBERLOG_PASSWORDCHANGE,
				exact: true,
				component: MemberLogPasswordChange,
				meta: {
					breadcrumbName: '密码更改日志',
				},
			},
			{
				path: MEMBERLOG_PAYCHANGE,
				exact: true,
				component: MemberLogPayChange,
				meta: {
					breadcrumbName: '工资变动日志',
				},
			},
			{
				path: MEMBERLOG_ENTERTAINMENT_PAYCHANGE,
				exact: true,
				component: MemberLogEntertainmentPayChange,
				meta: {
					breadcrumbName: '娱乐工资变动日志',
				},
			},
			{
				path: MEMBERLOG_ENTERTAINMENT_PAYPAYMENT,
				exact: true,
				component: MemberLogEntertainmentPayPayment,
				meta: {
					breadcrumbName: '娱乐工资发放日志',
				},
			},
		],
	},
	{
		path: SYSTEMSETTING,
		component: SystemSetting,
		redirectPath: SYSTEMSETTING_ADMINISTRATOR,
		meta: {
			breadcrumbName: '系统设置',
			isCrumbActive: false,
		},
		routes: [
			{
				path: SYSTEMSETTING_ADMINISTRATOR,
				component: SystemSettingAdministrator,
				redirectPath: SYSTEMSETTING_ADMINISTRATOR_ACCOUNT,
				meta: {
					isCrumbVisible: false,
					isCrumbActive: false,
				},
				routes: [
					{
						path: SYSTEMSETTING_ADMINISTRATOR_ACCOUNT,
						component: SystemSettingAdministratorAccount,
						meta: {
							isCrumbVisible: true,
							isCrumbActive: false,
							breadcrumbName: '管理员帐户设置',
							pageTitle: '管理员帐户设置',
						},
					},
					{
						path: SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST,
						component: SystemSettingAdministratorIpWhiteList,
						redirectPath: SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_INFO,
						meta: {
							isCrumbVisible: false,
							isCrumbActive: false,
						},
						routes: [
							{
								path: SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_INFO,
								component: SystemSettingAdministratorIpWhiteListInfo,
								exact: true,
								meta: {
									breadcrumbName: '管理员IP白名单',
								},
							},
							{
								path: SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_BACKSTAGE_ADD,
								component: SystemSettingAdministratorIpWhiteListBackstageAdd,
								meta: {
									breadcrumbName: '批量新增后台白名单',
								},
							},
							{
								path: SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST_RECEIVE_ADD,
								component: SystemSettingAdministratorIpWhiteListReceiveAdd,
								meta: {
									breadcrumbName: '批量新增后台白名单',
								},
							},
						],
					},
					{
						path: SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE,
						component: SystemSettingAdministratorManageRole,
						meta: {
							isCrumbVisible: true,
							isCrumbActive: false,
							breadcrumbName: '管理员角色管理',
							pageTitle: '管理员角色管理',
						},
					},
					{
						path: SYSTEMSETTING_ADMINISTRATOR_PERMISSION,
						component: SystemSettingAdministratorPermission,
						meta: {
							isCrumbVisible: true,
							isCrumbActive: false,
							breadcrumbName: '管理员权限设定',
							pageTitle: '管理员权限设定',
						},
						routes: [
							{
								path: `${SYSTEMSETTING_ADMINISTRATOR_PERMISSION}/:roleId`,
								component: SystemSettingAdministratorPermissionRule,
								exact: true,
								paramProps: {
									roleId: ':roleId',
								},
								meta: {
									isCrumbVisible: false,
									isCrumbActive: false,
									pageTitle: '管理员权限设定',
								},
							},
						],
					},
				],
			},
			{
				path: SYSTEMSETTING_PLATFORM,
				component: SystemSettingPlatform,
				redirectPath: SYSTEMSETTING_PLATFORM_URL,
				meta: {
					isCrumbVisible: false,
					isCrumbActive: false,
				},
				routes: [
					{
						path: SYSTEMSETTING_PLATFORM_URL,
						component: SystemSettingPlatformUrl,
						meta: {
							breadcrumbName: '网站网址管理',
						},
					},
					{
						path: SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE,
						component: SystemSettingPlatformCarouselImage,
						meta: {
							breadcrumbName: '轮播图片管理',
						},
					},
					{
						path: SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION,
						component: SystemSettingPlatformWechatPromotionUrl,
						meta: {
							breadcrumbName: '微信注册网址管理',
						},
					},
					{
						path: SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT,
						component: SystemSettingPlatformWechatOfficialAccount,
						meta: {
							breadcrumbName: '微信公众号金钥',
						},
					},
					{
						path: SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL,
						component: SystemSettingPlatformAppVersionControl,
						meta: {
							breadcrumbName: 'APP版本控制',
						},
					},
					{
						path: SYSTEMSETTING_PLATFORM_MAINTENANCE,
						component: SystemSettingPlatformMaintenance,
						meta: {
							breadcrumbName: '平台维护设置',
						},
					},
				],
			},
			{
				path: SYSTEMSETTING_CLIENT,
				component: SystemSettingClient,
				redirectPath: SYSTEMSETTING_CLIENT_DICTIONARY,
				meta: {
					isCrumbVisible: false,
					isCrumbActive: false,
				},
				routes: [
					{
						path: SYSTEMSETTING_CLIENT_DICTIONARY,
						component: SystemSettingClientDictionary,
						meta: {
							breadcrumbName: '字典管理',
						},
					},
					{
						path: SYSTEMSETTING_CLIENT_GAME_EXPLAIN,
						component: SystemSettingClientGameExplain,
						meta: {
							breadcrumbName: '玩法说明',
						},
					},
				],
			},
		],
	},
	{
		path: USER,
		component: User,
		exact: true,
		meta: {
			breadcrumbName: '个人登入帐号设定',
			isCrumbActive: false,
		},
	},
	{
		path: LOGIN,
		exact: true,
		component: Login,
	},
	{
		path: LOGOUT,
		exact: true,
		component: Logout,
	},

	//TODO: delete when production/pre-production
	{
		path: DEMO,
		exact: true,
		component: Demo,
	},
];

export default routes;

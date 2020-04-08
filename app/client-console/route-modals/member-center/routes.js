import Member from '../../pages/member-center/member';
import MemberInformation from '../../pages/member-center/member/information';
import MemberBettingRecords from '../../pages/member-center/member/betting-records';
import MemberSecurity from '../../pages/member-center/member/security';
//TODO rm MemberSecurityTestPage
import MemberSecurityTestPage from '../../pages/member-center/member/security/test-page';
import MemberBankInformationPage from '../../pages/member-center/member/bank-information';
import MemberTransactionLog from '../../pages/member-center/member/transaction-log';
import MemberDividendTransactionLog from '../../pages/member-center/member/dividend-transaction-log';
import MemberRechargeWithdrawalLog from '../../pages/member-center/member/recharge-withdrawal-log';
import MemberTransgerThirdPartyLog from '../../pages/member-center/member/transfer-third-party-log';
import MemberReport from '../../pages/member-center/member/report';
import MemberRewardDetail from '../../pages/member-center/member/reward-detail';

import Agent from '../../pages/member-center/agent';
import AgentUserManagement from '../../pages/member-center/agent/user-management';
import AgentUserManagementStatistics from '../../pages/member-center/agent/user-management/user-statistics';
import AgentWechatPromotion from '../../pages/member-center/agent/wechat-promotion';
import AgentFixedWage from '../../pages/member-center/agent/fixed-wage';
import AgentDividendManagement from '../../pages/member-center/agent/dividend-management';
import AgentTeamBetting from '../../pages/member-center/agent/team-betting';
import AgentTeamRechargeWithdrawal from '../../pages/member-center/agent/team-recharge-withdrawal';
import AgentTeamStatistics from '../../pages/member-center/agent/team-statistics';
import AgentTeamReport from '../../pages/member-center/agent/team-report';
import AgentTeamThirdPartyReport from '../../pages/member-center/agent/team-third-party-report';

import Withdraw from '../../pages/member-center/withdraw';
import WithdrawInfo from '../../pages/member-center/withdraw/withdraw-info';
import WithdrawForm from '../../pages/member-center/withdraw/withdraw-form';

import Recharge from '../../pages/member-center/recharge';
import RechargeInformation from '../../pages/member-center/recharge/recharge-information';
import RechargeConfirm from '../../pages/member-center/recharge/recharge-confirm';
import RechargeApplyResult from '../../pages/member-center/recharge/recharge-apply-result';

import Transfer from '../../pages/member-center/transfer';

import Announcement from '../../pages/member-center/announcement';

import Helper from '../../pages/member-center/helper/index.js';

import MemberCenterSelector from '../../components/member-center-selector';

const {
	ID_MEMBER,
	ID_PROXY,
	ID_HELPER,
	ID_ANNOUNCEMENT,
	ID_CUSTOMER_SERVICE,
	ID_RECHARGE,
	ID_TRANSFER,
	ID_WITHDRAW,
} = MemberCenterSelector.ItemIdEnums;

export const RouteKeyEnums = {
	MEMBER: ID_MEMBER,
	MEMBER_INFORMATION: 'Member/MemberInformation',
	MEMBER_SECURITY: 'Member/MemberSecurity',
	//TODO rm MEMBER_SECURITY_TestPage
	MEMBER_SECURITY_TestPage: 'Member/MemberSecurity/TestPage1',
	MEMBER_BANK_INFORMATION: 'Member/MemberBankInformationPage',
	MEMBER_BETTING_RECORDS: 'Member/MemberBettingRecords',
	MEMBER_TRANSACTION_LOG: 'Member/MemberTransactionLog',
	MEMBER_DIVIDEND_TRANSACTION_LOG: 'Member/MemberDividendTransactionLog',
	MEMBER_RECHARGE_WITHDRAWAL_LOG: 'Member/MemberRechargeWithdrawalLog',
	MEMBER_TRANSFER_THIRD_PARTY_LOG: 'Member/MemberTransferThirdPartyLog',
	MEMBER_REPORT: 'Member/Report',
	MEMBER_REWARD_DETAIL: 'Member/MemberRewardDetail',
	AGENT: ID_PROXY,
	AGENT_MANAGEMENT: 'Agent/AgentManagement',
	AGENT_MANAGEMENT_STATISTICS: 'Agent/AgentManagement/Statistics',
	AGENT_WECHAT_PROMOTION: 'Agent/AgentWechatPromotion',
	AGENT_FIXED_WAGE: 'Agent/AgentFixedWage',
	AGENT_DIVIDEND_MANAGEMENT: 'Agent/AgentDividendManagement',
	AGENT_TEAM_BETTING: 'Agent/AgentTeamBetting',
	AGENT_TEAM_RECHARGE_WITHDRAWAL: 'Agent/AgentTeamRechargeWithdrawal',
	AGENT_TEAM_STATISTICS: 'Agent/AgentTeamStatistics',
	AGENT_TEAM_REPORT: 'Agent/AgentTeamReport',
	AGENT_TEAM_THIRD_PARTY_REPORT: 'Agent/AgentTeamThirdPartyReport',
	HELPER: ID_HELPER,
	RECHARGE: ID_RECHARGE,
	RECHARGE_INFORMATION: `${ID_RECHARGE}/RechargeInformation`,
	RECHARGE_CONFIRM: `${ID_RECHARGE}/RechargeConfirm`,
	RECHARGE_APPLY_RESULT: `${ID_RECHARGE}/RechargeApplyResult`,
	WITHDRAW: ID_WITHDRAW,
	WITHDRAW_INFO: `${ID_WITHDRAW}/info`,
	WITHDRAW_FORM: `${ID_WITHDRAW}/form`,
	TRANSFER: ID_TRANSFER,
	ANNOUNCEMENT: ID_ANNOUNCEMENT,
	CUSTOMER_SERVICE: ID_CUSTOMER_SERVICE
};

const {
	MEMBER,
	MEMBER_INFORMATION,
	MEMBER_SECURITY,
	MEMBER_SECURITY_TestPage,
	MEMBER_BANK_INFORMATION,
	MEMBER_BETTING_RECORDS,
	MEMBER_TRANSACTION_LOG,
	MEMBER_DIVIDEND_TRANSACTION_LOG,
	MEMBER_RECHARGE_WITHDRAWAL_LOG,
	MEMBER_TRANSFER_THIRD_PARTY_LOG,
	MEMBER_REPORT,
	MEMBER_REWARD_DETAIL,
	AGENT,
	AGENT_MANAGEMENT,
	AGENT_MANAGEMENT_STATISTICS,
	AGENT_WECHAT_PROMOTION,
	AGENT_DIVIDEND_MANAGEMENT,
	AGENT_TEAM_BETTING,
	AGENT_FIXED_WAGE,
	AGENT_TEAM_RECHARGE_WITHDRAWAL,
	AGENT_TEAM_STATISTICS,
	AGENT_TEAM_REPORT,
	AGENT_TEAM_THIRD_PARTY_REPORT,
	HELPER,
	RECHARGE,
	RECHARGE_INFORMATION,
	RECHARGE_CONFIRM,
	RECHARGE_APPLY_RESULT,
	WITHDRAW,
	WITHDRAW_INFO,
	WITHDRAW_FORM,
	TRANSFER,
	ANNOUNCEMENT,
	CUSTOMER_SERVICE,
} = RouteKeyEnums;

const routes = [
	{
		id: MEMBER,
		component: Member,
		routes: [
			{
				id: MEMBER_INFORMATION,
				component: MemberInformation,
			},
			{
				id: MEMBER_SECURITY,
				component: MemberSecurity,
			},
			//TODO : after Demo, remove it
			{
				id: MEMBER_SECURITY_TestPage,
				component: MemberSecurityTestPage,
			},
			{
				id: MEMBER_BANK_INFORMATION,
				component: MemberBankInformationPage,
			},
			{
				id: MEMBER_BETTING_RECORDS,
				component: MemberBettingRecords,
			},
			{
				id: MEMBER_TRANSACTION_LOG,
				component: MemberTransactionLog,
			},
			{
				id: MEMBER_DIVIDEND_TRANSACTION_LOG,
				component: MemberDividendTransactionLog,
			},
			{
				id: MEMBER_RECHARGE_WITHDRAWAL_LOG,
				component: MemberRechargeWithdrawalLog,
			},
			{
				id: MEMBER_TRANSFER_THIRD_PARTY_LOG,
				component: MemberTransgerThirdPartyLog,
			},
			{
				id: MEMBER_REPORT,
				component: MemberReport,
			},
			{
				id: MEMBER_REWARD_DETAIL,
				component: MemberRewardDetail,
			},
		]
	},
	{
		id: AGENT,
		component: Agent,
		routes: [
			{
				id: AGENT_MANAGEMENT,
				component: AgentUserManagement,
			},
			{
				id: AGENT_MANAGEMENT_STATISTICS,
				component: AgentUserManagementStatistics,
			},
			{
				id:	AGENT_WECHAT_PROMOTION,
				component: AgentWechatPromotion,
			},
			{
				id: AGENT_FIXED_WAGE,
				component: AgentFixedWage,
			},
			{
				id: AGENT_DIVIDEND_MANAGEMENT,
				component: AgentDividendManagement,
			},
			{
				id: AGENT_TEAM_BETTING,
				component: AgentTeamBetting,
			},
			{
				id: AGENT_TEAM_RECHARGE_WITHDRAWAL,
				component: AgentTeamRechargeWithdrawal
			},
			{
				id: AGENT_TEAM_STATISTICS,
				component: AgentTeamStatistics,
			},
			{
				id: AGENT_TEAM_REPORT,
				component: AgentTeamReport,
			},
			{
				id: AGENT_TEAM_THIRD_PARTY_REPORT,
				component: AgentTeamThirdPartyReport
			},
		]
	},
	{
		id: ANNOUNCEMENT,
		component: Announcement,
	},
	{
		id: CUSTOMER_SERVICE,
		component: null,
	},
	{
		id: RECHARGE,
		component: Recharge,
		redirectId: RECHARGE_INFORMATION,
		routes: [
			{
				id: RECHARGE_INFORMATION,
				component: RechargeInformation,
			},
			{
				id: RECHARGE_CONFIRM,
				component: RechargeConfirm,
			},
			{
				id: RECHARGE_APPLY_RESULT,
				component: RechargeApplyResult,
			},
		]
	},
	{
		id: TRANSFER,
		component: Transfer,
	},
	{
		id: WITHDRAW,
		component: Withdraw,
		redirectId: WITHDRAW_INFO,
		routes: [
			{
				id: WITHDRAW_INFO,
				component: WithdrawInfo,
			},
			{
				id: WITHDRAW_FORM,
				component: WithdrawForm,
			},
		],
	},
	{
		id: HELPER,
		component: Helper,
	},
];

export default routes;

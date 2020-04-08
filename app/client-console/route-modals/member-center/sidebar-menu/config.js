import { RouteKeyEnums } from '../routes';
import { Icon, } from 'ljit-react-components';

const {
	CROWN_2,
	WHITE_CROWN_2,
} = Icon.IconTypeEnums;

const {
	MEMBER,
	MEMBER_INFORMATION,
	MEMBER_SECURITY,
	MEMBER_BANK_INFORMATION,
	MEMBER_BETTING_RECORDS,
	MEMBER_TRANSACTION_LOG,
	MEMBER_DIVIDEND_TRANSACTION_LOG,
	MEMBER_RECHARGE_WITHDRAWAL_LOG,
	MEMBER_TRANSFER_THIRD_PARTY_LOG,
	MEMBER_REPORT,
	MEMBER_REWARD_DETAIL,
	ANNOUNCEMENT,
	AGENT_MANAGEMENT,
	AGENT_WECHAT_PROMOTION,
	AGENT_FIXED_WAGE,
	AGENT_DIVIDEND_MANAGEMENT,
	AGENT_TEAM_BETTING,
	AGENT_TEAM_RECHARGE_WITHDRAWAL,
	AGENT_TEAM_STATISTICS,
	AGENT_TEAM_REPORT,
	AGENT_TEAM_THIRD_PARTY_REPORT,
	CUSTOMER_SERVICE,
	HELPER,
	AGENT,
	RECHARGE,
	TRANSFER,
	WITHDRAW,
} = RouteKeyEnums;

export const SubMenuTitleEnums = {
	[MEMBER]: '会员中心',
	[AGENT]: '代理管理',
};

const sideBarMenus = {
	MEMBER: {
		name: '会员',
		id: MEMBER,
		subMenu: [
			{
				name: '基本资讯',
				id: MEMBER_INFORMATION,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '用戶安全',
				id: MEMBER_SECURITY,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '银行资料',
				id: MEMBER_BANK_INFORMATION,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '投注记录',
				id: MEMBER_BETTING_RECORDS,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '帐变明细',
				id: MEMBER_TRANSACTION_LOG,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '分红帐变',
				id: MEMBER_DIVIDEND_TRANSACTION_LOG,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '充提纪录',
				id: MEMBER_RECHARGE_WITHDRAWAL_LOG,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '转账记录',
				id: MEMBER_TRANSFER_THIRD_PARTY_LOG,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '个人报表',
				id: MEMBER_REPORT,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '奖金详情',
				id: MEMBER_REWARD_DETAIL,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
		]
	},
	AGENT: {
		name: '代理',
		id: AGENT,
		subMenu: [
			{
				name: '会员管理',
				id: AGENT_MANAGEMENT,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '微信推广',
				id: AGENT_WECHAT_PROMOTION,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '固定工资',
				id: AGENT_FIXED_WAGE,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '分红管理',
				id: AGENT_DIVIDEND_MANAGEMENT,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '团队投注',
				id: AGENT_TEAM_BETTING,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '团队充提',
				id: AGENT_TEAM_RECHARGE_WITHDRAWAL,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '团队统计',
				id: AGENT_TEAM_STATISTICS,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '团队报表',
				id: AGENT_TEAM_REPORT,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
			{
				name: '娱乐报表',
				id: AGENT_TEAM_THIRD_PARTY_REPORT,
				iconType: CROWN_2,
				selectedIconType: WHITE_CROWN_2,
			},
		]
	},
	HELPER: {
		name: '帮助',
		id: HELPER,
	},
	ANNOUNCEMENT: {
		name: '公告',
		id: ANNOUNCEMENT,
	},
	TRANSFER: {
		name: '转帐',
		id: TRANSFER,
	},
	RECHARGE: {
		name: '充值',
		id: RECHARGE,
	},
	WITHDRAW: {
		name: '提现',
		id: WITHDRAW,
	},
	CUSTOMER_SERVICE: {
		name: '客服',
		id: CUSTOMER_SERVICE,
	}
};

export function getSideBarMenusList() {
	return Object.values(sideBarMenus);
}

export function getSideBarMenusMap() {
	const SideBarMenusConfig = getSideBarMenusList();

	return getFlatSideBarMenus(SideBarMenusConfig);
}

function getFlatSideBarMenus(sideMenus, parent) {
	return sideMenus.reduce(function(reduced, item) {
		reduced[item.id] = Object.assign({}, item);

		if (parent) {
			reduced[item.id].parent = parent;
		}

		if (item.subMenu && item.subMenu.length > 0) {
			reduced = Object.assign({},
				reduced,
				getFlatSideBarMenus(item.subMenu, reduced[item.id]),
			);
		}

		return reduced;
	}, {});
}

export function getFirstSubMenuId (selectedMenu) {
	if (selectedMenu && selectedMenu.subMenu) {
		return selectedMenu.subMenu[0] ? selectedMenu.subMenu[0].id : '';
	}

	return '';
}

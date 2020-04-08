import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import {
	Icon,
	Layout,
	Affix,
	Menu,
} from 'ljit-react-components';
import { RouteKeyEnums, } from '../../routes';
import generateCashSystemManualWithdrawal from './generate-cash-system-manual-withdrawal-menu';
import generateCashSystemCreditMenu from './generate-cash-system-credit-menu';
import generateCashSystemBehalfPaymentMenu from './generate-cash-system-behalf-payment-menu';
import RoleRulesSubMenu from './role-rules-submenu';
import RoleRulesMenuItem from './role-rules-menu-item';
import './style.styl';

const {
	ANNOUNCEMENT,
	ANNOUNCEMENT_POPUP,
	ANNOUNCEMENT_MARQUEE,

	LOTTERY,
	LOTTERY_GENERAL_CLASS,
	LOTTERY_GENERAL_SETTING,
	LOTTERY_GENERAL_XINYONG_SETTING,
	LOTTERY_GENERAL_PLAY,
	LOTTERY_GENERAL_DRAWING,
	LOTTERY_GENERAL_SELFSUPPORT,
	LOTTERY_ODDS_STANDARD,
	LOTTERY_ODDS_XINYONG,
	LOTTERY_ODDS_SPECIAL,

	EXTERNALGAME,
	EXTERNALGAME_SETTING,
	EXTERNALGAME_CONTENT,
	EXTERNALGAME_RULES,
	EXTERNALGAME_MAINTENANCE,

	ACCOUNT,
	ACCOUNT_MEMBER_MANAGEMENT,
	ACCOUNT_MEMBER_MOVE,
	ACCOUNT_MEMBER_BONUSRULES,
	ACCOUNT_INFO,
	ACCOUNT_BLACKLIST,
	ACCOUNT_ZHAOSHANGACCOUNT,

	CASHSYSTEM,
	CASHSYSTEM_DEBIT,
	CASHSYSTEM_DEBIT_ACCOUNTPAY,
	CASHSYSTEM_DEBIT_CONTROL,
	CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL,
	CASHSYSTEM_MANUALWITHDRAWAL,
	CASHSYSTEM_THIRDPARTY,
	CASHSYSTEM_THIRDPARTY_LIST,
	CASHSYSTEM_THIRDPARTY_HISTORY,
	CASHSYSTEM_BEHALFPAYMENT,
	CASHSYSTEM_FUNDS,
	CASHSYSTEM_HIERARCHICAL,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
	CASHSYSTEM_HIERARCHICAL_LOG,

	USERREPORT,
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
	SYSTEMSETTING_ADMINISTRATOR_ACCOUNT,
	SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE,
	SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST,
	SYSTEMSETTING_ADMINISTRATOR_PERMISSION,
	SYSTEMSETTING_PLATFORM_URL,
	SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL,
	SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE,
	SYSTEMSETTING_PLATFORM_MAINTENANCE,
	SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT,
	SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION,
	SYSTEMSETTING_CLIENT_DICTIONARY,
	SYSTEMSETTING_CLIENT_GAME_EXPLAIN,

} = RouteKeyEnums;

const { Sider } = Layout;
const {
	SubMenu,
	Item: MenuItem,
	ItemGroup: MenuItemGroup,
} = Menu;

const {
	CHECK_CIRCEL,
	DASHBOARD,
	FORM,
	TABLE,
	PROFILE,
	WARNING,
	PROJECT,
	FLAG,
	CUSTOMER_SERVICE,
	FORK,
} = Icon.IconTypeEnums;

const propTypes = {
	collapsed: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	openKeys: PropTypes.arrayOf(PropTypes.string),
	selectedKeys: PropTypes.arrayOf(PropTypes.string),
	// function(openKeys: string[])
	onSubMenuOpenChange: PropTypes.func,
	// function({ item, key, selectedKeys })
	onMenuItemSelect: PropTypes.func,
};
const defaultProps = {
	collapsed: false,
	onSubMenuOpenChange: () => {},
	onMenuItemSelect: () => {},
};

class SidebarMenu extends Component {
	render() {
		const {
			collapsed,
			title,
			openKeys,
			selectedKeys,
			onSubMenuOpenChange,
			onMenuItemSelect,
		} = this.props;
		const sidebarMenuWidth = collapsed ? '31px' : '214px';

		return (
			<div className="sidebar-menu__wrapper">
				<Affix>
					<Sider
						trigger={null}
						collapsible
						collapsed={collapsed}
						width={sidebarMenuWidth}
						className="sidebar-menu"
					>
						<div className="sidebar-menu__title">{title}</div>
						<Menu
							themeType={Menu.ThemeTypeEnums.DARK}
							modeType={Menu.ModeTypeEnums.INLINE}
							openKeys={openKeys}
							selectedKeys={selectedKeys}
							onSubMenuOpenChange={onSubMenuOpenChange}
							onMenuItemSelect={onMenuItemSelect}
							inlineCollapsed={collapsed}
						>
							<SubMenu
								key={ANNOUNCEMENT}
								title={<Fragment><Icon type={DASHBOARD} size="middle" /><span>公告管理</span></Fragment>}
							>
								<MenuItem key={ANNOUNCEMENT_POPUP}>
									<Link to={ANNOUNCEMENT_POPUP}>弹跳公告设置</Link>
								</MenuItem>
								<MenuItem key={ANNOUNCEMENT_MARQUEE}>
									<Link to={ANNOUNCEMENT_MARQUEE}>跑马灯公告设置</Link>
								</MenuItem>
							</SubMenu>
							<RoleRulesSubMenu
								functionKey="lottery"
								key={LOTTERY}
								title={<Fragment><Icon type={FORM} size="middle" /><span>彩票管理</span></Fragment>}
							>
								<MenuItemGroup
									title="一般设置"
								>
									<MenuItem key={LOTTERY_GENERAL_CLASS}>
										<Link to={LOTTERY_GENERAL_CLASS}>彩种大分类设置</Link>
									</MenuItem>
									<RoleRulesMenuItem
										functionKey="lottery-setting"
										key={LOTTERY_GENERAL_SETTING}
									>
										<Link to={LOTTERY_GENERAL_SETTING}>彩种设置</Link>
									</RoleRulesMenuItem>
									<MenuItem key={LOTTERY_GENERAL_PLAY}>
										<Link to={LOTTERY_GENERAL_PLAY}>官方玩法设置</Link>
									</MenuItem>
									<MenuItem key={LOTTERY_GENERAL_XINYONG_SETTING}>
										<Link to={LOTTERY_GENERAL_XINYONG_SETTING}>信用玩法设置</Link>
									</MenuItem>
									<MenuItem key={LOTTERY_GENERAL_DRAWING}>
										<Link to={LOTTERY_GENERAL_DRAWING}>开奖设置</Link>
									</MenuItem>
									<MenuItem key={LOTTERY_GENERAL_SELFSUPPORT}>
										<Link to={LOTTERY_GENERAL_SELFSUPPORT}>自营彩设置</Link>
									</MenuItem>
								</MenuItemGroup>
								<MenuItemGroup
									title="赔率限制设置"
								>
									<MenuItem key={LOTTERY_ODDS_STANDARD}>
										<Link to={LOTTERY_ODDS_STANDARD}>官方玩法赔率设置</Link>
									</MenuItem>
									<MenuItem key={LOTTERY_ODDS_XINYONG}>
										<Link to={LOTTERY_ODDS_XINYONG}>信用玩法赔率设置</Link>
									</MenuItem>
									<MenuItem key={LOTTERY_ODDS_SPECIAL}>
										<Link to={LOTTERY_ODDS_SPECIAL}>特殊狀況賠率設置</Link>
									</MenuItem>
								</MenuItemGroup>
							</RoleRulesSubMenu>
							<RoleRulesSubMenu
								functionKey="external-game"
								key={EXTERNALGAME}
								title={<Fragment><Icon type={FORK} size="middle" /><span>外接游戏管理</span></Fragment>}
							>
								<MenuItem key={EXTERNALGAME_SETTING}>
									<Link to={EXTERNALGAME_SETTING}>外接游戏设置</Link>
								</MenuItem>
								<MenuItem key={EXTERNALGAME_CONTENT}>
									<Link to={EXTERNALGAME_CONTENT}>外接游戏内容设置</Link>
								</MenuItem>
								<MenuItem key={EXTERNALGAME_RULES}>
									<Link to={EXTERNALGAME_RULES}>工资分红设定</Link>
								</MenuItem>
								<MenuItem key={EXTERNALGAME_MAINTENANCE}>
									<Link to={EXTERNALGAME_MAINTENANCE}>外接游戏维护设置</Link>
								</MenuItem>
							</RoleRulesSubMenu>
							<SubMenu
								key={ACCOUNT}
								title={<Fragment><Icon type={TABLE} size="middle" /><span>会员管理</span></Fragment>}
							>
								<MenuItem key={ACCOUNT_MEMBER_MANAGEMENT}>
									<Link to={ACCOUNT_MEMBER_MANAGEMENT}>会员帐户管理</Link>
								</MenuItem>
								<MenuItem key={ACCOUNT_MEMBER_MOVE}>
									<Link to={ACCOUNT_MEMBER_MOVE}>会员帐户移桶</Link>
								</MenuItem>
								<MenuItem key={ACCOUNT_INFO}>
									<Link to={ACCOUNT_INFO}>会员资讯查询</Link>
								</MenuItem>
								<MenuItem key={ACCOUNT_BLACKLIST}>
									<Link to={ACCOUNT_BLACKLIST}>会员黑名单管理</Link>
								</MenuItem>
								<MenuItem key={ACCOUNT_MEMBER_BONUSRULES}>
									<Link to={ACCOUNT_MEMBER_BONUSRULES}>会员奖金规则</Link>
								</MenuItem>
								<MenuItem key={ACCOUNT_ZHAOSHANGACCOUNT}>
									<Link to={ACCOUNT_ZHAOSHANGACCOUNT}>招商帐户管理</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu
								key={CASHSYSTEM}
								title={<Fragment><Icon type={PROFILE} size="middle" /><span>财务系统</span></Fragment>}
							>
								{/* TODO sync department id from api */}
								{generateCashSystemCreditMenu('a', '部門A')}
								{generateCashSystemCreditMenu('b', '部門B')}
								<SubMenu
									key={CASHSYSTEM_DEBIT}
									title="出款管理"
								>
									<MenuItem key={CASHSYSTEM_DEBIT_ACCOUNTPAY}>
										<Link to={CASHSYSTEM_DEBIT_ACCOUNTPAY}>提现处理</Link>
									</MenuItem>
									<MenuItem key={CASHSYSTEM_DEBIT_CONTROL}>
										<Link to={CASHSYSTEM_DEBIT_CONTROL}>出款控制</Link>
									</MenuItem>
								</SubMenu>
								<Menu.Item key={CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL}>
									<Link to={CASHSYSTEM_DEPOSITS_AND_WITHDRAWALS_CONTROL}>出入款控制</Link>
								</Menu.Item>
								<SubMenu
									key={CASHSYSTEM_MANUALWITHDRAWAL}
									title="人工在线提领"
								>
									{generateCashSystemManualWithdrawal('a', '部門A')}
									{generateCashSystemManualWithdrawal('b', '部門B')}
									{generateCashSystemManualWithdrawal('c', '部門C')}
								</SubMenu>
								<SubMenu
									key={CASHSYSTEM_HIERARCHICAL}
									title="会员移层管理"
								>
									<MenuItem key={CASHSYSTEM_HIERARCHICAL_MANAGEMENT}>
										<Link to={CASHSYSTEM_HIERARCHICAL_MANAGEMENT}>修改会员层级</Link>
									</MenuItem>
									<MenuItem key={CASHSYSTEM_HIERARCHICAL_LOG}>
										<Link to={CASHSYSTEM_HIERARCHICAL_LOG}>移层历史纪录</Link>
									</MenuItem>
								</SubMenu>
								<SubMenu
									key={CASHSYSTEM_THIRDPARTY}
									title="第三方下发"
								>
									<MenuItem key={`${CASHSYSTEM_THIRDPARTY_LIST}`}>
										<Link to={`${CASHSYSTEM_THIRDPARTY_LIST}`}>第三方下发列表</Link>
									</MenuItem>
									<MenuItem key={`${CASHSYSTEM_THIRDPARTY_HISTORY}`}>
										<Link to={`${CASHSYSTEM_THIRDPARTY_HISTORY}`}>第三方下发历史纪录</Link>
									</MenuItem>
								</SubMenu>
								<SubMenu
									key={CASHSYSTEM_BEHALFPAYMENT}
									title="代付公司区"
								>
									{/* TODO sync company id from api */}
									{generateCashSystemBehalfPaymentMenu('a', '代付公司 A')}
									{generateCashSystemBehalfPaymentMenu('b', '代付公司 B')}
									{generateCashSystemBehalfPaymentMenu('c', '代付公司 C')}
								</SubMenu>
								<MenuItem key={CASHSYSTEM_FUNDS}>
									<Link to={CASHSYSTEM_FUNDS}>玩家资金设定</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu
								key={USERREPORT}
								title={<Fragment><Icon type={CHECK_CIRCEL} size="middle" /><span>会员报表查询</span></Fragment>}
							>
								<MenuItemGroup
									title="会员纪录"
								>
									<MenuItem key={USERREPORT_MEMBER_BETTING_RECORDS}>
										<Link to={USERREPORT_MEMBER_BETTING_RECORDS}>投注记录</Link>
									</MenuItem>
									<MenuItem key={USERREPORT_MEMBER_TRACE}>
										<Link to={USERREPORT_MEMBER_TRACE}>追号纪录</Link>
									</MenuItem>
									<MenuItem key={USERREPORT_MEMBER_TRANSACTION_RECORD}>
										<Link to={USERREPORT_MEMBER_TRANSACTION_RECORD}>帐变记录</Link>
									</MenuItem>
									<MenuItem key={USERREPORT_MEMBER_PROFIT}>
										<Link to={USERREPORT_MEMBER_PROFIT}>盈亏记录</Link>
									</MenuItem>
									<MenuItem key={USERREPORT_MEMBER_CONVERSION}>
										<Link to={USERREPORT_MEMBER_CONVERSION}>转换记录</Link>
									</MenuItem>
								</MenuItemGroup>
							</SubMenu>
							<SubMenu
								key={COMPANYREPORT}
								title={<Fragment><Icon type={PROJECT} size="middle" /><span>公司报表查询</span></Fragment>}
							>
								<MenuItem key={COMPANYREPORT_SUMMARY}>
									<Link to={COMPANYREPORT_SUMMARY}>出入帐目汇总</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_CASHFLOW_COUNT}>
									<Link to={COMPANYREPORT_CASHFLOW_COUNT}>金流次數統計</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_PROFIT}>
									<Link to={COMPANYREPORT_PROFIT}>盈亏报表</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_LOTTERY_STATISTICS}>
									<Link to={COMPANYREPORT_LOTTERY_STATISTICS}>彩种统计</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_VALID_MEMBER}>
									<Link to={COMPANYREPORT_VALID_MEMBER}>有效人数查询</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_MEMBER_BENEFIT}>
									<Link to={COMPANYREPORT_MEMBER_BENEFIT}>会员输赢统计</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_LOTTERY_PLAYS}>
									<Link to={COMPANYREPORT_LOTTERY_PLAYS}>彩种玩法统计</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_PEOPLE}>
									<Link to={COMPANYREPORT_PEOPLE}>人數统计图</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_ONLINE_STATISTICS}>
									<Link to={COMPANYREPORT_ONLINE_STATISTICS}>线上人数统计</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_NEW_MEMBER}>
									<Link to={COMPANYREPORT_NEW_MEMBER}>新进人员统计</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_DEVICE}>
									<Link to={COMPANYREPORT_DEVICE}>装置统计图查询</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_TEAM}>
									<Link to={COMPANYREPORT_TEAM}>团队概况</Link>
								</MenuItem>
								<MenuItem key={COMPANYREPORT_DIVIDEND}>
									<Link to={COMPANYREPORT_DIVIDEND}>分红自动发放纪录</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu
								key={MEMBERLOG}
								title={<Fragment><Icon type={FLAG} size="middle" /><span>会员日志</span></Fragment>}
							>
								<MenuItem key={MEMBERLOG_FREEZE}>
									<Link to={MEMBERLOG_FREEZE}>会员冻结日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_OPERATION}>
									<Link to={MEMBERLOG_OPERATION}>会员操作日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_LOGIN}>
									<Link to={MEMBERLOG_LOGIN}>会员登入日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_POINTCHANGE}>
									<Link to={MEMBERLOG_POINTCHANGE}>返点变化日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_BETCHANGE}>
									<Link to={MEMBERLOG_BETCHANGE}>码量变化日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_BANKCARD}>
									<Link to={MEMBERLOG_BANKCARD}>银行卡日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_POINTAPPLY}>
									<Link to={MEMBERLOG_POINTAPPLY}>转点申请日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_PASSWORDCHANGE}>
									<Link to={MEMBERLOG_PASSWORDCHANGE}>密码更改日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_PAYCHANGE}>
									<Link to={MEMBERLOG_PAYCHANGE}>工资变动日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_ENTERTAINMENT_PAYCHANGE}>
									<Link to={MEMBERLOG_ENTERTAINMENT_PAYCHANGE}>娱乐工资变动日志</Link>
								</MenuItem>
								<MenuItem key={MEMBERLOG_ENTERTAINMENT_PAYPAYMENT}>
									<Link to={MEMBERLOG_ENTERTAINMENT_PAYPAYMENT}>娱乐工资发放日志</Link>
								</MenuItem>
							</SubMenu>
							<SubMenu
								key={SYSTEMSETTING}
								title={<Fragment><Icon type={WARNING} size="middle" /><span>系统设置</span></Fragment>}
							>
								<MenuItemGroup title="后台管理员帐户设定">
									<MenuItem key={SYSTEMSETTING_ADMINISTRATOR_ACCOUNT}>
										<Link to={SYSTEMSETTING_ADMINISTRATOR_ACCOUNT}>管理员帐户设置</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST}>
										<Link to={SYSTEMSETTING_ADMINISTRATOR_IP_WHITE_LIST}>管理员IP白名单</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE}>
										<Link to={SYSTEMSETTING_ADMINISTRATOR_MANAGE_ROLE}>管理员角色管理</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_ADMINISTRATOR_PERMISSION}>
										<Link to={SYSTEMSETTING_ADMINISTRATOR_PERMISSION}>管理员权限设定</Link>
									</MenuItem>
								</MenuItemGroup>
								<MenuItemGroup title="平台相关设置">
									<MenuItem key={SYSTEMSETTING_PLATFORM_URL}>
										<Link to={SYSTEMSETTING_PLATFORM_URL}>网站网址管理</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE}>
										<Link to={SYSTEMSETTING_PLATFORM_CAROUSEL_IMAGE}>轮播图片管理</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION}>
										<Link to={SYSTEMSETTING_PLATFORM_WECHAT_PROMOTION}>微信注册网址管理</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT}>
										<Link to={SYSTEMSETTING_PLATFORM_WECHAT_OFFICIAL_ACCOUNT}>微信公众号金钥</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL}>
										<Link to={SYSTEMSETTING_PLATFORM_APP_VERSION_CONTROL}>APP版本控制</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_PLATFORM_MAINTENANCE}>
										<Link to={SYSTEMSETTING_PLATFORM_MAINTENANCE}>平台维护设置</Link>
									</MenuItem>
								</MenuItemGroup>
								<MenuItemGroup title="前台说明">
									<MenuItem key={SYSTEMSETTING_CLIENT_DICTIONARY}>
										<Link to={SYSTEMSETTING_CLIENT_DICTIONARY}>字典管理</Link>
									</MenuItem>
									<MenuItem key={SYSTEMSETTING_CLIENT_GAME_EXPLAIN}>
										<Link to={SYSTEMSETTING_CLIENT_GAME_EXPLAIN}>玩法说明</Link>
									</MenuItem>
								</MenuItemGroup>
							</SubMenu>
						</Menu>
					</Sider>
				</Affix>
			</div>
		);
	}
}

SidebarMenu.propTypes = propTypes;
SidebarMenu.defaultProps = defaultProps;

export default SidebarMenu;

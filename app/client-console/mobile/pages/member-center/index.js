import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	UserAvatar,
	Button,
	HorizontalTabs,
	Icon,
	IconButton,
	Badge,
} from 'ljit-react-components';
import { NavigationKeyEnums, } from '../../navigation';
import ListContainer from './list-container';
import './style.styl';

export const PREFIX_CLASS = "mobile-member-center-page";

const {
	MEMBER_BETTING_RECORDS,
	BANKS,
} = NavigationKeyEnums;

const {
	SizeEnums,
	IconTypeEnums,
} = Icon;

const {
	XX_LARGE,
	X_LARGE
} = SizeEnums;

const {
	BELL2,
	SETTING_BET_RECORD,
	SETTING_PERSONAL_STATISTIC,
	SETTING_ACCOUNT_DETAILS,
	SETTING_PERSONAL_INFO,
	SETTING_CONTACT_CUSTOMER_SERVICE,
	SETTING_SECURITY,
	SETTING_BANK,
	SETTING_BONUS,
	SETTING_ATM_RECORD,
	SETTING_TRANSFER_RECORD,
	SETTING_REWARD,
	SETTING_GJ,
	SETTING_MEMBER_MANAGEMENT,
	SETTING_WAGE_MANAGEMENT,
	SETTING_WECHAT_PROMOTION,
	SETTING_SALARY_RANKING,
	SETTING_TEAM_REPORT,
	THIRD_PARTY_WAGE,
	SETTING_BONUS_MANAGEMENT,
	SETTING_TEAM_BAT,
	SETTING_TEAM_STATISTIC,
	THIRD_PARTY_REPORT,
	SETTING_CHILDREN_STATUS,
} = IconTypeEnums;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
};
const PERSONAL = 'personal';
const AGENT = 'agent';

function getMaskedText(text) {
	return text
		.split('')
		.map((item, index) => (index >= 4 ? '*' : item))
		.join('');
}

function MemberCenterPage({ onNavigate, }) {

	const [activeKey, setActiveKey] = useState(PERSONAL);

	function _handleNavigation(page) {
		onNavigate({
			page,
			navigationType: 'push',
		});
	}
	function _handleClickLogout() {
		// TODO add click destroy button
		console.log('logout');
	}
	function _handleClickNotification() {
		// TODO add click bell event
		console.log('notification');
	}

	function _renderIcon(type, size = X_LARGE) {
		return (
			<Icon type={type} size={size}></Icon>
		);
	}
	function _renderDescription() {
		return (
			<div>
				<span>余额 884.64</span>
				<Button
					onClick={_handleClickLogout}
				>
					注销
				</Button>
			</div>
		);
	}
	return (
		<div className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__banner`}>
				<UserAvatar
					size={50}
					description={_renderDescription()}
					userName={getMaskedText("someone17")}
				/>
				<Badge
					count={1}
					isBordered={false}
				>
					<IconButton
						type={BELL2}
						size={X_LARGE}
						onClick={_handleClickNotification}
					/>
				</Badge>
			</div>
			<HorizontalTabs
				activeKey={activeKey}
				onChange={(horizontalTabsActiveKey) => { setActiveKey(horizontalTabsActiveKey); }}
				className={`${PREFIX_CLASS}__tabs`}
				isAnimated={false}
			>
				{/* TODO redirect to correct page */}
				<HorizontalTabs.TabPane key={PERSONAL} tab="个人中心">
					<ListContainer
						topList={[{
							icon: _renderIcon(SETTING_BET_RECORD, XX_LARGE),
							text: "投注纪录",
							onClick: () => {_handleNavigation(MEMBER_BETTING_RECORDS);}
						},{
							icon: _renderIcon(SETTING_PERSONAL_STATISTIC, XX_LARGE),
							text: "個人報表",
							onClick: () => {console.log('test2');}
						},{
							icon: _renderIcon(SETTING_ACCOUNT_DETAILS, XX_LARGE),
							text: "帐变明細",
							onClick: () => {console.log('test3');}
						}]}
						contentList={[{
							icon: _renderIcon(SETTING_PERSONAL_INFO),
							text: "用戶中心",
							onClick: () => {console.log('test1');}
						},{
							icon: _renderIcon(SETTING_CONTACT_CUSTOMER_SERVICE),
							text: "联络客服",
							onClick: () => {console.log('test2');}
						},{
							icon: _renderIcon(SETTING_SECURITY),
							text: "用戶安全",
							onClick: () => {console.log('test3');}
						},{
							icon: _renderIcon(SETTING_BANK),
							text: "银行资料",
							onClick: () => {_handleNavigation(BANKS);}
						},{
							icon: _renderIcon(SETTING_BONUS),
							text: "分红账变",
							onClick: () => {console.log('test4');}
						},{
							icon: _renderIcon(SETTING_ATM_RECORD),
							text: "充提纪录",
							onClick: () => {console.log('test5');}
						},{
							icon: _renderIcon(SETTING_TRANSFER_RECORD),
							text: "转账记录",
							onClick: () => {console.log('test6');}
						},{
							icon: _renderIcon(SETTING_REWARD),
							text: "奖金详情",
							onClick: () => {console.log('test7');}
						},{
							icon: _renderIcon(SETTING_GJ),
							text: "自动挂机",
							onClick: () => {console.log('test8');}
						}]}
					/>
				</HorizontalTabs.TabPane>
				<HorizontalTabs.TabPane key={AGENT} tab="代理中心">
					<ListContainer
						topList={[{
							icon: _renderIcon(SETTING_MEMBER_MANAGEMENT, XX_LARGE),
							text: "会员管理",
							onClick: () => {console.log('test1');}
						},{
							icon: _renderIcon(SETTING_WAGE_MANAGEMENT, XX_LARGE),
							text: "固定工资",
							onClick: () => {console.log('test2');}
						},{
							icon: _renderIcon(SETTING_WECHAT_PROMOTION, XX_LARGE),
							text: "微信推广",
							onClick: () => {console.log('test3');}
						}]}
						contentList={[{
							icon: _renderIcon(SETTING_SALARY_RANKING),
							text: "排名工资",
							onClick: () => {console.log('test1');}
						},{
							icon: _renderIcon(SETTING_TEAM_REPORT),
							text: "团队报表",
							onClick: () => {console.log('test2');}
						},{
							icon: _renderIcon(THIRD_PARTY_WAGE),
							text: "娱乐工资",
							onClick: () => {console.log('test3');}
						},{
							icon: _renderIcon(SETTING_BONUS_MANAGEMENT),
							text: "分红管理",
							onClick: () => {console.log('test4');}
						},{
							icon: _renderIcon(SETTING_TEAM_BAT),
							text: "团队投注",
							onClick: () => {console.log('test5');}
						},{
							icon: _renderIcon(SETTING_BONUS),
							text: "团队充提",
							onClick: () => {console.log('test6');}
						},{
							icon: _renderIcon(SETTING_TEAM_STATISTIC),
							text: "团队统计",
							onClick: () => {console.log('test7');}
						},{
							icon: _renderIcon(THIRD_PARTY_REPORT),
							text: "娱乐报表",
							onClick: () => {console.log('test8');}
						},{
							icon: _renderIcon(SETTING_CHILDREN_STATUS),
							text: "下级状态",
							onClick: () => {console.log('test9');}
						}]}
					/>
				</HorizontalTabs.TabPane>
			</HorizontalTabs>
			<p>
				系統版本1.2.30
			</p>
		</div>
	);
}

MemberCenterPage.propTypes = propTypes;

export default MemberCenterPage;

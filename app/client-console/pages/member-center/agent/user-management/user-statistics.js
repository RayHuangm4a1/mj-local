import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import StatisticsLayout from '../../../../components/statistics-layout';
import { connectObservable, } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../../../lib/enums';
import { RouteKeyEnums } from '../../../../route-modals/member-center/routes';
import './style.styl';

const PREFIX_CLASS = 'user-management-statistics';

const propTypes = {
	notifyToChangeModalRoute: PropTypes.func.isRequired,
};

// TODO 實作導頁後拿到個別 user
class AgentUserManagementUserStatistics extends Component {
	render() {
		const { notifyToChangeModalRoute } = this.props;

		return (
			<div className={PREFIX_CLASS}>
				<StatisticsLayout
					username="test0301"
					hasBackButton
					onClickBackButton={() => notifyToChangeModalRoute(RouteKeyEnums.AGENT_MANAGEMENT)}
					teamInfo={fakeTeamInfoData}
					teamBonusNumber={fakeTeamBonusNumberData}
					tenDaysData={fakeTenDaysData}
				/>
			</div>
		);
	}
}

AgentUserManagementUserStatistics.propTypes = propTypes;

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => {
			return notify(
				EventEnum.CHANGE_MEMBER_CENTER_ROUTE,
				data,
			);
		}
	};
}

export default connectObservable(mapNotifyToProps)(AgentUserManagementUserStatistics);

// TODO get real data and fix cloumn name
const fakeTeamBonusNumberData = [
	{
		bonus: 1956,
		numberOfPeople: 14
	},
	{
		bonus: 1956,
		numberOfPeople: 1
	},
	{
		bonus: 1956,
		numberOfPeople: 14
	},
	{
		bonus: 1956,
		numberOfPeople: 1
	},
	{
		bonus: 1956,
		numberOfPeople: 14
	},
	{
		bonus: 1956,
		numberOfPeople: 1
	},
	{
		bonus: 1956,
		numberOfPeople: 14
	},
	{
		bonus: 1956,
		numberOfPeople: 1
	},
];

// TODO 讓 table 呈現的假資料，等接 API 要轉成這樣的資料格式
const fakeTenDaysData = [
	{
		column: '注册',
		"7/31": 1,
		"8/1": 0,
		"8/2": 10,
		"8/3": 1,
		"8/4": 1,
		"8/5": 13,
		"8/6": 1,
		"8/7": 1,
		"8/8": 10,
		"8/9": 1,
	},
	{
		column: '微信',
		"7/31": 1,
		"8/1": 1,
		"8/2": 1,
		"8/3": 1,
		"8/4": 1,
		"8/5": 15,
		"8/6": 1,
		"8/7": 11,
		"8/8": 1,
		"8/9": 0,
	},
	{
		column: '投注',
		"7/31": 1,
		"8/1": 1,
		"8/2": 1,
		"8/3": 1,
		"8/4": 16,
		"8/5": 1,
		"8/6": 1,
		"8/7": 0,
		"8/8": 14,
		"8/9": 1,
	},
	{
		column: '有效',
		"7/31": 1,
		"8/1": 1,
		"8/2": 12,
		"8/3": 1,
		"8/4": 0,
		"8/5": 1,
		"8/6": 17,
		"8/7": 1,
		"8/8": 1,
		"8/9": 1,
	},
];

// TODO GET data from API
const fakeTeamInfoData = {
	numOfTeam: 780,
	numOfTeamBalance: 200241,
	numOfHasBalanceUser: 1956,
	numOfBalanceEqualZero: 12,
	numOfBetting: 12,
};

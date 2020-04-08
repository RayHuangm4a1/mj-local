import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import CardNumberManagement from './card-number-management';
import BankCardLog from './bank-card-log';
import MemberOperationLog from './member-operation-log';
import IpLoginLog from './ip-login-log';
import BackstageLog from './backstage-log';
import './style.styl';
const { TabPane } = Tabs;

const propTypes = {
	username: PropTypes.string,
};

class CustomerServiceTaskAccountPage extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<Tabs defaultActiveKey="card-number" >
				<TabPane tab="卡号管理" key="card-number">
					<CardNumberManagement/>
				</TabPane>
				<TabPane tab="银行卡日志" key="bank-card-log">
					<BankCardLog/>
				</TabPane>
				<TabPane tab="会员操作日志" key="member-operation-log">
					<MemberOperationLog/>
				</TabPane>
				<TabPane tab="IP登录日志" key="ip-login-log">
					<IpLoginLog/>
				</TabPane>
				<TabPane tab="后台操作日志" key="backstage-log">
					<BackstageLog/>
				</TabPane>
			</Tabs>
		);
	}
}

CustomerServiceTaskAccountPage.propTypes = propTypes;

export default CustomerServiceTaskAccountPage;

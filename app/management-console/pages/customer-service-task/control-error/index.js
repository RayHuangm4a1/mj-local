import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HorizontalTabs, } from 'ljit-react-components';
import TransferPointRecord from './transfer-point-record';
import CardIdManagement from './card-id-management';
import BankCardLog from './bank-card-log';
import MemberOperationLo from './member-operation-log';
import IpLoginLog from './ip-login-log';
import BackstageLog from './backstage-log';
import './style.styl';

const { TabPane } = HorizontalTabs;

const propTypes = {
	username: PropTypes.string,
};

class CustomerServiceTaskControlErrorPage extends Component {
	constructor() {
		super();
		this.state = {
			tabsActiveKey: "cardIdManagement"
		};
	}

	render() {
		const { tabsActiveKey, } = this.state;

		return (
			<HorizontalTabs
				activeKey={tabsActiveKey}
				onChange={(tabsActiveKey) => this.setState({ tabsActiveKey, })}
				className="customer-service-control-error"
			>
				<TabPane tab="卡号管理" key="cardIdManagement">
					<CardIdManagement />
				</TabPane>
				<TabPane tab="银行卡号日志" key="bankCardLog">
					<BankCardLog />
				</TabPane>
				<TabPane tab="当天转点记录" key="transferPointRecord">
					<TransferPointRecord />
				</TabPane>
				<TabPane tab="IP 登录日志" key="IpLoginLog">
					<IpLoginLog/>
				</TabPane>
				<TabPane tab="会员操作日志" key="memberOperationLog">
					<MemberOperationLo />
				</TabPane>
				<TabPane tab="后台操作日志" key="backstageLog">
					<BackstageLog/>
				</TabPane>
			</HorizontalTabs>
		);
	}
}

CustomerServiceTaskControlErrorPage.propTypes = propTypes;

export default CustomerServiceTaskControlErrorPage;

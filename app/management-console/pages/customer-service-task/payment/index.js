import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../components/page-block';
import CardIdManagementTab from './card-id-management-tab';
import WithdrawalHandleTab from './withdrawal-handle-tab';
import PayCompanyTab from './pay-company-tab';
import { HorizontalTabs, } from 'ljit-react-components';
import './style.styl';
const { TabPane } = HorizontalTabs;

const propTypes = {
	username: PropTypes.string,
};

class CustomerServiceTaskPaymentPage extends Component {
	constructor() {
		super();

		this.state = {
			tabActiveKey: 'cardIdManagement'
		};
	}

	render() {
		const { tabActiveKey } = this.state;

		return (
			<PageBlock className="customer-service-task-payment">
				<HorizontalTabs
					activeKey={tabActiveKey}
					onChange={(tabActiveKey) => this.setState({ tabActiveKey, })}
				>
					<TabPane key="cardIdManagement" tab="卡号管理">
						<CardIdManagementTab />
					</TabPane>
					<TabPane key="withdrawalHandle" tab="提现处理">
						<WithdrawalHandleTab />
					</TabPane>
					<TabPane key="payCompany" tab="代付公司">
						<PayCompanyTab />
					</TabPane>
				</HorizontalTabs>
			</PageBlock>
		);
	}
}

CustomerServiceTaskPaymentPage.propTypes = propTypes;

export default CustomerServiceTaskPaymentPage;

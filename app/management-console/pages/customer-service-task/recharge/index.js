import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../components/page-block';
import GeneralDepositTab from './general-deposit-tab';
import ThirdPartyDepositTab from './third-party-deposit-tab';
import { HorizontalTabs, } from 'ljit-react-components';
const { TabPane } = HorizontalTabs;

const propTypes = {
	username: PropTypes.string,
};
const defaultProps = {};

class CustomerServiceTaskRechargePage extends Component {
	constructor() {
		super();
		this.state = {
			onlineDataSource: [],
			thirdPartyDataSource: [],
			wechatDataSource: [],
			qqDataSource: [],
			aliDataSource: [],
			unionDataSource: [],
			tabsActiveKey: 'bank',
		};
	}

	render() {
		const {
			onlineDataSource,
			thirdPartyDataSource,
			wechatDataSource,
			qqDataSource,
			aliDataSource,
			unionDataSource,
			tabsActiveKey,
		} = this.state;

		return (
			<PageBlock>
				<HorizontalTabs
					activeKey={tabsActiveKey}
					onChange={(tabsActiveKey) => this.setState({ tabsActiveKey, })}
				>
					<TabPane tab="银行入款" key="bank">
						<GeneralDepositTab dataSource={onlineDataSource}/>
					</TabPane>
					<TabPane tab="第三方支付入款" key="third-party">
						<ThirdPartyDepositTab dataSource={thirdPartyDataSource}/>
					</TabPane>
					<TabPane tab="微信入款" key="wechat">
						<GeneralDepositTab dataSource={wechatDataSource}/>
					</TabPane>
					<TabPane tab="QQ入款" key="qq">
						<GeneralDepositTab dataSource={qqDataSource}/>
					</TabPane>
					<TabPane tab="支付宝入款" key="ali">
						<GeneralDepositTab dataSource={aliDataSource}/>
					</TabPane>
					<TabPane tab="云闪付入款" key="union">
						<GeneralDepositTab dataSource={unionDataSource}/>
					</TabPane>
				</HorizontalTabs>
			</PageBlock>
		);
	}

	componentDidMount() {
		// TODO fetch data
		const { username } = this.props;

		this.setState({
			onlineDataSource: fakeGeneralDataSource,
			thirdPartyDataSource: fakeThirdPartyDataSource,
			wechatDataSource: fakeGeneralDataSource.slice(),
			qqDataSource: fakeGeneralDataSource.slice(),
			aliDataSource: fakeGeneralDataSource.slice(),
			unionDataSource: fakeGeneralDataSource.slice(),
		});
	}
}

CustomerServiceTaskRechargePage.propTypes = propTypes;
CustomerServiceTaskRechargePage.defaultProps = defaultProps;

export default CustomerServiceTaskRechargePage;

const fakeGeneralDataSource = [
	{
		_id: 1,
		rechargeId: '2201030200',
		rechageType: '支付宝红包',
		memberAccount: 'codtest201',
		amount: 11200,
		bank: '花旗银行',
		rechangeDate: '2019/03/20',
		verifyDate: '2019/04/21',
		status: 'unconfirmed',
		balance: 300,
		fee: 500,
		payer: '何紹偉',
		paymentCard: '20317121321',
		recivedCard: '20317121356',
		postscript: '6614',
		operator: 'system_admin',
		remark: '手机',
	},{
		_id: 2,
		rechargeId: '2201030201',
		rechageType: '支付宝红包',
		memberAccount: 'codtest401',
		amount: 12200,
		bank: '民生银行',
		rechangeDate: '2019/03/20',
		verifyDate: '2019/04/21',
		status: 'cancelled',
		balance: 300,
		fee: 200,
		payer: '何紹偉',
		paymentCard: '20317121321',
		recivedCard: '20317621356',
		postscript: '6314',
		operator: 'system_admin',
		remark: '手机',
	},{
		_id: 3,
		rechargeId: '2201030202',
		rechageType: '支付宝红包',
		memberAccount: 'codtest401',
		amount: 12200,
		bank: '民生银行',
		rechangeDate: '2019/03/20',
		verifyDate: '2019/04/21',
		status: 'confirmed',
		balance: 300,
		fee: 200,
		payer: '何紹偉',
		paymentCard: '20317121321',
		recivedCard: '20317621356',
		postscript: '6314',
		operator: 'system_admin',
		remark: '手机',
	},
];
const fakeThirdPartyDataSource = [
	{
		_id: 1,
		orderId: '2201030201',
		paymentMethod: 'smilepay',
		memberAccount: 'codtest211',
		amount: 10300,
		bank: '中信银行',
		rechangeDate: '2019/03/20',
		verifyDate: '2019/03/21',
		status: 'confirmed',
		serialNumber: '33920',
		fee: 500,
		thirdPartyAccount: 'test8',
		errorMessage: 'no data',
		reciveCard: '20317223942',
		operator: 'system_admin',
	},{
		_id: 2,
		orderId: '2201030202',
		paymentMethod: 'smilepay',
		memberAccount: 'codtest211',
		amount: 30300,
		bank: '中国银行',
		rechangeDate: '2019/03/20',
		verifyDate: '2019/03/21',
		status: 'unconfirmed',
		serialNumber: '32924',
		fee: 500,
		thirdPartyAccount: 'test8',
		errorMessage: 'no data',
		reciveCard: '20717123942',
		operator: 'system_admin',
	},{
		_id: 3,
		orderId: '22010302003',
		paymentMethod: 'smilepay',
		memberAccount: 'codtest111',
		amount: 13000,
		bank: '兴业银行',
		rechangeDate: '2019/02/20',
		verifyDate: '2019/02/21',
		status: 'cancelled',
		serialNumber: '32920',
		fee: 500,
		thirdPartyAccount: 'test8',
		errorMessage: 'no data',
		reciveCard: '20317123942',
		operator: 'system_admin',
	},
];

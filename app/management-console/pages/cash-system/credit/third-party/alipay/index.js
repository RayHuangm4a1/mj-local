import React, { Component } from 'react';
import DepositRecordSearchForm from '../deposit-record-search-form';
import PageBlock from '../../../../../components/page-block';
import { GeneralDepositRecordTable, } from '../../../../../components/table';
import './style.styl';

const propTypes = {};
const defaultProps = {};

class CashSystemCreditThirdPartyAlipayPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: Deposit,
			current: Deposit,
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSearch() {
		const { account, status, postscript, bank,
			bankAccount, name, applyDate, verifyDate,
			orderId, minAmount, maxAmount, queryFromDatabase,
		} = this.formRef.getFieldsValue();

		//TODO call api then update
	}

	_handleReset() {
		this.formRef.resetForm();
	}

	render() {
		return (
			<PageBlock>
				<DepositRecordSearchForm
					collapseItemsLength={4}
					onSearch={this._handleSearch}
					onReset={this._handleReset}
					ref={(form) => this.formRef = form}
				/>
				<GeneralDepositRecordTable
					className="deposit-alipay-table"
					dataSource={this.state.current}
					isShowingCheckbox
					isShowingOperations
					hasPagination={false}
				/>
			</PageBlock>
		);
	}
}

CashSystemCreditThirdPartyAlipayPage.propTypes = propTypes;
CashSystemCreditThirdPartyAlipayPage.defaultProps = defaultProps;

export default CashSystemCreditThirdPartyAlipayPage;

const Deposit = [{
	_id: 1,
	rechargeId: '2201030200',
	rechageType: '支付宝红包',
	memberAccount: 'codtest201',
	amount: 1120000,
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
	amount: 1220000,
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
}];

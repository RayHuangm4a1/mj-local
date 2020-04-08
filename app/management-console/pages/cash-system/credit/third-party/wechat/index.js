import React, { Component } from 'react';
import DepositRecordSearchForm from '../deposit-record-search-form';
import PageBlock from '../../../../../components/page-block';
import { GeneralDepositRecordTable, } from '../../../../../components/table';
import './style.styl';

const propTypes = {};
const defaultProps = {};

class CashSystemCreditThirdPartyWechatPage extends Component {
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
					className="deposit-wechat-table"
					dataSource={this.state.current}
					hasPagination={false}
					isShowingCheckbox
					isShowingOperations
				/>
			</PageBlock>
		);
	}
}

CashSystemCreditThirdPartyWechatPage.propTypes = propTypes;
CashSystemCreditThirdPartyWechatPage.defaultProps = defaultProps;

export default CashSystemCreditThirdPartyWechatPage;

const Deposit = [{
	_id: 1,
	rechargeId: '4201030203',
	rechageType: '支付宝红包',
	memberAccount: 'codtest401',
	amount: 1220000,
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
	_id: 2,
	rechargeId: '4201030201',
	rechageType: '支付宝红包',
	memberAccount: 'codtest401',
	amount: 1220000,
	bank: '民生银行',
	rechangeDate: '2019/03/20',
	verifyDate: '2019/04/21',
	status: 'unconfirmed',
	balance: 300,
	fee: 200,
	payer: '何紹偉',
	paymentCard: '20317121321',
	recivedCard: '20317621356',
	postscript: '6314',
	operator: 'system_admin',
	remark: '手机',
}];

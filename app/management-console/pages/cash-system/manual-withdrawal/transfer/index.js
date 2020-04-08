import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import SearchForm from '../forms/search-form';
import TransferSearchForm from '../forms/transfer-search-form';
import ConfirmTransactionForm from '../forms/confirm-transaction-form';
import { Table, Divider, DecimalNumber, } from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { RouteKeyEnums, } from '../../../../routes';
import {
	DATE,
	isDateValid,
	formatDate,
} from '../../../../../lib/moment-utils';
import { PREFIX, SEARCH_RESULTS_CLASS, } from '../utils';

const {
	CASHSYSTEM_MANUALWITHDRAWAL_ROOT,
} = RouteKeyEnums;

const propTypes = {
	departmentId: PropTypes.string,
	onNavigate: PropTypes.func,
};
const defaultProps = {
	onNavigate: () => {},
};

class CashSystemManualWithdrawalTransferPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddModalVisible: false,
			isTransferSearchResultVisible: false,
			transferOutAccount: "",
			transferInAccount: "",
			transferData: []
		};
		this._handleOnSubmitFetchTransferResults = this._handleOnSubmitFetchTransferResults.bind(this);
		this._handleOnClickResetSearchForm = this._handleOnClickResetSearchForm.bind(this);
		this._handleOnSubmitOpenConfirmTransactionForm = this._handleOnSubmitOpenConfirmTransactionForm.bind(this);
		this._handleModalVisible = this._handleModalVisible.bind(this);
		this._handleOnSubmitConfirmTransaction = this._handleOnSubmitConfirmTransaction.bind(this);
		this._renderTransferSearchResult = this._renderTransferSearchResult.bind(this);
	}
	_handleOnSubmitFetchTransferResults(query) {
		// TODO add api fetch data
		const data = [
			{
				key: '1',
				username: 'John Brown',
				amount: 312300,
				accountBalance: 13000,
				depositItem: '活动',
				date: '2018-10-11T06:23:58.000Z',
				operator: "admin"
			}, {
				key: '2',
				username: 'John Brown',
				amount: 3200,
				accountBalance: 1302100,
				depositItem: '充值',
				date: '2018-10-12T06:23:58.000Z',
				operator: "admin",
				comment: 'comment 1',
			}, {
				key: '3',
				username: 'John Brown',
				amount: 322300,
				accountBalance: 130100,
				depositItem: '红利',
				date: '2018-10-13T06:23:58.000Z',
				operator: "admin"
			}, {
				key: '4',
				username: 'John Brown',
				amount: 323300,
				accountBalance: 13000,
				depositItem: '不指定',
				date: '2018-10-14T06:23:58.000Z',
				operator: "admin"
			},
		];

		this.setState({
			isTransferSearchResultVisible: true,
			transferData: data
		});
	}
	_handleOnClickResetSearchForm() {
		this.setState({
			isTransferSearchResultVisible: false,
			transferData: []
		});
	}
	_handleOnSubmitOpenConfirmTransactionForm(accounts) {
		// TODO add api to get "钱包余额"
		this._handleModalVisible();
		this.setState({
			transferOutAccount: accounts.transferOutAccount + " (钱包余额:165)",
			transferInAccount: accounts.transferInAccount + " (钱包余额:105)"
		});

	}
	_handleModalVisible() {
		this.setState({ isAddModalVisible: !this.state.isAddModalVisible });
	}
	_handleOnSubmitConfirmTransaction() {
		const { validateFieldsAndScroll } = this.SearchAccountFormRef.refForm;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				// TODO add api send data
				this._handleModalVisible();
			}
		});
	}
	_renderTransferSearchResult() {
		const transferResultColumns = [
			{
				title: '帐号',
				dataIndex: 'username',
			},
			{
				title: '交易金额',
				dataIndex: 'amount',
				render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
			},
			{
				title: '帐户余额',
				dataIndex: 'accountBalance',
				render: (accountBalance) => <DecimalNumber data={accountBalance} hasSeparator/>,
			},
			{
				title: '转点项目',
				dataIndex: 'depositItem',
			},
			{
				title: '日期',
				dataIndex: 'date',
				render: (date) => (isDateValid(date) ? formatDate(date, DATE) : ''),
			},
			{
				title: '操作员',
				dataIndex: 'operator',
			},
			{
				title: '备注',
				dataIndex: 'comment',
			},
		];
		const { transferData } = this.state;

		return (
			<div className={SEARCH_RESULTS_CLASS}>
				{/* TODO get correct 总金额 */}
				<div className={`${SEARCH_RESULTS_CLASS}__title`}>总金额 ： {Math.floor(Math.random()*10000)}</div>
				<Table
					className={`${SEARCH_RESULTS_CLASS}__table`}
					size={Table.TableSizeEnums.LARGE}
					columns={transferResultColumns}
					dataSource={transferData}
					pagination={false}
				/>
			</div>
		);
	}
	render() {
		const { departmentId, onNavigate, } = this.props;
		const {
			_handleOnSubmitFetchTransferResults,
			_handleOnClickResetSearchForm,
			_handleOnSubmitOpenConfirmTransactionForm,
			_renderTransferSearchResult,
		} = this;
		const {
			isTransferSearchResultVisible,
			transferOutAccount,
			transferInAccount,
		} = this.state;

		let TransferSearchResult = null;

		if (isTransferSearchResultVisible) {
			TransferSearchResult = _renderTransferSearchResult();
		}

		return (
			<React.Fragment>
				<PageBlock
					className={`${PREFIX}__page-sub-block`}
					headerTitle={"人工在线查询"}
					noMinHeight
				>
					<SearchForm
						onSubmit={_handleOnSubmitFetchTransferResults}
						onClickReset={_handleOnClickResetSearchForm}
						type={SearchForm.TypeEnums.TRANSFER}
					/>
					{TransferSearchResult}
				</PageBlock>
				<Divider/>
				<PageBlock
					className={`${PREFIX}__page-sub-block`}
					headerTitle={"新增人工转点"}
					noMinHeight
				>
					<TransferSearchForm
						onSubmit={_handleOnSubmitOpenConfirmTransactionForm}
						onClickBatchAdd={() => onNavigate(`${CASHSYSTEM_MANUALWITHDRAWAL_ROOT}/${departmentId}/transfer/multi-add`)}
					/>
				</PageBlock>
				<PageModal
					className={`${PREFIX}__add-modal`}
					visible={this.state.isAddModalVisible}
					title={"新增人工转点"}
					onClickCancel={this._handleModalVisible}
					onClickOk={this._handleOnSubmitConfirmTransaction}
				>
					<ConfirmTransactionForm
						ref={formRef => this.SearchAccountFormRef=formRef}
						transferOutAccount={transferOutAccount}
						transferInAccount={transferInAccount}
						type={ConfirmTransactionForm.TypeEnums.TRANSFER}
					/>
				</PageModal>
			</React.Fragment>
		);
	}
}

CashSystemManualWithdrawalTransferPage.propTypes = propTypes;
CashSystemManualWithdrawalTransferPage.defaultProps = defaultProps;

export default CashSystemManualWithdrawalTransferPage;

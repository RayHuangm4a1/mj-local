import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import SearchForm from '../forms/search-form';
import ConfirmTransactionForm from '../forms/confirm-transaction-form';
import { TextButton, Table, Divider, DecimalNumber, } from 'ljit-react-components';
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

class CashSystemManualWithdrawalDepositPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddModalVisible: false,
			isDepositSearchTableVisible: false,
			isAccountSearchVisible: false,
			depositData: [],
			accountData: []
		};
		this._handleOnSubmitFetchDepositResults = this._handleOnSubmitFetchDepositResults.bind(this);
		this._handleOnSubmitFetchAccountResult = this._handleOnSubmitFetchAccountResult.bind(this);
		this._handleOnClickResetSearchForm = this._handleOnClickResetSearchForm.bind(this);
		this._handleModalVisible = this._handleModalVisible.bind(this);
		this._handleOnSubmitConfirmTransaction = this._handleOnSubmitConfirmTransaction.bind(this);
		this._renderAddButton = this._renderAddButton.bind(this);
		this._renderDepositSearchResult = this._renderDepositSearchResult.bind(this);
		this._renderAccountDataSearchResult = this._renderAccountDataSearchResult.bind(this);
	}
	_handleOnSubmitFetchDepositResults(query) {
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
				operator: "admin"
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
			isDepositSearchTableVisible: true,
			depositData: data
		});
	}
	_handleOnClickResetSearchForm() {
		this.setState({
			isDepositSearchTableVisible: false,
			depositData: []
		});
	}
	_handleOnSubmitFetchAccountResult(query) {
		// TODO add api fetch data
		const data = [
			{
				key: '1',
				account: "john",
				effectivePayment: 312300,
				accountBalance: 13000,
				currentBetAmount: 0,
			}
		];

		this.setState({
			isAccountSearchVisible: true,
			accountData: data
		});
	}
	_handleModalVisible() {
		this.setState({ isAddModalVisible: !this.state.isAddModalVisible });
	}
	_handleOnSubmitConfirmTransaction() {
		const { validateFieldsAndScroll } = this.ConfirmTransactionFormRef.refForm;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				// TODO add api send data
				this._handleModalVisible();
			}
		});
	}
	_renderAddButton() {
		const { _handleModalVisible } = this;

		return (
			<TextButton
				onClick={_handleModalVisible}
				text={"新增"}
			/>
		);
	}
	_renderDepositSearchResult() {
		const depositResultColumns = [
			{
				title: '帐号',
				dataIndex: 'username',
			}, {
				title: '交易金额',
				dataIndex: 'amount',
				render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
			}, {
				title: '帐户余额',
				dataIndex: 'accountBalance',
				render: (accountBalance) => <DecimalNumber data={accountBalance} hasSeparator/>,
			}, {
				title: '存入项目',
				dataIndex: 'depositItem',
			}, {
				title: '日期',
				dataIndex: 'date',
				render: (date) => (isDateValid(date) ? formatDate(date, DATE) : ''),
			},{
				title: '操作员',
				dataIndex: 'operator',
			},{
				title: '备注',
				dataIndex: 'comment',
			}];
		const { depositData } = this.state;

		return (
			<div className={`${SEARCH_RESULTS_CLASS}`}>
				{/* TODO get correct 总金额 */}
				<div className={`${SEARCH_RESULTS_CLASS}__title`}>总金额 ： {Math.floor(Math.random()*10000)}</div>
				<Table
					className={`${SEARCH_RESULTS_CLASS}__table`}
					size={Table.TableSizeEnums.LARGE}
					columns={depositResultColumns}
					dataSource={depositData}
					pagination={false}
				/>
			</div>
		);
	}
	_renderAccountDataSearchResult() {
		const accountDataResultColumns = [
			{
				title: '帐号',
				dataIndex: 'account',
			}, {
				title: '有效出款打码量',
				dataIndex: 'effectivePayment',
			}, {
				title: '帐户余额',
				dataIndex: 'accountBalance',
				render: (accountBalance) => <DecimalNumber data={accountBalance} hasSeparator/>,
			}, {
				title: '目前投注量',
				dataIndex: 'currentBetAmount',
				render: (currentBetAmount) => <DecimalNumber data={currentBetAmount} hasSeparator/>,
			},{
				title: '操作',
				dataIndex: 'operation',
				render: this._renderAddButton
			},];
		const { accountData } = this.state;

		return (
			<div className={`${SEARCH_RESULTS_CLASS} ${SEARCH_RESULTS_CLASS}--add`}>
				<Table
					className={`${SEARCH_RESULTS_CLASS}__table`}
					size={Table.TableSizeEnums.LARGE}
					columns={accountDataResultColumns}
					dataSource={accountData}
					pagination={false}
				/>
			</div>
		);
	}
	render() {
		const { departmentId, onNavigate, } = this.props;
		const { isAccountSearchVisible, isDepositSearchTableVisible, } = this.state;
		const {
			_handleOnSubmitFetchDepositResults,
			_handleOnClickResetSearchForm,
			_handleOnSubmitFetchAccountResult,
			_renderDepositSearchResult,
			_renderAccountDataSearchResult,
		} = this;

		let depositSearchResult = null;

		let accountDataSearchResult = null;

		if (isDepositSearchTableVisible) {
			depositSearchResult = _renderDepositSearchResult();
		}
		if (isAccountSearchVisible) {
			accountDataSearchResult = _renderAccountDataSearchResult();
		}

		return (
			<React.Fragment>
				<PageBlock
					className={`${PREFIX}__page-sub-block`}
					headerTitle={"人工在线查询"}
					noMinHeight
				>
					<SearchForm
						onSubmit={_handleOnSubmitFetchDepositResults}
						onClickReset={_handleOnClickResetSearchForm}
						type={SearchForm.TypeEnums.DEPOSIT}
					/>
					{depositSearchResult}
				</PageBlock>
				<Divider/>
				<PageBlock
					className={`${PREFIX}__page-sub-block`}
					headerTitle={"新增人工入款"}
					noMinHeight
				>
					<SearchForm
						onSubmit={_handleOnSubmitFetchAccountResult}
						type={SearchForm.TypeEnums.ADD}
						submitText={"搜寻"}
						onClickBatchAdd={() => onNavigate(`${CASHSYSTEM_MANUALWITHDRAWAL_ROOT}/${departmentId}/deposit/multi-add`)}
					/>
					{accountDataSearchResult}
				</PageBlock>
				<PageModal
					className={`${PREFIX}__add-modal`}
					visible={this.state.isAddModalVisible}
					title={"新增人工入款"}
					onClickCancel={this._handleModalVisible}
					onClickOk={this._handleOnSubmitConfirmTransaction}
				>
					<ConfirmTransactionForm
						ref={formRef => this.ConfirmTransactionFormRef=formRef}
						type={ConfirmTransactionForm.TypeEnums.DEPOSIT}
					/>
				</PageModal>
			</React.Fragment>
		);
	}
}

CashSystemManualWithdrawalDepositPage.propTypes = propTypes;
CashSystemManualWithdrawalDepositPage.defaultProps = defaultProps;

export default CashSystemManualWithdrawalDepositPage;

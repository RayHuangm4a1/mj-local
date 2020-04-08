import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../../../../components/select-dropdown';
import PagerTable from '../../../../components/pager-table';
import {
	Input,
	Form,
	FormItem,
	Button,
	DecimalNumber,
} from 'ljit-react-components';
import { formatDate, DATE_TIME, } from '../../../../../lib/moment-utils';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import { connect, } from 'ljit-store-connecter';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import './style.styl';

const propTypes = {};
const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;
const SelectTypeEnums = {
	RECHARGE_LOG: 'recharge-log',
	WITHDRAWAL_LOG: 'withdrawal-log',
	BANK_ORDER: 'bank-order',
};
const {
	RECHARGE_LOG,
	WITHDRAWAL_LOG,
	BANK_ORDER,
} = SelectTypeEnums;
const typeOptions = [
	{
		value: RECHARGE_LOG,
		label: '充值纪录',
	},
	{
		value: WITHDRAWAL_LOG,
		label: '提现纪录',
	},
	{
		value: BANK_ORDER,
		label: '银行订单',
	},
];

const PREFIX_CLASS = 'ljit-recharge-and-withdrawal-log';

function isTypeOfBankOrder(value) {
	return value === BANK_ORDER;
}

class MemberRechargeWithdrawalLogPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {},
			typeValue: RECHARGE_LOG,
			columns: [],
			dataSource: [],
			rechargeLogColumns: [
				{
					title: '方案号',
					dataIndex: 'id',
					width: 184,
				},
				{
					title: '充值时间',
					dataIndex: 'createdAt',
					width: 220,
					// TODO get sorted data from api res
					sorter: () => 0,
					render: (value) => formatDate(value)
				},
				{
					title: '充值金额',
					dataIndex: 'rechargeAmount',
					width: 182,
					render: (rechargeAmount) => <DecimalNumber data={rechargeAmount} hasSeparator/>,
				},
				{
					title: '手續費',
					dataIndex: 'handlingFee',
					width: 186,
					render: (handlingFee) => <DecimalNumber data={handlingFee} hasSeparator/>,
				},
				{
					title: '状态',
					dataIndex: 'status',
					width: 130,
				},
				{
					title: '备注',
					dataIndex: 'description',
					width: 130,
				},
			],
			withdrawalLogColumns: [
				{
					title: '方案号',
					dataIndex: 'id',
					width: 134,
				},
				{
					title: '提現时间',
					dataIndex: 'createdAt',
					width: 165,
					// TODO get sorted data from api res
					sorter: () => 0,
					render: (value) => formatDate(value)
				},
				{
					title: '銀行',
					dataIndex: 'bank',
					width: 126,
				},
				{
					title: '卡号',
					dataIndex: 'cardNumber',
					width: 157,
				},
				{
					title: '姓名',
					dataIndex: 'name',
					width: 73,
				},
				{
					title: '提现金额',
					dataIndex: 'withdrawalAmount',
					width: 91,
					render: (withdrawalAmount) => <DecimalNumber data={withdrawalAmount} hasSeparator/>,
				},
				{
					title: '手续费',
					dataIndex: 'handlingFee',
					width: 94,
					render: (handlingFee) => <DecimalNumber data={handlingFee} hasSeparator/>,
				},
				{
					title: '状态',
					dataIndex: 'status',
					width: 76,
				},
				{
					title: '备注',
					dataIndex: 'description',
					width: 76,
				},
			],
			bnakOrderColumns: [
				{
					title: '充值编号',
					dataIndex: 'id',
					width: 133,
				},
				{
					title: '提交时间',
					dataIndex: 'createdAt',
					width: 165,
					// TODO get sorted data from api res
					sorter: () => 0,
					render: (value) => formatDate(value)
				},
				{
					title: '充值银行',
					dataIndex: 'bank',
					width: 125,
				},
				{
					title: '提交姓名',
					dataIndex: 'name',
					width: 125,
				},
				{
					title: '充值金额',
					dataIndex: 'rechargeAmount',
					width: 125,
				},
				{
					title: '平台收款卡',
					dataIndex: 'platformReceiptCard',
					width: 150,
				},
				{
					title: '状态',
					dataIndex: 'status',
					width: 84,
				},
				{
					title: '备注',
					dataIndex: 'description',
					width: 84,
				},
			]
		};
		this._renderIDInput = this._renderIDInput.bind(this);
		this._renderBankOptions = this._renderBankOptions.bind(this);
		this._handleChangeTypeValue = this._handleChangeTypeValue.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}
	_renderIDInput() {
		const { typeValue } = this.state;
		const label = isTypeOfBankOrder(typeValue) ? '充值编号' : '方案号';
		const placeholder = isTypeOfBankOrder(typeValue) ? '输入充值编号' : '输入方案号';

		return (
			<FormItem
				label={label}
				itemName="id"
				labelColon={false}
			>
				<Input
					placeholder={placeholder}
				/>
			</FormItem>
		);
	}
	_renderBankOptions() {
		const { typeValue } = this.state;

		if (isTypeOfBankOrder(typeValue)) {
			return (
				<FormItem
					label="全部"
					itemName="bank"
					labelColon={false}
					itemConfig={{
						initialValue: 'all'
					}}
				>
					<SelectDropdown
						// TODO get bank options from API
						options={fakeBankOptions}
					/>
				</FormItem>
			);
		} else {
			return null;
		}
	}

	_handleChangeTypeValue(value) {
		this.setState({
			typeValue: value,
		});
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO dispatch search action.
				console.log(values);

				const { typeValue, rechargeLogColumns, withdrawalLogColumns, bnakOrderColumns } = this.state;

				let columns = [];

				let dataSource = [];

				// TODO 暫時顯示頁面的方式，等串接 API 可以直接將值帶入 dataSource 跟 colnums
				switch (typeValue) {
					case RECHARGE_LOG: {
						columns = rechargeLogColumns;
						dataSource = fakeRechargeData;
						break;
					}
					case WITHDRAWAL_LOG: {
						columns = withdrawalLogColumns;
						dataSource = fakeWithdrawalData;
						break;
					}
					case BANK_ORDER: {
						columns = bnakOrderColumns;
						dataSource = fakeBankOrderData;
						break;
					}
				}
				this.setState({
					columns,
					dataSource,
				});
			}
		});
	}

	_handleChangeTablePage(pagination, filters, sorter) {
		// TODO dispatch action to update transactionLog data

		this.setState({ pagination, });
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTablePage,
			_handleChangeTypeValue,
			_renderBankOptions,
			_renderIDInput
		} = this;
		const { pagination, columns, dataSource } = this.state;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					{_renderIDInput()}
					<FormItem
						label="类型"
						itemName="type"
						labelColon={false}
						itemConfig={{
							initialValue: RECHARGE_LOG
						}}
					>
						<SelectDropdown
							options={typeOptions}
							onChange={_handleChangeTypeValue}
						/>
					</FormItem>
					{_renderBankOptions()}
					<FormItem
						label="时间"
						itemName="fromTo"
						labelColon={false}
					>
						<ClientDateRangePicker
							inputStyle={{ width: '310px', }}
							ranges={[TODAY, YESTERDAY, THIS_WEEK]}
							showTime
							format={DATE_TIME}
							limitDays={MAX_SELECTION_DAYS}
						/>
					</FormItem>
					<Button
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleSearch}
						color={Button.ColorEnums.ORANGE}
					>
						查询
					</Button>
				</Form>
				<PagerTable
					rowKey="id"
					dataSource={dataSource}
					columns={columns}
					paginationProps={{
						...pagination,
						// TODO get totoal data length form api response
						total: 200,
					}}
					onTableChange={_handleChangeTablePage}
				/>
			</div>
		);
	}
	componentDidMount() {
		// TODO add table data after get api response
		this.setState({
			columns: this.state.rechargeLogColumns,
			dataSource: fakeRechargeData
		});
	}
}

MemberRechargeWithdrawalLogPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		// TODO get data form redux
	};
}
function mapDispatchToProps(dispatch) {
	return {
		// TODO get method from action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberRechargeWithdrawalLogPage);

// TODO get Data from API
const fakeRechargeData = [
	{
		id: 4197849285,
		createdAt: new Date(),
		rechargeAmount: 1,
		handlingFee: 888.543,
		status: '成功',
		description: '-',
	},
	{
		id: 4197849286,
		createdAt: new Date(),
		rechargeAmount: 1,
		handlingFee: 888.543,
		status: '失敗',
		description: '-',
	}
];

// TODO get Data from API
const fakeWithdrawalData = [
	{
		id: 4197849285,
		createdAt: new Date(),
		bank: '中国工商银行',
		cardNumber: '009173517361',
		name: '陈阿呆',
		withdrawalAmount: 1,
		handlingFee: 888.543,
		status: '成功',
		description: '-',
	},
	{
		id: 4197849286,
		createdAt: new Date(),
		bank: '中国工商银行',
		cardNumber: '009173517361',
		name: '陈阿呆',
		withdrawalAmount: 1,
		handlingFee: 888.543,
		status: '失敗',
		description: '-',
	}
];

// TODO get Data from API
const fakeBankOrderData = [
	{
		id: 4197849285,
		createdAt: new Date(),
		bank: '工商银行',
		name: '陈阿呆',
		rechargeAmount: 1,
		platformReceiptCard: 12973262,
		status: '成功',
		description: '-',
	},
	{
		id: 4197849286,
		createdAt: new Date(),
		bank: '招商银行',
		name: '陈阿呆',
		rechargeAmount: 1,
		platformReceiptCard: 12973262,
		status: '失敗',
		description: '-',
	},
];

// TODO get Data from API
const fakeBankOptions = [
	{
		label: '全部',
		value: 'all',
	},
	{
		label: '邮政储汇',
		value: 'post office',
	},
	{
		label: '工商银行',
		value: 'ICBC',
	}
];

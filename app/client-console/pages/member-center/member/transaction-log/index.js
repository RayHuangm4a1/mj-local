import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PagerTable from '../../../../components/pager-table';
import {
	Form,
	FormItem,
	Button,
	InputNumber,
	DecimalNumber,
} from 'ljit-react-components';
import ClientCascaderSelect from '../../../../components/client-cascader-select';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import BettingRecordModalButton from './betting-record-modal-button';
import { TransactionLogTypeEnum, } from '../../../../lib/enums';
import { transactionLogActions, bettingRecordDetailsActions, } from '../../../../controller';
import { formatDate, convertDateStringToTimestamp, DATE_TIME, } from '../../../../../lib/moment-utils';
import { connect, } from 'ljit-store-connecter';
import { LoadingStatusEnum } from '../../../../lib/enums';
import { MAX_SELECTION_DAYS } from '../../../../../lib/constants';
import './style.styl';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const { fetchTransactionLogsAction } = transactionLogActions;
const { resetBettingRecordDetailsAction, } = bettingRecordDetailsActions;

const { RangesEnums } = ClientDateRangePicker;

const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;

// TODO 確認API type number
const {
	THIRD_PARTY,
	AMUSE_SALARY,
	SA_TRANSACTION,
	UG_TRANSACTION,
	KY_TRANSACTION,
	DIVIDEND_TRANSACTION,
	ANY_TRANSACTION,
	AG_TRANSACTION,
	CMD_TRANSACTION,
	GAMMA_TRANSACTION,
	LOTTERY,
	BETTING,
	BETTING_REBATE,
	BETTING_REWARD,
	CANCEL_BETTING,
	BETTING_WIN,
	PC_SALARY,
	SALARY,
	SELF_FIXED_WAGE,
	OTHERS,
	RECHARGE,
	WITHDRAWAL,
	REFUND,
	REWARD,
	EVENT,
	DIVIDEND,
	TRANSFER_RECHARGE,
	TRANSFER_EVENT,
	TRANSFER_DIVIDEND,
	TRANSFER_REWARD,
} = TransactionLogTypeEnum;

const TransactionLogTypeOptions = [
	{ label: '全部', value: null, },
	{
		label: '游戏帐变',
		value: THIRD_PARTY,
		children: [
			{ label: '娱乐工资', value: AMUSE_SALARY, },
			{ label: 'SA转帐', value: SA_TRANSACTION, },
			{ label: 'UG转帐', value: UG_TRANSACTION, },
			{ label: 'KY转帐', value: KY_TRANSACTION, },
			{ label: '分红转帐', value: DIVIDEND_TRANSACTION, },
			{ label: '任意转帐', value: ANY_TRANSACTION, },
			{ label: 'AG转帐', value: AG_TRANSACTION, },
			{ label: 'CMD转帐', value: CMD_TRANSACTION, },
			{ label: 'GAMMA转帐', value: GAMMA_TRANSACTION, },
		],
	},{
		label: '彩票帐变',
		value: LOTTERY,
		children: [
			{ label: '下注', value: BETTING, },
			{ label: '返点', value: BETTING_REBATE, },
			{ label: '撤单', value: CANCEL_BETTING, },
			{ label: '中奖', value: BETTING_WIN, },
			{ label: 'PC蛋蛋工资', value: PC_SALARY, },
			{ label: '工资', value: SALARY, },
			{ label: '固定工資', value: SELF_FIXED_WAGE, },
			{ label: '獎金', value: BETTING_REWARD, },
		],
	},{
		label: '其他帐变',
		value: OTHERS,
		children: [
			{ label: '充值', value: RECHARGE, },
			{ label: '提现', value: WITHDRAWAL, },
			{ label: '退款', value: REFUND, },
			{ label: '奖励', value: REWARD, },
			{ label: '活动', value: EVENT, },
			{ label: '分红', value: DIVIDEND, },
			{ label: '转充值', value: TRANSFER_RECHARGE, },
			{ label: '转活动', value: TRANSFER_EVENT, },
			{ label: '转分红', value: TRANSFER_DIVIDEND, },
			{ label: '转奖励', value: TRANSFER_REWARD, },
		],
	},
];

const TransactionLogTypeMap = {};

TransactionLogTypeOptions.forEach(item => {
	TransactionLogTypeMap[item.value] = item.label;

	if (item.children) {
		item.children.forEach(child => {
			TransactionLogTypeMap[child.value] = child.label;
		});
	}
});

const PREFIX_CLASS = 'transaction-log';

const propTypes = {
	fetchTransactionLogsAction: PropTypes.func.isRequired,
	resetBettingRecordDetailsAction: PropTypes.func.isRequired,
	transactionLogData: PropTypes.shape({
		transactionLogs: PropTypes.array,
		page: PropTypes.number,
		numOfItems: PropTypes.number,
		numOfPages: PropTypes.number,
	}),
	loadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
	discardLoadingStatus: PropTypes.oneOf([
		NONE,
		LOADING,
		SUCCESS,
		FAILED,
	]),
};

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_PAGE = 1;

class TransactionLogsPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {
				pageSize: DEFAULT_PAGE_SIZE
			},
			queryParameters: {
				limit: DEFAULT_PAGE_SIZE,
				page: DEFAULT_PAGE,
				id: null,
				type: null,
				from: null,
				to: null,
				sort: null,
				order: '',
			},
		};

		this._handleFetchTransactionLogs = this._handleFetchTransactionLogs.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}
	_handleFetchTransactionLogs(queryParameters) {
		const { fetchTransactionLogsAction, resetBettingRecordDetailsAction, } = this.props;

		fetchTransactionLogsAction(queryParameters);
		resetBettingRecordDetailsAction();
	}
	_handleSearch() {
		const { _handleFetchTransactionLogs, } = this;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const {
					id,
					type,
					fromTo = []
				} = values;
				const [ from, to ] = fromTo;
				const queryParameters = Object.assign({}, this.state.queryParameters , {
					id,
					type: type.slice(-1)[0],
					from: convertDateStringToTimestamp(from),
					to: convertDateStringToTimestamp(to),
					page: DEFAULT_PAGE,
				});

				_handleFetchTransactionLogs(queryParameters);
				this.setState({
					queryParameters,
					pagination: Object.assign({}, this.state.pagination, { current: DEFAULT_PAGE }),
				});
			}
		});
	}
	_handleChangeTablePage(pagination, filters, sorter) {
		const { _handleFetchTransactionLogs } = this;

		let { columnKey, order = '' } = sorter;

		order = order.replace('end', '');

		if (order !== this.state.queryParameters.order) {
			pagination.current = DEFAULT_PAGE;
		}

		const { current } = pagination;

		const queryParameters = Object.assign({}, this.state.queryParameters, {
			page: current,
			sort: columnKey,
			order,
		});

		_handleFetchTransactionLogs(queryParameters);

		this.setState({
			pagination,
			queryParameters,
		});
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTablePage,
		} = this;
		const {
			pagination,
		} = this.state;
		const {
			transactionLogData,
			loadingStatus,
		} = this.props;
		const {
			transactionLogs,
			numOfItems,
		} = transactionLogData;

		return (
			<div className={PREFIX_CLASS}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="流水号"
						itemName="id"
						labelColon={false}
					>
						<InputNumber
							placeholder="输入流水号"
							min={1}
						/>
					</FormItem>
					<FormItem
						label="类型"
						itemName="type"
						labelColon={false}
						itemConfig={{
							initialValue: [TransactionLogTypeOptions[0].value]
						}}
					>
						<ClientCascaderSelect
							options={TransactionLogTypeOptions}
						/>
					</FormItem>
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
					dataSource={transactionLogs}
					columns={[
						{
							title: '流水号',
							dataIndex: 'id',
							width: 79,
						},
						{
							title: '单号',
							dataIndex: 'associateId',
							width: 157,
							render: (bettingRecordId) => {
								if (bettingRecordId) {
									return (
										<BettingRecordModalButton
											bettingRecordId={bettingRecordId}
										/>
									);
								} else {
									return "-";
								}
							}
						},
						{
							title: '类型',
							dataIndex: 'type',
							width: 98,
							render: (value) => {
								return TransactionLogTypeMap[value];
							}
						},
						{
							title: '时间',
							dataIndex: 'createdAt',
							width: 222,
							sorter: () => 0,
							render: (value) => formatDate(value)
						},
						{
							title: '金额',
							dataIndex: 'amount',
							width: 80,
							render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
						},
						{
							title: '余额',
							dataIndex: 'balance',
							width: 80,
							render: (balance) => <DecimalNumber data={balance} hasSeparator/>,
						},
						{
							title: '备注',
							dataIndex: 'description',
							width: 276,
						},
					]}
					paginationProps={{
						...pagination,
						total: numOfItems,
					}}
					onTableChange={_handleChangeTablePage}
					isLoading={loadingStatus === LOADING}
				/>
			</div>
		);
	}
	componentDidMount() {
		this._handleFetchTransactionLogs(this.state.queryParameters);
	}
	componentDidUpdate(prevProps) {
		const { discardLoadingStatus, } = this.props;

		if (prevProps.discardLoadingStatus === LOADING && discardLoadingStatus === SUCCESS) {
			this._handleFetchTransactionLogs(this.state.queryParameters);
		}
	}
}

TransactionLogsPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		transactionLogData: state.transactionLogs.get('data').toObject(),
		loadingStatus: state.transactionLogs.get('loadingStatus'),
		discardLoadingStatus: state.bettingRecords.get('discardLoadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchTransactionLogsAction: (query) => dispatch(fetchTransactionLogsAction(query)),
		resetBettingRecordDetailsAction: () => dispatch(resetBettingRecordDetailsAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionLogsPage);

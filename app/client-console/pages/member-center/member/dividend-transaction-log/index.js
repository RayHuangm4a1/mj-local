import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
	DecimalNumber,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	formatDate,
	isDateValid,
	convertDateStringToTimestamp,
} from '../../../../../lib/moment-utils';
import {
	LoadingStatusEnum,
} from '../../../../../lib/enums';
import { DividendTransactionLogTypeEnum, } from '../../../../lib/enums';
import { dividendTransactionLogActions, } from '../../../../controller';
import PagerTable from '../../../../components/pager-table';
import SearchForm from './search-form';
import './style.styl';

const {
	DIVIDEND_TRANSFER_OUT,
	DIVIDEND_GRANTED_FROM_SUPERVISION,
	DIVIDEND_RECEIVED,
} = DividendTransactionLogTypeEnum;
const {
	fetchDividendTransactionLogsAction,
} = dividendTransactionLogActions;

const DIVIDEND_GRANTED_TEXT = '发放分红';
const DIVIDEND_RECEIVED_TEXT = '接收分红';
const SELECT_ALL_TYPE_KEY = 'all';
const typeOptions = [
	{ label: '全部', value: SELECT_ALL_TYPE_KEY, },
	{ label: DIVIDEND_GRANTED_TEXT, value: `${DIVIDEND_TRANSFER_OUT},${DIVIDEND_GRANTED_FROM_SUPERVISION}`, },
	{ label: DIVIDEND_RECEIVED_TEXT, value: DIVIDEND_RECEIVED, },
];
const initialSearchData = {
	id: undefined,
	type: SELECT_ALL_TYPE_KEY,
	period: [
		moment().startOf('day').add(3, 'hour'),
		moment().endOf('day').add(3, 'hour'),
	],
};
const initialSorter = {
	sortOrder: null,
	sortField: null,
};
const initialPage = 1;

const PREFIX_CLASS = 'dividend-transaction-log';

const propTypes = {
	dividendTransactionLogsData: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			userId: PropTypes.number,
			associateId: PropTypes.number,
			type: PropTypes.number,
			walletCode: PropTypes.number,
			amount: PropTypes.number,
			balance: PropTypes.number,
			description: PropTypes.string,
			createdAt: PropTypes.string,
		})
	).isRequired,
	numOfItems: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired,
	loadingStatus: PropTypes.number.isRequired,
	fetchDividendTransactionLogsAction: PropTypes.func.isRequired,
};

class MemberDividendTransactionLogPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialSorter,
			pagination: {
				current: props.page,
			},
			searchData: {
				...initialSearchData,
			},
		};

		this._fetchDividendTransactionLogs = this._fetchDividendTransactionLogs.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
	}

	_fetchDividendTransactionLogs(queries) {
		const {
			sortOrder,
			sortField,
			pagination: {
				current,
			},
			searchData: {
				type,
				period,
				...restSearchData
			},
		} = this.state;
		const [ from, to, ] = period;
		const combinedQueries = {
			// search form
			...restSearchData,
			type: getDividendType(type),
			from: convertToTimestamp(from),
			to: convertToTimestamp(to),

			// sorter
			sort: sortField,
			order: mapOrderString(sortOrder),

			// pagination
			page: current,

			...queries,
		};

		this.props.fetchDividendTransactionLogsAction(combinedQueries);
	}

	_handleSearch(values) {
		const {
			pagination,
		} = this.state;

		const {
			id,
			period,
			type,
		} = values;
		const [ from, to, ] = period;

		this._fetchDividendTransactionLogs({
			id,
			type: getDividendType(type),
			from: convertToTimestamp(from),
			to: convertToTimestamp(to),
			// reset sorter and page after search
			sort: null,
			order: null,
			page: initialPage,
		});
		this.setState({
			...initialSorter,
			searchData: {
				...values,
			},
			pagination: {
				...pagination,
				current: initialPage,
			},
		});
	}
	_handleChangeTablePage(pagination, filters, sorter) {
		const {
			current: nextPage,
		} = pagination;
		const {
			order: sortOrder,
			field: sortField,
		} = sorter;

		this._fetchDividendTransactionLogs({
			page: nextPage,
			sort: sortField,
			order: mapOrderString(sortOrder),
		});
		this.setState({
			pagination,
			sortOrder,
			sortField,
		});
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTablePage,
			props: {
				dividendTransactionLogsData,
				numOfItems,
				loadingStatus,
				limit,
			},
		} = this;
		const {
			pagination,
			searchData,
			sortOrder,
			sortField,
		} = this.state;
		const isLoadingStatus = loadingStatus === LoadingStatusEnum.LOADING;

		return (
			<div className={PREFIX_CLASS}>
				<SearchForm
					id={searchData.id}
					type={searchData.type}
					period={searchData.period}
					disabled={isLoadingStatus}
					typeOptions={typeOptions}
					onSearch={_handleSearch}
				/>
				<PagerTable
					rowKey="id"
					dataSource={dividendTransactionLogsData}
					isLoading={isLoadingStatus}
					columns={[
						{
							title: '流水号',
							dataIndex: 'id',
							width: 154
						},
						{
							title: '单号',
							dataIndex: 'associateId',
							width: 128,
						},
						{
							title: '类型',
							dataIndex: 'type',
							width: 102,
							render: data => mapDividendTypeString(data),
						},
						{
							title: '时间',
							dataIndex: 'createdAt',
							width: 186,
							sorter: true,
							sortOrder: sortField === 'createdAt' && sortOrder,
							render: (value) => isDateValid(value) ? formatDate(value) : '-',
						},
						{
							title: '金额',
							dataIndex: 'amount',
							width: 68,
							render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
						},
						{
							title: '余额',
							dataIndex: 'balance',
							width: 136,
							render: (balance) => <DecimalNumber data={balance} hasSeparator/>,
						},
						{
							title: '备注',
							dataIndex: 'description',
							width: 218,
							render: (value) => value ? value : '-',
						},
					]}
					paginationProps={{
						...pagination,
						total: numOfItems,
						pageSize: limit,
					}}
					onTableChange={_handleChangeTablePage}
				/>
			</div>
		);
	}

	componentDidMount() {
		this._fetchDividendTransactionLogs();
	}
}

MemberDividendTransactionLogPage.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		dividendTransactionLogs: dividendReducer,
	} = state;
	const data = dividendReducer.get('data').toObject();
	const loadingStatus = dividendReducer.get('loadingStatus');
	const limit = dividendReducer.get('limit');
	const {
		dividendTransactionLogs,
		numOfItems,
		page,
	} = data;

	return {
		numOfItems,
		page,
		limit,
		loadingStatus,
		dividendTransactionLogsData: dividendTransactionLogs,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchDividendTransactionLogsAction: (...args) => dispatch(fetchDividendTransactionLogsAction(...args)),
	};
}

function getDividendType(type) {
	return type === SELECT_ALL_TYPE_KEY ? undefined : type;
}

function convertToTimestamp(dateString) {
	return isDateValid(dateString) ? convertDateStringToTimestamp(dateString) : undefined;
}

function mapOrderString(order) {
	return {
		ascend: 'asc',
		descend: 'desc',
	}[order] || undefined;
}

function checkIsDividendTransactionLogType(type) {
	return Object.values(DividendTransactionLogTypeEnum).indexOf(type) > -1;
}
function mapDividendTypeString(type) {
	if (!checkIsDividendTransactionLogType(type)) {
		return '-';
	}

	if (
		type === DIVIDEND_TRANSFER_OUT
		|| type === DIVIDEND_GRANTED_FROM_SUPERVISION
	) {
		return DIVIDEND_GRANTED_TEXT;
	}

	if (type === DIVIDEND_RECEIVED) {
		return DIVIDEND_RECEIVED_TEXT;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDividendTransactionLogPage);
